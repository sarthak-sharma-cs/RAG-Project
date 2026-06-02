import { useMemo, useState } from "react";
import { RefreshCw, Search, FileX, Loader2 } from "lucide-react";
import { DocumentIcon } from "./DocumentIcon";
import { EmptyState } from "./EmptyState";
import type { DocumentItem } from "@/lib/api";

export function DocumentLibrary({
  documents,
  loading,
  onRefresh,
}: {
  documents: DocumentItem[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter((d) =>
      (d.filename || d.name || "").toLowerCase().includes(q),
    );
  }, [documents, query]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Document Library
          </h3>
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {documents.length}
          </span>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh documents"
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="relative mb-2 px-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents…"
          className="w-full rounded-lg border border-border bg-background py-1.5 pl-8 pr-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/20"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-1">
        {loading && documents.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<FileX className="h-5 w-5" />}
            title={documents.length === 0 ? "No documents yet" : "No matches"}
            description={
              documents.length === 0
                ? "Upload your first document to get started."
                : "Try a different search term."
            }
          />
        ) : (
          <ul className="space-y-0.5">
            {filtered.map((doc, i) => {
              const name = doc.filename || doc.name || `Document ${i + 1}`;
              return (
                <li
                  key={(doc.id as string) || name + i}
                  className="group flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent"
                >
                  <DocumentIcon name={name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-foreground" title={name}>
                      {name}
                    </p>
                    {doc.chunks !== undefined && (
                      <p className="text-[10px] text-muted-foreground">
                        {doc.chunks} chunks
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
