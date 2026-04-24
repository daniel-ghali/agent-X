import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import ThemeLangToggle from "@/components/ThemeLangToggle";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useApp();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      toast.error("Please accept the Terms to continue");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);

    const fullName = `${firstName} ${lastName}`.trim();
    const fallbackBiz = businessName.trim() || `${firstName}'s Coaching`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });

    if (error) {
      toast.error("Sign up failed: " + error.message);
      setLoading(false);
      return;
    }

    if (data.user && data.session) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        coach_name: fullName,
        business_name: fallbackBiz,
      });
      if (profileError) {
        toast.error("Profile error: " + profileError.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      toast.success("Account created 🎉");
      navigate("/dashboard");
    } else if (data.user && !data.session) {
      setLoading(false);
      toast.success("Check your email to confirm your account 📧");
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          await supabase.from("profiles").insert({
            id: session.user.id,
            coach_name: fullName,
            business_name: fallbackBiz,
          });
          subscription.unsubscribe();
          navigate("/dashboard");
        }
      });
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
          <div className="flex items-center justify-between mb-8 lg:mb-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-sm">AX</span>
              </div>
              <span className="font-semibold tracking-tight">Agent X</span>
            </Link>
            <ThemeLangToggle />
          </div>

          <div className="max-w-sm w-full mx-auto lg:mx-0">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("auth.create")}</h1>
            <p className="text-muted-foreground text-sm mt-2">
              {t("auth.createSub")}
            </p>

            <form onSubmit={handleRegister} className="space-y-3.5 mt-7">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t("auth.firstName")}</label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ahmed"
                    required
                    className="h-11 bg-secondary border-transparent focus-visible:bg-card focus-visible:border-primary/40 focus-visible:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t("auth.lastName")}</label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Hassan"
                    required
                    className="h-11 bg-secondary border-transparent focus-visible:bg-card focus-visible:border-primary/40 focus-visible:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("auth.phone")}</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  className="h-11 bg-secondary border-transparent focus-visible:bg-card focus-visible:border-primary/40 focus-visible:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("auth.businessName")}</label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="AhmedFit Academy"
                  className="h-11 bg-secondary border-transparent focus-visible:bg-card focus-visible:border-primary/40 focus-visible:ring-primary/20"
                />
              </div>
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
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  className="h-11 bg-secondary border-transparent focus-visible:bg-card focus-visible:border-primary/40 focus-visible:ring-primary/20"
                />
              </div>

              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <Checkbox checked={agree} onCheckedChange={(v) => setAgree(!!v)} className="mt-0.5" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {t("auth.terms")}
                </span>
              </label>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-primary hover:opacity-95 shadow-soft text-base font-medium mt-2"
                disabled={loading}
              >
                {loading ? t("auth.creating") : t("auth.createBtn")}
                {!loading && <ArrowRight className="w-4 h-4 ms-1 rtl:rotate-180" />}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t("auth.haveAccount")}{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                {t("auth.login")}
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
                    Do you offer installments?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-secondary text-sm rounded-2xl rounded-bl-sm px-3.5 py-2 max-w-[85%]">
                    Absolutely — split it over 3 months. Want me to send you the link?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gradient-primary text-white text-sm rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[80%]">
                    Yes! 🔥
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
