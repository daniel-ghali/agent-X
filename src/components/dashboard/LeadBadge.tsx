import { cn } from "@/lib/utils";

type LeadStatus = "HOT" | "WARM" | "COLD";

const statusConfig: Record<LeadStatus, { label: string; className: string; dot: string }> = {
  HOT: { label: "Hot", className: "bg-hot/10 text-hot-foreground", dot: "bg-hot" },
  WARM: { label: "Warm", className: "bg-warm/10 text-warm-foreground", dot: "bg-warm" },
  COLD: { label: "Cold", className: "bg-cold/10 text-cold-foreground", dot: "bg-cold" },
};

export default function LeadBadge({ status }: { status: LeadStatus }) {
  const config = statusConfig[status] || statusConfig.COLD;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.className,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
