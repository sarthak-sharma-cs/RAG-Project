import { useCallback, useEffect, useRef, useState } from "react";
import { Trash2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage, type Message } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { WelcomeScreen } from "./WelcomeScreen";
import { api, type ChatHistoryItem } from "@/lib/api";

const STORAGE_KEY = "eka.messages.v1";

function loadMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  } catch {
    return [];
  }
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(() => loadMessages());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const persistable = messages.filter((m) => !m.pending);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch {
      /* ignore quota errors */
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
      };
      const pendingId = `a-${Date.now()}`;
      const pendingMsg: Message = {
        id: pendingId,
        role: "assistant",
        content: "",
        pending: true,
      };

      const history: ChatHistoryItem[] = messages
        .filter((m) => !m.pending && !m.error)
        .map((m) => ({ role: m.role, content: m.content }));

      setMessages((prev) => [...prev, userMsg, pendingMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await api.chat(trimmed, history);
        const answer =
          res.answer || res.response || res.message || "(No response)";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? {
                  ...m,
                  pending: false,
                  content: answer,
                  sources: res.sources ?? [],
                }
              : m,
          ),
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Something went wrong";
        toast.error("Failed to get response", { description: msg });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? { ...m, pending: false, error: true, content: msg }
              : m,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages],
  );

  const clear = () => {
    if (messages.length === 0) return;
    setMessages([]);
    toast.success("Conversation cleared");
  };

  const hasMessages = messages.length > 0;

  return (
    <section className="flex h-full min-w-0 flex-1 flex-col bg-background">
      <header className="flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-medium text-foreground">Conversation</h2>
          <span className="hidden sm:inline-block h-3.5 w-px bg-border" aria-hidden />
          <span className="hidden sm:inline text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Hybrid Retrieval · Gemini AI
          </span>
        </div>
        <button
          onClick={clear}
          disabled={!hasMessages || isLoading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear
        </button>
      </header>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto scrollbar-thin"
      >
        {!hasMessages ? (
          <WelcomeScreen onPick={(q) => send(q)} />
        ) : (
          <div className="mx-auto max-w-3xl space-y-7 py-8">
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
          </div>
        )}
      </div>

      <MessageInput
        value={input}
        onChange={setInput}
        onSubmit={() => send(input)}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </section>
  );
}
