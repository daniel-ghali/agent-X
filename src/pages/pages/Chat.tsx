import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import ChatBubble from "@/components/dashboard/ChatBubble";
import TypingIndicator from "@/components/dashboard/TypingIndicator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
}

const quickReplies = [
  "I want to start my journey 💪",
  "What are your prices?",
  "Help me pick a program",
  "Do you offer installments?",
];

export default function Chat() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hey! I'm your Agent X assistant. How can I help today? 💪",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("Agent X");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userId) {
      supabase
        .from("profiles")
        .select("business_name")
        .eq("id", userId)
        .single()
        .then(({ data }) => {
          if (data?.business_name) setBusinessName(data.business_name);
        });
    }
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    setShowQuickReplies(false);
    const userMsg: Message = { id: crypto.randomUUID(), content: text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const targetUserId = userId || "demo";
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { message: text, conversationId, userId: targetUserId },
      });
      if (error) throw error;
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        content: data.reply || "Sorry, I can't reply right now. Try again 🙏",
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMsg]);
      if (data.conversationId) setConversationId(data.conversationId);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: "Connection issue. Please try again in a moment 🙏",
          sender: "ai",
        },
      ]);
      toast.error("Connection error");
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="border-b border-border bg-card/80 backdrop-blur-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">{businessName}</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-converted animate-pulse" />
              <span className="text-[11px] text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <span className="text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
          Powered by Agent X
        </span>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3 max-w-2xl mx-auto w-full">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} content={msg.content} sender={msg.sender} />
        ))}

        {showQuickReplies && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 justify-start pt-2"
          >
            {quickReplies.map((text) => (
              <button
                key={text}
                onClick={() => sendMessage(text)}
                className="bg-card hover:bg-secondary border border-border px-3.5 py-2 rounded-lg text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-card"
              >
                {text}
              </button>
            ))}
          </motion.div>
        )}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-border bg-card/80 backdrop-blur-sm p-4"
      >
        <div className="flex gap-2 max-w-2xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            disabled={isTyping}
            className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-gradient-primary text-white p-3 rounded-xl hover:opacity-95 transition-all disabled:opacity-30 active:scale-95 shadow-soft"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
