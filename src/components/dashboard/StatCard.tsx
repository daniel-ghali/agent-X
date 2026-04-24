import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  delay?: number;
  trend?: { value: string; positive?: boolean };
  iconClassName?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  delay = 0,
  trend,
  iconClassName = "bg-primary/10 text-primary",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-soft transition-shadow"
    >
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <div className={`p-1.5 rounded-lg ${iconClassName}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span>{label}</span>
      </div>
      <div className="flex items-end justify-between mt-3">
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-full ${
              trend.positive
                ? "bg-converted/10 text-converted-foreground"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {trend.positive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {trend.value}
          </span>
        )}
      </div>
    </motion.div>
  );
}
