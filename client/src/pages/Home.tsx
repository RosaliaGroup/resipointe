import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PROPERTIES, CAMPAIGNS, GALLERY_IMAGES, FLOOR_PLANS } from "@shared/data";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { MapPin, Train, Plane, DollarSign, Star, Users, Building2, ChevronRight, X, ZoomIn, Phone, Calendar, ArrowRight, Sparkles, Shield, Dumbbell } from "lucide-react";

// JSON-LD structured data for SEO
function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Resipointe",
    "url": "https://www.resipointe.com",
    "telephone": "(862) 277-1673",
    "email": "info@resipointe.com",
    "address": { "@type": "PostalAddress", "streetAddress": "39 Madison St", "addressLocality": "Newark", "addressRegion": "NJ", "postalCode": "07105" },
    "description": "Resipointe — Newark's premier luxury apartment portfolio with 5 properties in the Ironbound neighborhood.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Luxury Apartments Newark NJ",
      "itemListElement": PROPERTIES.map(p => ({
        "@type": "Offer",
        "name": p.name,
        "description": p.description,
        "price": p.priceFrom,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
      }))
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

function HeroSection() {
  const [currentProp, setCurrentProp] = useState(0);
  const prop = PROPERTIES[currentProp];
  useEffect(() => {
    const t = setInterval(() => setCurrentProp(p => (p + 1) % PROPERTIES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
      {PROPERTIES.map((p, i) => (
        <div key={p.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentProp ? "opacity-100" : "opacity-0"}`}>
          <img src={p.heroImage} alt={p.name} className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
      ))}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20">
        <div className="container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
                🎉 2 Months FREE on 12-Month Leases
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
              Choose Your<br /><em className="text-gold not-italic">Residence</em>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-2 max-w-xl">
              {prop.description}
            </p>
            <div className="flex items-center gap-3 text-white/60 text-sm mb-8">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{prop.address}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Train className="w-3.5 h-3.5" />20 min to NYC</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Plane className="w-3.5 h-3.5" />5 min to EWR</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/book-tour">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-white font-semibold px-8 rounded-full">
                  <Calendar className="w-4 h-4 mr-2" /> Schedule a Tour
                </Button>
              </Link>
              <Link href="/floor-plans">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full backdrop-blur-sm">
                  View Floor Plans
                </Button>
              </Link>
            </div>
          </div>
          {/* Dot indicators */}
          <div className="flex gap-2 mt-8">
            {PROPERTIES.map((_, i) => (
              <button key={i} onClick={() => setCurrentProp(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentProp ? "w-8 bg-white" : "w-1.5 bg-white/40"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { icon: <Building2 className="w-5 h-5" />, value: "5", label: "Properties" },
    { icon: <Users className="w-5 h-5" />, value: "245+", label: "Luxury Units" },
    { icon: <Train className="w-5 h-5" />, value: "20 min", label: "to NYC" },
    { icon: <Plane className="w-5 h-5" />, value: "5 min", label: "to EWR" },
    { icon: <DollarSign className="w-5 h-5" />, value: "$2,000", label: "Effective from" },
    { icon: <Star className="w-5 h-5" />, value: "2 mo", label: "Free Incentive" },
  ];
  return (
    <div className="bg-foreground text-background py-4">
      <div className="container">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-0.5">
              <div className="text-primary">{s.icon}</div>
              <div className="font-bold text-lg leading-tight">{s.value}</div>
              <div className="text-xs text-background/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyGrid() {
  return (
    <section className="py-20 bg-background" id="properties">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Our Portfolio</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Five Addresses.<br /><em className="text-primary">One Standard of Living.</em>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built on decades of Newark real estate expertise, each Resipointe property offers luxury finishes, exceptional amenities, and unbeatable access to NYC.
          </p>
        </div>
        {/* Featured property */}
        <div className="property-card rounded-2xl overflow-hidden shadow-lg mb-6 group cursor-pointer border border-border">
          <div className="grid md:grid-cols-2">
            <div className="relative h-72 md:h-auto overflow-hidden">
              <img src={PROPERTIES[0].heroImage} alt={PROPERTIES[0].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1">
                ⭐ {PROPERTIES[0].badge}
              </Badge>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-between bg-card">
              <div>
                <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">{PROPERTIES[0].neighborhood}</p>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-2">{PROPERTIES[0].name}</h3>
                <p className="text-muted-foreground text-sm mb-1 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{PROPERTIES[0].address}</p>
                <p className="text-muted-foreground mt-4 mb-6 leading-relaxed">{PROPERTIES[0].description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {PROPERTIES[0].amenities.slice(0, 4).map(a => (
                    <span key={a} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{PROPERTIES[0].priceLabel}</p>
                  <p className="text-xs text-muted-foreground">2 months free on 12-mo lease</p>
                </div>
                <Link href="/book-tour">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                    Book Tour <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Other properties grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROPERTIES.slice(1).map(p => (
            <div key={p.id} className="property-card rounded-xl overflow-hidden shadow-md border border-border bg-card group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <Badge className="absolute top-3 left-3 text-xs font-semibold" style={{ backgroundColor: p.color, color: "white" }}>
                  {p.badge}
                </Badge>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: p.color }}>{p.neighborhood}</p>
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">{p.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" />{p.address}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-foreground">{p.priceLabel}</p>
                    <p className="text-xs text-muted-foreground">{p.units} units · {p.stories} floors</p>
                  </div>
                  <Link href="/book-tour">
                    <Button size="sm" variant="outline" className="rounded-full text-xs">Tour</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignStrip() {
  const C = {
    ocean: "oklch(0.22 0.10 225)",
    teal: "oklch(0.42 0.12 205)",
    turquoise: "oklch(0.55 0.14 192)",
    turqLight: "oklch(0.70 0.12 192)",
    beige: "oklch(0.94 0.018 75)",
    taupe: "oklch(0.30 0.025 60)",
  };
  return (
    <section
      className="py-20"
      id="campaigns"
      style={{ background: `linear-gradient(135deg, ${C.ocean} 0%, oklch(0.32 0.12 215) 100%)` }}
    >
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10" style={{ background: C.turqLight }} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.turqLight }}>Resort Lifestyles</span>
            <div className="h-px w-10" style={{ background: C.turqLight }} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-3">
            Find Your Resort Match
          </h2>
          <p className="max-w-lg mx-auto text-sm font-medium" style={{ color: "oklch(0.82 0.06 200)" }}>
            Every lifestyle deserves a resort-quality home. Explore the campaign built for yours.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CAMPAIGNS.map(c => (
            <Link key={c.id} href={c.slug}>
              <div
                className="group cursor-pointer rounded-2xl p-5 border transition-all duration-300 text-center hover:scale-105 hover:shadow-xl"
                style={{
                  background: "oklch(1 0 0 / 0.07)",
                  borderColor: "oklch(1 0 0 / 0.15)",
                }}
              >
                <div className="text-3xl mb-3">{c.icon}</div>
                <p className="font-semibold text-sm text-white mb-1">{c.title}</p>
                <p className="text-xs leading-tight" style={{ color: "oklch(0.75 0.06 200)" }}>
                  {c.subheadline.split(".")[0]}
                </p>
                <div className="mt-3 flex justify-center">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: C.turqLight }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CostCalculator() {
  const [income, setIncome] = useState(90000);
  const [parking, setParking] = useState(false);
  const [pet, setPet] = useState(false);
  const nycRent = 3800;
  const nycTax = Math.round(income * 0.03876);
  const nycTotal = nycRent * 12 + nycTax;
  const njBase = 2000;
  const njParking = parking ? 150 : 0;
  const njPet = pet ? 50 : 0;
  const njRent = njBase + njParking + njPet;
  const njTotal = njRent * 12;
  const annualSavings = nycTotal - njTotal;
  return (
    <section className="py-20 bg-muted" id="calculator">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Cost Comparison</p>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-3">
              How Much Could You Save?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Compare your true cost of living in NYC vs. Resipointe Newark — including the NYC income tax you'd eliminate.
            </p>
          </div>
          <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Annual Income: <span className="text-primary">${income.toLocaleString()}</span>
              </label>
              <Slider value={[income]} onValueChange={([v]) => setIncome(v)} min={40000} max={300000} step={5000} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$40K</span><span>$300K</span>
              </div>
            </div>
            <div className="flex gap-4 mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={parking} onChange={e => setParking(e.target.checked)} className="w-4 h-4 accent-primary" />
                <span className="text-sm font-medium text-foreground">Add Parking (+$150/mo)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={pet} onChange={e => setPet(e.target.checked)} className="w-4 h-4 accent-primary" />
                <span className="text-sm font-medium text-foreground">Pet Friendly (+$50/mo)</span>
              </label>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-xl bg-red-50 border border-red-200 p-6">
                <p className="text-xs font-bold tracking-widest text-red-500 uppercase mb-3">NYC Cost</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Avg 1BR Rent</span><span className="font-semibold">${nycRent.toLocaleString()}/mo</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">NYC City Income Tax</span><span className="font-semibold text-red-600">+${nycTax.toLocaleString()}/yr</span></div>
                  <div className="border-t border-red-200 pt-2 flex justify-between font-bold text-lg">
                    <span>Annual Total</span><span className="text-red-600">${nycTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-green-50 border border-green-200 p-6">
                <p className="text-xs font-bold tracking-widest text-green-600 uppercase mb-3">Resipointe Newark</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Effective Rent (2mo free)</span><span className="font-semibold">${njRent.toLocaleString()}/mo</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">NYC City Tax</span><span className="font-semibold text-green-600">$0 (eliminated)</span></div>
                  <div className="border-t border-green-200 pt-2 flex justify-between font-bold text-lg">
                    <span>Annual Total</span><span className="text-green-600">${njTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center bg-primary/10 rounded-xl p-6 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Your Estimated Annual Savings</p>
              <p className="font-serif text-5xl font-bold text-primary">${annualSavings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">Based on 2 months free incentive + NYC tax elimination</p>
              <Link href="/book-tour">
                <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                  Claim Your Savings — Book a Tour
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const categories = ["all", "exterior", "interior", "amenities"];
  const filtered = filter === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter(g => g.category === filter);
  const activeImg = GALLERY_IMAGES.find(g => g.id === active);
  return (
    <section className="py-20 bg-background" id="gallery">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Photo Gallery</p>
          <h2 className="font-serif text-4xl font-bold text-foreground mb-3">See It For Yourself</h2>
          <div className="flex justify-center gap-2 mt-6">
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <div key={img.id} onClick={() => setActive(img.id)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              style={{ aspectRatio: i === 0 ? "auto" : "1", minHeight: i === 0 ? "300px" : "160px" }}>
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Lightbox */}
      <Dialog open={!!active} onOpenChange={() => setActive(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden">
          <DialogTitle className="sr-only">{activeImg?.caption}</DialogTitle>
          {activeImg && (
            <div className="relative">
              <img src={activeImg.url} alt={activeImg.caption} className="w-full max-h-[80vh] object-contain" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">{activeImg.caption}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function AmenitiesSection() {
  const amenities = [
    { icon: <Shield className="w-6 h-6" />, title: "24-Hr Live Security", desc: "Keycard access, live guards, and monitored entry points throughout." },
    { icon: <Dumbbell className="w-6 h-6" />, title: "Fitness Center 24/7", desc: "State-of-the-art equipment open around the clock for your schedule." },
    { icon: <Sparkles className="w-6 h-6" />, title: "Rooftop Terrace", desc: "Panoramic NYC skyline views with outdoor seating, grills, and lounge areas." },
    { icon: <Building2 className="w-6 h-6" />, title: "Business Center", desc: "Co-working lounge, private desks, and high-speed Wi-Fi building-wide." },
  ];
  return (
    <section className="py-20 bg-foreground text-background" id="amenities">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Amenities</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Resort Living.<br /><em className="text-primary">Newark Address.</em>
            </h2>
            <p className="text-background/70 mb-8 leading-relaxed">
              Every Resipointe property is designed to elevate your daily life — from the moment you walk into the grand lobby to the view from the rooftop at sunset.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {amenities.map((a, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="text-primary">{a.icon}</div>
                  <h4 className="font-semibold text-sm">{a.title}</h4>
                  <p className="text-background/60 text-xs leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/campaigns/amenities">
              <Button className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                Explore All Amenities <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img src={GALLERY_IMAGES[4].url} alt="Rooftop Terrace" className="rounded-2xl w-full object-cover h-96" />
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-5 shadow-xl border border-border">
              <p className="text-xs text-muted-foreground mb-1">Starting From</p>
              <p className="font-serif text-2xl font-bold text-foreground">$2,000<span className="text-sm font-normal text-muted-foreground">/mo effective</span></p>
              <p className="text-xs text-primary font-medium mt-1">2 months free · electricity only</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CollaborationCTA() {
  return (
    <section className="py-16 bg-muted border-y border-border">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Community First</p>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
              Help Shape the Future of Resipointe
            </h2>
            <p className="text-muted-foreground mb-6">
              We're building communities where tenants feel at home. Tell us what matters most — your feedback directly influences our next development decisions.
            </p>
            <div className="flex gap-3">
              <Link href="/collaborate">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                  Share Your Vision <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/social-generator">
                <Button variant="outline" className="rounded-full">
                  Social Media Tools
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Tenant Surveys", desc: "Tell us what you love and what you'd change", icon: "📋" },
              { label: "Feature Voting", desc: "Vote on amenities for future buildings", icon: "🗳️" },
              { label: "Developer Insights", desc: "Data-driven community development", icon: "📊" },
              { label: "Social Generator", desc: "AI-powered campaign content creation", icon: "✨" },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-semibold text-sm text-foreground mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="py-16 bg-background" id="contact">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Get In Touch</p>
          <h2 className="font-serif text-4xl font-bold text-foreground mb-3">Ready to Find Your Home?</h2>
          <p className="text-muted-foreground mb-8">Our team responds within 24 hours. Schedule a tour, ask questions, or apply today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-tour">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                <Calendar className="w-4 h-4 mr-2" /> Schedule a Tour
              </Button>
            </Link>
            <a href="tel:8622771673">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                <Phone className="w-4 h-4 mr-2" /> (862) 277-1673
              </Button>
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Or email us at <a href="mailto:info@resipointe.com" className="text-primary hover:underline">info@resipointe.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-background mb-3">Resipointe</h3>
            <p className="text-background/60 text-sm leading-relaxed">Newark's premier luxury apartment portfolio. 5 properties, modern finishes, resort amenities.</p>
            <p className="text-xs text-background/40 mt-4">© 2025 Resipointe. All rights reserved.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-background mb-3">Properties</h4>
            <ul className="space-y-2 text-sm text-background/60">
              {PROPERTIES.map(p => <li key={p.id}><a href="#properties" className="hover:text-primary transition-colors">{p.name}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-background mb-3">Campaigns</h4>
            <ul className="space-y-2 text-sm text-background/60">
              {CAMPAIGNS.map(c => <li key={c.id}><Link href={c.slug} className="hover:text-primary transition-colors">{c.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-background mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="tel:8622771673" className="hover:text-primary">(862) 277-1673</a></li>
              <li><a href="mailto:info@resipointe.com" className="hover:text-primary">info@resipointe.com</a></li>
              <li><Link href="/book-tour" className="hover:text-primary">Schedule a Tour</Link></li>
              <li><Link href="/collaborate" className="hover:text-primary">Collaboration Hub</Link></li>
              <li><Link href="/social-generator" className="hover:text-primary">Social Generator</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-xs text-background/40">
          <p>*Get 2 months free with a 12-month lease on select apartments. Limited time offer. Pricing subject to change. All images are a combination of photography and artist renderings.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <PropertyGrid />
        <CampaignStrip />
        <CostCalculator />
        <Gallery />
        <AmenitiesSection />
        <CollaborationCTA />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
