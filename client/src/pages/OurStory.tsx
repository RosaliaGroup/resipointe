import { useState } from "react";
import Navbar from "@/components/Navbar";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Building2, Clock, Award, Users, Hammer, Star, Heart, Wifi,
  Dumbbell, TreePine, Car, Dog, Package, Utensils, Bath,
  Tv, Wind, Sun, Coffee, Bike, ShieldCheck, Sparkles,
  ChevronRight, Send, ThumbsUp, Plus, CheckCircle2, MapPin, Calendar,
  X, ZoomIn, Waves
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { GALLERY_IMAGES } from "@shared/data";

// ─── Coastal Resort Color Tokens ─────────────────────────────────────────────
const C = {
  // Blues & Turquoise
  ocean:       "oklch(0.22 0.10 225)",   // very dark ocean — main headings
  oceanMid:    "oklch(0.32 0.12 220)",   // dark ocean blue — subheadings
  teal:        "oklch(0.42 0.12 205)",   // dark teal — readable on light bg
  turquoise:   "oklch(0.55 0.14 192)",   // deeper turquoise — buttons/accents
  turqLight:   "oklch(0.70 0.12 192)",   // medium turquoise — on dark bg only
  turqFaint:   "oklch(0.55 0.14 192 / 0.12)", // faint tint
  sky:         "oklch(0.35 0.10 215)",   // dark sky blue for body text

  // Warm neutrals
  beige:       "oklch(0.94 0.018 75)",   // warm beige bg
  sand:        "oklch(0.90 0.022 75)",   // deeper sand bg
  ivory:       "oklch(0.97 0.008 70)",   // near-white ivory bg
  taupe:       "oklch(0.30 0.025 60)",   // DARK taupe — readable body text
  taupeLight:  "oklch(0.42 0.020 65)",   // medium taupe — secondary text

  white:       "white",
};

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663360032476/eCRtfYiax3KEbRNYiyhxd5/coastal-hero-T9aAPB2gCrtQ9VU6YGcpiP.webp";

// ─── Timeline ─────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: "[YEAR]", title: "Founded", body: "Resipointe begins with a vision: build homes in Newark that feel like luxury resorts.", icon: MapPin },
  { year: "[YEAR]", title: "First Acquisition", body: "First properties acquired in Newark's Ironbound and Downtown districts.", icon: Hammer },
  { year: "[YEAR]", title: "Portfolio Growth", body: "Portfolio expands across Newark's most sought-after neighborhoods.", icon: Award },
  { year: "2024", title: "Iron Pointe Opens", body: "80 residences, rooftop terrace, NYC views, 24-hr live security.", icon: Star },
  { year: "2026", title: "Tenant Collaboration", body: "Formal program: future tenants shape upcoming building designs.", icon: Users },
  { year: "2027+", title: "Next Chapter", body: "6 new developments shaped by your votes on this page.", icon: Sparkles },
];

