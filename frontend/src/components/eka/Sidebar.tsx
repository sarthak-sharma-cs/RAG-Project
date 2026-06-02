import { Brain } from "lucide-react";
import { UploadDocument } from "./UploadDocument";
import { DocumentLibrary } from "./DocumentLibrary";
import { DarkModeToggle } from "./DarkModeToggle";
import type { DocumentItem } from "@/lib/api";

export function Sidebar({
  documents,
  loading,
  onRefresh,
  onUploaded,
}: {
  documents: DocumentItem[];
  loading: boolean;
  onRefresh: () => void;
  onUploaded: () => void;
}) {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2.5 border-b border-sidebar-border px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Brain className="h-4.5 w-4.5" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold text-foreground">
            Enterprise Knowledge
          </h1>
          <p className="text-[11px] text-muted-foreground">AI Assistant</p>
        </div>
        <DarkModeToggle />
      </div>

      <div className="px-3 py-3">
        <UploadDocument onUploaded={onUploaded} />
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-3 pb-4">
        <DocumentLibrary
          documents={documents}
          loading={loading}
          onRefresh={onRefresh}
        />
      </div>

      <div className="border-t border-sidebar-border px-4 py-3">
        <p className="text-[10px] text-muted-foreground">
          Powered by RAG · Hybrid Retrieval · Gemini
        </p>
      </div>
    </aside>
  );
}
