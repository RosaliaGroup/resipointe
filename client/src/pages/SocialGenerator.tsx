import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CAMPAIGNS, PROPERTIES } from "@shared/data";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Sparkles, Copy, Download, Instagram, Linkedin, Facebook } from "lucide-react";

interface GeneratedPost {
  platform: "instagram" | "facebook" | "linkedin";
  caption: string;
  hashtags: string;
  callToAction: string;
}

export default function SocialGenerator() {
  const [platform, setPlatform] = useState<"instagram" | "facebook" | "linkedin">("instagram");
  const [campaign, setCampaign] = useState(CAMPAIGNS[0].id);
  const [property, setProperty] = useState(PROPERTIES[0].id);
  const [tone, setTone] = useState("professional");
  const [generated, setGenerated] = useState<GeneratedPost | null>(null);
  const [saved, setSaved] = useState<GeneratedPost[]>([]);

  const generateMutation = trpc.social.generate.useMutation({
    onSuccess: (data) => {
      setGenerated(data);
      toast.success("Post generated!");
    },
    onError: () => toast.error("Generation failed. Please try again.")
  });

  const saveMutation = trpc.social.save.useMutation({
    onSuccess: () => {
      if (generated) setSaved(prev => [generated, ...prev]);
      toast.success("Post saved!");
    }
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const platformIcons: Record<string, React.ReactNode> = {
    instagram: <Instagram className="w-4 h-4" />,
    facebook: <Facebook className="w-4 h-4" />,
    linkedin: <Linkedin className="w-4 h-4" />,
  };

  const platformColors: Record<string, string> = {
    instagram: "#E1306C",
    facebook: "#1877F2",
    linkedin: "#0A66C2",
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="pt-24 pb-12 bg-foreground text-background">
          <div className="container">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">AI-Powered Marketing</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Social Media Generator</h1>
            <p className="text-background/60 max-w-2xl">
              Generate campaign-specific social media content for Instagram, Facebook, and LinkedIn in seconds. Powered by AI, tailored to your audience.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Generator Controls */}
              <div className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="font-semibold text-foreground mb-4">1. Select Platform</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {["instagram", "facebook", "linkedin"].map(p => (
                      <button key={p} onClick={() => setPlatform(p as "instagram" | "facebook" | "linkedin")}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${platform === p ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                        <span style={{ color: platform === p ? platformColors[p] : undefined }}>
                          {platformIcons[p]}
                        </span>
                        <span className="text-sm font-medium text-foreground capitalize">{p}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="font-semibold text-foreground mb-4">2. Select Campaign</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {CAMPAIGNS.map(c => (
                      <button key={c.id} onClick={() => setCampaign(c.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${campaign === c.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                        <span className="text-xl">{c.icon}</span>
                        <span className="text-sm font-medium text-foreground">{c.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="font-semibold text-foreground mb-4">3. Select Property</h2>
                  <div className="space-y-2">
                    {PROPERTIES.map(p => (
                      <button key={p.id} onClick={() => setProperty(p.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${property === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                        <span className="text-sm font-medium text-foreground">{p.name}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{p.address}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="font-semibold text-foreground mb-4">4. Tone</h2>
                  <div className="flex flex-wrap gap-2">
                    {["professional", "casual", "exciting", "luxury", "community-focused"].map(t => (
                      <button key={t} onClick={() => setTone(t)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all capitalize ${tone === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary/40"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold"
                  onClick={() => generateMutation.mutate({ platform: platform as "instagram" | "facebook" | "linkedin", campaign, property, tone })}
                  disabled={generateMutation.isPending}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {generateMutation.isPending ? "Generating..." : "Generate Post"}
                </Button>
              </div>

              {/* Preview */}
              <div className="space-y-5">
                {generated ? (
                  <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    {/* Platform header */}
                    <div className="flex items-center gap-3 p-4 border-b border-border" style={{ backgroundColor: platformColors[generated.platform] + "15" }}>
                      <span style={{ color: platformColors[generated.platform] }}>{platformIcons[generated.platform]}</span>
                      <span className="font-semibold text-sm text-foreground capitalize">{generated.platform}</span>
                      <Badge className="ml-auto text-xs capitalize" style={{ backgroundColor: platformColors[generated.platform] + "20", color: platformColors[generated.platform] }}>
                        {CAMPAIGNS.find(c => c.id === campaign)?.title}
                      </Badge>
                    </div>

                    {/* Post preview */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">R</div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">resipointe</p>
                          <p className="text-xs text-muted-foreground">Newark, NJ</p>
                        </div>
                      </div>

                      <div className="bg-muted rounded-xl p-4 mb-4">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{generated.caption}</p>
                        <p className="text-sm text-primary mt-3 leading-relaxed">{generated.hashtags}</p>
                        {generated.callToAction && (
                          <p className="text-sm font-semibold text-foreground mt-3 border-t border-border pt-3">{generated.callToAction}</p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 rounded-full text-xs"
                          onClick={() => copyToClipboard(`${generated.caption}\n\n${generated.hashtags}\n\n${generated.callToAction}`)}>
                          <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy All
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full text-xs"
                          onClick={() => copyToClipboard(generated.caption)}>
                          Caption
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full text-xs"
                          onClick={() => copyToClipboard(generated.hashtags)}>
                          Hashtags
                        </Button>
                        <Button size="sm" className="rounded-full text-xs bg-primary text-primary-foreground"
                          onClick={() => saveMutation.mutate({ ...generated, campaign, property })}>
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card rounded-2xl border border-border p-12 text-center">
                    <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Configure your settings and click Generate to create AI-powered social media content.</p>
                  </div>
                )}

                {/* Saved posts */}
                {saved.length > 0 && (
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Download className="w-4 h-4 text-primary" /> Saved Posts ({saved.length})
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {saved.map((post, i) => (
                        <div key={i} className="bg-muted rounded-xl p-3 text-xs">
                          <div className="flex items-center gap-2 mb-1">
                            <span style={{ color: platformColors[post.platform] }}>{platformIcons[post.platform]}</span>
                            <span className="font-medium text-foreground capitalize">{post.platform}</span>
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{post.caption}</p>
                          <button onClick={() => copyToClipboard(`${post.caption}\n\n${post.hashtags}`)}
                            className="text-primary hover:underline mt-1">Copy</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <ChatBot />
    </>
  );
}
