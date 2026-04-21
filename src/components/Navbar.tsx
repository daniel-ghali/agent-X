import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
      style={{ height: "var(--site-header-height)" }}
    >
      <div className="max-w-[1392px] mx-auto flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-xs">AX</span>
            </div>
            <span className="font-semibold text-[15px] text-foreground tracking-tight">Agent X</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <a href="#features" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary">
              Platform
            </a>
            <a href="#how-it-works" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary">
              How It Works
            </a>
            <a href="#testimonials" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary">
              Customers
            </a>
            <a href="#pricing" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary">
              Pricing
            </a>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground">
            Sign in
          </Button>
          <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-4 text-sm font-medium">
            Start for free
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background border-b border-border overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-1">
          <a href="#features" className="block py-2.5 text-sm text-muted-foreground hover:text-foreground">Platform</a>
          <a href="#how-it-works" className="block py-2.5 text-sm text-muted-foreground hover:text-foreground">How It Works</a>
          <a href="#testimonials" className="block py-2.5 text-sm text-muted-foreground hover:text-foreground">Customers</a>
          <a href="#pricing" className="block py-2.5 text-sm text-muted-foreground hover:text-foreground">Pricing</a>
          <div className="pt-3 flex flex-col gap-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">Sign in</Button>
            <Button size="sm" className="w-full bg-foreground text-background">Start for free</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
