import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CAMPAIGNS, PROPERTIES } from "@shared/data";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import {
  ArrowRight, CheckCircle2, MapPin, Calendar, ChevronLeft,
  Heart, Waves, Star, Building2, Phone, Sparkles, Users
} from "lucide-react";
import { useEffect } from "react";

// ─── Coastal palette (mirrors OurStory) ──────────────────────────────────────
const C = {
  ocean:      "oklch(0.22 0.10 225)",
  oceanMid:   "oklch(0.32 0.12 220)",
  teal:       "oklch(0.42 0.12 205)",
  turquoise:  "oklch(0.55 0.14 192)",
  turqLight:  "oklch(0.70 0.12 192)",
  beige:      "oklch(0.94 0.018 75)",
  sand:       "oklch(0.90 0.022 75)",
  ivory:      "oklch(0.97 0.008 70)",
  taupe:      "oklch(0.30 0.025 60)",
  taupeLight: "oklch(0.42 0.020 65)",
  white:      "white",
};

// Per-campaign resort taglines and accent overrides
const CAMPAIGN_EXTRAS: Record<string, {
  resortLine: string;
  heroAccent: string;
  heroBg: string;
  stats: { value: string; label: string }[];
}> = {
  commuters: {
    resortLine: "Resort living 20 minutes from Midtown. Without the Manhattan price tag.",
    heroAccent: "oklch(0.62 0.18 240)",
    heroBg: `linear-gradient(135deg, oklch(0.14 0.10 230) 0%, oklch(0.22 0.12 215) 100%)`,
    stats: [
      { value: "20 min", label: "to NYC Penn Station" },
      { value: "$2,500+", label: "saved vs Manhattan/mo" },
      { value: "0%", label: "NYC city income tax" },
      { value: "5 min", label: "to EWR Airport" },
    ],
  },
  "no-ny-tax": {
    resortLine: "Live in a resort. Keep your paycheck. Zero New York city tax.",
    heroAccent: "oklch(0.58 0.16 155)",
    heroBg: `linear-gradient(135deg, oklch(0.14 0.08 165) 0%, oklch(0.20 0.10 150) 100%)`,
    stats: [
      { value: "3.876%", label: "NYC tax you eliminate" },
      { value: "$4,600+", label: "saved/yr on $120K salary" },
      { value: "20 min", label: "still commute to NYC" },
      { value: "100%", label: "legal NJ domicile" },
    ],
  },
  aviators: {
    resortLine: "Your resort home base. 5 minutes from the runway, 24/7 security while you fly.",
    heroAccent: "oklch(0.60 0.16 205)",
    heroBg: `linear-gradient(135deg, oklch(0.12 0.08 220) 0%, oklch(0.20 0.12 200) 100%)`,
    stats: [
      { value: "5 min", label: "to EWR Airport" },
      { value: "24/7", label: "live security" },
      { value: "3", label: "major airlines at EWR" },
      { value: "Flexible", label: "lease terms available" },
    ],
  },
  genz: {
    resortLine: "A resort community built for how you actually live — rooftop, co-working, and culture.",
    heroAccent: "oklch(0.62 0.18 300)",
    heroBg: `linear-gradient(135deg, oklch(0.14 0.10 295) 0%, oklch(0.20 0.12 285) 100%)`,
    stats: [
      { value: "Rooftop", label: "NYC skyline views" },
      { value: "1 Gbps", label: "building-wide Wi-Fi" },
      { value: "$1,850", label: "effective/mo from" },
      { value: "20 min", label: "to Manhattan" },
    ],
  },
  "modern-finishes": {
    resortLine: "Every surface chosen like a five-star hotel. Because you notice the difference.",
    heroAccent: "oklch(0.62 0.14 65)",
    heroBg: `linear-gradient(135deg, oklch(0.14 0.06 60) 0%, oklch(0.20 0.08 55) 100%)`,
    stats: [
      { value: "Quartz", label: "countertops throughout" },
      { value: "Wide-plank", label: "hardwood floors" },
      { value: "Floor-to-ceiling", label: "windows" },
      { value: "Designer", label: "fixtures & hardware" },
    ],
  },
  amenities: {
    resortLine: "Rooftop pool views. 24/7 gym. Live security. This is what resort living actually means.",
    heroAccent: "oklch(0.62 0.18 40)",
    heroBg: `linear-gradient(135deg, oklch(0.14 0.08 35) 0%, oklch(0.20 0.10 25) 100%)`,
    stats: [
      { value: "Rooftop", label: "NYC panorama lounge" },
      { value: "24/7", label: "fitness center" },
      { value: "24-hr", label: "live security" },
      { value: "EV", label: "charging stations" },
    ],
  },
};

