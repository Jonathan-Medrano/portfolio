import type { ProjectStatus } from "@/data";
import { cn } from "@/lib/utils";

// The dot carries the meaning; the colour only reinforces it. Never encode
// status with colour alone — it has to survive colour blindness and greyscale.
const STATUS: Record<ProjectStatus, { label: string; dot: string }> = {
  live: { label: "En producción", dot: "bg-emerald-500" },
  beta: { label: "En beta", dot: "bg-amber-500" },
  wip: { label: "En desarrollo", dot: "bg-sky-500" },
  archived: { label: "Archivado", dot: "bg-muted-foreground" },
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, dot } = STATUS[status];

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
      <span className={cn("size-1.5 rounded-full", dot)} aria-hidden />
      {label}
    </span>
  );
}
