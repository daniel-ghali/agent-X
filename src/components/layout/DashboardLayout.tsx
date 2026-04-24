import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Package,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
  Languages,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, theme, toggleTheme, lang, toggleLang, dir } = useApp();

  const navItems = [
    { path: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { path: "/dashboard/conversations", label: t("nav.conversations"), icon: MessageSquare },
    { path: "/dashboard/leads", label: t("nav.leads"), icon: Users },
    { path: "/dashboard/plans", label: t("nav.plans"), icon: Package },
    { path: "/dashboard/settings", label: t("nav.settings"), icon: Settings },
  ];

  const pageTitles: Record<string, string> = {
    "/dashboard": t("nav.dashboard"),
    "/dashboard/conversations": t("nav.conversations"),
    "/dashboard/leads": t("nav.leads"),
    "/dashboard/plans": t("nav.plans"),
    "/dashboard/settings": t("nav.settings"),
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success(t("nav.signout"));
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-6 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <span className="text-white font-bold text-sm">AX</span>
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight">Agent X</h1>
          <p className="text-[11px] text-muted-foreground -mt-0.5">{t("nav.tagline")}</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-destructive w-full transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" />
          {t("nav.signout")}
        </button>
      </div>
    </div>
  );

  const title = pageTitles[location.pathname] || t("nav.dashboard");

  return (
    <div className="flex h-screen bg-background" dir={dir}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 border-border flex-col bg-sidebar shrink-0 ltr:border-r rtl:border-l">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: dir === "rtl" ? 280 : -280 }}
              animate={{ x: 0 }}
              exit={{ x: dir === "rtl" ? 280 : -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className={`fixed top-0 bottom-0 w-64 bg-sidebar border-border z-50 lg:hidden ${
                dir === "rtl" ? "right-0 border-l" : "left-0 border-r"
              }`}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-3 sm:px-4 lg:px-8 h-16 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ms-2 rounded-lg hover:bg-secondary"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-base sm:text-lg font-semibold tracking-tight truncate">{title}</h1>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg w-48 lg:w-64">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  placeholder={t("nav.search")}
                  className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={toggleLang}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                aria-label="Toggle language"
                title={lang === "en" ? "العربية" : "English"}
              >
                <Languages className="w-[18px] h-[18px]" />
                <span className="text-xs font-semibold hidden sm:inline">
                  {lang === "en" ? "ع" : "EN"}
                </span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-[18px] h-[18px]" />
                ) : (
                  <Moon className="w-[18px] h-[18px]" />
                )}
              </button>
              <button
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hidden sm:inline-flex"
                aria-label="Notifications"
              >
                <Bell className="w-[18px] h-[18px]" />
              </button>
              {location.pathname === "/dashboard/plans" ? null : (
                <Button
                  size="sm"
                  className="hidden md:inline-flex bg-gradient-primary hover:opacity-90 shadow-soft"
                  onClick={() => navigate("/dashboard/plans")}
                >
                  {t("nav.newPlan")}
                </Button>
              )}
            </div>
          </div>
        </header>

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="p-3 sm:p-4 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
