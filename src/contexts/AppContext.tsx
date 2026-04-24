import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Lang = "en" | "ar";

interface AppContextType {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.dashboard": { en: "Dashboard", ar: "الرئيسية" },
  "nav.conversations": { en: "Conversations", ar: "المحادثات" },
  "nav.leads": { en: "Leads", ar: "العملاء" },
  "nav.plans": { en: "Plans", ar: "الباقات" },
  "nav.settings": { en: "Settings", ar: "الإعدادات" },
  "nav.signout": { en: "Sign out", ar: "تسجيل الخروج" },
  "nav.tagline": { en: "AI Sales Engine", ar: "محرك مبيعات بالذكاء" },
  "nav.search": { en: "Search…", ar: "بحث…" },
  "nav.newPlan": { en: "+ New Plan", ar: "+ باقة جديدة" },

  // Dashboard
  "dash.title": { en: "Dashboard", ar: "الرئيسية" },
  "dash.chats": { en: "Chats Started", ar: "المحادثات" },
  "dash.leadsCaptured": { en: "Leads Captured", ar: "العملاء المُلتقطون" },
  "dash.hotLeads": { en: "Hot Leads", ar: "عملاء ساخنون" },
  "dash.conversionRate": { en: "Conversion Rate", ar: "معدل التحويل" },
  "dash.revenue": { en: "Revenue (EGP)", ar: "الإيرادات (ج.م)" },
  "dash.chartTitle": { en: "Chats, Leads & Conversions", ar: "المحادثات، العملاء، والتحويلات" },
  "dash.last14": { en: "Last 14 days", ar: "آخر ١٤ يوم" },
  "dash.perfTitle": { en: "Conversion Performance", ar: "أداء التحويل" },
  "dash.thisMonth": { en: "This month", ar: "هذا الشهر" },
  "dash.conversion": { en: "Conversion", ar: "تحويل" },
  "dash.leads": { en: "Leads", ar: "عملاء" },
  "dash.converted": { en: "Converted", ar: "تم تحويلهم" },
  "dash.recentLeads": { en: "Recent Leads", ar: "آخر العملاء" },
  "dash.viewAll": { en: "View all", ar: "عرض الكل" },
  "dash.followUps": { en: "Pending Follow-ups", ar: "متابعات معلقة" },
  "dash.followSub": { en: "Stay on top of your hottest leads", ar: "تابع عملاءك الأهم" },
  "dash.noLeads": { en: "No leads yet — share your chatbot link to get started", ar: "لا يوجد عملاء بعد — شارك رابط الشات بوت" },
  "table.name": { en: "Name", ar: "الاسم" },
  "table.goal": { en: "Goal", ar: "الهدف" },
  "table.status": { en: "Status", ar: "الحالة" },
  "table.plan": { en: "Interested Plan", ar: "الباقة المهتم بها" },
  "table.action": { en: "Action", ar: "إجراء" },
  "table.view": { en: "View", ar: "عرض" },

  // Leads
  "leads.title": { en: "Leads", ar: "العملاء" },
  "leads.sub": { en: "Manage and convert your AI-qualified prospects", ar: "إدارة وتحويل العملاء المؤهلين" },
  "leads.export": { en: "Export CSV", ar: "تصدير CSV" },
  "leads.all": { en: "All", ar: "الكل" },
  "leads.hot": { en: "Hot", ar: "ساخن" },
  "leads.warm": { en: "Warm", ar: "دافئ" },
  "leads.cold": { en: "Cold", ar: "بارد" },
  "leads.search": { en: "Search by name or goal…", ar: "ابحث بالاسم أو الهدف…" },
  "leads.empty": { en: "No leads yet", ar: "لا يوجد عملاء بعد" },
  "leads.emptySeg": { en: "No leads in this segment", ar: "لا يوجد عملاء في هذا التصنيف" },
  "leads.emptySub": { en: "Leads appear here once visitors talk to your chatbot", ar: "يظهر العملاء هنا عندما يتحدث الزوار مع الشات بوت" },
  "leads.convert": { en: "Mark as converted", ar: "تحديد كمحوّل" },
  "leads.delete": { en: "Delete", ar: "حذف" },
  "leads.converted": { en: "✓ Converted", ar: "✓ محوّل" },
  "leads.channel": { en: "Channel", ar: "القناة" },
  "leads.date": { en: "Date", ar: "التاريخ" },
  "leads.actions": { en: "Actions", ar: "إجراءات" },

