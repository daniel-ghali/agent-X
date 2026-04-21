import { motion } from "framer-motion";
import { LayoutDashboard, MessageCircle, Users, CreditCard, Settings, Search, TrendingUp, ArrowUpRight } from "lucide-react";

const DashboardSection = () => {
  return (
    <section className="section-padding border-t border-border bg-[#FAFAFB] relative overflow-hidden">
      {/* Subtle background decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[44px] font-extrabold tracking-[-0.03em] leading-tight mb-4"
          >
            Your entire business. One view.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Track leads, conversations, bookings, and revenue — all in one clean dashboard.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-background rounded-3xl border border-border overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group">
            {/* Browser chrome */}
            <div className="bg-secondary/40 px-6 py-4 flex items-center gap-3 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]/20 border border-[#FF5F57]/40" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]/20 border border-[#FEBC2E]/40" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]/20 border border-[#28C840]/40" />
              </div>
              <div className="flex-1 max-w-[240px] mx-auto bg-background/50 rounded-lg px-4 py-1.5 text-[12px] text-muted-foreground/60 text-center border border-border/50 font-medium">
                app.agent-x.ai
              </div>
              <div className="w-20" /> {/* Spacer */}
            </div>

            <div className="flex min-h-[500px]">
              {/* Sidebar */}
              <div className="w-56 border-r border-border p-6 hidden md:block bg-[#FAFAFB]/50">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center shadow-lg shadow-foreground/20">
                    <span className="text-background text-[11px] font-black">AX</span>
                  </div>
                  <span className="font-bold text-[15px] tracking-tight">Agent X</span>
                </div>
                <nav className="space-y-1">
                  {[
                    { icon: LayoutDashboard, label: "Dashboard", active: true },
                    { icon: MessageCircle, label: "Conversations" },
                    { icon: Users, label: "Leads" },
                    { icon: CreditCard, label: "Payments" },
                    { icon: Settings, label: "Settings" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] transition-all cursor-pointer ${
                        item.active ? "bg-white border border-border shadow-sm font-semibold text-foreground ring-1 ring-black/5" : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${item.active ? "text-green-500" : ""}`} />
                      {item.label}
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Main content */}
              <div className="flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-[18px] tracking-tight">Analytics Overview</h3>
                    <p className="text-[12px] text-muted-foreground mt-0.5">Welcome back, Coach 👋</p>
                  </div>
                  <div className="flex items-center gap-2 bg-secondary/80 rounded-xl px-4 py-2 border border-border/50 group-hover:border-foreground/10 transition-colors">
                    <Search className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-[12px] text-muted-foreground font-medium">Quick search...</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Active Clients", value: "48", change: "+12%", trend: "up" },
                    { label: "Hot Leads", value: "12", change: "+4%", trend: "up" },
                    { label: "MRR", value: "$8,400", change: "+18%", trend: "up" },
                  ].map((s, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-all group/stat"
                    >
                      <p className="text-[12px] text-muted-foreground font-medium mb-2">{s.label}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black tracking-tight">{s.value}</span>
                        <span className="text-[11px] text-green-600 font-bold flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded-full">
                          <ArrowUpRight className="w-3 h-3" />{s.change}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent conversations */}
                <div className="bg-[#FAFAFB]/50 rounded-2xl p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[14px] font-bold tracking-tight">Live DM Activity</h4>
                    <span className="text-[11px] text-green-500 font-bold flex items-center gap-1.5 ring-1 ring-green-100 bg-green-50 px-2.5 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      SYSTEM ACTIVE
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Sarah K.", msg: "I want to start next week. Can we do June?", tag: "Hot", color: "bg-red-50 text-red-600 border-red-100 ring-4 ring-red-500/5", time: "2m ago" },
                      { name: "James M.", msg: "What is the pricing for the 1:1 plan?", tag: "Warm", color: "bg-amber-50 text-amber-600 border-amber-100", time: "18m ago" },
                      { name: "Priya T.", msg: "Just looking for now. Will check later.", tag: "Cold", color: "bg-green-50 text-green-600 border-green-100", time: "1h ago" },
                    ].map((c, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border bg-white hover:border-foreground/10 hover:shadow-sm transition-all cursor-default"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-border flex items-center justify-center text-[11px] font-black">{c.name[0]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-[13px] font-bold">{c.name}</p>
                            <span className="text-[10px] text-muted-foreground/60">{c.time}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate italic">"{c.msg}"</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${c.color}`}>{c.tag}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
