import { Sparkles, Search, BookOpen, Lightbulb } from "lucide-react";

const SUGGESTIONS = [
  { icon: Search, text: "Summarize the key points from my uploaded documents" },
  { icon: BookOpen, text: "What are the main policies described in the handbook?" },
  { icon: Lightbulb, text: "Compare the findings across these documents" },
  { icon: Sparkles, text: "Generate an executive summary of recent reports" },
];

export function WelcomeScreen({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-6 py-8 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        How can I help today?
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Ask anything about your company documents. I'll retrieve relevant context
        and cite the sources I used.
      </p>

      <div className="mt-8 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map(({ icon: Icon, text }) => (
          <button
            key={text}
            onClick={() => onPick(text)}
            className="group flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-all hover:border-primary/40 hover:bg-accent/40 hover:shadow-sm"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs leading-relaxed text-foreground">{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
