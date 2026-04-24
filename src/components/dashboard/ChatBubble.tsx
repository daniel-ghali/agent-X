import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  content: string;
  sender: "user" | "ai" | "coach";
  timestamp?: string;
}

export default function ChatBubble({ content, sender, timestamp }: ChatBubbleProps) {
  const isUser = sender === "user";
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.18 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-gradient-primary text-primary-foreground rounded-2xl rounded-br-sm shadow-soft"
            : "bg-secondary text-foreground rounded-2xl rounded-bl-sm",
        )}
      >
        {content}
        {timestamp && (
          <p
            className={cn(
              "text-[10px] mt-1 opacity-70",
              isUser ? "text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {timestamp}
          </p>
        )}
      </div>
    </motion.div>
  );
}
