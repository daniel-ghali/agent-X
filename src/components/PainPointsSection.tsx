import { motion } from "framer-motion";
import { MessageSquareOff, History, UserX, Layers, AlertCircle } from "lucide-react";

const pains = [
  { icon: MessageSquareOff, title: "Drowning in DMs", desc: "Hundreds of messages, zero time to reply to all of them.", color: "text-red-500" },
  { icon: History, title: "Losing leads to speed", desc: "Slow replies = lost clients. Leads go cold in minutes.", color: "text-orange-500" },
  { icon: UserX, title: "Manual follow-ups", desc: "Chasing leads manually takes hours you don't have.", color: "text-amber-500" },
  { icon: Layers, title: "No system, no scale", desc: "Without a CRM, your business runs on memory — and that breaks.", color: "text-yellow-500" },
];

const PainPointsSection = () => {
  return (
    <section className="section-padding border-t border-border bg-background/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold mb-6 border border-red-100"
          >
            <AlertCircle className="w-3 h-3" />
            THE PROBLEM
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[44px] font-extrabold tracking-[-0.03em] leading-tight mb-4"
          >
            Sound familiar?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            You're losing leads every day — not because you're bad at coaching, but because you can't keep up.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1100px] mx-auto">
          {pains.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-premium rounded-2xl p-6 hover:translate-y-[-4px] transition-all duration-300 border border-border/50 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <p.icon className={`w-6 h-6 ${p.color}`} />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-[16px] tracking-tight">{p.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
