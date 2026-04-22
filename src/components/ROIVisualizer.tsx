import { motion } from "framer-motion";

const ROIVisualizer = () => {
  const callouts = [
    {
      text: "WORKS 24/7",
      x: "5%", y: "20%",
      line: "M 150 0  180 0  280 120"
    },
    {
      text: "500+ TOOL SUPERPOWERS",
      x: "85%", y: "20%",
      line: "M 0 0 L -80 0 L -200 130"
    },
    {
      text: "SUPER AGENT",
      x: "50%", y: "40%",
      isGlow: true
    },
    {
      text: "DELEGATE ANY TASK",
      x: "-10%", y: "115%",
      line: " M 100 0 L 100 0 L 360 -140 "
    },
    {
      text: "INFINITE MEMORY",
      x: "100%", y: "115%",
      line: "M 0 0 L -100 0 L -240 -120"
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Grainy Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-50/80 via-white to-white pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 min-h-[700px] flex flex-col items-center justify-center">

        {/* Central Component Area */}
        <div className="relative w-full max-w-[900px] aspect-[16/10] flex items-center justify-center">

          {/* Main Asset: Black Robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full h-full flex items-start justify-center"
          >
            <img
              src="./public/11.png"
              alt="Super Agent Robot"
              className="h-[750px] md:h-[850px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            />
          </motion.div>

          {/* Callout Labels & Lines */}
          {callouts.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: item.x.includes('-') ? 30 : -30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.8 + (i * 0.2), duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-20 pointer-events-none"
              style={{ left: item.x, top: item.y }}
            >
              <div className="relative group">
                {/* Visual Label */}
                <div className="flex flex-col">
                  <span className={`tracking-[0.4em] uppercase whitespace-nowrap transition-all duration-700 ${item.isGlow
                    ? 'text-7xl md:text-[12rem] font-black absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-40 select-none -z-10 opacity-10'
                    : 'font-serif italic text-[14px] md:text-[16px] font-medium text-black border-b border-black/20 pb-2 px-4'
                    }`}
                    style={item.isGlow ? { WebkitTextStroke: '1px black', color: 'transparent' } : {}}
                  >
                    {item.text}
                  </span>
                </div>

                {/* Kinked Connection Line */}
                {item.line && (
                  <svg className="absolute top-1/2 left-0 w-[500px] h-[500px] overflow-visible" style={{ pointerEvents: 'none' }}>
                    <motion.path
                      d={item.line}
                      fill="none"
                      stroke="black"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 1.2, ease: "easeInOut" }}
                    />
                  </svg>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >

        </motion.div>

      </div>
    </section>
  );
};

export default ROIVisualizer;
