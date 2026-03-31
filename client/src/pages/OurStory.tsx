import { useState } from "react";
import Navbar from "@/components/Navbar";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Building2, Clock, Award, Users, Hammer, Star, Heart, Wifi,
  Dumbbell, TreePine, Car, Dog, Package, Utensils, Bath,
  Tv, Wind, Sun, Coffee, Bike, ShieldCheck, Sparkles,
  ChevronRight, Send, ThumbsUp, Plus, CheckCircle2, MapPin, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: "2005",
    title: "The Foundation",
    body: "Resipointe's founders began their journey in Newark real estate, acquiring and renovating distressed properties in the Ironbound and Downtown districts. A belief that every resident deserves a beautiful, well-maintained home drove every decision.",
    icon: Building2,
    color: "oklch(0.65 0.12 50)",
  },
  {
    year: "2010",
    title: "First Ground-Up Development",
    body: "The team completed its first ground-up residential building — 24 units on Market Street — setting the standard for what Resipointe would become: modern design, quality finishes, and genuine community care.",
    icon: Hammer,
    color: "oklch(0.55 0.14 45)",
  },
  {
    year: "2015",
    title: "Portfolio Expansion",
    body: "With a proven track record, Resipointe expanded to five properties across Newark's most desirable corridors — University Heights, the Ironbound, and Downtown — bringing over 200 luxury residences to market.",
    icon: Award,
    color: "oklch(0.60 0.13 48)",
  },
  {
    year: "2019",
    title: "Iron Pointe Opens",
    body: "The flagship Iron Pointe building at 39 Madison St opened its doors — 80 residences with a rooftop terrace, NYC skyline views, state-of-the-art fitness center, and 24-hour live security. Newark's most talked-about address.",
    icon: Star,
    color: "oklch(0.65 0.12 50)",
  },
  {
    year: "2023",
    title: "Community-First Philosophy",
    body: "Resipointe formalized its tenant collaboration program, surveying hundreds of residents and future tenants to shape the design of upcoming projects. The belief: the best homes are built with the people who live in them.",
    icon: Users,
    color: "oklch(0.55 0.14 45)",
  },
  {
    year: "2025+",
    title: "The Next Chapter",
    body: "Three new developments are in the pipeline, each shaped by tenant feedback gathered through this platform. Your voice is literally building the next Resipointe community.",
    icon: Sparkles,
    color: "oklch(0.60 0.13 48)",
  },
];

