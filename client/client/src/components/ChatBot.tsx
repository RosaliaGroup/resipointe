import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Loader2, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME = "Hi! I'm the Resipointe assistant. I can answer questions about our 5 Newark properties, compare units, and help you schedule a tour. What would you like to know?";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const bottomRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.send.useMutation({
    onSuccess: (data: unknown) => {
      const reply = typeof (data as { reply: unknown }).reply === "string" ? (data as { reply: string }).reply : "I'm here to help!";
      setMessages(prev => [...prev, { role: "assistant" as const, content: reply }]);
    },
    onError: () => {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please call us at (862) 277-1673." }]);
    }
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text || chatMutation.isPending) return;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    chatMutation.mutate({ message: text, sessionId });
  };

  const quickReplies = ["What's available?", "Pricing?", "How far to NYC?", "Book a tour"];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${open ? "opacity-0 pointer-events-none scale-75" : "opacity-100 scale-100"}`}
        style={{ background: "oklch(0.52 0.11 65)" }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      </button>

      {/* Chat panel */}
      <div className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl border border-border flex flex-col transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}
        style={{ height: "520px" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border rounded-t-2xl" style={{ background: "oklch(0.52 0.11 65)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Resipointe Assistant</p>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                Online now
              </p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={m.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="chat-bubble-bot flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="text-sm text-muted-foreground">Typing...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {quickReplies.map(q => (
              <button key={q} onClick={() => { setInput(q); }}
                className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full transition-colors">
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Book tour shortcut */}
        <div className="px-4 pb-2">
          <Link href="/book-tour" onClick={() => setOpen(false)}>
            <button className="w-full text-xs font-medium text-primary flex items-center justify-center gap-1.5 py-2 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
              <Calendar className="w-3.5 h-3.5" /> Schedule a Tour
            </button>
          </Link>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask about apartments, pricing, tours..."
            className="flex-1 text-sm bg-muted rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
          />
          <Button size="icon" onClick={send} disabled={!input.trim() || chatMutation.isPending}
            className="rounded-full w-9 h-9 flex-shrink-0" style={{ background: "oklch(0.52 0.11 65)" }}>
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </>
  );
}
