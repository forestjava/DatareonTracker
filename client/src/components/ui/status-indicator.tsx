import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "danger" | "neutral";

interface StatusIndicatorProps {
  status: StatusType;
  className?: string;
}

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-block w-3 h-3 rounded-full mr-1.5",
        {
          "bg-success": status === "success",
          "bg-warning": status === "warning",
          "bg-destructive": status === "danger",
          "bg-muted-foreground": status === "neutral",
        },
        className
      )}
      aria-hidden="true"
    />
  );
}
