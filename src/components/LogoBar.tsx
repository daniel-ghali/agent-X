import { motion } from "framer-motion";

const logos = [
  "Instagram", "WhatsApp", "Calendly", "Stripe", "Zoom", "Google Calendar",
  "Instagram", "WhatsApp", "Calendly", "Stripe", "Zoom", "Google Calendar",
];

const LogoBar = () => {
  return (
    <section className="py-16 border-t border-border overflow-hidden bg-background/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-[12px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Integrates with your stack</p>
        </div>
        <div className="relative">
          {/* Fade mask for the edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {logos.map((name, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0 opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default grayscale hover:grayscale-0">
                <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center border border-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/50" />
                </div>
                <span className="text-[15px] font-bold tracking-tight text-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
