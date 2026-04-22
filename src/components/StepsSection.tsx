import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, User, Bot, CheckCircle2, MessageSquare, Signal, Wifi, Battery } from "lucide-react";
import { useState, useEffect } from "react";

const StepsSection = () => {
  const [messages, setMessages] = useState([
    { role: "user", text: "Hey! Can you explain how the automation works?" },
    { role: "agent", text: "Absolutely. I scan your incoming DMs, qualify the leads, and book them directly into your calendar." },
    { role: "user", text: "That sounds amazing. What about my existing CRM?" },
    { role: "agent", text: "I sync everything instantly. No manual data entry required." },
  ]);

  const stats = [
    {
      value: "2.3x",
      label: "Return on investment",
      sub: "See more than double your ROI, with payback in under six months."
    },
    {
      value: "30hrs",
      label: "Weekly time saved per user",
      sub: "Reclaim almost a full workweek with AI analysis and centralized feedback."
    },
    {
      value: "66%",
      label: "Faster shipping",
      sub: "Move from discovery to delivery faster, without sacrificing quality."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-zinc-950 relative overflow-hidden font-sans">
      {/* Background Grid & Structural Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`, backgroundSize: '48px 48px' }} />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Left Side: 100% Match iPhone 17 Pro Max Silver */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start lg:pl-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -10 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-[340px] h-[690px]"
            >
              {/* Outer Frame (Silver/Titanium) */}
              <div className="absolute inset-0 bg-[#F5F5F7] rounded-[60px] border-[1px] border-zinc-300 shadow-[20px_20px_60px_rgba(0,0,0,0.1)] flex items-center justify-center">
                {/* Side Buttons (Action, Volume, Side) */}
                <div className="absolute top-[120px] -left-[2px] w-[3px] h-[30px] bg-zinc-300 rounded-r-sm" /> {/* Action button */}
                <div className="absolute top-[170px] -left-[2px] w-[3px] h-[60px] bg-zinc-300 rounded-r-sm" /> {/* Volume Up */}
                <div className="absolute top-[240px] -left-[2px] w-[3px] h-[60px] bg-zinc-300 rounded-r-sm" /> {/* Volume Down */}
                <div className="absolute top-[200px] -right-[2px] w-[3px] h-[90px] bg-zinc-300 rounded-l-sm" /> {/* Side Button */}
              </div>

              {/* Inner Screen Area */}
              <div className="absolute inset-[8px] bg-black rounded-[52px] overflow-hidden p-[6px]">
                <div className="w-full h-full bg-[#f9f9fb] rounded-[46px] overflow-hidden flex flex-col relative">

                  {/* Status Bar */}
                  <div className="pt-5 px-9 flex justify-between items-center text-black font-black">
                    <span className="text-[14px]">9:41</span>
                    <div className="flex items-center gap-1.5">
                      <Signal className="w-3.5 h-3.5" />
                      <Wifi className="w-3.5 h-3.5" />
                      <Battery className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse mr-2" />
                    <div className="w-10 h-1 bg-white/10 rounded-full" />
                  </div>

                  {/* App Navigation Tabs (Matching Image) */}
                  <div className="px-8 pt-8 flex justify-between items-center text-zinc-400 font-bold text-[11px] border-b border-zinc-100 pb-3">
                    <span className="text-black border-b-2 border-black pb-1">Home</span>
                    <span>Portfolio</span>
                    <span>Rewards</span>
                    <span className="flex items-center gap-1">Profile <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" /></span>
                    <span>Apps</span>
                  </div>

                  {/* Chat Interface (Light Theme) */}
                  <div className="flex-1 px-6 pt-6 flex flex-col gap-4 overflow-hidden">
                    <AnimatePresence initial={true}>
                      {messages.map((msg, i) => (
                        <motion.div
                          key={i}
                          layout
                          initial={{ opacity: 0, scale: 0.5, y: 30 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            delay: i * 0.15
                          }}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] leading-relaxed font-semibold shadow-sm border-l-2 ${msg.role === 'user'
                            ? 'bg-white text-zinc-600 rounded-tr-sm border-blue-500'
                            : 'bg-black text-white rounded-tl-sm border-transparent'
                            }`}>
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Verification Badge */}
                    <motion.div
                      key="badge"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="mt-4 mx-auto w-fit bg-green-50 px-4 py-2 rounded-2xl border border-green-100 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Lead Qualified</span>
                    </motion.div>
                  </div>

                  {/* Chat Input Bar */}
                  <div className="p-6 bg-white border-t border-zinc-100">
                    <div className="w-full h-12 rounded-full bg-zinc-50 border border-zinc-200 flex items-center px-4 justify-between">
                      <span className="text-zinc-300 text-[13px] font-medium">Talk to Agent X...</span>
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: ROI Narrative */}
          <div className="lg:col-span-6 space-y-16">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-400">Precision Automation</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight"
              >
                Turn Customer Feedback <br />
                <span className="text-zinc-500 italic font-medium">Into Automated Results.</span>
              </motion.h2>
            </div>

            <div className="space-y-12">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-6">
                    <div className="pt-1">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-colors">
                        <ArrowUp className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">{s.value}</span>
                        <span className="text-xs md:text-sm font-black text-zinc-400 uppercase tracking-wider">{s.label}</span>
                      </div>
                      <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-md font-medium">
                        {s.sub}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>


          </div>

        </div>
      </div>
    </section>
  );
};

export default StepsSection;
;
