import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { CAMPAIGNS } from "@shared/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navBg = scrolled || !isHome ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent";
  const textColor = scrolled || !isHome ? "text-foreground" : "text-white";
  const logoColor = scrolled || !isHome ? "text-foreground" : "text-white";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <span className={`font-serif text-xl font-bold ${logoColor} cursor-pointer`}>
              Resipointe
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/properties" className={`text-sm font-medium ${textColor} hover:text-primary transition-colors`}>Properties</Link>
            <div className="relative group">
              <button className={`text-sm font-medium ${textColor} hover:text-primary transition-colors flex items-center gap-1`}>
                Campaigns
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-card rounded-xl shadow-xl border border-border p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {CAMPAIGNS.map(c => (
                  <Link key={c.id} href={c.slug}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground">
                      <span>{c.icon}</span>
                      <span>{c.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <a href="/#calculator" className={`text-sm font-medium ${textColor} hover:text-primary transition-colors`}>Cost Calculator</a>
            <a href="/#gallery" className={`text-sm font-medium ${textColor} hover:text-primary transition-colors`}>Gallery</a>
            <Link href="/" className={`text-sm font-medium ${textColor} hover:text-primary transition-colors`}>Our Story</Link>
            <Link href="/collaborate" className={`text-sm font-medium ${textColor} hover:text-primary transition-colors`}>Collaborate</Link>
            <Link href="/floor-plans" className={`text-sm font-medium ${textColor} hover:text-primary transition-colors`}>Floor Plans</Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:8622771673" className={`text-sm font-medium flex items-center gap-1.5 ${textColor} hover:text-primary transition-colors`}>
              <Phone className="w-3.5 h-3.5" /> (862) 277-1673
            </a>
            <Link href="/book-tour">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5">
                <Calendar className="w-3.5 h-3.5 mr-1.5" /> Book Tour
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className={`lg:hidden ${textColor}`} onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-card border-t border-border shadow-xl">
          <div className="container py-4 space-y-1">
            <Link href="/properties" onClick={() => setOpen(false)}>
              <div className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg cursor-pointer">Properties</div>
            </Link>
            <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Campaigns</p>
            {CAMPAIGNS.map(c => (
              <Link key={c.id} href={c.slug} onClick={() => setOpen(false)}>
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg cursor-pointer">
                  <span>{c.icon}</span><span>{c.title}</span>
                </div>
              </Link>
            ))}
            <a href="/#calculator" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg">Cost Calculator</a>
            <a href="/#gallery" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg">Gallery</a>
            <Link href="/" onClick={() => setOpen(false)}>
              <div className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg cursor-pointer">Our Story</div>
            </Link>
            <Link href="/collaborate" onClick={() => setOpen(false)}>
              <div className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg cursor-pointer">Collaborate</div>
            </Link>
            <Link href="/floor-plans" onClick={() => setOpen(false)}>
              <div className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg cursor-pointer">Floor Plans</div>
            </Link>
            <div className="pt-3 flex gap-3">
              <Link href="/book-tour" onClick={() => setOpen(false)}>
                <Button className="bg-primary text-primary-foreground rounded-full flex-1">Book Tour</Button>
              </Link>
              <a href="tel:8622771673">
                <Button variant="outline" className="rounded-full"><Phone className="w-4 h-4" /></Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
