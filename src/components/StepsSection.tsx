import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  { step: "01", title: "Connect your accounts", desc: "Link Instagram and WhatsApp in one click. Takes 30 seconds." },
  { step: "02", title: "AI reads every message", desc: "Nothing slips through the cracks. Every DM is analyzed instantly." },
  { step: "03", title: "AI responds & qualifies", desc: "Smart, personalized replies that move leads toward booking." },
  { step: "04", title: "Clients booked automatically", desc: "Discovery calls scheduled, reminders sent, payments collected." },
];

const StepsSection = () => {
  return (
    <section id="how-it-works" className="section-padding border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[44px] font-extrabold tracking-[-0.03em] leading-tight mb-4"
          >
            From first DM to paying client.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Four steps. Fully automated. Zero manual work.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-6 items-start relative group"
            >
              {/* Vertical line with progress */}
              {i < steps.length - 1 && (
                <div className="absolute left-[19px] top-12 w-px h-[calc(100%-12px)] bg-border group-hover:bg-foreground/20 transition-colors" />
              )}

              {/* Step number */}
              <div className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center flex-shrink-0 bg-background relative z-10 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                <span className="text-xs font-bold">{s.step}</span>
              </div>

              <div className="pb-12">
                <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-green-600 transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
