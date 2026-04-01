import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAMPAIGNS, PROPERTIES } from "@shared/data";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { ArrowRight, CheckCircle, MapPin, Calendar, ChevronLeft } from "lucide-react";
import { useEffect } from "react";

export default function CampaignPage() {
  const { id } = useParams<{ id: string }>();
  const campaign = CAMPAIGNS.find(c => c.id === id);

  useEffect(() => {
    if (campaign) {
      document.title = campaign.metaTitle;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", campaign.metaDescription);
    }
  }, [campaign]);

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Campaign not found</h1>
          <Link href="/"><Button>Go Home</Button></Link>
        </div>
      </div>
    );
  }

  const campaignProperties = PROPERTIES.filter(p => campaign.properties.includes(p.id));

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-24 pb-20 overflow-hidden" style={{ background: `linear-gradient(135deg, oklch(0.12 0.02 250), oklch(0.18 0.02 250))` }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 70% 50%, ${campaign.accentColor}, transparent 60%)` }} />
          <div className="container relative z-10">
            <Link href="/">
              <button className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-8 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to All Properties
              </button>
            </Link>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">{campaign.icon}</span>
                <Badge className="text-xs font-semibold px-3 py-1.5" style={{ backgroundColor: campaign.accentColor + "33", color: campaign.accentColor, border: `1px solid ${campaign.accentColor}55` }}>
                  {campaign.title} Campaign
                </Badge>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                {campaign.headline}
              </h1>
              <p className="text-xl font-medium mb-4" style={{ color: campaign.accentColor }}>
                {campaign.subheadline}
              </p>
              <p className="text-white/70 text-lg mb-8 max-w-2xl leading-relaxed">
                {campaign.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book-tour">
                  <Button size="lg" className="rounded-full px-8 font-semibold" style={{ backgroundColor: campaign.accentColor, color: "white" }}>
                    <Calendar className="w-4 h-4 mr-2" /> {campaign.cta}
                  </Button>
                </Link>
                <a href="#properties">
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-white/30 text-white hover:bg-white/10">
                    View Properties <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Points */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-10">Why This Works for You</h2>
              <div className="space-y-4">
                {campaign.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border shadow-sm">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: campaign.accentColor }} />
                    <p className="text-foreground font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Properties for this campaign */}
        <section className="py-16 bg-background" id="properties">
          <div className="container">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-10">
              Recommended Properties
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {campaignProperties.map(p => (
                <div key={p.id} className="rounded-2xl overflow-hidden border border-border shadow-md bg-card group">
                  <div className="relative h-56 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <Badge className="absolute top-3 left-3 text-xs font-semibold text-white" style={{ backgroundColor: p.color }}>
                      {p.badge}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3"><MapPin className="w-3.5 h-3.5" />{p.address}</p>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.amenities.slice(0, 3).map(a => (
                        <span key={a} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">{a}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg text-foreground">{p.priceLabel}</p>
                        <p className="text-xs text-muted-foreground">2 months free · 12-mo lease</p>
                      </div>
                      <Link href="/book-tour">
                        <Button className="rounded-full" style={{ backgroundColor: campaign.accentColor, color: "white" }}>
                          Book Tour
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16" style={{ background: `linear-gradient(135deg, oklch(0.12 0.02 250), oklch(0.18 0.02 250))` }}>
          <div className="container text-center">
            <h2 className="font-serif text-4xl font-bold text-white mb-4">{campaign.cta}</h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">Our leasing team is ready to answer your questions and schedule a private tour at your convenience.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/book-tour">
                <Button size="lg" className="rounded-full px-10 font-semibold" style={{ backgroundColor: campaign.accentColor, color: "white" }}>
                  <Calendar className="w-4 h-4 mr-2" /> Schedule Your Tour
                </Button>
              </Link>
              <a href="tel:8622771673">
                <Button size="lg" variant="outline" className="rounded-full px-10 border-white/30 text-white hover:bg-white/10">
                  Call (862) 277-1673
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* All Campaigns */}
        <section className="py-12 bg-muted">
          <div className="container">
            <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">Explore Other Campaigns</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {CAMPAIGNS.filter(c => c.id !== id).map(c => (
                <Link key={c.id} href={c.slug}>
                  <button className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-all">
                    <span>{c.icon}</span> {c.title}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ChatBot />
    </>
  );
}