  // Plans
  "plans.title": { en: "Plans", ar: "الباقات" },
  "plans.sub": { en: "These plans power what your AI sells", ar: "هذه الباقات هي ما يبيعه الذكاء الاصطناعي" },
  "plans.new": { en: "New Plan", ar: "باقة جديدة" },
  "plans.edit": { en: "Edit plan", ar: "تعديل الباقة" },
  "plans.name": { en: "Plan name", ar: "اسم الباقة" },
  "plans.price": { en: "Price (EGP)", ar: "السعر (ج.م)" },
  "plans.desc": { en: "Description", ar: "الوصف" },
  "plans.features": { en: "Features (press Enter to add)", ar: "المميزات (اضغط Enter للإضافة)" },
  "plans.payment": { en: "Payment options", ar: "وسائل الدفع" },
  "plans.save": { en: "Save changes", ar: "حفظ التغييرات" },
  "plans.add": { en: "Add plan", ar: "إضافة باقة" },
  "plans.saving": { en: "Saving…", ar: "جاري الحفظ…" },
  "plans.empty": { en: "No plans yet", ar: "لا توجد باقات" },
  "plans.emptySub": { en: "Add your first plan so the AI can sell it for you", ar: "أضف باقتك الأولى ليبيعها الذكاء الاصطناعي" },
  "plans.cash": { en: "Cash", ar: "كاش" },
  "plans.installment": { en: "Installments", ar: "تقسيط" },
  "plans.transfer": { en: "Bank transfer", ar: "تحويل بنكي" },

  // Conversations
  "conv.title": { en: "Conversations", ar: "المحادثات" },
  "conv.sub": { en: "Every chat your AI is having, in one place", ar: "كل المحادثات في مكان واحد" },
  "conv.empty": { en: "No conversations yet", ar: "لا توجد محادثات بعد" },
  "conv.emptySub": { en: "Share your chatbot link to start receiving chats", ar: "شارك رابط الشات بوت لبدء استقبال الرسائل" },
  "conv.select": { en: "Select a conversation to view messages", ar: "اختر محادثة لعرض الرسائل" },

  // Settings
  "settings.title": { en: "Settings", ar: "الإعدادات" },
  "settings.sub": { en: "Customize your AI assistant and account", ar: "خصّص المساعد الذكي وحسابك" },
  "settings.profile": { en: "Profile", ar: "الملف الشخصي" },
  "settings.coachName": { en: "Coach name", ar: "اسم المدرب" },
  "settings.business": { en: "Business name", ar: "اسم النشاط" },
  "settings.email": { en: "Email", ar: "البريد الإلكتروني" },
  "settings.behavior": { en: "Chatbot behavior", ar: "سلوك الشات بوت" },
  "settings.language": { en: "Preferred language", ar: "اللغة المفضلة" },
  "settings.tone": { en: "Tone of voice", ar: "نبرة الكلام" },
  "settings.link": { en: "Chatbot link", ar: "رابط الشات بوت" },
  "settings.linkSub": { en: "Share this link with your audience to start chats", ar: "شارك هذا الرابط مع جمهورك" },
  "settings.openBot": { en: "Open chatbot", ar: "فتح الشات بوت" },
  "settings.save": { en: "Save settings", ar: "حفظ الإعدادات" },

