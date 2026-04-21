import { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MessageCircle, Database, Workflow, BarChart3, Zap, Brain, MailCheck, CalendarCheck, Search, Users, CreditCard, Settings, LayoutDashboard, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "ai-replies",
    label: "AI Replies",
    title: "Instant AI replies that convert.",
    desc: "Agent X reads every incoming message and responds with personalized, context-aware replies — in seconds, 24/7.",
  },
  {
    id: "lead-scoring",
    label: "Lead Scoring",
    title: "Know who's ready to buy.",
    desc: "AI automatically qualifies each lead, assigns a score, and prioritizes the hottest prospects for you.",
  },
  {
    id: "crm",
    label: "Client CRM",
    title: "Every client, every conversation. One place.",
    desc: "All your leads, conversations, bookings, and payments — automatically organized in a clean dashboard.",
  },
  {
    id: "automation",
    label: "Automation",
    title: "Follow-ups that run themselves.",
    desc: "Customizable sequences that nurture cold leads into booked calls — automatically, while you sleep.",
  },
];

import { Button } from "./ui/button";

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useScrollReveal();

  useEffect(() => {
    const tab = tabRefs.current[activeTab];
    if (tab) {
      setIndicatorStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <section id="features" className="section-padding border-t border-border" ref={containerRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-[-0.03em] leading-tight mb-4">
            Everything you need to grow.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A complete platform to manage leads, automate replies, and scale your coaching business.
          </p>
        </div>

        {/* Tabs - Attio style */}
        <div className="reveal reveal-delay-1">
          <div className="relative border-b border-border mb-0">
            <div className="flex">
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                    activeTab === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Animated underline indicator */}
            <div
              className="absolute bottom-0 h-[2px] bg-foreground tab-indicator"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            />
          </div>

          {/* Tab content */}
          <div className="mt-0 min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="border border-border border-t-0 rounded-b-2xl overflow-hidden glass-premium shadow-2xl shadow-foreground/5"
              >
                <div className="p-8 md:p-12 relative overflow-hidden">
                  {/* Decorative glow */}
                  <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-green-500/5 blur-[100px] pointer-events-none" />
                  
                  <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-6 shadow-sm">
                        {activeTab === 0 && <MessageCircle className="w-6 h-6 text-green-500" />}
                        {activeTab === 1 && <TrendingUp className="w-6 h-6 text-green-500" />}
                        {activeTab === 2 && <Users className="w-6 h-6 text-purple-500" />}
                        {activeTab === 3 && <Zap className="w-6 h-6 text-orange-500" />}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{tabs[activeTab].title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-8">{tabs[activeTab].desc}</p>
                      <Button variant="outline" className="rounded-xl border-border hover:bg-secondary group">
                        See how it works
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    <div className="perspective-1000">
                      <motion.div
                        initial={{ rotateY: 5, rotateX: 5 }}
                        whileHover={{ rotateY: 0, rotateX: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        {/* Mockup card for each tab */}
                        {activeTab === 0 && <AIRepliesMockup />}
                        {activeTab === 1 && <LeadScoringMockup />}
                        {activeTab === 2 && <CRMMockup />}
                        {activeTab === 3 && <AutomationMockup />}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

const AIRepliesMockup = () => (
  <div className="bg-background/80 backdrop-blur-md rounded-2xl border border-border p-6 shadow-2xl relative overflow-hidden group">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold ring-2 ring-background">JD</div>
      <div>
        <p className="text-sm font-bold text-foreground">John Doe (New Lead)</p>
        <p className="text-[10px] text-green-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Active on Instagram
        </p>
      </div>
    </div>
    
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, x: -10 }} 
        animate={{ opacity: 1, x: 0 }} 
        className="bg-secondary/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]"
      >
        <p className="text-[13px] text-foreground">Hey! Just saw your post. Do you still have spots for the 12-week program?</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 10 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: 0.5 }}
        className="bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] ml-auto shadow-lg shadow-foreground/10 relative"
      >
        <p className="text-[13px] font-medium">
          <TypingText text="Hey John! Yes, we have 3 spots left for June. To see if you're a fit, what’s your #1 fitness goal right now?" delay={800} />
        </p>
        <div className="absolute -bottom-6 right-0">
          <span className="text-[10px] text-muted-foreground bg-background border border-border rounded-full px-2 py-0.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-green-500" /> AI Agent
          </span>
        </div>
      </motion.div>
    </div>
  </div>
);

const LeadScoringMockup = () => (
  <div className="bg-background rounded-xl border border-border p-5 shadow-sm space-y-3">
    {[
      { name: "Sarah K.", score: 92, tag: "Hot" },
      { name: "James M.", score: 67, tag: "Warm" },
      { name: "Priya T.", score: 34, tag: "Cold" },
    ].map((lead, i) => (
      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold">{lead.name[0]}</div>
        <div className="flex-1">
          <p className="text-sm font-medium">{lead.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1.5 bg-secondary rounded-full">
              <div className="h-full bg-foreground rounded-full" style={{ width: `${lead.score}%` }} />
            </div>
            <span className="text-[11px] text-muted-foreground">{lead.score}/100</span>
          </div>
        </div>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
          lead.tag === "Hot" ? "bg-red-50 text-red-600" : lead.tag === "Warm" ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"
        }`}>{lead.tag}</span>
      </div>
    ))}
  </div>
);

const CRMMockup = () => (
  <div className="bg-background rounded-xl border border-border overflow-hidden shadow-sm">
    <div className="px-5 py-3 border-b border-border flex items-center justify-between">
      <span className="text-sm font-medium">Leads & Clients</span>
      <span className="text-xs text-muted-foreground">48 total</span>
    </div>
    <div className="divide-y divide-border">
      {[
        { name: "Alex Rivera", status: "Active Client", revenue: "$1,200/mo" },
        { name: "Mia Chen", status: "Discovery Call", revenue: "—" },
        { name: "Jordan P.", status: "New Lead", revenue: "—" },
      ].map((c, i) => (
        <div key={i} className="px-5 py-3 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[11px] font-semibold">{c.name[0]}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{c.name}</p>
            <p className="text-[11px] text-muted-foreground">{c.status}</p>
          </div>
          <span className="text-xs text-muted-foreground">{c.revenue}</span>
        </div>
      ))}
    </div>
  </div>
);

const AutomationMockup = () => (
  <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
    <div className="space-y-3">
      {[
        { step: "DM received", delay: "", active: true },
        { step: "AI responds & qualifies", delay: "Instant", active: true },
        { step: "Follow-up #1 sent", delay: "After 2h", active: true },
        { step: "Discovery call booked", delay: "After 24h", active: false },
      ].map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.active ? "bg-foreground" : "bg-border"}`} />
          <div className="flex-1 flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-[13px] font-medium">{s.step}</span>
            {s.delay && <span className="text-[11px] text-muted-foreground">{s.delay}</span>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturesSection;
