import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BrainIllustration, ChartIllustration, MessageIllustration } from "./Illustrations";

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
        setOffsetY(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 800], [0, -300]);
  const y4 = useTransform(scrollY, [0, 800], [0, 150]);
  
  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Neon Grid Layer */}
        <div className="absolute inset-0 neon-grid opacity-[0.03]" />
        
        {/* Neon Green Glows */}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-neon-green-glow opacity-30 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-neon-green-glow opacity-20 blur-[100px]" />

        {/* Existing Ambient Orbs */}
        <motion.div 
          style={{ y: y1 }}
          className="ambient-orb w-[400px] h-[400px] bg-green-400/20 top-[-10%] left-[-5%] animate-float"
        />
        <motion.div 
          style={{ y: y2, animationDelay: '-4s' } as any}
          className="ambient-orb w-[500px] h-[500px] bg-purple-400/10 bottom-[-10%] right-[-5%] animate-float"
        />
        
        {/* Neon Lines Layer */}
        <div className="absolute inset-0 border-t border-green-500/5 mt-[20vh] neon-line animate-neon-flow" />
        <div className="absolute inset-0 border-t border-green-500/5 mt-[60vh] neon-line animate-neon-flow" style={{ animationDelay: '-3s', width: '80%' }} />

        {/* Floating Illustrations (Stickers) */}
        <motion.div 
          style={{ y: y3 }}
          className="absolute left-[8%] top-[25%] hidden lg:block"
        >
          <BrainIllustration />
        </motion.div>

        <motion.div 
          style={{ y: y4 }}
          className="absolute right-[10%] top-[20%] hidden lg:block"
        >
          <ChartIllustration />
        </motion.div>

        <motion.div 
          style={{ y: y2 }}
          className="absolute right-[5%] bottom-[15%] hidden lg:block"
        >
          <MessageIllustration />
        </motion.div>

        <div className="absolute inset-0 dot-pattern opacity-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[900px] mx-auto px-6 text-center pt-24"
      >
        {/* Announcement pill */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-sm mb-8 hover:border-green-500/40 transition-colors cursor-pointer group"
        >
          <Sparkles className="w-3.5 h-3.5 text-green-500" />
          <span className="text-[13px] text-green-700 font-medium">500+ coaches scaling with AI automation</span>
          <ArrowRight className="w-3.5 h-3.5 text-green-500 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[clamp(36px,6vw,72px)] font-extrabold tracking-[-0.03em] leading-[1.05] text-foreground mb-6"
        >
          Turn your DMs into
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-green-600 to-foreground/60">paying clients.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-[560px] mx-auto mb-10 leading-relaxed"
        >
          Agent X is the <span className="text-foreground font-medium">AI assistant</span> that replies to your Instagram and WhatsApp messages, qualifies leads, and books clients automatically.
        </motion.p>

        {/* CTA buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-xl px-8 h-12 text-[15px] font-medium shadow-xl shadow-foreground/10 group"
          >
            Start for free
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-xl px-8 h-12 text-[15px] font-medium border-border text-foreground hover:bg-secondary backdrop-blur-sm"
          >
            Talk to sales
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
