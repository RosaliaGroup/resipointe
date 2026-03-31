import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FEATURE_VOTE_OPTIONS } from "@shared/data";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ThumbsUp, Users, BarChart3, MessageSquare, CheckCircle } from "lucide-react";

const PAIN_POINTS = [
  "Thin walls / noise", "Poor natural light", "Small closets", "No in-unit laundry",
  "Outdated appliances", "No parking", "Slow maintenance response", "No outdoor space",
  "Lack of storage", "Poor cell signal", "No EV charging", "No pet amenities"
];

const TOP_FEATURES = [
  "In-unit washer/dryer", "Modern kitchen", "Walk-in closet", "Home office space",
  "Rooftop access", "Gym/fitness center", "Package lockers", "Outdoor space",
  "Fast Wi-Fi included", "Smart home features", "EV charging", "Pet-friendly policy"
];

export default function CollaborationHub() {
  const [surveyType, setSurveyType] = useState<"tenant" | "developer" | "prospect">("prospect");
  const [surveyForm, setSurveyForm] = useState({
    name: "", email: "",
    topFeatures: [] as string[],
    painPoints: [] as string[],
    willingnessToPay: "",
    mustHaves: "", dealBreakers: "", communityVision: ""
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [votes, setVotes] = useState<Record<string, boolean>>({});

  const surveyMutation = trpc.survey.submit.useMutation({
    onSuccess: () => {
      setSurveySubmitted(true);
      toast.success("Thank you for your feedback!");
    },
    onError: () => toast.error("Submission failed. Please try again.")
  });

  const voteMutation = trpc.survey.vote.useMutation({
    onSuccess: (_, vars) => {
      setVotes(prev => ({ ...prev, [vars.featureId]: true }));
      toast.success("Vote recorded!");
    }
  });

  const toggleFeature = (list: string[], item: string) =>
    list.includes(item) ? list.filter(x => x !== item) : [...list, item];

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    surveyMutation.mutate({ ...surveyForm, respondentType: surveyType });
  };

  const categories = Array.from(new Set(FEATURE_VOTE_OPTIONS.map(f => f.category)));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="pt-24 pb-12 bg-foreground text-background">
          <div className="container">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Community First</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Collaboration Hub</h1>
            <p className="text-background/60 max-w-2xl">
              We build communities where tenants feel at home. Your feedback shapes our next development — from amenities to finishes to community programs.
            </p>
          </div>
        </section>

        {/* Stats */}
        <div className="bg-muted border-b border-border py-6">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: <Users className="w-5 h-5" />, value: "1,200+", label: "Responses Collected" },
                { icon: <ThumbsUp className="w-5 h-5" />, value: "8,400+", label: "Feature Votes" },
                { icon: <BarChart3 className="w-5 h-5" />, value: "94%", label: "Satisfaction Rate" },
                { icon: <MessageSquare className="w-5 h-5" />, value: "12", label: "Features Implemented" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="text-primary">{s.icon}</div>
                  <p className="font-bold text-xl text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="container">
            <Tabs defaultValue="survey">
              <TabsList className="mb-8">
                <TabsTrigger value="survey">📋 Survey</TabsTrigger>
                <TabsTrigger value="vote">🗳️ Feature Voting</TabsTrigger>
                <TabsTrigger value="insights">📊 Developer Insights</TabsTrigger>
              </TabsList>

              {/* Survey Tab */}
              <TabsContent value="survey">
                {surveySubmitted ? (
                  <div className="text-center py-16 max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Thank You!</h2>
                    <p className="text-muted-foreground">Your feedback has been recorded. It directly influences our development decisions.</p>
                    <Button className="mt-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setSurveySubmitted(false)}>
                      Submit Another Response
                    </Button>
                  </div>
                ) : (
                  <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                      <p className="text-sm font-medium text-foreground mb-3">I am a:</p>
                      <div className="flex gap-3">
                        {(["prospect", "tenant", "developer"] as const).map(t => (
                          <button key={t} onClick={() => setSurveyType(t)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all capitalize ${surveyType === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary"}`}>
                            {t === "prospect" ? "Prospective Tenant" : t === "tenant" ? "Current Tenant" : "Developer / Investor"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSurveySubmit} className="space-y-6">
                      <div className="bg-card rounded-2xl border border-border p-6">
                        <h3 className="font-semibold text-foreground mb-4">Contact (Optional)</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <input value={surveyForm.name} onChange={e => setSurveyForm(p => ({ ...p, name: e.target.value }))}
                            placeholder="Your name" className="bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border" />
                          <input type="email" value={surveyForm.email} onChange={e => setSurveyForm(p => ({ ...p, email: e.target.value }))}
                            placeholder="Email (for updates)" className="bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border" />
                        </div>
                      </div>

                      <div className="bg-card rounded-2xl border border-border p-6">
                        <h3 className="font-semibold text-foreground mb-4">Top Features You Value Most</h3>
                        <div className="flex flex-wrap gap-2">
                          {TOP_FEATURES.map(f => (
                            <button type="button" key={f} onClick={() => setSurveyForm(p => ({ ...p, topFeatures: toggleFeature(p.topFeatures, f) }))}
                              className={`px-3 py-1.5 rounded-full text-sm border transition-all ${surveyForm.topFeatures.includes(f) ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary/40"}`}>
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-card rounded-2xl border border-border p-6">
                        <h3 className="font-semibold text-foreground mb-4">Biggest Pain Points in Current/Past Apartments</h3>
                        <div className="flex flex-wrap gap-2">
                          {PAIN_POINTS.map(f => (
                            <button type="button" key={f} onClick={() => setSurveyForm(p => ({ ...p, painPoints: toggleFeature(p.painPoints, f) }))}
                              className={`px-3 py-1.5 rounded-full text-sm border transition-all ${surveyForm.painPoints.includes(f) ? "bg-destructive/10 text-destructive border-destructive/30" : "border-border text-foreground hover:border-destructive/30"}`}>
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-card rounded-2xl border border-border p-6">
                        <h3 className="font-semibold text-foreground mb-4">Willingness to Pay for Premium Amenities</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {["$0 (included)", "$25–50/mo", "$50–100/mo", "$100+/mo"].map(v => (
                            <button type="button" key={v} onClick={() => setSurveyForm(p => ({ ...p, willingnessToPay: v }))}
                              className={`py-3 rounded-xl text-sm font-medium border transition-all ${surveyForm.willingnessToPay === v ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary/40"}`}>
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Must-Haves in Your Ideal Apartment</label>
                          <textarea value={surveyForm.mustHaves} onChange={e => setSurveyForm(p => ({ ...p, mustHaves: e.target.value }))} rows={2}
                            className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border resize-none"
                            placeholder="e.g., In-unit laundry, natural light, quiet building..." />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Deal Breakers</label>
                          <textarea value={surveyForm.dealBreakers} onChange={e => setSurveyForm(p => ({ ...p, dealBreakers: e.target.value }))} rows={2}
                            className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border resize-none"
                            placeholder="e.g., No parking, shared laundry only, no pets..." />
                        </div>
                        {surveyType === "developer" && (
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Your Vision for Community Living</label>
                            <textarea value={surveyForm.communityVision} onChange={e => setSurveyForm(p => ({ ...p, communityVision: e.target.value }))} rows={3}
                              className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border resize-none"
                              placeholder="What does a thriving tenant community look like to you?" />
                          </div>
                        )}
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold"
                        disabled={surveyMutation.isPending}>
                        {surveyMutation.isPending ? "Submitting..." : "Submit Feedback"}
                      </Button>
                    </form>
                  </div>
                )}
              </TabsContent>

              {/* Voting Tab */}
              <TabsContent value="vote">
                <div className="max-w-3xl mx-auto">
                  <p className="text-muted-foreground mb-8">Vote for features you'd most like to see in future Resipointe buildings. Top-voted features get prioritized in development.</p>
                  {categories.map(cat => (
                    <div key={cat} className="mb-8">
                      <h3 className="font-semibold text-foreground capitalize mb-4 flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">{cat}</Badge>
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {FEATURE_VOTE_OPTIONS.filter(f => f.category === cat).map(f => (
                          <div key={f.id} className="flex items-center justify-between bg-card rounded-xl border border-border p-4">
                            <span className="text-sm font-medium text-foreground">{f.label}</span>
                            <button
                              onClick={() => !votes[f.id] && voteMutation.mutate({ featureId: f.id, featureLabel: f.label, category: f.category })}
                              disabled={votes[f.id] || voteMutation.isPending}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${votes[f.id] ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"}`}>
                              <ThumbsUp className="w-3.5 h-3.5" />
                              {votes[f.id] ? "Voted!" : "Vote"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-card rounded-2xl border border-border p-8 text-center">
                    <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Developer Insights Dashboard</h2>
                    <p className="text-muted-foreground mb-6">
                      Aggregated survey data, feature vote rankings, and tenant sentiment analysis — available to registered developers and investors.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { label: "Top Feature Request", value: "In-Unit W/D", pct: "87%" },
                        { label: "Avg WTP Premium", value: "$50–100/mo", pct: "42%" },
                        { label: "#1 Pain Point", value: "Thin Walls", pct: "63%" },
                      ].map((item, i) => (
                        <div key={i} className="bg-muted rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-primary">{item.pct}</p>
                          <p className="text-xs font-semibold text-foreground mt-1">{item.value}</p>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                        </div>
                      ))}
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                      Request Full Report
                    </Button>
                    <p className="text-xs text-muted-foreground mt-3">Contact info@resipointe.com for developer access</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <ChatBot />
    </>
  );
}
