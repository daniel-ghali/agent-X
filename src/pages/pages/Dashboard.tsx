import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Users,
  Flame,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import LeadBadge from "@/components/dashboard/LeadBadge";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { Button } from "@/components/ui/button";

interface RecentLead {
  id: string;
  visitor_name: string | null;
  goal: string | null;
  status: string;
  interested_plan: string | null;
}

const followUps = [
  { name: "Follow up with Ahmed", note: "Asked about pricing", priority: "High" },
  { name: "Message Sara", note: "Hot lead, no reply yet", priority: "High" },
  { name: "Send plan to Karim", note: "Interested in 12-week transformation", priority: "Medium" },
  { name: "Re-engage Mona", note: "Went cold last week", priority: "Low" },
];

const priorityClass: Record<string, string> = {
  High: "bg-hot/10 text-hot-foreground",
  Medium: "bg-warm/10 text-warm-foreground",
  Low: "bg-cold/10 text-cold-foreground",
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useApp();
  const [chats, setChats] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [hotLeads, setHotLeads] = useState(0);
  const [convertedCount, setConvertedCount] = useState(0);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [series, setSeries] = useState<{ day: string; chats: number; leads: number; conv: number }[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const since = new Date();
    since.setDate(since.getDate() - 13);

    const [convRes, leadsRes, recentRes, convDailyRes, leadsDailyRes] = await Promise.all([
      supabase.from("conversations").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      supabase.from("leads").select("status, converted").eq("user_id", user.id),
      supabase
        .from("leads")
        .select("id, visitor_name, goal, status, interested_plan")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("conversations")
        .select("created_at")
        .eq("user_id", user.id)
        .gte("created_at", since.toISOString()),
      supabase
        .from("leads")
        .select("created_at, converted")
        .eq("user_id", user.id)
        .gte("created_at", since.toISOString()),
    ]);

    setChats(convRes.count || 0);
    const allLeads = leadsRes.data || [];
    setTotalLeads(allLeads.length);
    setHotLeads(allLeads.filter((l) => l.status === "HOT").length);
    setConvertedCount(allLeads.filter((l) => l.converted).length);
    setRecentLeads((recentRes.data as any) || []);

    // Build last 14 days series
    const days: { day: string; chats: number; leads: number; conv: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({
        day: d.toLocaleDateString("en", { day: "numeric", month: "short" }),
        chats: (convDailyRes.data || []).filter((c: any) => c.created_at?.slice(0, 10) === key).length,
        leads: (leadsDailyRes.data || []).filter((c: any) => c.created_at?.slice(0, 10) === key).length,
        conv: (leadsDailyRes.data || []).filter((c: any) => c.created_at?.slice(0, 10) === key && c.converted).length,
      });
    }
    setSeries(days);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const conversionRate = totalLeads > 0 ? Math.round((convertedCount / totalLeads) * 100) : 0;
  const revenueEgp = convertedCount * 1200; // mocked avg ticket

  const stats = [
    {
      label: t("dash.chats"),
      value: chats,
      icon: MessageSquare,
      iconClassName: "bg-primary/10 text-primary",
      trend: { value: "+12%", positive: true },
    },
    {
      label: t("dash.leadsCaptured"),
      value: totalLeads,
      icon: Users,
      iconClassName: "bg-cold/10 text-cold-foreground",
      trend: { value: "+8%", positive: true },
    },
    {
      label: t("dash.hotLeads"),
      value: hotLeads,
      icon: Flame,
      iconClassName: "bg-hot/10 text-hot-foreground",
      trend: { value: "+3", positive: true },
    },
    {
      label: t("dash.conversionRate"),
      value: `${conversionRate}%`,
      icon: TrendingUp,
      iconClassName: "bg-warm/10 text-warm-foreground",
      trend: { value: "+2.1%", positive: true },
    },
    {
      label: t("dash.revenue"),
      value: revenueEgp.toLocaleString(),
      icon: DollarSign,
      iconClassName: "bg-converted/10 text-converted-foreground",
      trend: { value: "+18%", positive: true },
    },
  ];

  const radialData = [{ name: "conv", value: conversionRate, fill: "hsl(var(--primary))" }];

  return (
    <div>
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={i * 0.05} />
        ))}
      </div>

      {/* Chart + Performance */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                {t("dash.chartTitle")}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{t("dash.last14")}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={series} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="gChats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--warm))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--warm))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  fontSize: 12,
                  boxShadow: "var(--shadow-soft)",
                }}
              />
              <Area type="monotone" dataKey="chats" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#gChats)" />
              <Area type="monotone" dataKey="leads" stroke="hsl(var(--warm))" strokeWidth={2} fill="url(#gLeads)" />
              <Area type="monotone" dataKey="conv" stroke="hsl(var(--converted))" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance gauge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border p-6 shadow-card flex flex-col"
        >
          <h3 className="text-base font-semibold tracking-tight mb-1">{t("dash.perfTitle")}</h3>
          <p className="text-xs text-muted-foreground">{t("dash.thisMonth")}</p>

          <div className="relative flex-1 flex items-center justify-center min-h-[200px]">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "hsl(var(--secondary))" }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-semibold tracking-tight">{conversionRate}%</span>
              <span className="text-xs text-muted-foreground">{t("dash.conversion")}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{t("dash.leads")}</p>
              <p className="text-lg font-semibold">{totalLeads}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{t("dash.converted")}</p>
              <p className="text-lg font-semibold text-converted-foreground">{convertedCount}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent leads + follow-ups */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-card overflow-hidden"
        >
          <div className="flex items-center justify-between p-5">
            <h3 className="text-base font-semibold tracking-tight">{t("dash.recentLeads")}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => navigate("/dashboard/leads")}
            >
              {t("dash.viewAll")} <ArrowRight className="w-3.5 h-3.5 ms-1 rtl:rotate-180" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-xs border-y border-border">
                  <th className="text-start p-4 font-medium">{t("table.name")}</th>
                  <th className="text-start p-4 font-medium">{t("table.goal")}</th>
                  <th className="text-start p-4 font-medium">{t("table.status")}</th>
                  <th className="text-start p-4 font-medium">{t("table.plan")}</th>
                  <th className="text-end p-4 font-medium">{t("table.action")}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [1, 2, 3].map((i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td colSpan={5} className="p-4">
                        <div className="h-8 bg-secondary rounded-lg animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-muted-foreground">
                      <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">{t("dash.noLeads")}</p>
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                      <td className="p-4 font-medium">{lead.visitor_name || "—"}</td>
                      <td className="p-4 text-muted-foreground">{lead.goal || "—"}</td>
                      <td className="p-4">
                        <LeadBadge status={(lead.status as "HOT" | "WARM" | "COLD") || "COLD"} />
                      </td>
                      <td className="p-4 text-muted-foreground">{lead.interested_plan || "—"}</td>
                      <td className="p-4 text-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate("/dashboard/conversations")}
                        >
                          {t("table.view")}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border p-5 shadow-card"
        >
          <h3 className="text-base font-semibold tracking-tight mb-1">{t("dash.followUps")}</h3>
          <p className="text-xs text-muted-foreground mb-4">{t("dash.followSub")}</p>
          <div className="space-y-2">
            {followUps.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{f.note}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${priorityClass[f.priority]}`}>
                  {f.priority}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
