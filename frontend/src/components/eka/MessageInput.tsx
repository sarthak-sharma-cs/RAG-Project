import { useEffect, useRef, type KeyboardEvent } from "react";
import { ArrowUp, Square } from "lucide-react";

export function MessageInput({
  value,
  onChange,
  onSubmit,
  onStop,
  disabled,
  isLoading,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  useEffect(() => {
    if (!isLoading) ref.current?.focus();
  }, [isLoading]);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSubmit();
    }
  }

  const canSend = !disabled && value.trim().length > 0;

  return (
    <div className="border-t border-border bg-background px-4 py-3 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="relative flex items-end rounded-2xl border border-border bg-card shadow-sm transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/20">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your documents…"
            rows={1}
            disabled={disabled}
            className="flex-1 resize-none bg-transparent px-4 py-3.5 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60 scrollbar-thin"
          />
          <button
            type="button"
            onClick={isLoading && onStop ? onStop : onSubmit}
            disabled={!isLoading && !canSend}
            aria-label={isLoading ? "Stop" : "Send message"}
            className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            {isLoading ? <Square className="h-3.5 w-3.5 fill-current" /> : <ArrowUp className="h-4 w-4" />}
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Press <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">Enter</kbd> to send,
          {" "}
          <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">Shift+Enter</kbd> for a new line
        </p>
      </div>
    </div>
  );
}
