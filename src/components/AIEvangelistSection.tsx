import { motion } from "framer-motion";
import { User, Zap, Infinity, Clock, DollarSign, TrendingUp } from "lucide-react";

const AIEvangelistSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[40px] font-extrabold tracking-tight mb-4"
          >
            Why settle for manual when you can automate?
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Traditional virtual assistants are slow and expensive. Agent X's AI is instant, accurate, and works while you sleep.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Manual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl border border-border bg-secondary/30 relative opacity-80"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">Manual / Virtual Assistant</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Responses take minutes or hours. Leads go cold.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <DollarSign className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Costs $500–$1,500/mo. Requires management.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Limited to human hours. Doesn't scale with growth.</span>
              </li>
            </ul>
          </motion.div>

          {/* AI Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl border border-green-200 glass-premium-green relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="px-3 py-1 rounded-full bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(74,222,128,0.5)]">The Future</div>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">Agent X AI Agent</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="font-medium text-foreground">Instant 2-second replies. Keep the momentum high.</span>
              </li>
              <li className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="font-medium text-foreground">90% cheaper than a VA. Pays for itself in days.</span>
              </li>
              <li className="flex items-start gap-3">
                <Infinity className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="font-medium text-foreground">Handles 1,000+ DMs simultaneously. Zero maintenance.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIEvangelistSection;
