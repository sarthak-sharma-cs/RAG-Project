import { FileText } from "lucide-react";
import type { Source } from "@/lib/api";

export function SourcesPanel({ sources }: { sources: Source[] }) {
  if (!sources?.length) return null;

  // Deduplicate by filename (case-insensitive), preserve first occurrence order.
  const seen = new Set<string>();
  const unique: { name: string }[] = [];
  for (const s of sources) {
    const name = (s.filename || s.source || "Unknown source").trim();
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push({ name });
  }

  return (
    <div className="mt-4">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Sources
      </p>
      <div className="flex flex-wrap gap-2">
        {unique.map((s, i) => (
          <div
            key={i}
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:border-foreground/30 hover:bg-accent/60"
            title={s.name}
          >
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="max-w-[220px] truncate">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
