import { motion } from "framer-motion";
import { Mic, Command, Download, Github, Figma, Mail, Calendar, Chrome, Apple, Database, Cloud, Zap, Globe, MessageSquare } from "lucide-react";

const AIPowerSection = () => {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        
        {/* Main "Brain MAX" Hero Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[48px] p-8 md:p-16 mb-8 relative overflow-hidden group shadow-2xl"
        >
          {/* Accent glow corner */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-purple-500/10 via-blue-500/5 to-transparent blur-[80px]" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                   <div className="w-5 h-5 bg-white/20 blur-[2px] rounded-full animate-pulse" />
                   <Mic className="w-5 h-5 text-white absolute" />
                </div>
                <span className="text-xl font-black text-white tracking-tight">Brain <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] uppercase align-middle ml-1 border border-zinc-700">MAX</span></span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                Type 4x faster with AI Talk to Text, instantly perfected to write like you.
              </h2>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest">
                  REPLACES <span className="flex items-center gap-1.5 text-zinc-200"><div className="w-3 h-3 bg-zinc-600 rounded-sm" /> Flow</span>
                </div>
                
                <div className="space-y-4">
                  <p className="text-zinc-300 text-xl font-medium">Save 2 hours every day, guaranteed.</p>
                  <div className="flex items-center gap-4 text-zinc-500 text-[11px] font-bold uppercase tracking-wider">
                     <span>Available for</span>
                     <div className="flex items-center gap-2 text-zinc-400">
                        <Globe className="w-3.5 h-3.5" /> Windows,
                        <Chrome className="w-3.5 h-3.5" /> Chrome and
                        <Apple className="w-3.5 h-3.5" /> Mac
                     </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-fit bg-white text-black px-8 py-4 rounded-2xl font-black text-sm hover:bg-zinc-100 transition-colors shadow-xl"
                >
                  Download free
                </motion.button>
              </div>
            </div>

            {/* Right: Waveform Visualization */}
            <div className="relative h-[300px] flex items-center justify-center bg-zinc-950/40 rounded-[32px] border border-white/5 overflow-hidden">
               {/* Waveform Bars */}
               <div className="flex items-center gap-1.5 px-12">
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        height: [20, 60, 30, 80, 40, 20],
                        opacity: [0.3, 1, 0.5, 1, 0.4, 0.3]
                      }}
                      transition={{ 
                        duration: 1.5 + (Math.random() * 2), 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.05
                      }}
                      className="w-1.5 bg-gradient-to-t from-zinc-700 via-white to-zinc-700 rounded-full"
                    />
                  ))}
               </div>

               {/* Shortcuts Overlay */}
               <div className="absolute bottom-6 inset-x-8 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[11px] font-bold text-zinc-500">
                     <span>Stop</span>
                     <div className="flex items-center gap-1 px-1.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                        <Command className="w-3 h-3" /> H
                     </div>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-bold text-zinc-500">
                     <span>Close</span>
                     <div className="flex items-center gap-1 px-1.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 uppercase leading-none">
                        Esc
                     </div>
                  </div>
               </div>

               {/* Product Hunt Badge */}
               <div className="absolute bottom-6 right-6">
                 <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                    <div className="w-8 h-8 rounded-full bg-[#da552f] flex items-center justify-center text-white text-lg font-black italic">P</div>
                    <div>
                      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest leading-tight">Product Hunt</p>
                      <p className="text-xs text-white font-black leading-tight">#1 Product of the Week</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid Section */}
        <div className="grid md:grid-cols-3 gap-8">
           
           {/* Card 1: Sound Like Me */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-zinc-900/40 border border-white/5 p-10 rounded-[40px] flex flex-col items-center text-center overflow-hidden relative group"
           >
              <div className="mb-12 relative">
                 {/* Ripple Rings */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    {[1, 2, 3].map((r) => (
                      <motion.div 
                        key={r}
                        animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: r * 0.8 }}
                        className="absolute border border-white/10 rounded-full w-[120px] h-120px"
                        style={{ width: r * 100, height: r * 100 }}
                      />
                    ))}
                 </div>
                 {/* Button UI */}
                 <div className="relative z-10 bg-zinc-950 border border-zinc-800 px-6 py-4 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] flex items-center gap-3">
                    <Mic className="w-4 h-4 text-white" />
                    <span className="text-sm font-black text-white">Sound like me</span>
                 </div>
              </div>
              <h3 className="text-xl font-black text-white mb-3">Your company's AI</h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed">A superhuman brain built for you and your team.</p>
           </motion.div>

           {/* Card 2: Connected Apps */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="bg-zinc-900/40 border border-white/5 p-10 rounded-[40px] flex flex-col items-center text-center group"
           >
              <div className="grid grid-cols-4 gap-4 mb-10">
                 {[Github, Figma, Mail, Calendar, Chrome, Database, Cloud, Zap].map((Icon, i) => (
                   <div key={i} className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-colors">
                      <Icon className="w-5 h-5" />
                   </div>
                 ))}
                 <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600 text-xs font-black">+42</div>
              </div>
              <h3 className="text-xl font-black text-white mb-3">Connected to 50+ apps</h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed">Superpowers to complete 500+ human tasks.</p>
           </motion.div>

           {/* Card 3: Every AI */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="bg-zinc-900/40 border border-white/5 p-10 rounded-[40px] flex flex-col items-center text-center group"
           >
              <div className="relative mb-12 w-full flex items-center justify-center h-[100px]">
                 {/* Central AI Logo (ChatGPT Style) */}
                 <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center z-10 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    <Zap className="w-8 h-8 text-black" />
                 </div>
                 {/* Orbiting Icons */}
                 <div className="absolute inset-x-0 h-full flex items-center justify-around opacity-30 grayscale blur-[1px]">
                    <MessageSquare className="w-10 h-10 text-white" />
                    <SparklesIcon className="w-10 h-10 text-white" />
                 </div>
              </div>
              <h3 className="text-xl font-black text-white mb-3">Every AI</h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed">ChatGPT, Claude, Gemini — unlimited.</p>
           </motion.div>

        </div>
      </div>
    </section>
  );
};

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);

export default AIPowerSection;
