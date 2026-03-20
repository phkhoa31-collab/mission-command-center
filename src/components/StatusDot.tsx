import { cn } from "@/lib/utils";

type Status = "active" | "pending" | "error" | "idle";

const statusColors: Record<Status, string> = {
  active: "bg-status-active",
  pending: "bg-status-pending",
  error: "bg-status-error",
  idle: "bg-status-idle",
};

const statusLabels: Record<Status, string> = {
  active: "Active",
  pending: "Pending",
  error: "Error",
  idle: "Idle",
};

export function StatusDot({ status, showLabel = false, className }: { status: Status; showLabel?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("h-2 w-2 rounded-full", statusColors[status], status === "active" && "animate-pulse-glow")} />
      {showLabel && <span className="text-xs text-muted-foreground">{statusLabels[status]}</span>}
    </span>
  );
}
