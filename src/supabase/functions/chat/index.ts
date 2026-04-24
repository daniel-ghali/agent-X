import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const buildSystemPrompt = (plansData: string, tone: string) => `
أنت مساعد مبيعات لياقة بدنية اسمك Agent X.
بتكلم بالعربية العامية المصرية بشكل طبيعي وودود.

مهمتك:
- تساعد الزوار يختاروا أفضل خطة تدريب
- تجاوب على أسئلتهم بشكل طبيعي
- تتعامل مع الاعتراضات: السعر، الوقت، الالتزام، التقسيط
- تحفزهم يبدأوا رحلتهم

الخطط المتاحة:
${plansData}

قواعد مهمة:
- لو المستخدم بيتكلم عربي، رد بالعامية المصرية
- لو بيتكلم إنجليزي، رد بالإنجليزية
- ردودك قصيرة وطبيعية (3-4 جمل بحد أقصى)
- اسأل سؤال متابعة عشان تفهم هدف المستخدم
- لا تقول إنك AI إلا لو سُئلت مباشرة
- لو سأل عن التقسيط أو الدفع، وضح الخيارات المتاحة
- الأسلوب: ${tone === 'friendly' ? 'ودود ومحفز' : tone === 'sales' ? 'مبيعاتي ومقنع' : 'محايد ومهني'}

لازم ردك يكون JSON فقط بالشكل ده:
{
  "reply": "نص الرد هنا",
  "status": "HOT | WARM | COLD",
  "goal": "هدف المستخدم المستنتج",
  "plan": "اسم الخطة الموصى بها أو null"
}

تصنيف الـ status:
- HOT: يريد البدء الآن، يسأل عن السعر أو طريقة الدفع أو التقسيط
- WARM: مهتم لكن عنده تردد أو أسئلة
- COLD: بيستكشف بس أو مش متأكد
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId, userId } = await req.json();
    
    if (!message || !userId) {
      return new Response(JSON.stringify({ error: "message and userId are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch coach profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("coach_name, business_name, chatbot_tone")
      .eq("id", userId)
      .single();

    const tone = profile?.chatbot_tone || "friendly";

    // Fetch active plans
    const { data: plans } = await supabase
      .from("plans")
      .select("name, price, currency, description, features, payment_options")
      .eq("user_id", userId)
      .eq("is_active", true);

    const plansData = plans && plans.length > 0
      ? plans.map((p: any) => {
          const features = Array.isArray(p.features) ? p.features.join("، ") : "";
          const payments = Array.isArray(p.payment_options) 
            ? p.payment_options.map((o: string) => o === "cash" ? "نقدي" : o === "installment" ? "تقسيط" : "تحويل بنكي").join("، ")
            : "";
          return `- ${p.name}: ${p.price} ${p.currency}\n  الوصف: ${p.description || "—"}\n  المميزات: ${features || "—"}\n  طرق الدفع: ${payments || "—"}`;
        }).join("\n\n")
      : "لا توجد خطط متاحة حالياً";

    // Get or create conversation
    let convId = conversationId;
    if (!convId) {
      const { data: conv } = await supabase
        .from("conversations")
        .insert({ user_id: userId, visitor_name: "زائر", channel: "web" })
        .select("id")
        .single();
      convId = conv?.id;
    }

    // Fetch last 10 messages for context
    const { data: prevMessages } = await supabase
      .from("messages")
      .select("sender, content")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true })
      .limit(10);

    // Build message history
    const messageHistory = (prevMessages || []).map((m: any) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.content,
    }));

    // Save user message
    await supabase.from("messages").insert({
      conversation_id: convId,
      sender: "user",
      content: message,
    });

    // Call AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: buildSystemPrompt(plansData, tone) },
          ...messageHistory,
          { role: "user", content: message },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "عدد الطلبات كتير، حاول تاني بعد شوية" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "الرصيد خلص، تواصل مع الدعم" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errText);
      throw new Error("AI gateway error");
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON response from AI
    let reply = "معلش، في مشكلة بسيطة. حاول تاني بعد شوية 🙏";
    let status = "COLD";
    let goal = "";
    let plan: string | null = null;

    try {
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        reply = parsed.reply || reply;
        status = parsed.status || status;
        goal = parsed.goal || "";
        plan = parsed.plan || null;
      }
    } catch {
      // If JSON parsing fails, use raw content as reply
      if (rawContent.trim()) {
        reply = rawContent.trim();
      }
    }

    // Save AI response
    await supabase.from("messages").insert({
      conversation_id: convId,
      sender: "ai",
      content: reply,
    });

    // Upsert lead
    const { data: existingLead } = await supabase
      .from("leads")
      .select("id")
      .eq("conversation_id", convId)
      .single();

    if (existingLead) {
      await supabase.from("leads").update({
        status,
        goal: goal || undefined,
        interested_plan: plan || undefined,
      }).eq("id", existingLead.id);
    } else {
      await supabase.from("leads").insert({
        conversation_id: convId,
        user_id: userId,
        status,
        goal,
        interested_plan: plan,
      });
    }

    // Update conversation timestamp
    await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", convId);

    return new Response(
      JSON.stringify({ reply, status, goal, plan, conversationId: convId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ reply: "معلش، في مشكلة بسيطة. حاول تاني بعد شوية 🙏", error: true }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