  // Auth
  "auth.welcomeBack": { en: "Welcome back", ar: "مرحباً بعودتك" },
  "auth.welcomeSub": { en: "Sign in to manage your AI sales engine.", ar: "سجّل دخولك لإدارة محرك المبيعات." },
  "auth.email": { en: "Email", ar: "البريد الإلكتروني" },
  "auth.password": { en: "Password", ar: "كلمة المرور" },
  "auth.signin": { en: "Sign in", ar: "تسجيل الدخول" },
  "auth.signingIn": { en: "Signing in…", ar: "جاري تسجيل الدخول…" },
  "auth.noAccount": { en: "Don't have an account?", ar: "لا تملك حساباً؟" },
  "auth.signup": { en: "Sign up", ar: "إنشاء حساب" },
  "auth.create": { en: "Create your account", ar: "أنشئ حسابك" },
  "auth.createSub": { en: "Start converting DMs into paying clients in minutes.", ar: "ابدأ بتحويل الرسائل لعملاء حقيقيين." },
  "auth.firstName": { en: "First name", ar: "الاسم الأول" },
  "auth.lastName": { en: "Last name", ar: "الاسم الأخير" },
  "auth.phone": { en: "Phone number", ar: "رقم الهاتف" },
  "auth.businessName": { en: "Business name", ar: "اسم النشاط" },
  "auth.terms": { en: "By creating an account, you agree to our Terms of Use and Privacy Policy.", ar: "بإنشاء حساب، أنت توافق على الشروط وسياسة الخصوصية." },
  "auth.createBtn": { en: "Create account", ar: "إنشاء حساب" },
  "auth.creating": { en: "Creating…", ar: "جاري الإنشاء…" },
  "auth.haveAccount": { en: "Already have an account?", ar: "لديك حساب بالفعل؟" },
  "auth.login": { en: "Log in", ar: "تسجيل الدخول" },
  "auth.heroTitle": { en: "Turn your DMs into paying clients.", ar: "حوّل رسائلك إلى عملاء يدفعون." },
  "auth.heroSub": { en: "AI replies, qualifies leads, and helps you close more coaching clients automatically.", ar: "الذكاء الاصطناعي يرد ويؤهّل ويغلق صفقاتك تلقائياً." },

  // Landing
  "land.signin": { en: "Sign in", ar: "دخول" },
  "land.start": { en: "Get started", ar: "ابدأ الآن" },
  "land.badge": { en: "AI sales for fitness coaches", ar: "مبيعات بالذكاء لمدربي اللياقة" },
  "land.h1a": { en: "Turn your DMs into", ar: "حوّل رسائلك إلى" },
  "land.h1b": { en: "paying clients", ar: "عملاء يدفعون" },
  "land.sub": { en: "Agent X is an AI sales assistant for Egyptian fitness coaches and influencers. It replies, qualifies leads, and closes plans — automatically.", ar: "Agent X مساعد مبيعات ذكي لمدربي اللياقة في مصر. يرد، يؤهّل، ويغلق الباقات — تلقائياً." },
  "land.startFree": { en: "Start free", ar: "ابدأ مجاناً" },
  "land.tryBot": { en: "Try the chatbot", ar: "جرّب الشات بوت" },
  "land.f1t": { en: "AI chatbot", ar: "شات بوت ذكي" },
  "land.f1d": { en: "Replies in Egyptian Arabic and sells your plans on autopilot.", ar: "يرد بالعامية المصرية ويبيع باقاتك تلقائياً." },
  "land.f2t": { en: "Lead CRM", ar: "إدارة العملاء" },
  "land.f2d": { en: "Track every prospect from the first DM to a paid client.", ar: "تابع كل عميل من أول رسالة لحد ما يدفع." },
  "land.f3t": { en: "Built for Egypt", ar: "مصمم لمصر" },
  "land.f3d": { en: "EGP pricing, installments, and WhatsApp-first workflows.", ar: "أسعار بالجنيه، تقسيط، وواتساب." },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("lang") as Lang) || "en";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    if (lang === "ar") root.classList.add("font-cairo");
    else root.classList.remove("font-cairo");
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleTheme = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));
  const toggleLang = () => setLangState((l) => (l === "en" ? "ar" : "en"));
  const t = (key: string) => translations[key]?.[lang] ?? key;

  return (
    <AppContext.Provider
      value={{
        theme,
        lang,
        toggleTheme,
        toggleLang,
        setLang: setLangState,
        setTheme: setThemeState,
        t,
        dir: lang === "ar" ? "rtl" : "ltr",
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
