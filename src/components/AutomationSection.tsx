import { motion } from "framer-motion";
import { ArrowRight, Zap, CheckCircle2, MessageSquare, Briefcase, RefreshCw, Layers } from "lucide-react";

const AutomationSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden border-y border-border/50">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 grid-boxes opacity-30 pointer-events-none" />
      
      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        {/* Header Header */}
        <div className="max-w-3xl mb-24">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-foreground mb-6">
            Agent X works 24/7. <span className="text-muted-foreground font-medium">Scale your sales process effortlessly.</span>
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Design powerful workflows, deploy your AI assistant, and watch your business grow — all in one platform.
          </p>
        </div>

        {/* Main Interface Mockup */}
        <div className="grid lg:grid-cols-12 gap-0 border border-border/60 rounded-[32px] overflow-hidden bg-white/50 backdrop-blur-sm shadow-2xl shadow-black/5">
          
          {/* Left Column: Context */}
          <div className="lg:col-span-3 p-8 md:p-12 border-r border-border/60 flex flex-col justify-between bg-zinc-50/30">
            <div>
              <h3 className="text-xl font-black mb-4">Automate your sales process</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                You stay in control. Create workflows that guide every lead through your qualification process, from first message to booked call.
              </p>
            </div>
            
            <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-green-600 transition-colors group">
              Explore automations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Center Column: Workflow Diagram */}
          <div className="lg:col-span-6 p-8 md:p-12 relative min-h-[500px] bg-white flex items-center justify-center">
             <div className="relative w-full max-w-[400px]">
                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                  <motion.path 
                    d="M 200 60 L 200 110" 
                    fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }}
                  />
                  <motion.path 
                    d="M 200 160 L 200 230" 
                    fill="none" stroke="#22c55e" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.path 
                    d="M 200 280 L 120 330" 
                    fill="none" stroke="#22c55e" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }}
                  />
                  <motion.path 
                    d="M 200 280 L 280 330" 
                    fill="none" stroke="#e4e4e7" strokeWidth="1.5"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5 }}
                  />
                </svg>

                {/* Workflow Nodes */}
                <div className="space-y-12 relative z-10">
                  {/* Node 1: Trigger */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-[10px] font-bold text-zinc-500 mb-2">
                       <MessageSquare className="w-3 h-3" /> Message
                       <span className="ml-auto text-green-600 flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> Received</span>
                    </div>
                    <div className="w-full bg-white border border-green-500/30 rounded-xl p-4 shadow-lg shadow-green-500/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black">When user asks question</span>
                        <span className="text-[9px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-500">Chat</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Trigger when a new user starts a conversation</p>
                    </div>
                  </motion.div>

                  {/* Node 2: Switch */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col items-center mt-4"
                  >
                     <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-[10px] font-bold text-zinc-500 mb-2">
                       <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> Analyzed</span>
                    </div>
                    <div className="w-[180px] bg-white border border-border rounded-xl p-4 shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-purple-500" />
                         </div>
                         <span className="text-xs font-black">Agent X AI</span>
                      </div>
                      <span className="text-[9px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-500">Intent</span>
                    </div>
                  </motion.div>

                  {/* Node 3: Split Paths */}
                  <div className="grid grid-cols-2 gap-8 mt-4 pt-4">
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 1.2 }}
                       className="flex flex-col items-center"
                     >
                        <span className="text-[9px] font-bold text-green-600 mb-2 uppercase tracking-tighter">Support</span>
                        <div className="w-full bg-white border border-green-500/30 rounded-xl p-4 shadow-lg">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black">Answer instantly</span>
                           </div>
                           <p className="text-[9px] text-muted-foreground whitespace-nowrap">Agent X resolves query from KB</p>
                        </div>
                     </motion.div>

                     <motion.div 
                       initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 1.4 }}
                       className="flex flex-col items-center opacity-40 grayscale"
                     >
                        <span className="text-[9px] font-bold text-zinc-400 mb-2 uppercase tracking-tighter">Sales</span>
                        <div className="w-full bg-zinc-50 border border-border rounded-xl p-4">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black">Book meeting</span>
                           </div>
                           <p className="text-[9px] text-zinc-400">Route lead to Calendly flow</p>
                        </div>
                     </motion.div>
                  </div>
                </div>
             </div>
          </div>

          {/* Right Column: Features & 3D Decorations */}
          <div className="lg:col-span-3 border-l border-border/60 bg-zinc-50/30 flex flex-col justify-between">
             {/* List of features */}
             <div className="p-8 space-y-3">
                {[
                  "Re-engage cold prospects",
                  "Auto-respond to pricing questions",
                  "Follow up on plan inquiries",
                  "Confirm booking details",
                  "Send welcome messages",
                  "Track lead status updates"
                ].map((item, i) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className={`p-3 rounded-xl border text-[11px] font-bold transition-all duration-300 ${
                      item.includes("pricing") 
                      ? "bg-white border-green-500/30 text-foreground shadow-lg shadow-green-500/5 translate-x-[-10px] z-10" 
                      : "bg-white/50 border-border/50 text-muted-foreground"
                    }`}
                  >
                    {item}
                  </motion.div>
                ))}
             </div>

             {/* Bottom Decoration: 3D Cubes Effect */}
             <div className="p-8 relative h-[200px] flex items-center justify-center">
                <div className="relative">
                   {/* Mock 3D Cubes using SVG */}
                   <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-10 dark:opacity-20">
                      <g fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M 40 40 L 80 40 L 80 80 L 40 80 Z" />
                        <path d="M 40 40 L 50 30 L 90 30 L 80 40" />
                        <path d="M 80 40 L 90 30 L 90 70 L 80 80" />
                        
                        <path d="M 60 60 L 100 60 L 100 100 L 60 100 Z" />
                        <path d="M 60 60 L 70 50 L 110 50 L 100 60" />
                        <path d="M 100 60 L 110 50 L 110 90 L 100 100" />
                      </g>
                   </svg>
                   <motion.div 
                     animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute inset-0 flex items-center justify-center"
                   >
                     <Layers className="w-12 h-12 text-green-500/20" />
                   </motion.div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
