import { motion } from "framer-motion";
import { MessageSquare, LineChart, Globe, Zap, ArrowRight, ShieldCheck } from "lucide-react";

const AgentDeploymentSection = () => {
  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6">
        
        {/* Header Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-zinc-500 text-sm font-medium mb-4 block">ElevenAgents</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-foreground mb-6">
              Deploy agents that talk, <br />type, and take action
            </h2>
            <button className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all flex items-center gap-2 group">
              Learn more
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="max-w-xs">
            <p className="text-zinc-500 text-sm leading-relaxed">
              Configure, deploy and monitor natural, human-sounding agents in 32 languages with leading accuracy and ultra-low latency across voice or chat.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Card 1: Omnichannel Agents */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative h-[500px] rounded-[40px] overflow-hidden bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-500"
          >
             {/* Dynamic Blurred Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-yellow-50 to-emerald-50 opacity-60" />
             <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-green-400/20 blur-[100px] rounded-full animate-float" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-400/10 blur-[120px] rounded-full animate-float reveal-delay-2" />
             
             {/* Chat UI Mockup */}
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-[320px] space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    className="ml-auto bg-white/80 backdrop-blur-md border border-white/50 px-4 py-2.5 rounded-2xl rounded-tr-none shadow-sm text-xs font-medium"
                  >
                    Can I get a refund?
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mr-auto bg-white border border-border px-4 py-3 rounded-2xl rounded-tl-none shadow-md text-xs font-bold leading-relaxed max-w-[85%]"
                  >
                    Sure. Can you share your order number please?
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="ml-auto bg-white/80 backdrop-blur-md border border-white/50 px-4 py-2.5 rounded-2xl rounded-tr-none shadow-sm text-xs font-medium"
                  >
                    It's EL4543490
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mr-auto flex items-center gap-2 text-[10px] text-zinc-400 font-medium pl-2"
                  >
                     <div className="flex gap-1">
                        <span className="w-1 h-1 bg-zinc-300 rounded-full animate-bounce" />
                        <span className="w-1 h-1 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1 h-1 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                     </div>
                     Thinking...
                  </motion.div>
                </div>
             </div>

             {/* Content Label */}
             <div className="absolute bottom-0 inset-x-0 p-10 pt-20 bg-gradient-to-t from-emerald-900/10 to-transparent">
                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">Omnichannel agents</span>
                <p className="text-foreground text-sm font-bold leading-relaxed max-w-xs">
                  Agents listen, read and interact just like humans would across phone, chat, email and WhatsApp.
                </p>
             </div>
          </motion.div>

          {/* Card 2: Analytics Dashboard */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative h-[500px] rounded-[40px] overflow-hidden bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-500 px-10 py-12 flex flex-col"
          >
             {/* Chart Mockup */}
             <div className="flex-1 bg-zinc-50/50 rounded-3xl border border-border/50 p-6 relative overflow-hidden mb-8">
                <div className="flex items-center justify-between mb-8">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Success rate</p>
                      <p className="text-2xl font-black text-foreground">61.5%</p>
                   </div>
                   <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-orange-500" />
                         <span className="text-[9px] font-bold text-zinc-500">87.37%</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-blue-500" />
                         <span className="text-[9px] font-bold text-zinc-500">61.71%</span>
                      </div>
                   </div>
                </div>

                {/* SVG Graph */}
                <div className="relative w-full h-[140px] mt-4">
                   <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                      {/* Grid Lines */}
                      <line x1="0" y1="0" x2="100" y2="0" stroke="#f4f4f5" strokeWidth="0.5" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="#f4f4f5" strokeWidth="0.5" />
                      <line x1="0" y1="100" x2="100" y2="100" stroke="#f4f4f5" strokeWidth="0.5" />
                      
                      {/* Data Paths */}
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                        d="M0,45 Q10,40 20,48 T40,42 T60,50 T80,45 T100,52"
                        fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round"
                      />
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        d="M0,65 Q15,68 30,62 T55,68 T80,60 T100,65"
                        fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"
                      />
                   </svg>
                   <div className="flex justify-between mt-4">
                      <span className="text-[8px] font-bold text-zinc-400">17 Aug</span>
                      <span className="text-[8px] font-bold text-zinc-400">24 Aug</span>
                   </div>
                </div>
             </div>

             {/* Content Label */}
             <div>
                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">Analytics</span>
                <p className="text-foreground text-sm font-bold leading-relaxed max-w-sm">
                  Easily measure success rates and CX metrics, optimizing flows over time.
                </p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AgentDeploymentSection;
