import { useCallback, useRef, useState } from "react";
import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const ACCEPT = ".pdf,.docx,.txt";
const ACCEPT_MIME = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];

export function UploadDocument({ onUploaded }: { onUploaded: () => void }) {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!["pdf", "docx", "txt"].includes(ext || "")) {
        toast.error("Unsupported file type", { description: "Please upload PDF, DOCX, or TXT." });
        return;
      }
      setStatus("uploading");
      setProgress(0);
      try {
        await api.upload(file, (p) => setProgress(p));
        setStatus("success");
        toast.success("Document uploaded", { description: file.name });
        onUploaded();
        setTimeout(() => {
          setStatus("idle");
          setProgress(null);
        }, 1500);
      } catch (e) {
        setStatus("error");
        const msg = e instanceof Error ? e.message : "Upload failed";
        toast.error("Upload failed", { description: msg });
        setTimeout(() => {
          setStatus("idle");
          setProgress(null);
        }, 2500);
      }
    },
    [onUploaded],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      className={`group cursor-pointer rounded-xl border-2 border-dashed px-3 py-4 text-center transition-all ${
        dragging
          ? "border-primary bg-primary/5"
          : "border-border bg-sidebar-accent/40 hover:border-primary/50 hover:bg-sidebar-accent"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && (ACCEPT_MIME.includes(file.type) || /\.(pdf|docx|txt)$/i.test(file.name))) {
            handleFile(file);
          }
          e.target.value = "";
        }}
      />
      {status === "uploading" ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <p className="text-xs font-medium text-foreground">Uploading… {progress ?? 0}%</p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress ?? 0}%` }}
            />
          </div>
        </div>
      ) : status === "success" ? (
        <div className="flex flex-col items-center gap-1.5 text-success">
          <CheckCircle2 className="h-5 w-5" />
          <p className="text-xs font-medium">Uploaded</p>
        </div>
      ) : status === "error" ? (
        <div className="flex flex-col items-center gap-1.5 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <p className="text-xs font-medium">Upload failed</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
            <Upload className="h-4 w-4" />
          </div>
          <p className="text-xs font-medium text-foreground">Upload document</p>
          <p className="text-[11px] text-muted-foreground">Drop or click · PDF, DOCX, TXT</p>
        </div>
      )}
    </div>
  );
}