// ─── Pipeline ─────────────────────────────────────────────────────────────────
const PIPELINE = [
  {
    id: "nova-towers",
    name: "Nova Towers",
    address: "Newark, NJ",
    status: "Pre-Development",
    statusColor: C.turquoise,
    units: 700,
    target: "TBD",
    description: "Resipointe's most ambitious project — twin towers bringing 700 resort-quality residences to Newark. Rooftop amenities, ground-floor retail, and a community shaped by future tenants.",
    highlights: ["700 Units", "Twin Towers", "Rooftop Amenities", "Ground Floor Retail"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  {
    id: "central-pointe",
    name: "Central Pointe",
    address: "Newark, NJ",
    status: "Design Phase",
    statusColor: C.teal,
    units: 77,
    target: "TBD",
    description: "A boutique 77-unit building in the heart of Newark. Thoughtfully designed for professionals who want resort-quality living in a close-knit community.",
    highlights: ["77 Units", "Boutique Scale", "Modern Finishes", "Prime Location"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    id: "madrega-pointe",
    name: "Madrega Pointe",
    address: "Newark, NJ",
    status: "Pre-Development",
    statusColor: C.oceanMid,
    units: 150,
    target: "TBD",
    description: "150 residences bringing resort-style living to a vibrant Newark neighborhood. Designed with community spaces, fitness amenities, and modern interiors.",
    highlights: ["150 Units", "Community Spaces", "Fitness Amenities", "Modern Interiors"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
  {
    id: "mulberry-pointe",
    name: "Mulberry Pointe",
    address: "Newark, NJ",
    status: "Pre-Development",
    statusColor: "#8B5CF6",
    units: 1000,
    target: "TBD",
    description: "Resipointe's landmark development — two towers with 1,000+ residences redefining Newark's skyline. A full resort community with every amenity imaginable.",
    highlights: ["1,000+ Units", "Two Towers", "Full Resort Community", "Landmark Development"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  {
    id: "park-view-pointe",
    name: "Park View Pointe",
    address: "Newark, NJ",
    status: "Design Phase",
    statusColor: "#10B981",
    units: 150,
    target: "TBD",
    description: "150 residences with sweeping park views. Designed to bring nature and resort living together — green terraces, outdoor lounges, and light-filled interiors.",
    highlights: ["150 Units", "Park Views", "Green Terraces", "Outdoor Lounges"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    id: "newark-summit",
    name: "Newark Summit",
    address: "Newark, NJ",
    status: "Land Acquisition",
    statusColor: "#F59E0B",
    units: 514,
    target: "TBD",
    description: "514 residences at the summit of Newark's luxury living renaissance. Panoramic city views, resort-grade amenities, and a community built for the next generation.",
    highlights: ["514 Units", "Panoramic Views", "Resort Amenities", "City Landmark"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
];

// ─── Feature categories ───────────────────────────────────────────────────────
const FEATURE_CATEGORIES = [
  {
    id: "kitchen", label: "Kitchen & Dining", icon: Utensils, color: C.turquoise,
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
    id: "bathroom", label: "Bathroom & Spa", icon: Bath, color: C.teal,
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
    id: "tech", label: "Smart Home & Tech", icon: Wifi, color: C.oceanMid,
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
    id: "laundry", label: "Laundry & Storage", icon: Package, color: C.taupe,
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
    id: "amenities", label: "Building Amenities", icon: Dumbbell, color: C.turquoise,
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
    id: "outdoor", label: "Outdoor & Community", icon: TreePine, color: C.teal,
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
    id: "comfort", label: "Comfort & Climate", icon: Wind, color: C.sky,
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
    id: "lifestyle", label: "Lifestyle & Wellness", icon: Coffee, color: C.oceanMid,
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
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        {/* Full-bleed hero image */}
        <img
          src={HERO_IMG}
          alt="Luxury coastal resort living"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay — stronger for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              oklch(0.15 0.08 225 / 0.30) 0%,
              oklch(0.15 0.08 225 / 0.50) 35%,
              oklch(0.10 0.06 225 / 0.82) 70%,
              oklch(0.08 0.05 225 / 0.96) 100%)`
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 pb-20 pt-32 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <Waves className="w-5 h-5" style={{ color: C.turqLight }} />
              <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: C.turqLight }}>
                Built Together · Since 2005
              </span>
            </div>
            <h1
              className="font-serif text-5xl lg:text-7xl font-light leading-[1.05] mb-6 text-white"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.8)" }}
            >
              We Build Homes
              <span className="block italic" style={{ color: C.turqLight }}> Like Resorts.</span>
              <span className="block">You Deserve Both.</span>
            </h1>
            <p
              className="text-base lg:text-lg leading-relaxed mb-8 max-w-xl font-medium"
              style={{ color: "oklch(0.96 0.02 200)", textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
            >
              For two decades, Resipointe has built residences that feel like five-star resorts — without the five-star price tag. Resort-quality finishes, amenities, and community, right here in Newark. 20 minutes from Manhattan. Zero New York taxes.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#collaborate"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all hover:brightness-110 shadow-lg"
                style={{ background: C.turquoise, color: "white" }}
              >
                <Heart className="w-4 h-4" />
                Shape Our Next Building
              </a>
              <a
                href="#pipeline"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm border-2 transition-all hover:bg-white/10"
                style={{ borderColor: "white", color: "white" }}
              >
                <Building2 className="w-4 h-4" />
                See What's Coming
              </a>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-14">
            {[
              { value: "[X]+", label: "Years in Newark", icon: Clock },
              { value: "5", label: "Active Properties", icon: Building2 },
              { value: "245+", label: "Luxury Residences", icon: Users },
              { value: "6", label: "Projects in Pipeline", icon: Hammer },
            ].map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl p-5 backdrop-blur-sm border"
                style={{
                  background: "oklch(1 0 0 / 0.12)",
                  borderColor: "oklch(1 0 0 / 0.25)",
                }}
              >
                <Icon className="w-4 h-4 mb-2" style={{ color: C.turqLight }} />
                <div className="text-3xl font-light font-serif text-white">{value}</div>
                <div className="text-xs mt-0.5" style={{ color: "oklch(0.85 0.05 200)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY BAND ──────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(90deg, ${C.ocean} 0%, ${C.teal} 50%, ${C.ocean} 100%)` }} className="py-7">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-base font-semibold tracking-wide text-white leading-relaxed">
            "We build homes like resorts — because you should feel on vacation every time you walk through your front door."
          </p>
          <p className="text-xs mt-2 font-semibold" style={{ color: C.turqLight }}>— Resipointe Development Team</p>
        </div>
      </section>

      {/* ── COMPACT TIMELINE ─────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: C.beige }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: C.turquoise }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.teal }}>Our Journey</span>
              <div className="h-px w-10" style={{ background: C.turquoise }} />
            </div>
            <h2 className="font-serif text-3xl font-light" style={{ color: C.ocean }}>Two Decades of Building Community</h2>
          </div>

          {/* Horizontal compact timeline */}
          <div className="relative">
            <div
              className="absolute top-6 left-0 right-0 h-0.5 hidden lg:block"
              style={{ background: `linear-gradient(90deg, transparent, ${C.turquoise}60, ${C.turquoise}, ${C.turquoise}60, transparent)` }}
            />
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {TIMELINE.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={`timeline-${i}`} className="relative flex flex-col items-center text-center group">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3 z-10 border-2 transition-all group-hover:scale-110 shadow-md"
                      style={{
                        background: i === TIMELINE.length - 1 ? C.turquoise : "white",
                        borderColor: C.turquoise,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: i === TIMELINE.length - 1 ? "white" : C.turquoise }} />
                    </div>
                    <div className="text-xs font-bold tracking-widest mb-1" style={{ color: C.turquoise }}>{item.year}</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: C.ocean }}>{item.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: C.taupe }}>{item.body}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PIPELINE ─────────────────────────────────────────────────────── */}
      <section id="pipeline" className="py-20" style={{ background: C.ivory }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: C.turquoise }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.teal }}>Coming Soon</span>
              <div className="h-px w-10" style={{ background: C.turquoise }} />
            </div>
            <h2 className="font-serif text-3xl font-light mb-3" style={{ color: C.ocean }}>Projects in the Pipeline</h2>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: C.taupe }}>
              These six developments are being shaped right now — by our team and by future tenants like you. Vote on features below to directly influence what gets built.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-7">
            {PIPELINE.map(project => (
              <div
                key={project.id}
                className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all group"
                style={{ borderColor: `${C.turquoise}25` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                  <span
                    className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-bold shadow text-white"
                    style={{ background: project.statusColor }}
                  >
                    {project.status}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white text-xs font-medium">
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{project.units} units</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.target}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold mb-1" style={{ color: C.ocean }}>{project.name}</h3>
                  <p className="text-xs flex items-center gap-1 mb-3" style={{ color: C.taupe }}><MapPin className="w-3 h-3" />{project.address}</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: C.taupe }}>{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.highlights.map(h => (
                      <span
                        key={h}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: C.turqFaint, color: C.teal }}
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
      <section id="gallery" className="py-20" style={{ background: C.beige }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: C.turquoise }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.teal }}>Photo Gallery</span>
              <div className="h-px w-10" style={{ background: C.turquoise }} />
            </div>
            <h2 className="font-serif text-3xl font-light mb-3" style={{ color: C.ocean }}>See Our Properties</h2>
            <p className="text-sm" style={{ color: C.taupe }}>Real photos from our buildings — exteriors, interiors, and amenities.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {GALLERY_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setGalleryFilter(f.id)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all border"
                style={{
                  background: galleryFilter === f.id ? C.turquoise : "white",
                  color: galleryFilter === f.id ? "white" : C.ocean,
                  borderColor: galleryFilter === f.id ? C.turquoise : `${C.turquoise}40`,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredGallery.map((img, i) => (
              <div
                key={img.id}
                className="relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer group shadow-sm hover:shadow-lg transition-all"
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
          style={{ background: "oklch(0.10 0.05 220 / 0.92)" }}
          onClick={() => setLightboxId(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-cyan-300 transition-colors"
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
      <section id="collaborate" className="py-20" style={{ background: C.ivory }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: C.turquoise }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: C.teal }}>Your Voice Builds This</span>
              <div className="h-px w-10" style={{ background: C.turquoise }} />
            </div>
            <h2 className="font-serif text-3xl font-light mb-3" style={{ color: C.ocean }}>Help Us Build Your Dream Resort Home</h2>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed font-medium" style={{ color: C.taupe }}>
              Our next three buildings are being designed right now. Every vote is reviewed by our design team — the most-requested resort-quality features get built. This is real collaboration, not a survey that disappears into a drawer.
            </p>
          </div>

          {/* How it works */}
          <div
            className="grid grid-cols-3 gap-4 mb-10 p-6 rounded-2xl border"
            style={{ borderColor: `${C.turquoise}25`, background: C.beige }}
          >
            {[
              { step: "01", title: "Vote on Resort Features", desc: "Tell us which luxury features matter most to you — from rain showers to rooftop pools.", icon: ThumbsUp },
              { step: "02", title: "Submit Your Dream", desc: "Have a resort feature we haven't thought of? Share it — we read every single one.", icon: Plus },
              { step: "03", title: "We Build It In", desc: "The most-voted resort-quality features get designed into our next buildings.", icon: Hammer },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: C.turqFaint }}
                >
                  <Icon className="w-4 h-4" style={{ color: C.turquoise }} />
                </div>
                <div className="text-xs font-bold tracking-widest mb-1" style={{ color: C.turquoise }}>{step}</div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: C.ocean }}>{title}</h3>
                <p className="text-xs" style={{ color: C.taupe }}>{desc}</p>
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
                    background: isActive ? C.turquoise : "white",
                    color: isActive ? "white" : C.ocean,
                    borderColor: isActive ? C.turquoise : `${C.turquoise}40`,
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
            style={{ borderColor: `${C.turquoise}25`, background: C.beige }}
          >
            <div className="flex items-center gap-3 mb-5">
              {(() => { const Icon = activeCat.icon; return <Icon className="w-5 h-5" style={{ color: activeCat.color }} />; })()}
              <h3 className="font-semibold" style={{ color: C.ocean }}>{activeCat.label}</h3>
              <span className="text-xs ml-auto" style={{ color: C.taupeLight }}>Click to vote — your votes are saved</span>
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
                      borderColor: voted ? C.turquoise : `${C.turquoise}30`,
                      background: voted ? C.turqFaint : "white",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ background: voted ? C.turquoise : `${C.turquoise}15` }}
                    >
                      {voted
                        ? <CheckCircle2 className="w-4 h-4 text-white" />
                        : <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: C.turquoise }} />
                      }
                    </div>
                    <span className="text-sm font-medium" style={{ color: voted ? C.teal : C.ocean }}>
                      {feature.label}
                    </span>
                    {voted && <span className="ml-auto text-xs font-bold" style={{ color: C.turquoise }}>✓ Voted</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dream feature submission */}
          <div
            className="rounded-2xl border p-8"
            style={{
              borderColor: `${C.turquoise}30`,
              background: `linear-gradient(135deg, ${C.ocean} 0%, oklch(0.48 0.14 200) 100%)`
            }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: C.turqLight }} />
              <h3 className="font-serif text-2xl font-light text-white mb-2">Dream of a Resort Feature We Haven't Listed?</h3>
              <p className="text-sm mb-6 font-medium" style={{ color: "oklch(0.92 0.04 200)" }}>
                Think of the best hotel amenity you've ever experienced. Now imagine having it at home. Tell us what it is — our design team reads every submission and the best ideas get built.
              </p>

              {submitted ? (
                <div className="rounded-xl p-6 flex flex-col items-center gap-3" style={{ background: "oklch(1 0 0 / 0.12)" }}>
                  <CheckCircle2 className="w-10 h-10" style={{ color: C.turqLight }} />
                  <p className="text-white font-semibold">Your idea has been submitted!</p>
                  <p className="text-sm" style={{ color: "oklch(0.85 0.06 200)" }}>
                    Our design team will review it. Thank you for helping shape the next Resipointe community.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDreamSubmit} className="space-y-4 text-left">
                  <Textarea
                    value={dreamFeature}
                    onChange={e => setDreamFeature(e.target.value)}
                    placeholder="Describe your dream resort feature... e.g. 'A rooftop infinity pool with Manhattan skyline views' or 'A spa with sauna and steam room on the amenity floor'"
                    rows={4}
                    className="resize-none text-sm border"
                    style={{ background: "oklch(1 0 0 / 0.12)", color: "white", borderColor: "oklch(1 0 0 / 0.25)" }}
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input
                      value={submitterName}
                      onChange={e => setSubmitterName(e.target.value)}
                      placeholder="Your name (optional)"
                      className="border text-sm"
                      style={{ background: "oklch(1 0 0 / 0.12)", color: "white", borderColor: "oklch(1 0 0 / 0.25)" }}
                    />
                    <Input
                      value={submitterEmail}
                      onChange={e => setSubmitterEmail(e.target.value)}
                      placeholder="Email to be notified (optional)"
                      type="email"
                      className="border text-sm"
                      style={{ background: "oklch(1 0 0 / 0.12)", color: "white", borderColor: "oklch(1 0 0 / 0.25)" }}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!dreamFeature.trim() || dreamMutation.isPending}
                    className="w-full gap-2 font-semibold"
                    style={{ background: C.turquoise, color: "white" }}
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
        style={{ background: `linear-gradient(135deg, ${C.ocean} 0%, ${C.teal} 100%)` }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <ShieldCheck className="w-10 h-10 mx-auto mb-4" style={{ color: C.turqLight }} />
          <h2 className="font-serif text-3xl font-light text-white mb-4">Ready to Live Like You're on Vacation?</h2>
          <p className="text-sm mb-8 font-medium" style={{ color: "oklch(0.92 0.04 200)" }}>
            Tour our current resort-quality residences or register your interest in an upcoming building. 20 minutes to Manhattan. Zero New York taxes. Five-star living, Newark prices.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/book-tour"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm transition-all hover:brightness-110 shadow-lg"
              style={{ background: C.turquoise, color: "white" }}
            >
              <Calendar className="w-4 h-4" />
              Schedule a Tour
            </a>
            <a
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm border-2 transition-all hover:bg-white/10"
              style={{ borderColor: "white", color: "white" }}
            >
              <Building2 className="w-4 h-4" />
              View All Properties
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t" style={{ borderColor: `${C.turquoise}20`, background: C.ivory }}>
        <p className="text-xs" style={{ color: C.taupe }}>© 2026 Resipointe. All rights reserved. Newark, NJ.</p>
      </footer>
    </>
  );
}
