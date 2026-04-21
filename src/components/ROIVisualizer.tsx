import { motion } from "framer-motion";
import { Clock, TrendingUp, Users, Sparkles, ArrowUpRight } from "lucide-react";

const ROIVisualizer = () => {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-boxes opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* Container for flanking boxes + Main Component */}
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 min-h-[500px]">

          {/* Left Side-Box: Time Salvaged */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:absolute lg:left-0 lg:top-[18%] w-full lg:w-[200px] h-auto lg:h-1/2 glass-premium rounded-3xl p-6 border border-white/40 shadow-xl flex flex-col items-center justify-center text-center z-20 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 border border-border group-hover:border-green-500/40 transition-colors shadow-sm">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Time Salvaged</p>
            <p className="text-2xl font-black text-foreground ">20h / Month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:max-w-[800px] glass-premium rounded-[48px] p-8 md:p-14 border border-white/40 shadow-2xl shadow-black/5 relative overflow-hidden z-10"
          >
            {/* Subtle inner glow pulse */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/[0.01] to-transparent h-1/2 animate-pulse pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">

              {/* Content Column */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-[11px] font-black mb-6 border border-green-500/10 uppercase tracking-widest"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    Efficiency Node v2.0
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.1] text-foreground mb-6">
                    Reclaim <span className="text-green-600 font-extrabold">240+ Hours</span> <br />Every single year.
                  </h2>

                  <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl">
                    Intelligent qualification and instant scheduling. Agent X handles the heavy lifting while you scale.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-10 gap-y-4 pt-4">
                  {["24/7 Monitoring", "Proactive AI", "Seamless API"].map((tag, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm md:text-base font-extrabold text-foreground tracking-tight whitespace-nowrap">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] animate-pulse" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visualizer Column */}
              <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
                <div className="relative w-full max-w-[280px] aspect-square">

                  {/* Visualizer Ring */}
                  <div className="absolute inset-0 rounded-full border border-border/50 bg-white/50 backdrop-blur-sm shadow-xl flex items-center justify-center overflow-hidden">
                      
                    {/* Rotating Quarter Circle */}
                    <div className="absolute inset-2 rounded-full border-[2.5px] border-border/10">
                      <motion.div 
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-[2.5px] rounded-full border-[3px] border-t-green-500 border-r-transparent border-b-transparent border-l-transparent drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]"
                      />
                    </div>

                    <div className="text-center relative z-20">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                      >
                        <span className="text-6xl md:text-7xl font-black text-foreground tracking-tighter">85<span className="text-3xl text-green-500">%</span></span>
                      </motion.div>
                      <p className="text-[11px] text-muted-foreground font-black uppercase tracking-[0.3em]">Efficiency Boost</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Side-Box: Efficiency Lift */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:absolute lg:right-0 lg:top-[18%] w-full lg:w-[200px] h-auto lg:h-1/2 glass-premium rounded-3xl p-6 border border-white/40 shadow-xl flex flex-col items-center justify-center text-center z-20 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 border border-border group-hover:border-green-500/40 transition-colors shadow-sm">
              <ArrowUpRight className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Efficiency Lift</p>
            <p className="text-2xl font-black text-foreground">+38% Scale</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ROIVisualizer;
