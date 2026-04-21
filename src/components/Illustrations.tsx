import { motion } from "framer-motion";
import { Brain, TrendingUp, MessageSquare, Sparkles } from "lucide-react";

export const BrainIllustration = () => (
  <motion.div 
    animate={{ 
      y: [0, -15, 0],
      rotate: [0, 5, 0]
    }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="w-48 h-48 relative"
  >
    <div className="absolute inset-0 bg-green-500/10 blur-[60px] rounded-full" />
    <div className="glass-premium-green rounded-[40px] w-full h-full p-8 border border-green-500/20 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Sparkles className="w-6 h-6 text-green-500" />
      </div>
      <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center mb-4 border border-green-500/20">
        <Brain className="w-10 h-10 text-green-500" />
      </div>
      <div className="space-y-1.5 w-full">
        <div className="h-1.5 w-3/4 bg-green-500/20 rounded-full" />
        <div className="h-1.5 w-full bg-green-500/10 rounded-full" />
        <div className="h-1.5 w-1/2 bg-green-500/5 rounded-full" />
      </div>
    </div>
  </motion.div>
);

export const ChartIllustration = () => (
  <motion.div 
    animate={{ 
      y: [0, 15, 0],
      rotate: [0, -5, 0]
    }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    className="w-56 h-56 relative"
  >
    <div className="absolute inset-0 bg-green-500/10 blur-[80px] rounded-full" />
    <div className="glass-premium rounded-[32px] w-full h-full p-8 border border-white/20 flex flex-col justify-end relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 p-6">
        <TrendingUp className="w-8 h-8 text-green-500" />
      </div>
      <div className="flex items-end gap-2 h-24 mb-4">
        <div className="flex-1 h-1/3 bg-green-500/20 rounded-t-lg" />
        <div className="flex-1 h-1/2 bg-green-500/40 rounded-t-lg" />
        <div className="flex-1 h-3/4 bg-green-500/60 rounded-t-lg" />
        <div className="flex-1 h-full bg-green-500 rounded-t-lg shadow-[0_0_20px_rgba(74,222,128,0.3)]" />
      </div>
      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">+184% GROWTH</div>
    </div>
  </motion.div>
);

export const MessageIllustration = () => (
  <motion.div 
    animate={{ 
      x: [0, 10, 0],
      y: [0, -10, 0]
    }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    className="w-40 h-40 relative"
  >
    <div className="absolute inset-0 bg-purple-500/10 blur-[50px] rounded-full" />
    <div className="bg-foreground text-background rounded-3xl w-full h-full p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
      <div className="absolute top-[-20%] right-[-20%] w-24 h-24 bg-green-500/20 blur-[30px] rounded-full group-hover:bg-green-500/30 transition-colors" />
      <MessageSquare className="w-8 h-8 text-green-500" />
      <div className="space-y-2">
        <div className="h-2 w-full bg-background/20 rounded-full" />
        <div className="h-2 w-2/3 bg-background/10 rounded-full" />
      </div>
    </div>
  </motion.div>
);
