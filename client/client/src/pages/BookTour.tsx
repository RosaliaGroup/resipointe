import { useState } from "react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { PROPERTIES } from "@shared/data";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, CheckCircle, Phone, Mail, User, Building2, Clock } from "lucide-react";

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function BookTour() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const defaultProperty = params.get("property") || "";

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    property: defaultProperty,
    unitType: "", preferredDate: "", preferredTime: "", message: "", campaign: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const bookMutation = trpc.booking.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Tour booked! We'll confirm within 24 hours.");
    },
    onError: (err) => {
      toast.error("Booking failed. Please call us at (862) 277-1673.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.property || !form.preferredDate || !form.preferredTime) {
      toast.error("Please fill in all required fields.");
      return;
    }
    bookMutation.mutate(form);
  };

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  // Get next 14 days
  const dates: string[] = [];
  for (let i = 1; i <= 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    if (d.getDay() !== 0) { // exclude Sundays
      dates.push(d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
    }
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center pt-16">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-3">Tour Requested!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you, <strong>{form.name}</strong>! We've received your tour request for <strong>{PROPERTIES.find(p => p.id === form.property)?.name}</strong>.
            </p>
            <p className="text-muted-foreground mb-8">
              Our leasing team will confirm your appointment at <strong>{form.preferredDate}</strong> at <strong>{form.preferredTime}</strong> within 24 hours via email at <strong>{form.email}</strong>.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:8622771673">
                <Button variant="outline" className="w-full rounded-full">
                  <Phone className="w-4 h-4 mr-2" /> Call (862) 277-1673 for Immediate Assistance
                </Button>
              </a>
              <Link href="/">
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Back to Properties
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <ChatBot />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="pt-24 pb-12 bg-foreground text-background">
          <div className="container">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Private Tours Available</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Schedule Your Tour</h1>
            <p className="text-background/60 max-w-xl">Our leasing team will personally guide you through your selected property. Tours available Monday–Saturday.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Info */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" /> Your Information
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                        <input value={form.name} onChange={e => update("name", e.target.value)} required
                          className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                          placeholder="Jane Smith" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                        <input type="email" value={form.email} onChange={e => update("email", e.target.value)} required
                          className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                          placeholder="jane@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                        <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)}
                          className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                          placeholder="(201) 555-0100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Unit Type</label>
                        <select value={form.unitType} onChange={e => update("unitType", e.target.value)}
                          className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border">
                          <option value="">Any</option>
                          <option value="studio">Studio</option>
                          <option value="1br">1 Bedroom</option>
                          <option value="2br">2 Bedrooms</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Property Selection */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" /> Select Property *
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {PROPERTIES.map(p => (
                        <button type="button" key={p.id} onClick={() => update("property", p.id)}
                          className={`text-left p-4 rounded-xl border-2 transition-all ${form.property === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                          <p className="font-semibold text-sm text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{p.address}</p>
                          <p className="text-xs font-medium mt-1" style={{ color: p.color }}>{p.priceLabel}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Preferred Date & Time *
                    </h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {dates.slice(0, 12).map(d => (
                          <button type="button" key={d} onClick={() => update("preferredDate", d)}
                            className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${form.preferredDate === d ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40 text-foreground"}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Time</label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {TIME_SLOTS.map(t => (
                          <button type="button" key={t} onClick={() => update("preferredTime", t)}
                            className={`py-2 rounded-lg text-xs font-medium border transition-all ${form.preferredTime === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40 text-foreground"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Additional Notes</label>
                    <textarea value={form.message} onChange={e => update("message", e.target.value)} rows={3}
                      className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border resize-none"
                      placeholder="Any specific questions, accessibility needs, or preferences..." />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold"
                    disabled={bookMutation.isPending}>
                    {bookMutation.isPending ? "Submitting..." : "Request Tour"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">We'll confirm within 24 hours · No commitment required</p>
                </form>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {["Personal guided tour with a leasing specialist", "See the actual unit or model unit", "Review floor plans and pricing", "Learn about current incentives (2 months free!)", "Ask any questions — no pressure"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-3">Contact Directly</h3>
                  <div className="space-y-3 text-sm">
                    <a href="tel:8622771673" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 text-primary" /> (862) 277-1673
                    </a>
                    <a href="mailto:info@resipointe.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4 text-primary" /> info@resipointe.com
                    </a>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" /> Mon–Sat: 9AM–6PM
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-2xl border border-primary/20 p-6 text-center">
                  <p className="text-2xl font-serif font-bold text-primary mb-1">2 Months</p>
                  <p className="text-sm font-semibold text-foreground mb-1">FREE</p>
                  <p className="text-xs text-muted-foreground">On 12-month leases. Limited time offer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ChatBot />
    </>
  );
}