export default function CampaignPage() {
  const { id } = useParams<{ id: string }>();
  const campaign = CAMPAIGNS.find(c => c.id === id);
  const extras = id ? CAMPAIGN_EXTRAS[id] : undefined;

  useEffect(() => {
    if (campaign) {
      document.title = campaign.metaTitle;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", campaign.metaDescription);
    }
  }, [campaign]);

  if (!campaign || !extras) {
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

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          className="relative pt-28 pb-24 overflow-hidden"
          style={{ background: extras.heroBg }}
        >
          {/* Subtle wave texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `radial-gradient(ellipse at 75% 40%, ${extras.heroAccent}, transparent 60%),
                radial-gradient(ellipse at 20% 80%, ${C.turquoise}, transparent 50%)`
            }}
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <Link href="/">
              <button
                className="flex items-center gap-1.5 text-sm mb-10 transition-colors font-medium"
                style={{ color: "oklch(0.75 0.06 200)" }}
              >
                <ChevronLeft className="w-4 h-4" /> Back to All Properties
              </button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: copy */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl">{campaign.icon}</span>
                  <span
                    className="text-xs tracking-[0.25em] uppercase font-bold px-3 py-1.5 rounded-full"
                    style={{ background: `${extras.heroAccent}30`, color: extras.heroAccent, border: `1px solid ${extras.heroAccent}50` }}
                  >
                    {campaign.title} Campaign
                  </span>
                </div>

                <h1
                  className="font-serif text-4xl lg:text-6xl font-light text-white leading-[1.08] mb-4"
                  style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
                >
                  {campaign.headline}
                </h1>

                <p
                  className="text-lg font-semibold mb-3"
                  style={{ color: extras.heroAccent }}
                >
                  {campaign.subheadline}
                </p>

                <p
                  className="text-base leading-relaxed mb-3 font-medium"
                  style={{ color: "oklch(0.88 0.04 200)" }}
                >
                  {extras.resortLine}
                </p>

                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{ color: "oklch(0.78 0.04 200)" }}
                >
                  {campaign.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/book-tour">
                    <button
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110 shadow-lg"
                      style={{ background: extras.heroAccent }}
                    >
                      <Calendar className="w-4 h-4" />
                      {campaign.cta}
                    </button>
                  </Link>
                  <a href="#properties">
                    <button
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm border-2 transition-all hover:bg-white/10"
                      style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
                    >
                      View Properties <ArrowRight className="w-4 h-4" />
                    </button>
                  </a>
                </div>
              </div>

              {/* Right: stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {extras.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 border text-center"
                    style={{
                      background: "oklch(1 0 0 / 0.07)",
                      borderColor: "oklch(1 0 0 / 0.15)",
                    }}
                  >
                    <div
                      className="font-serif text-2xl font-semibold mb-1"
                      style={{ color: extras.heroAccent }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium" style={{ color: "oklch(0.80 0.04 200)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PHILOSOPHY BAND ───────────────────────────────────────────────── */}
        <section
          className="py-6"
          style={{ background: `linear-gradient(90deg, ${C.ocean} 0%, ${C.teal} 50%, ${C.ocean} 100%)` }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold tracking-wide text-white leading-relaxed">
              <Waves className="inline w-4 h-4 mr-2 opacity-70" />
              "We build homes like resorts — because you should feel on vacation every time you walk through your front door."
            </p>
            <p className="text-xs mt-1 font-medium" style={{ color: C.turqLight }}>— Resipointe Development Team</p>
          </div>
        </section>

        {/* ── KEY POINTS ────────────────────────────────────────────────────── */}
        <section className="py-16" style={{ background: C.beige }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-10" style={{ background: C.turquoise }} />
                <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.teal }}>
                  Why This Works for You
                </span>
                <div className="h-px w-10" style={{ background: C.turquoise }} />
              </div>
              <h2 className="font-serif text-3xl font-light" style={{ color: C.ocean }}>
                Resort Living, Real Benefits
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {campaign.keyPoints.map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl p-5 border bg-white shadow-sm"
                  style={{ borderColor: `${C.turquoise}25` }}
                >
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: C.turquoise }}
                  />
                  <p className="text-sm font-semibold leading-relaxed" style={{ color: C.taupe }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROPERTIES ────────────────────────────────────────────────────── */}
        <section id="properties" className="py-20" style={{ background: C.ivory }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-10" style={{ background: C.turquoise }} />
                <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.teal }}>
                  Recommended for You
                </span>
                <div className="h-px w-10" style={{ background: C.turquoise }} />
              </div>
              <h2 className="font-serif text-3xl font-light mb-3" style={{ color: C.ocean }}>
                Your Resort Homes in Newark
              </h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: C.taupeLight }}>
                Hand-picked for the {campaign.title} lifestyle. Each property offers resort-quality finishes and amenities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-7">
              {campaignProperties.map(p => (
                <div
                  key={p.id}
                  className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all group"
                  style={{ borderColor: `${C.turquoise}25` }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                    <span
                      className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-bold text-white shadow"
                      style={{ background: extras.heroAccent }}
                    >
                      {p.badge}
                    </span>
                    {p.highlight && (
                      <span className="absolute bottom-3 left-3 text-xs text-white font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" style={{ color: extras.heroAccent }} />
                        {p.highlight}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-1" style={{ color: C.ocean }}>
                      {p.name}
                    </h3>
                    <p className="text-xs flex items-center gap-1 mb-3 font-medium" style={{ color: C.taupeLight }}>
                      <MapPin className="w-3.5 h-3.5" /> {p.address}
                    </p>
                    <p className="text-sm leading-relaxed mb-4 font-medium" style={{ color: C.taupe }}>
                      {p.description}
                    </p>

                    {/* Amenity pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.amenities.slice(0, 4).map(a => (
                        <span
                          key={a}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: `${C.turquoise}15`, color: C.teal }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: `${C.turquoise}20` }}>
                      <div>
                        <p className="font-bold text-lg" style={{ color: C.ocean }}>{p.priceLabel}</p>
                        <p className="text-xs font-medium" style={{ color: C.taupeLight }}>2 months free · 12-mo lease</p>
                      </div>
                      <Link href="/book-tour">
                        <button
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110 shadow"
                          style={{ background: extras.heroAccent }}
                        >
                          <Calendar className="w-3.5 h-3.5" /> Book Tour
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COLLABORATION CTA ─────────────────────────────────────────────── */}
        <section className="py-16" style={{ background: C.sand }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="rounded-2xl border p-8 md:p-12 text-center" style={{ background: "white", borderColor: `${C.turquoise}25` }}>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: `${C.turquoise}15` }}
              >
                <Users className="w-6 h-6" style={{ color: C.turquoise }} />
              </div>
              <h2 className="font-serif text-2xl font-light mb-3" style={{ color: C.ocean }}>
                Help Shape Our Next Resort-Quality Building
              </h2>
              <p className="text-sm leading-relaxed mb-6 max-w-xl mx-auto font-medium" style={{ color: C.taupe }}>
                Our next three buildings are being designed right now — and future tenants like you are shaping what gets built. Vote on resort features, submit your dream amenity, and become part of the community before it even opens.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/#collaborate">
                  <button
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110 shadow"
                    style={{ background: C.turquoise }}
                  >
                    <Heart className="w-4 h-4" /> Vote on Features
                  </button>
                </Link>
                <Link href="/">
                  <button
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm border-2 transition-all hover:bg-gray-50"
                    style={{ borderColor: `${C.turquoise}50`, color: C.ocean }}
                  >
                    <Building2 className="w-4 h-4" /> See Pipeline Projects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ───────────────────────────────────────────────────── */}
        <section
          className="py-20 text-center"
          style={{ background: `linear-gradient(135deg, ${C.ocean} 0%, ${C.teal} 100%)` }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <Sparkles className="w-10 h-10 mx-auto mb-4" style={{ color: C.turqLight }} />
            <h2 className="font-serif text-3xl font-light text-white mb-4">
              Ready to Live Like You're on Vacation?
            </h2>
            <p className="text-sm mb-8 font-medium" style={{ color: "oklch(0.88 0.04 200)" }}>
              {campaign.cta} — our leasing team is ready to schedule a private tour at your convenience.
              Resort-quality finishes, Newark address, Manhattan commute.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/book-tour">
                <button
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110 shadow-lg"
                  style={{ background: extras.heroAccent }}
                >
                  <Calendar className="w-4 h-4" /> Schedule Your Tour
                </button>
              </Link>
              <a href="tel:8622771673">
                <button
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm border-2 transition-all hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
                >
                  <Phone className="w-4 h-4" /> Call (862) 277-1673
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* ── OTHER CAMPAIGNS ───────────────────────────────────────────────── */}
        <section className="py-12" style={{ background: C.beige }}>
          <div className="max-w-5xl mx-auto px-6">
            <h3
              className="text-center text-xs font-bold uppercase tracking-[0.25em] mb-6"
              style={{ color: C.teal }}
            >
              Explore Other Resort Lifestyles
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {CAMPAIGNS.filter(c => c.id !== id).map(c => (
                <Link key={c.id} href={c.slug}>
                  <button
                    className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm font-semibold transition-all hover:shadow-md"
                    style={{ borderColor: `${C.turquoise}30`, color: C.ocean }}
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
