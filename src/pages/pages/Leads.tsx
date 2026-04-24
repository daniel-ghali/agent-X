import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, Search, Download, Eye, Trash2, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LeadBadge from "@/components/dashboard/LeadBadge";
import ChannelBadge from "@/components/dashboard/ChannelBadge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Lead {
  id: string;
  visitor_name: string | null;
  visitor_phone: string | null;
  status: string;
  goal: string | null;
  interested_plan: string | null;
  notes: string | null;
  converted: boolean;
  created_at: string;
  conversations: { channel: string | null } | null;
}

export default function Leads() {
  const { user } = useAuth();
  const { t } = useApp();
  const tabs = [
    { key: "all", label: t("leads.all") },
    { key: "HOT", label: t("leads.hot") },
    { key: "WARM", label: t("leads.warm") },
    { key: "COLD", label: t("leads.cold") },
  ];
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*, conversations(channel)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load leads");
    } else {
      setLeads((data as any) || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const filteredLeads = useMemo(() => {
    let result = leads;
    if (activeTab !== "all") result = result.filter((l) => l.status === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.visitor_name?.toLowerCase().includes(q) ||
          l.goal?.toLowerCase().includes(q) ||
          l.interested_plan?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [leads, activeTab, searchQuery]);

  const tabsWithCounts = useMemo(
    () =>
      tabs.map((tab) => ({
        ...tab,
        count: tab.key === "all" ? leads.length : leads.filter((l) => l.status === tab.key).length,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [leads, t],
  );

  const handleConvert = async (leadId: string) => {
    const { error } = await supabase.from("leads").update({ converted: true }).eq("id", leadId);
    if (error) toast.error("Failed to convert");
    else {
      toast.success("Marked as converted ✅");
      fetchLeads();
    }
  };

  const handleDelete = async (leadId: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", leadId);
    if (error) toast.error("Failed to delete");
    else {
      toast.success("Deleted");
      fetchLeads();
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Goal", "Status", "Plan", "Channel", "Date"];
    const rows = filteredLeads.map((l) => [
      l.visitor_name || "—",
      l.goal || "—",
      l.status,
      l.interested_plan || "—",
      l.conversations?.channel || "web",
      new Date(l.created_at).toLocaleDateString("en-GB"),
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
    toast.success("CSV downloaded");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{t("leads.title")}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("leads.sub")}
          </p>
        </div>
        {leads.length > 0 && (
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="w-4 h-4 me-2" />
            {t("leads.export")}
          </Button>
        )}
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="flex items-center gap-1 p-1 bg-secondary rounded-xl">
          {tabsWithCounts.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-60">{tab.count}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[200px] max-w-md ms-auto">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("leads.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card border-border ps-10 h-10"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-4 animate-pulse">
              <div className="h-4 bg-secondary rounded w-1/3 mb-2" />
              <div className="h-3 bg-secondary rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredLeads.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-12 shadow-card text-center"
        >
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">{activeTab !== "all" ? t("leads.emptySeg") : t("leads.empty")}</p>
          <p className="text-sm mt-1 text-muted-foreground">
            {t("leads.emptySub")}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs">
                  <th className="text-start p-4 font-medium">{t("table.name")}</th>
                  <th className="text-start p-4 font-medium">{t("table.goal")}</th>
                  <th className="text-start p-4 font-medium">{t("table.status")}</th>
                  <th className="text-start p-4 font-medium">{t("table.plan")}</th>
                  <th className="text-start p-4 font-medium">{t("leads.channel")}</th>
                  <th className="text-start p-4 font-medium">{t("leads.date")}</th>
                  <th className="text-end p-4 font-medium">{t("leads.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border/60 last:border-0 hover:bg-secondary/40 transition-colors"
                  >
                    <td className="p-4 font-medium">
                      {lead.visitor_name || "—"}
                      {lead.converted && (
                        <span className="ms-2 text-[10px] bg-converted/10 text-converted-foreground px-2 py-0.5 rounded-full font-medium">
                          {t("leads.converted")}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-muted-foreground">{lead.goal || "—"}</td>
                    <td className="p-4">
                      <LeadBadge status={lead.status as "HOT" | "WARM" | "COLD"} />
                    </td>
                    <td className="p-4 text-muted-foreground">{lead.interested_plan || "—"}</td>
                    <td className="p-4">
                      <ChannelBadge channel={lead.conversations?.channel || "web"} />
                    </td>
                    <td className="p-4 text-muted-foreground text-xs">
                      {new Date(lead.created_at).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-4 text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!lead.converted && (
                            <DropdownMenuItem onClick={() => handleConvert(lead.id)}>
                              <Eye className="w-4 h-4 me-2" />
                              {t("leads.convert")}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDelete(lead.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 me-2" />
                            {t("leads.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
