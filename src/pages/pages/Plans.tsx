import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Package, Edit2, Trash2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/contexts/AppContext";

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string | null;
  features: string[];
  payment_options: string[];
  is_active: boolean;
}

export default function Plans() {
  const { user } = useAuth();
  const { t } = useApp();
  const paymentOptions = [
    { id: "cash", label: t("plans.cash") },
    { id: "installment", label: t("plans.installment") },
    { id: "transfer", label: t("plans.transfer") },
  ];
  const paymentLabel: Record<string, string> = {
    cash: t("plans.cash"),
    installment: t("plans.installment"),
    transfer: t("plans.transfer"),
  };
  const [plans, setPlans] = useState<Plan[]>([]);
  const [open, setOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [selectedPayments, setSelectedPayments] = useState<string[]>(["cash"]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPlans = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("plans")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    if (data) {
      setPlans(
        data.map((p: any) => ({
          ...p,
          features: Array.isArray(p.features) ? p.features : [],
          payment_options: Array.isArray(p.payment_options) ? p.payment_options : [],
        })),
      );
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setFeatures([]);
    setFeatureInput("");
    setSelectedPayments(["cash"]);
    setEditingPlan(null);
  };

  const handleAddFeature = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && featureInput.trim()) {
      e.preventDefault();
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleSave = async () => {
    if (!name || !price || !user) {
      toast.error("Name and price are required");
      return;
    }
    setSaving(true);
    const planData = {
      name,
      price: Number(price),
      description: description || null,
      features: JSON.stringify(features),
      payment_options: JSON.stringify(selectedPayments),
      user_id: user.id,
    };
    if (editingPlan) {
      const { error } = await supabase.from("plans").update(planData).eq("id", editingPlan.id);
      if (error) toast.error("Failed to update plan");
      else toast.success("Plan updated ✅");
    } else {
      const { error } = await supabase.from("plans").insert(planData);
      if (error) toast.error("Failed to add plan");
      else toast.success("Plan added ✅");
    }
    setSaving(false);
    resetForm();
    setOpen(false);
    fetchPlans();
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setName(plan.name);
    setPrice(String(plan.price));
    setDescription(plan.description || "");
    setFeatures(plan.features);
    setSelectedPayments(plan.payment_options);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("plans").update({ is_active: false }).eq("id", id);
    if (error) toast.error("Failed to delete");
    else {
      toast.success("Plan deleted");
      fetchPlans();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{t("plans.title")}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("plans.sub")}
          </p>
        </div>
        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-95 shadow-soft">
              <Plus className="w-4 h-4 me-1.5" />
              {t("plans.new")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-lg">
                {editingPlan ? t("plans.edit") : t("plans.new")}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("plans.name")}</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 12-week transformation"
                  className="h-11"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("plans.price")}</label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="1500"
                  className="h-11"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("plans.desc")}</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="…"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  {t("plans.features")}
                </label>
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={handleAddFeature}
                  placeholder="e.g. Daily check-ins"
                  className="h-11"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {features.map((f, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 font-medium"
                    >
                      {f}
                      <button
                        onClick={() => setFeatures(features.filter((_, j) => j !== i))}
                        className="hover:text-destructive"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t("plans.payment")}</label>
                <div className="flex flex-wrap gap-4">
                  {paymentOptions.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedPayments.includes(opt.id)}
                        onCheckedChange={(checked) => {
                          setSelectedPayments(
                            checked
                              ? [...selectedPayments, opt.id]
                              : selectedPayments.filter((p) => p !== opt.id),
                          );
                        }}
                      />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Button
                onClick={handleSave}
                className="w-full h-11 bg-gradient-primary"
                disabled={saving}
              >
                {saving ? t("plans.saving") : editingPlan ? t("plans.save") : t("plans.add")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card rounded-2xl border border-border p-6 animate-pulse shadow-card"
            >
              <div className="h-5 bg-secondary rounded w-1/3 mb-3" />
              <div className="h-8 bg-secondary rounded w-1/4 mb-4" />
              <div className="h-3 bg-secondary rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : plans.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-12 shadow-card text-center"
        >
          <Package className="w-14 h-14 mx-auto mb-4 opacity-30" />
          <p className="font-medium text-lg">{t("plans.empty")}</p>
          <p className="text-sm mt-2 text-muted-foreground">
            {t("plans.emptySub")}
          </p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-soft transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-base font-semibold tracking-tight">{plan.name}</h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <p className="text-3xl font-semibold tracking-tight">
                  {Number(plan.price).toLocaleString()}
                </p>
                <span className="text-sm text-muted-foreground">EGP</span>
              </div>
              {plan.description && (
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {plan.description}
                </p>
              )}
              {plan.features.length > 0 && (
                <ul className="space-y-2 mb-5">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-converted-foreground flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {plan.payment_options.map((opt) => (
                  <span
                    key={opt}
                    className="bg-secondary px-2.5 py-1 rounded-md text-[11px] font-medium text-muted-foreground"
                  >
                    {paymentLabel[opt] || opt}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
