import { cn } from "@/lib/utils";

const channelConfig: Record<string, { label: string; className: string }> = {
  web: { label: "Web", className: "bg-secondary text-muted-foreground" },
  whatsapp: { label: "WhatsApp", className: "bg-converted/10 text-converted-foreground" },
  instagram: { label: "Instagram", className: "bg-warm/10 text-warm-foreground" },
};

export default function ChannelBadge({ channel }: { channel: string }) {
  const config = channelConfig[channel] || channelConfig.web;
  return (
    <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-medium", config.className)}>
      {config.label}
    </span>
  );
}
