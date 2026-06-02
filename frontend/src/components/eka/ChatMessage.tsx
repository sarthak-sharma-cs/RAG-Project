import { Bot, User } from "lucide-react";
import { SourcesPanel } from "./SourcesPanel";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { CopyButton } from "./CopyButton";
import type { Source } from "@/lib/api";
import ReactMarkdown from "react-markdown";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  pending?: boolean;
  error?: boolean;
}

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="msg-enter group flex justify-end gap-3 px-4 sm:px-6">
        <div className="flex max-w-[80%] flex-col items-end">
          <div className="rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-base text-primary-foreground shadow-sm">
            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>

         
          </div>
          <div className="mt-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            <CopyButton text={message.content} />
          </div>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="msg-enter group flex justify-start gap-3 px-4 sm:px-6">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-foreground">
        <Bot className="h-4 w-4" />
      </div>
      <div className="min-w-0 max-w-[85%] flex-1">
        <div className="text-base leading-relaxed text-foreground">
          {message.pending ? (
            <ThinkingIndicator />
          ) : message.error ? (
            <span className="text-destructive">{message.content}</span>
         ) : (
  <div className="prose max-w-none text-foreground">
    <ReactMarkdown>
      {message.content}
    </ReactMarkdown>
  </div>
)}
        </div>
        {!message.pending && message.sources && message.sources.length > 0 && (
          <SourcesPanel sources={message.sources} />
        )}
        {!message.pending && !message.error && message.content && (
          <div className="mt-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            <CopyButton text={message.content} />
          </div>
        )}
      </div>
    </div>
  );
}
