import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I went from missing half my DMs to booking 3 new clients in my first week. This is insane.",
    name: "Alex Rivera",
    role: "Online Fitness Coach",
    initials: "AR",
  },
  {
    quote: "Agent X replied to a lead at 2 AM while I was sleeping. They booked a call and became my highest-paying client.",
    name: "Mia Chen",
    role: "Nutrition Coach",
    initials: "MC",
  },
  {
    quote: "I was manually following up with 40+ leads. Now Agent X does it all. I got my weekends back.",
    name: "Jordan Patel",
    role: "Online Tutor",
    initials: "JP",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding border-t border-border bg-background relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-(-10%) left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[11px] font-bold mb-6 tracking-wider uppercase"
          >
            <Star className="w-3 h-3 fill-green-500" />
            Social Proof
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[44px] font-extrabold tracking-[-0.03em] leading-tight mb-4"
          >
            Loved by coaches.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass-premium rounded-3xl p-8 hover:translate-y-[-8px] transition-all duration-500 border border-border/40 flex flex-col relative group"
            >
              <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-green-500 text-green-500" />
                ))}
              </div>
              
              <p className="text-foreground text-[16px] leading-relaxed mb-8 flex-1 italic">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-secondary to-border flex items-center justify-center border border-white/20 shadow-inner">
                  <span className="text-[13px] font-black text-foreground">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground tracking-tight">{t.name}</p>
                  <p className="text-[12px] text-muted-foreground font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
