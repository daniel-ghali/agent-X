import { motion } from "framer-motion";
import { MessageSquare, Target, Calendar, Database, Smartphone, Search, Filter, History, X, Sparkles, FileText, CheckCircle2 } from "lucide-react";

const SolutionSection = () => {
  const features = [
    { icon: MessageSquare, title: "AI Real-time Chat", desc: "Every DM gets a smart, personalized response in seconds.", badge: "BETA" },
    { icon: Target, title: "Lead Qualification", desc: "AI scores prospects automatically based on your criteria.", badge: "BETA" },
    { icon: FileText, title: "Automated CRM", desc: "Insights and lead data synced instantly with your workflow.", badge: "BETA" },
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden font-sans border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Content & Features */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                 <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-blue-500">[02] QUERY & ACT</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                Go from feedback to <br />
                <span className="text-zinc-500 italic">fully qualified revenue.</span>
              </h2>

              <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                Move from discovery to conversion instantly. Chat with your lead data and generate summaries from your conversations, giving your sales team the context to close fast.
              </p>
            </motion.div>

            <div className="space-y-8">
               <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Explore Solution Features</p>
               <div className="space-y-6">
                  {features.map((f, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group border-b border-white/5 pb-6 last:border-0"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="p-2 rounded-lg bg-zinc-900 border border-white/5 text-blue-500 group-hover:text-blue-400">
                          <f.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                             <h3 className="font-black text-white text-sm uppercase tracking-wider">{f.title}</h3>
                             <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[9px] font-black text-zinc-500 border border-zinc-700">BETA</span>
                          </div>
                          <p className="text-[13px] text-zinc-500 font-medium">{f.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity UI Visualization */}
          <div className="relative">
            {/* SVG Grid Background */}
            <div className="absolute inset-0 bg-[#0A0A0A] border border-white/5 rounded-[40px] overflow-hidden">
               <svg className="absolute inset-0 w-full h-full opacity-20">
                  <pattern id="solution-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#333" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#solution-grid)" />
               </svg>
            </div>

            <div className="p-12 relative min-h-[500px] flex flex-col gap-6">
               
               {/* Search / Command Bar */}
               <motion.div 
                 initial={{ opacity: 0, y: -20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="mx-auto w-full max-w-[400px] bg-zinc-900/80 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-2xl relative z-30"
               >
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-zinc-500 text-xs font-medium">Find a lead, ask a question...</span>
               </motion.div>

               {/* Interaction Visual: Node & Connection */}
               <div className="absolute top-[45%] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                  <div className="font-mono text-[9px] text-zinc-600 mb-4 tracking-[0.2em] uppercase">Generating Doc</div>
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-green-500/40 blur-[10px] rounded-full"
                    />
                    <div className="w-3 h-3 bg-green-500 rounded-sm relative z-10 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                  </div>
                  <div className="w-px h-24 bg-gradient-to-b from-green-500 to-transparent opacity-30 mt-2" />
               </div>

               {/* Layered UI Windows */}
               <div className="relative mt-12 grid grid-cols-1 gap-4">
                  
                  {/* Background Window: Lead Summary */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl relative mr-12 opacity-40 grayscale"
                  >
                     <div className="flex items-center gap-2 mb-4 opacity-50">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="text-[10px] font-bold text-zinc-400">Monthly Performance Overview</span>
                     </div>
                     <h4 className="text-2xl font-black text-white/50 mb-4">Lead Performance</h4>
                     <div className="space-y-3">
                        <div className="w-full h-2 bg-white/5 rounded-full" />
                        <div className="w-3/4 h-2 bg-white/5 rounded-full" />
                        <div className="w-1/2 h-2 bg-white/5 rounded-full" />
                     </div>
                  </motion.div>

                  {/* Foreground Window: Chat Interaction */}
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-20 right-0 left-12 bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20"
                  >
                     <div className="flex items-center justify-between mb-6">
                        <div className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Lead Analysis</div>
                        <div className="flex items-center gap-2 text-zinc-600">
                           <Filter className="w-3 h-3" />
                           <History className="w-3 h-3" />
                           <X className="w-3 h-3" />
                        </div>
                     </div>
                     
                     <div className="space-y-4 mb-8">
                        {/* User Message */}
                        <div className="flex justify-end pr-4">
                           <div className="bg-zinc-800/80 p-3 rounded-xl border border-white/5 max-w-[80%]">
                              <p className="text-[11px] text-zinc-200 font-semibold leading-relaxed">Summarize the lead quality for all appointments booked this week.</p>
                           </div>
                        </div>
                        {/* Agent response */}
                        <div className="pl-4">
                           <div className="bg-zinc-900 border border-white/10 p-4 rounded-xl space-y-3">
                              <p className="text-[10px] text-zinc-400 leading-relaxed">
                                This week, 85% of leads reached the "Highly Qualified" tier. Most inquiries focused on enterprise automation.
                              </p>
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 w-fit">
                                 <CheckCircle2 className="w-3 h-3 text-green-500" />
                                 <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Action Recommended</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Follow-up input button */}
                     <div className="w-full h-10 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center px-4">
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Ask a follow up question...</span>
                     </div>
                  </motion.div>

               </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
