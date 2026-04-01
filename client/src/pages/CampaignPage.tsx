import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAMPAIGNS, PROPERTIES } from "@shared/data";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { ArrowRight, CheckCircle, MapPin, Calendar, ChevronLeft } from "lucide-react";
import { useEffect } from "react";

// Coastal palette tokens — matches OurStory and global theme
const C = {
  ocean:     "oklch(0.22 0.10 225)",
  teal:      "oklch(0.42 0.12 205)",
  turquoise: "oklch(0.55 0.14 192)",
  turqLight: "oklch(0.70 0.12 192)",
  beige:     "oklch(0.94 0.018 75)",
  sand:      "oklch(0.90 0.022 75)",
  ivory:     "oklch(0.97 0.008 70)",
  taupe:     "oklch(0.30 0.025 60)",
  taupeLight:"oklch(0.42 0.020 65)",
};

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
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.beige }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: C.ocean }}>Campaign not found</h1>
          <Link href="/"><Button style={{ background: C.turquoise, color: "white" }}>Go Home</Button></Link>
        </div>
      </div>
    );
  }

  const campaignProperties = PROPERTIES.filter(p => campaign.properties.includes(p.id));

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          className="relative pt-24 pb-20 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${C.ocean}, oklch(0.32 0.12 215))` }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: `radial-gradient(circle at 70% 50%, ${campaign.accentColor}, transparent 60%)` }}
          />
          <div className="container relative z-10">
            <Link href="/">
              <button
                className="flex items-center gap-1.5 text-sm mb-8 transition-colors font-medium"
                style={{ color: C.turqLight }}
              >
                <ChevronLeft className="w-4 h-4" /> Back to All Properties
              </button>
            </Link>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">{campaign.icon}</span>
                <Badge
                  className="text-xs font-semibold px-3 py-1.5"
                  style={{
                    backgroundColor: campaign.accentColor + "33",
                    color: campaign.accentColor,
                    border: `1px solid ${campaign.accentColor}55`,
                  }}
                >
                  {campaign.title} Campaign
                </Badge>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                {campaign.headline}
              </h1>
              <p className="text-xl font-medium mb-4" style={{ color: campaign.accentColor }}>
                {campaign.subheadline}
              </p>
              <p className="text-lg mb-8 max-w-2xl leading-relaxed" style={{ color: "oklch(0.85 0.04 200)" }}>
                {campaign.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book-tour">
                  <Button
                    size="lg"
                    className="rounded-full px-8 font-semibold"
                    style={{ backgroundColor: campaign.accentColor, color: "white" }}
                  >
                    <Calendar className="w-4 h-4 mr-2" /> {campaign.cta}
                  </Button>
                </Link>
                <a href="#properties">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 hover:bg-white/10"
                    style={{ borderColor: "rgba(255,255,255,0.35)", color: "white" }}
                  >
                    View Properties <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── KEY POINTS ───────────────────────────────────────────────────── */}
        <section className="py-16" style={{ background: C.beige }}>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2
                className="font-serif text-3xl font-bold text-center mb-10"
                style={{ color: C.ocean }}
              >
                Why This Works for You
              </h2>
              <div className="space-y-4">
                {campaign.keyPoints.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white rounded-xl p-5 border shadow-sm"
                    style={{ borderColor: `${C.turquoise}25` }}
                  >
                    <CheckCircle
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: campaign.accentColor }}
                    />
                    <p className="font-semibold" style={{ color: C.taupe }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROPERTIES ───────────────────────────────────────────────────── */}
        <section className="py-16" id="properties" style={{ background: C.ivory }}>
          <div className="container">
            <h2
              className="font-serif text-3xl font-bold text-center mb-10"
              style={{ color: C.ocean }}
            >
              Recommended Properties
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {campaignProperties.map(p => (
                <div
                  key={p.id}
                  className="rounded-2xl overflow-hidden border shadow-md bg-white group"
                  style={{ borderColor: `${C.turquoise}25` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge
                      className="absolute top-3 left-3 text-xs font-semibold text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.badge}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold mb-1" style={{ color: C.ocean }}>
                      {p.name}
                    </h3>
                    <p
                      className="text-sm flex items-center gap-1 mb-3 font-medium"
                      style={{ color: C.taupeLight }}
                    >
                      <MapPin className="w-3.5 h-3.5" />{p.address}
                    </p>
                    <p className="text-sm mb-4 leading-relaxed font-medium" style={{ color: C.taupe }}>
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.amenities.slice(0, 3).map(a => (
                        <span
                          key={a}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: `${C.turquoise}15`, color: C.teal }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg" style={{ color: C.ocean }}>{p.priceLabel}</p>
                        <p className="text-xs font-medium" style={{ color: C.taupeLight }}>
                          2 months free · 12-mo lease
                        </p>
                      </div>
                      <Link href="/book-tour">
                        <Button
                          className="rounded-full"
                          style={{ backgroundColor: campaign.accentColor, color: "white" }}
                        >
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

        {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
        <section
          className="py-16"
          style={{ background: `linear-gradient(135deg, ${C.ocean}, oklch(0.32 0.12 215))` }}
        >
          <div className="container text-center">
            <h2 className="font-serif text-4xl font-bold text-white mb-4">{campaign.cta}</h2>
            <p className="mb-8 max-w-lg mx-auto" style={{ color: "oklch(0.82 0.04 200)" }}>
              Our leasing team is ready to answer your questions and schedule a private tour at your convenience.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/book-tour">
                <Button
                  size="lg"
                  className="rounded-full px-10 font-semibold"
                  style={{ backgroundColor: campaign.accentColor, color: "white" }}
                >
                  <Calendar className="w-4 h-4 mr-2" /> Schedule Your Tour
                </Button>
              </Link>
              <a href="tel:8622771673">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-10 hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.35)", color: "white" }}
                >
                  Call (862) 277-1673
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* ── OTHER CAMPAIGNS ──────────────────────────────────────────────── */}
        <section className="py-12" style={{ background: C.beige }}>
          <div className="container">
            <h3
              className="text-center text-sm font-semibold uppercase tracking-widest mb-6"
              style={{ color: C.teal }}
            >
              Explore Other Campaigns
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {CAMPAIGNS.filter(c => c.id !== id).map(c => (
                <Link key={c.id} href={c.slug}>
                  <button
                    className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm font-semibold transition-all hover:shadow-md"
                    style={{ borderColor: `${C.turquoise}35`, color: C.ocean }}
                  >
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
