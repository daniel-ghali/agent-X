import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import ThemeLangToggle from "@/components/ThemeLangToggle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useApp();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("Sign in failed: " + error.message);
    } else {
      toast.success("Welcome back 👋");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-card rounded-3xl shadow-soft border border-border overflow-hidden grid lg:grid-cols-2"
      >
        {/* LEFT — Form */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-10 lg:mb-12">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-sm">AX</span>
              </div>
              <span className="font-semibold tracking-tight">Agent X</span>
            </Link>
            <ThemeLangToggle />
          </div>

          <div className="max-w-sm w-full mx-auto lg:mx-0">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("auth.welcomeBack")}</h1>
            <p className="text-muted-foreground text-sm mt-2">
              {t("auth.welcomeSub")}
            </p>

            <form onSubmit={handleLogin} className="space-y-4 mt-8">
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("auth.email")}</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-11 bg-secondary border-transparent focus-visible:bg-card focus-visible:border-primary/40 focus-visible:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("auth.password")}</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-11 bg-secondary border-transparent focus-visible:bg-card focus-visible:border-primary/40 focus-visible:ring-primary/20"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-primary hover:opacity-95 shadow-soft text-base font-medium"
                disabled={loading}
              >
                {loading ? t("auth.signingIn") : t("auth.signin")}
                {!loading && <ArrowRight className="w-4 h-4 ms-1 rtl:rotate-180" />}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t("auth.noAccount")}{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                {t("auth.signup")}
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT — Visual preview */}
        <div className="hidden lg:flex relative bg-gradient-soft p-12 items-center justify-center overflow-hidden ltr:border-l rtl:border-r border-border">
          <div className="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-32 -start-16 w-80 h-80 rounded-full bg-primary-glow/10 blur-3xl" />

          <div className="relative max-w-md w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                {t("auth.heroTitle")}
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                {t("auth.heroSub")}
              </p>
            </div>

            <ChatPreview />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ChatPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl border border-border shadow-soft p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold">Agent X</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-converted animate-pulse" />
              <span className="text-[10px] text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <MessageSquare className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-gradient-primary text-white text-sm rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[80%]">
            Do you have a weight loss plan?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-secondary text-sm rounded-2xl rounded-bl-sm px-3.5 py-2 max-w-[85%]">
            Yes! I recommend the 12-week transformation plan. Want me to explain pricing?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-gradient-primary text-white text-sm rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[80%]">
            Yes please 🙌
          </div>
        </div>
      </div>
    </motion.div>
  );
}
