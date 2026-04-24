import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/contexts/AppContext";
import ChannelBadge from "@/components/dashboard/ChannelBadge";
import ChatBubble from "@/components/dashboard/ChatBubble";

interface Conversation {
  id: string;
  visitor_name: string | null;
  channel: string | null;
  updated_at: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  created_at: string;
}

export default function Conversations() {
  const { user } = useAuth();
  const { t } = useApp();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const fetchConversations = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("conversations")
      .select("id, visitor_name, channel, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    setConversations((data as any) || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const fetchMessages = async (convId: string) => {
    setMessagesLoading(true);
    setSelectedConv(convId);
    const { data } = await supabase
      .from("messages")
      .select("id, sender, content, created_at")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });
    setMessages((data as any) || []);
    setMessagesLoading(false);
  };

  const selected = conversations.find((c) => c.id === selectedConv);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight">{t("conv.title")}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t("conv.sub")}
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-4 animate-pulse">
              <div className="h-4 bg-secondary rounded w-1/3 mb-2" />
              <div className="h-3 bg-secondary rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : conversations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-12 shadow-card text-center"
        >
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">{t("conv.empty")}</p>
          <p className="text-sm mt-1 text-muted-foreground">
            {t("conv.emptySub")}
          </p>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-[340px_1fr] gap-4">
          <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="divide-y divide-border">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => fetchMessages(conv.id)}
                  className={`w-full p-4 text-left transition-colors flex items-center gap-3 ${
                    selectedConv === conv.id ? "bg-secondary" : "hover:bg-secondary/50"
                  }`}
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {conv.visitor_name || "Visitor"}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <ChannelBadge channel={conv.channel || "web"} />
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(conv.updated_at!).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 rtl:rotate-180" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-card flex flex-col min-h-[500px]">
            {!selectedConv ? (
              <div className="flex items-center justify-center flex-1 text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">{t("conv.select")}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="border-b border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{selected?.visitor_name || "Visitor"}</p>
                    <ChannelBadge channel={selected?.channel || "web"} />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-3 max-h-[600px]">
                  {messagesLoading ? (
                    [1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div
                          className={`h-10 bg-secondary rounded-2xl w-2/3 ${i % 2 === 0 ? "ml-auto" : ""}`}
                        />
                      </div>
                    ))
                  ) : (
                    messages.map((msg) => (
                      <ChatBubble
                        key={msg.id}
                        content={msg.content}
                        sender={msg.sender as "user" | "ai" | "coach"}
                        timestamp={new Date(msg.created_at!).toLocaleTimeString("en", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      />
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
