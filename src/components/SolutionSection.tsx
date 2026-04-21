import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageSquare, Target, Calendar, Database, Smartphone } from "lucide-react";
import { Button } from "./ui/button";

const solutions = [
  { icon: MessageSquare, title: "AI Replies Instantly", desc: "Every DM gets a smart, personalized response in seconds.", color: "text-green-500" },
  { icon: Target, title: "Qualifies Leads Automatically", desc: "AI asks the right questions and scores each prospect.", color: "text-purple-500" },
  { icon: Calendar, title: "Books Calls For You", desc: "Syncs with your calendar and sends reminders.", color: "text-green-500" },
  { icon: Database, title: "Built-in Client CRM", desc: "Every conversation logged and organized automatically.", color: "text-orange-500" },
  { icon: Smartphone, title: "Works on Instagram & WhatsApp", desc: "Seamless across both platforms, one dashboard.", color: "text-green-400" },
];

const SolutionSection = () => {
  return (
    <section className="section-padding border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold mb-6 border border-green-100">
                <CheckCircle2 className="w-3 h-3" />
                THE SOLUTION
              </div>
              <h2 className="text-3xl md:text-[44px] font-extrabold tracking-[-0.03em] leading-tight mb-6">
                Agent X does it all — <span className="text-green-600">while you sleep.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Stop losing leads to slow replies. Agent X AI handles every conversation, qualifies every lead, and books calls — automatically.
              </p>
              <Button variant="outline" className="rounded-xl border-border hover:bg-secondary group">
                See it in action
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          <div className="space-y-4">
            {solutions.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 items-start p-5 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/5 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-foreground mb-1 tracking-tight">{s.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
