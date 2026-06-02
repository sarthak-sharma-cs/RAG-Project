import { useEffect, useState } from "react";
import { LoadingDots } from "./LoadingDots";

const PHASES = [
  "Thinking",
  "Analyzing documents",
  "Searching knowledge base",
  "Reranking results",
  "Composing answer",
];

export function ThinkingIndicator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % PHASES.length), 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 text-muted-foreground">
      <LoadingDots />
      <span className="text-xs font-medium tabular-nums">{PHASES[i]}…</span>
    </span>
  );
}
