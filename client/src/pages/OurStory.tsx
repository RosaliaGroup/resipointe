import { useState } from "react";
import Navbar from "@/components/Navbar";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Building2, Clock, Award, Users, Hammer, Star, Heart, Wifi,
  Dumbbell, TreePine, Car, Dog, Package, Utensils, Bath,
  Tv, Wind, Sun, Coffee, Bike, ShieldCheck, Sparkles,
  ChevronRight, Send, ThumbsUp, Plus, CheckCircle2, MapPin, Calendar,
  X, ZoomIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { GALLERY_IMAGES } from "@shared/data";

// ─── Color tokens (light sand / linen / warm-white) ─────────────────────────
const C = {
  navy:     "oklch(0.22 0.03 55)",   // dark espresso text (for text on light bg)
  navyMid:  "oklch(0.35 0.04 55)",   // medium brown text
  navyLight:"oklch(0.50 0.04 55)",   // muted brown
  gold:     "oklch(0.65 0.11 65)",   // warm amber-gold accent
  goldSoft: "oklch(0.72 0.09 65)",   // softer gold
  goldFaint:"oklch(0.65 0.11 65 / 0.15)",
  slate:    "oklch(0.45 0.03 55)",   // warm dark text
  slateLight:"oklch(0.60 0.03 55)",  // muted warm text
  cream:    "oklch(0.97 0.012 65)",  // warm cream/sand
  sand:     "oklch(0.94 0.018 70)",  // light sand
  linen:    "oklch(0.96 0.010 70)",  // very light linen
  white:    "white",
};

// ─── Timeline (compact) ───────────────────────────────────────────────────────
const TIMELINE = [
  { year: "2005", title: "Founded", body: "First acquisitions in Newark's Ironbound and Downtown districts.", icon: Building2 },
  { year: "2010", title: "First Ground-Up Build", body: "24-unit Market Street building — modern design, quality finishes.", icon: Hammer },
  { year: "2015", title: "Portfolio of 5", body: "Over 200 luxury residences across Newark's best corridors.", icon: Award },
  { year: "2019", title: "Iron Pointe Opens", body: "80 residences, rooftop terrace, NYC views, 24-hr security.", icon: Star },
  { year: "2023", title: "Tenant Collaboration", body: "Formal program: future tenants shape upcoming building designs.", icon: Users },
  { year: "2025+", title: "Next Chapter", body: "3 new developments shaped by your votes on this page.", icon: Sparkles },
];

