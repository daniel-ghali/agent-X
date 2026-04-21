const footerLinks = {
  Platform: ["AI Replies", "Lead Scoring", "Client CRM", "Automation", "Changelog"],
  Company: ["Customers", "About", "Careers", "Blog"],
  Resources: ["Help Center", "Documentation", "Status"],
  Legal: ["Privacy", "Terms", "Security"],
};

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0B] text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
          {/* Logo & Pitch */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/10">
                <span className="text-[#0A0A0B] font-black text-xs">AX</span>
              </div>
              <span className="font-bold text-[18px] tracking-tight">Agent X</span>
            </div>
            <p className="text-[15px] text-white/50 leading-relaxed max-w-xs mb-8">
              The world's most advanced AI agent for modern coaches. Turn your DMs into revenue on autopilot.
            </p>
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer" />
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer" />
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h4 className="text-[12px] font-bold text-white uppercase tracking-[0.15em] mb-6">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[14px] text-white/50 hover:text-white transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[13px] text-white/40 font-medium">All systems operational</p>
          </div>
          <p className="text-[13px] text-white/30">© 2026 Agent X AI. Built for the future of coaching.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
