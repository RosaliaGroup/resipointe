import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FLOOR_PLANS, PROPERTIES } from "@shared/data";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { Calendar, BedDouble, Maximize, DollarSign, Filter } from "lucide-react";

export default function FloorPlans() {
  const [bedFilter, setBedFilter] = useState<number | null>(null);
  const [propFilter, setPropFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"price" | "sqft">("price");

  const filtered = FLOOR_PLANS
    .filter(fp => bedFilter === null || fp.beds === bedFilter)
    .filter(fp => propFilter === null || fp.property === propFilter)
    .sort((a, b) => sortBy === "price" ? a.effective - b.effective : b.sqft - a.sqft);

  const getProperty = (id: string) => PROPERTIES.find(p => p.id === id);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="pt-24 pb-12 bg-foreground text-background">
          <div className="container">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Available Units</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Floor Plans</h1>
            <p className="text-background/60 max-w-xl">Browse available units across all 5 Resipointe properties. Filter by bedrooms, property, or sort by price.</p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 bg-muted border-b border-border sticky top-16 z-30">
          <div className="container">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <Filter className="w-4 h-4" /> Filter:
              </div>
              {/* Beds */}
              <div className="flex gap-2">
                {[null, 1, 2].map(b => (
                  <button key={String(b)} onClick={() => setBedFilter(b)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${bedFilter === b ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:border-primary"}`}>
                    {b === null ? "All Beds" : `${b} BR`}
                  </button>
                ))}
              </div>
              {/* Properties */}
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setPropFilter(null)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${propFilter === null ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:border-primary"}`}>
                  All Properties
                </button>
                {PROPERTIES.map(p => (
                  <button key={p.id} onClick={() => setPropFilter(p.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${propFilter === p.id ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:border-primary"}`}>
                    {p.name}
                  </button>
                ))}
              </div>
              {/* Sort */}
              <div className="ml-auto flex gap-2">
                <span className="text-sm text-muted-foreground">Sort:</span>
                <button onClick={() => setSortBy("price")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${sortBy === "price" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"}`}>
                  Price
                </button>
                <button onClick={() => setSortBy("sqft")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${sortBy === "sqft" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"}`}>
                  Sq Ft
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-10">
          <div className="container">
            <p className="text-sm text-muted-foreground mb-6">{filtered.length} unit{filtered.length !== 1 ? "s" : ""} available</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(fp => {
                const prop = getProperty(fp.property);
                if (!prop) return null;
                return (
                  <div key={fp.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    {/* Property color bar */}
                    <div className="h-1.5" style={{ backgroundColor: prop.color }} />
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: prop.color }}>{prop.name}</p>
                          <h3 className="font-bold text-foreground text-lg">Unit {fp.unit}</h3>
                        </div>
                        <Badge className={`text-xs ${fp.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {fp.available ? "Available" : "Leased"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center bg-muted rounded-lg p-2.5">
                          <BedDouble className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="font-bold text-sm text-foreground">{fp.beds} BR</p>
                          <p className="text-xs text-muted-foreground">{fp.baths} BA</p>
                        </div>
                        <div className="text-center bg-muted rounded-lg p-2.5">
                          <Maximize className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="font-bold text-sm text-foreground">{fp.sqft}</p>
                          <p className="text-xs text-muted-foreground">sq ft</p>
                        </div>
                        <div className="text-center bg-muted rounded-lg p-2.5">
                          <DollarSign className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="font-bold text-sm text-foreground">${fp.effective.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">effective</p>
                        </div>
                      </div>

                      {fp.features.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {fp.features.map(f => (
                            <span key={f} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{f}</span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">List price</p>
                          <p className="font-semibold text-foreground">${fp.price.toLocaleString()}/mo</p>
                          <p className="text-xs text-primary">Effective: ${fp.effective.toLocaleString()}/mo</p>
                        </div>
                        <Link href={`/book-tour?property=${fp.property}&unit=${fp.unit}`}>
                          <Button size="sm" className="rounded-full" style={{ backgroundColor: prop.color, color: "white" }}>
                            <Calendar className="w-3.5 h-3.5 mr-1.5" /> Tour
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No units match your filters. Try adjusting your criteria.</p>
                <Button variant="outline" className="mt-4 rounded-full" onClick={() => { setBedFilter(null); setPropFilter(null); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Pricing note */}
        <section className="py-8 bg-muted border-t border-border">
          <div className="container text-center">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              <strong className="text-foreground">2 Months Free</strong> — Effective pricing reflects 2 months free on a 12-month lease. List price applies to month-to-month. Pricing subject to change. Contact our leasing team for current availability.
            </p>
            <Link href="/book-tour">
              <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                Schedule a Tour
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <ChatBot />
    </>
  );
}