// ─── Pipeline ─────────────────────────────────────────────────────────────────
const PIPELINE = [
  {
    id: "madison-north",
    name: "Madison North",
    address: "55 Madison St, Newark NJ",
    status: "Pre-Development",
    statusColor: C.gold,
    units: 120,
    target: "Q3 2027",
    description: "A 12-story mixed-use tower rising north of Iron Pointe. Co-working floor, rooftop pool, ground-floor retail, and EV charging — shaped by tenant input.",
    highlights: ["Rooftop Pool", "Co-Working Floors", "Ground Floor Retail", "EV Charging"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  {
    id: "university-commons",
    name: "University Commons",
    address: "180 University Ave, Newark NJ",
    status: "Design Phase",
    statusColor: "oklch(0.55 0.18 200)",
    units: 85,
    target: "Q1 2027",
    description: "Micro-units and 1-bedrooms for young professionals and grad students. Walkable to NJIT, Rutgers-Newark, and the PATH train.",
    highlights: ["Micro-Units", "Study Lounges", "Bike Storage", "Smart Home Tech"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    id: "ironbound-lofts",
    name: "Ironbound Lofts",
    address: "312 Ferry St, Newark NJ",
    status: "Land Acquisition",
    statusColor: "oklch(0.55 0.14 140)",
    units: 60,
    target: "Q4 2027",
    description: "Loft-style residences celebrating the Ironbound's industrial heritage — exposed brick, high ceilings, open plans. Steps from Ferry Street dining.",
    highlights: ["Loft-Style Units", "Exposed Brick", "High Ceilings", "Steps to Dining"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
];

// ─── Feature categories ───────────────────────────────────────────────────────
const FEATURE_CATEGORIES = [
  {
    id: "kitchen", label: "Kitchen & Dining", icon: Utensils, color: C.gold,
    features: [
      { id: "quartz-counters", label: "Quartz Countertops" },
      { id: "island-kitchen", label: "Kitchen Island" },
      { id: "gas-range", label: "Gas Range / Stove" },
      { id: "wine-fridge", label: "Wine Refrigerator" },
      { id: "pantry", label: "Walk-In Pantry" },
      { id: "smart-fridge", label: "Smart Refrigerator" },
    ],
  },
  {
    id: "bathroom", label: "Bathroom & Spa", icon: Bath, color: "oklch(0.55 0.14 220)",
    features: [
      { id: "rain-shower", label: "Rain Shower Head" },
      { id: "soaking-tub", label: "Soaking Tub" },
      { id: "heated-floors", label: "Heated Bathroom Floors" },
      { id: "double-vanity", label: "Double Vanity" },
      { id: "smart-mirror", label: "Smart Mirror" },
      { id: "towel-warmer", label: "Towel Warmer" },
    ],
  },
  {
    id: "tech", label: "Smart Home & Tech", icon: Wifi, color: "oklch(0.50 0.18 260)",
    features: [
      { id: "smart-lock", label: "Smart Lock / Keyless Entry" },
      { id: "fiber-internet", label: "Fiber Internet Included" },
      { id: "smart-thermostat", label: "Smart Thermostat" },
      { id: "ev-charging", label: "EV Charging in Parking" },
      { id: "usb-outlets", label: "USB Outlets Throughout" },
      { id: "video-doorbell", label: "Video Doorbell" },
    ],
  },
  {
    id: "laundry", label: "Laundry & Storage", icon: Package, color: "oklch(0.55 0.14 45)",
    features: [
      { id: "in-unit-wd", label: "In-Unit Washer/Dryer" },
      { id: "walk-in-closet", label: "Walk-In Closet" },
      { id: "extra-storage", label: "Extra Storage Unit" },
      { id: "mudroom", label: "Mudroom / Entry Closet" },
      { id: "linen-closet", label: "Linen Closet" },
      { id: "bike-storage", label: "Secure Bike Storage" },
    ],
  },
  {
    id: "amenities", label: "Building Amenities", icon: Dumbbell, color: "oklch(0.50 0.16 160)",
    features: [
      { id: "rooftop-pool", label: "Rooftop Pool" },
      { id: "coworking", label: "Co-Working / Business Center" },
      { id: "yoga-studio", label: "Yoga / Meditation Studio" },
      { id: "game-room", label: "Game Room / Lounge" },
      { id: "package-room", label: "Smart Package Room" },
      { id: "concierge", label: "24/7 Concierge" },
    ],
  },
  {
    id: "outdoor", label: "Outdoor & Community", icon: TreePine, color: "oklch(0.55 0.16 140)",
    features: [
      { id: "private-balcony", label: "Private Balcony / Terrace" },
      { id: "dog-park", label: "Dog Park / Pet Area" },
      { id: "bbq-grills", label: "BBQ Grills & Outdoor Dining" },
      { id: "garden", label: "Community Garden" },
      { id: "fire-pit", label: "Outdoor Fire Pit" },
      { id: "kids-play", label: "Children's Play Area" },
    ],
  },
  {
    id: "comfort", label: "Comfort & Climate", icon: Wind, color: "oklch(0.55 0.12 200)",
    features: [
      { id: "central-ac", label: "Central A/C & Heat" },
      { id: "floor-heat", label: "Radiant Floor Heating" },
      { id: "blackout-shades", label: "Motorized Blackout Shades" },
      { id: "soundproofing", label: "Enhanced Soundproofing" },
      { id: "natural-light", label: "Floor-to-Ceiling Windows" },
      { id: "ceiling-fans", label: "Ceiling Fans" },
    ],
  },
  {
    id: "lifestyle", label: "Lifestyle & Wellness", icon: Coffee, color: "oklch(0.60 0.14 30)",
    features: [
      { id: "coffee-bar", label: "Resident Coffee Bar" },
      { id: "spa", label: "Sauna / Steam Room" },
      { id: "dog-wash", label: "Pet Washing Station" },
      { id: "bike-repair", label: "Bike Repair Station" },
      { id: "car-wash", label: "Car Wash Bay" },
      { id: "shuttle", label: "Shuttle to Transit Hub" },
    ],
  },
];

// ─── Gallery filter categories ────────────────────────────────────────────────
const GALLERY_FILTERS = [
  { id: "all", label: "All Photos" },
  { id: "exterior", label: "Buildings" },
  { id: "interior", label: "Interiors" },
  { id: "amenities", label: "Amenities" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function OurStory() {
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState("kitchen");
  const [dreamFeature, setDreamFeature] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const voteMutation = trpc.survey.vote.useMutation({
    onError: () => toast.error("Vote could not be saved, but we noted it!"),
  });

  const dreamMutation = trpc.collaboration.submitDream.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Thank you! Your idea has been shared with our design team.");
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const handleVote = (featureId: string, featureLabel: string, category: string) => {
    if (votes[featureId]) return;
    setVotes(prev => ({ ...prev, [featureId]: true }));
    voteMutation.mutate({ featureId, featureLabel, category });
    toast.success(`Voted for "${featureLabel}"!`);
  };

  const handleDreamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamFeature.trim()) return;
    dreamMutation.mutate({ feature: dreamFeature, name: submitterName, email: submitterEmail });
  };

  const activeCat = FEATURE_CATEGORIES.find(c => c.id === activeCategory)!;
  const filteredGallery = galleryFilter === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(g => g.category === galleryFilter);
  const lightboxImg = GALLERY_IMAGES.find(g => g.id === lightboxId);

  return (
    <>
      <Navbar />

      <title>Our Story & Collaborate | Resipointe Newark Luxury Apartments</title>
      <meta name="description" content="Learn about Resipointe's 20-year history building luxury communities in Newark, NJ. See upcoming pipeline projects and vote on features for our next buildings." />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[65vh] flex items-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, oklch(0.93 0.022 70) 0%, oklch(0.96 0.015 68) 60%, oklch(0.98 0.010 65) 100%)` }}
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(oklch(0.65 0.11 65 / 0.35) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Gold accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: C.gold }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: C.gold }} />
              <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: C.goldSoft }}>
                Built Together · Since 2005
              </span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl font-light leading-[1.1] mb-5" style={{ color: C.navy }}>
              We Don't Just Build
              <span className="block italic" style={{ color: C.gold }}> Apartments.</span>
              We Build Homes.
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: C.navyLight }}>
              For two decades, Resipointe has believed that the best homes are shaped by the people who live in them. Our story is one of community, craftsmanship, and a genuine commitment to making Newark's most livable neighborhoods even better.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#collaborate"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: C.gold, color: C.navy }}
              >
                <Heart className="w-4 h-4" />
                Shape Our Next Building
              </a>
              <a
                href="#pipeline"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-all hover:bg-white/10"
                style={{ borderColor: `${C.gold}80`, color: C.gold, background: 'white' }}
              >
                <Building2 className="w-4 h-4" />
                See What's Coming
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "20+", label: "Years in Newark", icon: Clock },
              { value: "5", label: "Active Properties", icon: Building2 },
              { value: "245+", label: "Luxury Residences", icon: Users },
              { value: "3", label: "Projects in Pipeline", icon: Hammer },
            ].map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl p-6 border shadow-sm"
                style={{
                  background: "white",
                  borderColor: `${C.gold}30`,
                }}
              >
                <Icon className="w-5 h-5 mb-3" style={{ color: C.gold }} />
                <div className="text-3xl font-light mb-1 font-serif" style={{ color: C.navy }}>{value}</div>
                <div className="text-xs" style={{ color: C.slateLight }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY BAND ──────────────────────────────────────────────── */}
      <section style={{ background: C.gold }} className="py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-base font-semibold tracking-wide" style={{ color: C.navy }}>
            "A Resipointe home is not finished when the last nail is driven — it's finished when the community that lives there feels truly at home."
          </p>
          <p className="text-xs mt-1.5 font-medium" style={{ color: `${C.navy}99` }}>— Resipointe Development Team</p>
        </div>
      </section>

      {/* ── COMPACT TIMELINE ─────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: C.cream }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: C.gold }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.slate }}>Our Journey</span>
              <div className="h-px w-10" style={{ background: C.gold }} />
            </div>
            <h2 className="font-serif text-3xl font-light text-foreground">Two Decades of Building Community</h2>
          </div>

          {/* Horizontal compact timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute top-6 left-0 right-0 h-px hidden lg:block"
              style={{ background: `linear-gradient(90deg, transparent, ${C.gold}50, ${C.gold}80, ${C.gold}50, transparent)` }}
            />
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {TIMELINE.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={item.year} className="relative flex flex-col items-center text-center group">
                    {/* Dot */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3 z-10 border-2 transition-all group-hover:scale-110"
                      style={{
                        background: i === TIMELINE.length - 1 ? C.gold : C.navy,
                        borderColor: C.gold,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: i === TIMELINE.length - 1 ? C.navy : C.gold }} />
                    </div>
                    <div className="text-xs font-bold tracking-widest mb-1" style={{ color: C.gold }}>{item.year}</div>
                    <div className="text-sm font-semibold text-foreground mb-1">{item.title}</div>
                    <div className="text-xs leading-relaxed text-muted-foreground">{item.body}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PIPELINE ─────────────────────────────────────────────────────── */}
      <section id="pipeline" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: C.gold }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.slate }}>Coming Soon</span>
              <div className="h-px w-10" style={{ background: C.gold }} />
            </div>
            <h2 className="font-serif text-3xl font-light text-foreground mb-3">Projects in the Pipeline</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              These three developments are being shaped right now — by our team and by future tenants like you. Vote on features below to directly influence what gets built.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-7">
            {PIPELINE.map(project => (
              <div
                key={project.id}
                className="rounded-2xl overflow-hidden border bg-card shadow-sm hover:shadow-lg transition-all group"
                style={{ borderColor: `${C.gold}30` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                  <span
                    className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-bold shadow"
                    style={{ background: project.statusColor, color: "white" }}
                  >
                    {project.status}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white text-xs font-medium">
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{project.units} units</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.target}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{project.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" />{project.address}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.highlights.map(h => (
                      <span
                        key={h}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: C.goldFaint, color: "oklch(0.45 0.12 75)" }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-20" style={{ background: C.cream }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: C.gold }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.slate }}>Photo Gallery</span>
              <div className="h-px w-10" style={{ background: C.gold }} />
            </div>
            <h2 className="font-serif text-3xl font-light text-foreground mb-3">See Our Properties</h2>
            <p className="text-sm text-muted-foreground">Real photos from our buildings — exteriors, interiors, and amenities.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {GALLERY_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setGalleryFilter(f.id)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all border"
                style={{
                  background: galleryFilter === f.id ? C.gold : "white",
                  color: galleryFilter === f.id ? "white" : C.slate,
                  borderColor: galleryFilter === f.id ? C.gold : `${C.gold}40`,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredGallery.map((img, i) => (
              <div
                key={img.id}
                className="relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer group shadow-sm hover:shadow-md transition-all"
                onClick={() => setLightboxId(img.id)}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ aspectRatio: i % 3 === 1 ? "4/5" : "4/3" }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-xs font-medium">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "oklch(0.05 0.02 240 / 0.92)" }}
          onClick={() => setLightboxId(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-yellow-300 transition-colors"
            onClick={() => setLightboxId(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightboxImg.url} alt={lightboxImg.caption} className="w-full rounded-2xl shadow-2xl object-contain max-h-[80vh]" />
            <p className="text-center text-white text-sm mt-3 font-medium">{lightboxImg.caption}</p>
          </div>
        </div>
      )}

      {/* ── COLLABORATION HUB ────────────────────────────────────────────── */}
      <section id="collaborate" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: C.gold }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.slate }}>Your Voice Builds This</span>
              <div className="h-px w-10" style={{ background: C.gold }} />
            </div>
            <h2 className="font-serif text-3xl font-light text-foreground mb-3">Build Your Dream Home With Us</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're designing our next three buildings right now. Every vote is reviewed by our design team — the most-requested features get built. This is real collaboration, not a survey that disappears.
            </p>
          </div>

          {/* How it works — compact */}
          <div className="grid grid-cols-3 gap-4 mb-10 p-6 rounded-2xl border" style={{ borderColor: `${C.gold}25`, background: C.cream }}>
            {[
              { step: "01", title: "Vote on Features", desc: "Upvote what you'd love in your new home.", icon: ThumbsUp },
              { step: "02", title: "Submit Your Idea", desc: "Have something we haven't listed? Tell us.", icon: Plus },
              { step: "03", title: "We Build It", desc: "Top-voted features get prioritized in our pipeline.", icon: Hammer },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: C.goldFaint }}
                >
                  <Icon className="w-4 h-4" style={{ color: C.gold }} />
                </div>
                <div className="text-xs font-bold tracking-widest mb-1" style={{ color: C.gold }}>{step}</div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FEATURE_CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border"
                  style={{
                    background: isActive ? C.gold : "white",
                    color: isActive ? "white" : C.slate,
                    borderColor: isActive ? C.gold : `${C.gold}40`,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Feature voting grid */}
          <div
            className="rounded-2xl border p-6 mb-10"
            style={{ borderColor: `${C.gold}25`, background: C.cream }}
          >
            <div className="flex items-center gap-3 mb-5">
              {(() => { const Icon = activeCat.icon; return <Icon className="w-5 h-5" style={{ color: activeCat.color }} />; })()}
              <h3 className="font-semibold text-foreground">{activeCat.label}</h3>
              <span className="text-xs text-muted-foreground ml-auto">Click to vote — your votes are saved</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeCat.features.map(feature => {
                const voted = votes[feature.id];
                return (
                  <button
                    key={feature.id}
                    onClick={() => handleVote(feature.id, feature.label, activeCat.id)}
                    className="flex items-center gap-3 p-4 rounded-xl border text-left transition-all group"
                    style={{
                      borderColor: voted ? C.gold : "oklch(0.85 0.03 240)",
                      background: voted ? C.goldFaint : "white",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ background: voted ? C.gold : "oklch(0.93 0.02 240)" }}
                    >
                      {voted
                        ? <CheckCircle2 className="w-4 h-4 text-white" />
                        : <ThumbsUp className="w-4 h-4 text-muted-foreground group-hover:scale-110 transition-transform" />
                      }
                    </div>
                    <span className="text-sm font-medium" style={{ color: voted ? "oklch(0.45 0.12 75)" : "oklch(0.30 0.04 240)" }}>
                      {feature.label}
                    </span>
                    {voted && <span className="ml-auto text-xs font-bold" style={{ color: C.gold }}>✓ Voted</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dream feature submission */}
          <div
            className="rounded-2xl border p-8"
            style={{ borderColor: `${C.gold}30`, background: `linear-gradient(135deg, oklch(0.93 0.022 70) 0%, oklch(0.96 0.015 68) 100%)` }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: C.gold }} />
              <h3 className="font-serif text-2xl font-light mb-2" style={{ color: C.navy }}>Have a Feature We Haven't Listed?</h3>
              <p className="text-sm mb-6" style={{ color: C.navyLight }}>
                Our design team reads every submission. If your idea resonates with other future tenants, it could end up in our next building.
              </p>

              {submitted ? (
                <div className="rounded-xl p-6 flex flex-col items-center gap-3" style={{ background: `${C.gold}20` }}>
                  <CheckCircle2 className="w-10 h-10" style={{ color: C.gold }} />
                  <p className="font-semibold" style={{ color: C.navy }}>Your idea has been submitted!</p>
                  <p className="text-sm" style={{ color: C.navyLight }}>
                    Our design team will review it. Thank you for helping shape the next Resipointe community.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDreamSubmit} className="space-y-4 text-left">
                  <Textarea
                    value={dreamFeature}
                    onChange={e => setDreamFeature(e.target.value)}
                    placeholder="Describe your dream feature... e.g. 'A rooftop herb garden where residents can grow their own food'"
                    rows={4}
                    className="resize-none text-sm border"
                    style={{ background: "white", color: C.navy, borderColor: `${C.gold}40` }}
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input
                      value={submitterName}
                      onChange={e => setSubmitterName(e.target.value)}
                      placeholder="Your name (optional)"
                    className="border text-sm"
                    style={{ background: "white", color: C.navy, borderColor: `${C.gold}40` }}
                  />
                    <Input
                      value={submitterEmail}
                      onChange={e => setSubmitterEmail(e.target.value)}
                      placeholder="Email to be notified (optional)"
                      type="email"
                      className="border text-sm"
                      style={{ background: "white", color: C.navy, borderColor: `${C.gold}40` }}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!dreamFeature.trim() || dreamMutation.isPending}
                    className="w-full gap-2 font-semibold"
                    style={{ background: C.gold, color: C.navy }}
                  >
                    <Send className="w-4 h-4" />
                    {dreamMutation.isPending ? "Submitting..." : "Submit My Dream Feature"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-20 text-center"
        style={{ background: `linear-gradient(135deg, oklch(0.93 0.022 70) 0%, oklch(0.96 0.015 68) 100%)` }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <ShieldCheck className="w-10 h-10 mx-auto mb-4" style={{ color: C.gold }} />
          <h2 className="font-serif text-3xl font-light mb-4" style={{ color: C.navy }}>Ready to Make Newark Home?</h2>
          <p className="text-sm mb-8" style={{ color: C.navyLight }}>
            Tour our current properties or register your interest in an upcoming building. Either way, you're joining a community built with you in mind.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/book-tour"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: C.gold, color: C.navy }}
            >
              <Calendar className="w-4 h-4" />
              Schedule a Tour
            </a>
            <a
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm border transition-all hover:bg-white/10"
              style={{ borderColor: `${C.gold}70`, color: C.gold, background: 'white' }}
            >
              <Building2 className="w-4 h-4" />
              View All Properties
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t border-border">
        <p className="text-xs text-muted-foreground">© 2026 Resipointe. All rights reserved. Newark, NJ.</p>
      </footer>
    </>
  );
}
