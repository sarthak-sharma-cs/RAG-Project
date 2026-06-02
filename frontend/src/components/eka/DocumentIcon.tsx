import { FileText, FileType, File as FileIcon } from "lucide-react";

export function DocumentIcon({ name, className = "h-4 w-4" }: { name?: string; className?: string }) {
  const ext = (name?.split(".").pop() || "").toLowerCase();
  if (ext === "pdf") return <FileType className={`${className} text-rose-500`} />;
  if (ext === "docx" || ext === "doc") return <FileText className={`${className} text-blue-500`} />;
  if (ext === "txt") return <FileText className={`${className} text-slate-500`} />;
  return <FileIcon className={`${className} text-muted-foreground`} />;
}
