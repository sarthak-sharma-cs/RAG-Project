import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/eka/Sidebar";
import { ChatWindow } from "@/components/eka/ChatWindow";
import { api, type DocumentItem } from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enterprise Knowledge Assistant" },
      {
        name: "description",
        content:
          "AI-powered enterprise knowledge assistant with retrieval-augmented generation over your company documents.",
      },
      { property: "og:title", content: "Enterprise Knowledge Assistant" },
      {
        property: "og:description",
        content:
          "Ask anything about your company documents. Hybrid retrieval, reranking, and cited sources.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const docs = await api.listDocuments();
      setDocuments(docs);
    } catch {
      // Silent fail — backend may be offline; UI shows empty state.
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar
        documents={documents}
        loading={loading}
        onRefresh={refresh}
        onUploaded={refresh}
      />
      <ChatWindow />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
