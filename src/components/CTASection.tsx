import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding border-t border-border relative overflow-hidden bg-background">
      {/* Premium glow effect background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-green-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-premium rounded-[40px] p-12 md:p-24 text-center max-w-4xl mx-auto border border-green-100/50 shadow-2xl shadow-green-500/5 relative overflow-hidden"
        >
          {/* Decorative sparkes */}
          <div className="absolute top-10 right-10 opacity-20">
            <Sparkles className="w-8 h-8 text-green-500" />
          </div>
          <div className="absolute bottom-10 left-10 opacity-20 rotate-12">
            <Sparkles className="w-6 h-6 text-green-400" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[11px] font-bold mb-8 uppercase tracking-widest"
          >
            Get Started Today
          </motion.div>

          <h2 className="text-4xl md:text-[64px] font-black tracking-tight leading-[1.05] mb-8">
            Start converting DMs
            <br />
            <span className="text-green-600">into revenue.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Join 500+ coaches who are growing their business on autopilot. Free 14-day trial, no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-2xl px-10 h-14 text-[16px] font-bold shadow-xl shadow-foreground/10 group"
            >
              Start for free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl px-10 h-14 text-[16px] font-bold border-border text-foreground hover:bg-secondary backdrop-blur-sm"
            >
              Talk to sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