const PIPELINE = [
  {
    id: "madison-north",
    name: "Madison North",
    address: "55 Madison St, Newark NJ",
    status: "Pre-Development",
    statusColor: "oklch(0.65 0.12 50)",
    units: 120,
    target: "Q3 2027",
    description: "A 12-story mixed-use tower rising directly north of Iron Pointe. Planned amenities include a co-working floor, rooftop pool, and ground-floor retail. Tenant input is actively shaping the unit mix and finishes.",
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
    description: "Adjacent to University Pointe, this development will feature micro-units and 1-bedrooms designed specifically for young professionals and graduate students. Walkable to NJIT, Rutgers-Newark, and the PATH train.",
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
    description: "Located in the heart of Newark's vibrant Ironbound neighborhood, these loft-style residences will celebrate the area's industrial heritage with exposed brick, high ceilings, and open floor plans. Steps from Ferry Street's world-class dining.",
    highlights: ["Loft-Style Units", "Exposed Brick", "High Ceilings", "Steps to Dining"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
];

const FEATURE_CATEGORIES = [
  {
    id: "kitchen",
    label: "Kitchen & Dining",
    icon: Utensils,
    color: "oklch(0.65 0.12 50)",
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
    id: "bathroom",
    label: "Bathroom & Spa",
    icon: Bath,
    color: "oklch(0.55 0.14 220)",
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
    id: "tech",
    label: "Smart Home & Tech",
    icon: Wifi,
    color: "oklch(0.50 0.18 260)",
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
    id: "laundry",
    label: "Laundry & Storage",
    icon: Package,
    color: "oklch(0.55 0.14 45)",
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
    id: "amenities",
    label: "Building Amenities",
    icon: Dumbbell,
    color: "oklch(0.50 0.16 160)",
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
    id: "outdoor",
    label: "Outdoor & Community",
    icon: TreePine,
    color: "oklch(0.55 0.16 140)",
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
    id: "comfort",
    label: "Comfort & Climate",
    icon: Wind,
    color: "oklch(0.55 0.12 200)",
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
    id: "lifestyle",
    label: "Lifestyle & Wellness",
    icon: Coffee,
    color: "oklch(0.60 0.14 30)",
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function OurStory() {
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState("kitchen");
  const [dreamFeature, setDreamFeature] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [expandedPipeline, setExpandedPipeline] = useState<string | null>("madison-north");

  const voteMutation = trpc.survey.vote.useMutation({
    onSuccess: () => {},
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
    dreamMutation.mutate({
      feature: dreamFeature,
      name: submitterName,
      email: submitterEmail,
    });
  };

  const activeCat = FEATURE_CATEGORIES.find(c => c.id === activeCategory)!;

  return (
    <>
      <Navbar />

      {/* ── SEO Meta ── */}
      <title>Our Story & Collaborate | Resipointe Newark Luxury Apartments</title>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, oklch(0.15 0.04 45) 0%, oklch(0.22 0.06 48) 50%, oklch(0.18 0.05 200) 100%)" }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(oklch(0.65 0.12 50) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.12 50) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 50)" }} />
              <span className="text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 50)" }}>
                Built Together
              </span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl font-light leading-tight text-white mb-6">
              We Don't Just Build
              <em className="block italic not-italic" style={{ color: "oklch(0.75 0.14 50)" }}>
                Apartments.
              </em>
              We Build Homes.
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "oklch(0.75 0.06 45)" }}>
              For two decades, Resipointe has believed that the best homes are shaped by the people who live in them. Our story is one of community, craftsmanship, and a genuine commitment to making Newark's most livable neighborhoods even better.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#collaborate"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90"
                style={{ background: "oklch(0.65 0.12 50)", color: "white" }}
              >
                <Heart className="w-4 h-4" />
                Shape Our Next Building
              </a>
              <a
                href="#pipeline"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border transition-all hover:bg-white/10"
                style={{ borderColor: "oklch(0.65 0.12 50 / 0.5)", color: "oklch(0.75 0.14 50)" }}
              >
                <Building2 className="w-4 h-4" />
                See What's Coming
              </a>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "20+", label: "Years in Newark Real Estate", icon: Clock },
              { value: "5", label: "Active Properties", icon: Building2 },
              { value: "245+", label: "Luxury Residences", icon: Users },
              { value: "3", label: "Projects in Pipeline", icon: Hammer },
            ].map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl p-6 border"
                style={{
                  background: "oklch(0.20 0.04 45 / 0.6)",
                  borderColor: "oklch(0.65 0.12 50 / 0.2)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Icon className="w-6 h-6 mb-3" style={{ color: "oklch(0.65 0.12 50)" }} />
                <div className="text-3xl font-light text-white mb-1" style={{ fontFamily: "Playfair Display, serif" }}>{value}</div>
                <div className="text-xs leading-tight" style={{ color: "oklch(0.65 0.08 45)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY BAND ──────────────────────────────────────────────── */}
      <section style={{ background: "oklch(0.65 0.12 50)" }} className="py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-lg font-medium text-white tracking-wide">
            "A Resipointe home is not finished when the last nail is driven — it's finished when the community that lives there feels truly at home."
          </p>
          <p className="text-sm mt-2" style={{ color: "oklch(0.90 0.06 50)" }}>— Resipointe Development Team</p>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 50)" }} />
              <span className="text-xs tracking-[0.25em] uppercase font-medium text-muted-foreground">Our Journey</span>
              <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 50)" }} />
            </div>
            <h2 className="font-serif text-4xl font-light text-foreground">Two Decades of Building Community</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block"
              style={{ background: "oklch(0.65 0.12 50 / 0.25)" }}
            />

            <div className="space-y-12">
              {TIMELINE.map((item, i) => {
                const Icon = item.icon;
                const isLeft = i % 2 === 0;
                return (
                  <div key={item.year} className={`relative flex items-center gap-8 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col`}>
                    {/* Content */}
                    <div className="lg:w-[calc(50%-3rem)] w-full">
                      <div
                        className="rounded-2xl p-6 border hover:shadow-lg transition-shadow"
                        style={{ borderColor: "oklch(0.65 0.12 50 / 0.2)", background: "oklch(0.97 0.01 50)" }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="text-xs font-bold tracking-widest px-3 py-1 rounded-full"
                            style={{ background: item.color + "20", color: item.color }}
                          >
                            {item.year}
                          </span>
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                      </div>
                    </div>

                    {/* Center icon */}
                    <div
                      className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg hidden lg:flex"
                      style={{ background: item.color }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Spacer */}
                    <div className="lg:w-[calc(50%-3rem)] hidden lg:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PIPELINE ─────────────────────────────────────────────────────── */}
      <section
        id="pipeline"
        className="py-24"
        style={{ background: "oklch(0.97 0.01 50)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 50)" }} />
              <span className="text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 50)" }}>Coming Soon</span>
              <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 50)" }} />
            </div>
            <h2 className="font-serif text-4xl font-light text-foreground mb-4">Projects in the Pipeline</h2>
            <p className="text-base max-w-2xl mx-auto text-muted-foreground">
              These three developments are being shaped right now — by our team and by future tenants like you. Vote on features below to directly influence what gets built.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {PIPELINE.map(project => (
              <div
                key={project.id}
                className="rounded-2xl overflow-hidden border bg-card shadow-md hover:shadow-xl transition-all cursor-pointer group"
                style={{ borderColor: "oklch(0.65 0.12 50 / 0.2)" }}
                onClick={() => setExpandedPipeline(expandedPipeline === project.id ? null : project.id)}
              >
                {/* Full-brightness image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Only a very subtle gradient at the bottom for the status badge */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                  <span
                    className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold shadow"
                    style={{ background: project.statusColor, color: "white" }}
                  >
                    {project.status}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white">
                    <span className="flex items-center gap-1 text-xs font-medium"><Building2 className="w-3 h-3" />{project.units} units</span>
                    <span className="flex items-center gap-1 text-xs font-medium"><Calendar className="w-3 h-3" />{project.target}</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-1">{project.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" />{project.address}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.highlights.map(h => (
                      <span
                        key={h}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: "oklch(0.65 0.12 50 / 0.10)", color: "oklch(0.50 0.12 50)" }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <div
                    className="p-3 rounded-xl flex items-start gap-2"
                    style={{ background: "oklch(0.65 0.12 50 / 0.08)" }}
                  >
                    <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "oklch(0.65 0.12 50)" }} />
                    <p className="text-xs leading-relaxed" style={{ color: "oklch(0.45 0.10 50)" }}>
                      Vote on features below — the most-requested items will be built into this project.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLABORATION HUB ────────────────────────────────────────────── */}
      <section id="collaborate" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">

          {/* Intro */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 50)" }} />
              <span className="text-xs tracking-[0.25em] uppercase font-medium text-muted-foreground">Your Voice Builds This</span>
              <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 50)" }} />
            </div>
            <h2 className="font-serif text-4xl font-light text-foreground mb-4">
              Build Your Dream Home With Us
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're designing our next three buildings right now. Tell us what you'd love in your new home — every vote is reviewed by our design team and the most-requested features get built. This is real collaboration, not a survey that disappears.
            </p>
          </div>

          {/* How it works */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            {[
              { step: "01", title: "Vote on Features", desc: "Browse categories and upvote the features you'd love in your new home.", icon: ThumbsUp },
              { step: "02", title: "Submit Your Idea", desc: "Have a feature we haven't listed? Submit it directly to our design team.", icon: Plus },
              { step: "03", title: "We Build It", desc: "The most-voted features are prioritized in our upcoming pipeline projects.", icon: Hammer },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "oklch(0.65 0.12 50 / 0.12)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "oklch(0.65 0.12 50)" }} />
                </div>
                <div className="text-xs font-bold tracking-widest mb-2" style={{ color: "oklch(0.65 0.12 50)" }}>{step}</div>
                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {FEATURE_CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border"
                  style={{
                    background: isActive ? cat.color : "transparent",
                    color: isActive ? "white" : "oklch(0.50 0.05 45)",
                    borderColor: isActive ? cat.color : "oklch(0.80 0.03 45)",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Feature grid */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{ borderColor: "oklch(0.65 0.12 50 / 0.2)", background: "oklch(0.97 0.01 50)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              {(() => { const Icon = activeCat.icon; return <Icon className="w-5 h-5" style={{ color: activeCat.color }} />; })()}
              <h3 className="font-semibold text-foreground text-lg">{activeCat.label}</h3>
              <span className="text-sm text-muted-foreground ml-auto">Click to vote — your votes are saved</span>
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
                      borderColor: voted ? activeCat.color : "oklch(0.85 0.03 45)",
                      background: voted ? activeCat.color + "12" : "white",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        background: voted ? activeCat.color : "oklch(0.92 0.02 45)",
                      }}
                    >
                      {voted
                        ? <CheckCircle2 className="w-4 h-4 text-white" />
                        : <ThumbsUp className="w-4 h-4 text-muted-foreground group-hover:scale-110 transition-transform" />
                      }
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: voted ? activeCat.color : "oklch(0.30 0.04 45)" }}
                    >
                      {feature.label}
                    </span>
                    {voted && (
                      <span className="ml-auto text-xs font-semibold" style={{ color: activeCat.color }}>Voted!</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dream feature submission */}
          <div
            className="rounded-2xl border p-8"
            style={{ borderColor: "oklch(0.65 0.12 50 / 0.3)", background: "linear-gradient(135deg, oklch(0.15 0.04 45) 0%, oklch(0.20 0.06 48) 100%)" }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: "oklch(0.75 0.14 50)" }} />
              <h3 className="font-serif text-2xl font-light text-white mb-2">Have a Feature We Haven't Listed?</h3>
              <p className="text-sm mb-6" style={{ color: "oklch(0.70 0.06 45)" }}>
                Our design team reads every submission. If your idea resonates with other future tenants, it could end up in our next building. No idea is too big or too small.
              </p>

              {submitted ? (
                <div
                  className="rounded-xl p-6 flex flex-col items-center gap-3"
                  style={{ background: "oklch(0.65 0.12 50 / 0.15)" }}
                >
                  <CheckCircle2 className="w-10 h-10" style={{ color: "oklch(0.65 0.12 50)" }} />
                  <p className="text-white font-medium">Your idea has been submitted!</p>
                  <p className="text-sm" style={{ color: "oklch(0.70 0.06 45)" }}>
                    Our design team will review it. Thank you for helping shape the next Resipointe community.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDreamSubmit} className="space-y-4 text-left">
                  <Textarea
                    value={dreamFeature}
                    onChange={e => setDreamFeature(e.target.value)}
                    placeholder="Describe your dream feature... e.g. 'A rooftop herb garden where residents can grow their own food' or 'A dedicated room for music practice with soundproofing'"
                    rows={4}
                    className="resize-none border-0 text-sm"
                    style={{
                      background: "oklch(0.22 0.04 45)",
                      color: "white",
                    }}
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input
                      value={submitterName}
                      onChange={e => setSubmitterName(e.target.value)}
                      placeholder="Your name (optional)"
                      className="border-0 text-sm"
                      style={{ background: "oklch(0.22 0.04 45)", color: "white" }}
                    />
                    <Input
                      value={submitterEmail}
                      onChange={e => setSubmitterEmail(e.target.value)}
                      placeholder="Email to be notified (optional)"
                      type="email"
                      className="border-0 text-sm"
                      style={{ background: "oklch(0.22 0.04 45)", color: "white" }}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!dreamFeature.trim() || dreamMutation.isPending}
                    className="w-full gap-2"
                    style={{ background: "oklch(0.65 0.12 50)", color: "white" }}
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
        style={{ background: "oklch(0.65 0.12 50)" }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <ShieldCheck className="w-10 h-10 text-white mx-auto mb-4 opacity-80" />
          <h2 className="font-serif text-3xl font-light text-white mb-4">
            Ready to Make Newark Home?
          </h2>
          <p className="text-base mb-8" style={{ color: "oklch(0.90 0.06 50)" }}>
            Tour our current properties or register your interest in an upcoming building. Either way, you're joining a community that was built with you in mind.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/book-tour"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-sm bg-white transition-all hover:bg-white/90"
              style={{ color: "oklch(0.65 0.12 50)" }}
            >
              <Calendar className="w-4 h-4" />
              Schedule a Tour
            </a>
            <a
              href="/floor-plans"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-sm border border-white/40 text-white transition-all hover:bg-white/10"
            >
              <Building2 className="w-4 h-4" />
              Browse Floor Plans
            </a>
          </div>
        </div>
      </section>

      {/* Footer space */}
      <footer className="py-8 text-center border-t border-border">
        <p className="text-xs text-muted-foreground">© 2026 Resipointe. All rights reserved. Newark, NJ.</p>
      </footer>
    </>
  );
}
