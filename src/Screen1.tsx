import { useState, useEffect } from "react";
import {
  ArrowRight,
  BadgeIndianRupee,
  Bike,
  Calendar,
  CalendarPlus,
  CalendarX2,
  CarFront,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Clock,
  Headset,
  Info,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandMarquee from "@/components/BrandMarquee";

import "./8125257c-d8cd-4007-a63c-8f8075a7d0ec.css";
import "./Screen-1.screen.css";

export interface Screen1Props {
  onNavigateVehicles?: () => void;
  onSelectVehicle?: (vehicleId: string) => void;
  onNavigateCheckout?: () => void;
  onNavigateBookings?: () => void;
  bookingsModalOpen?: boolean;
  setBookingsModalOpen?: (open: boolean) => void;
}

export default function Screen1({
  onNavigateVehicles,
  onSelectVehicle,
  onNavigateCheckout,
  onNavigateBookings,
  bookingsModalOpen: externalBookingsModalOpen,
  setBookingsModalOpen: externalSetBookingsModalOpen,
}: Screen1Props = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [internalBookingsModalOpen, setInternalBookingsModalOpen] = useState(false);

  const bookingsModalOpen =
    externalBookingsModalOpen !== undefined ? externalBookingsModalOpen : internalBookingsModalOpen;
  const setBookingsModalOpen =
    externalSetBookingsModalOpen || setInternalBookingsModalOpen;

  // Monitor scroll position with getBoundingClientRect for bulletproof active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 15);

      // Exclude "vehicles" so scrolling through hot vehicles on the homepage never highlights the vehicles header link
      const sections = ["how-it-works"];
      let found = "";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when section top passes under header (offset 160px) and bottom is still visible
          if (rect.top <= 180 && rect.bottom >= 120) {
            found = id;
            break;
          }
        }
      }

      // If at top hero area or in hot vehicles preview, no section is active
      if (scrollY < 200) {
        setActiveSection("");
      } else if (found) {
        setActiveSection(found);
      } else {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler with header offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id !== "vehicles") {
      setActiveSection(id);
    } else {
      setActiveSection("");
    }
    setMobileMenuOpen(false);

    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div data-appearance="light">
      <div className="bg-background text-foreground w-full min-h-screen">
        {/* Header - Identical across all screens */}
        <header className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] bg-background/95 backdrop-blur-md border-b border-border sticky z-50 top-0 h-[72px]">
          <div className="flex mr-auto ml-auto px-4 sm:px-8 items-center h-full max-w-7xl">
            {/* Logo */}
            <a
              aria-label="keval car home"
              className="flex items-center gap-3 group focus:outline-none cursor-pointer"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="font-bold rounded-full bg-primary text-primary-foreground text-lg flex justify-center items-center size-9 group-hover:scale-105 transition-transform shadow-sm">
                K
              </span>
              <span className="font-semibold text-foreground text-xl tracking-tight group-hover:text-primary transition-colors">
                keval car
              </span>
            </a>

            {/* Navigation: How it works, Vehicles, My Bookings */}
            <nav
              aria-label="Main navigation"
              className="hidden md:flex ml-16 items-center gap-10 h-full"
            >
              <a
                className="font-medium text-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
                href="#how-it-works"
                onClick={(e) => scrollToSection(e, "how-it-works")}
              >
                <CircleHelp className="size-4" />
                <span>How it works</span>
              </a>
              <a
                className="font-medium text-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
                href="#vehicles"
                onClick={(e) => {
                  if (onNavigateVehicles) {
                    e.preventDefault();
                    onNavigateVehicles();
                  } else {
                    scrollToSection(e, "vehicles");
                  }
                }}
              >
                <CarFront className="size-4" />
                <span>Vehicles</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateBookings) {
                    onNavigateBookings();
                  } else {
                    setBookingsModalOpen(true);
                  }
                }}
                className="font-medium text-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ClipboardList className="size-4" />
                <span>My Bookings</span>
              </button>
            </nav>

            {/* Right: Book now button & mobile toggle */}
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => {
                  if (onNavigateCheckout) {
                    onNavigateCheckout();
                  } else {
                    const el = document.getElementById("book-now");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="font-semibold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm inline-flex py-2.5 px-5 sm:py-3 sm:px-6 items-center gap-2 transition-all hover:scale-105 shadow-sm active:scale-95"
              >
                <CalendarPlus className="size-4" />
                <span>Book now</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl border border-border text-charcoal hover:bg-black/5"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-border px-6 py-4 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-2">
              <a
                onClick={(e) => scrollToSection(e, "how-it-works")}
                className="py-2 px-3.5 rounded-xl flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-black/5 transition-colors"
                href="#how-it-works"
              >
                <CircleHelp className="size-4" />
                How it works
              </a>
              <a
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (onNavigateVehicles) {
                    e.preventDefault();
                    onNavigateVehicles();
                  } else {
                    scrollToSection(e, "vehicles");
                  }
                }}
                className="py-2 px-3.5 rounded-xl flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-black/5 transition-colors"
                href="#vehicles"
              >
                <CarFront className="size-4" />
                Vehicles
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateBookings) {
                    onNavigateBookings();
                  } else {
                    setBookingsModalOpen(true);
                  }
                }}
                className="py-2 px-3.5 rounded-xl flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-black/5 transition-colors text-left"
              >
                <ClipboardList className="size-4" />
                My Bookings
              </button>
            </div>
          )}
        </header>

        {/* My Bookings Modal Drawer */}
        {bookingsModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-border relative animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 bg-orange-100 text-primary rounded-xl">
                    <ClipboardList className="size-5" />
                  </span>
                  <h3 className="font-bold text-lg text-charcoal">My Bookings</h3>
                </div>
                <button
                  onClick={() => {
                    setBookingsModalOpen(false);
                    setActiveSection("");
                  }}
                  className="p-1.5 hover:bg-black/5 rounded-full text-muted-foreground hover:text-charcoal transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Sample active booking */}
              <div className="rounded-2xl border border-border p-4 bg-[#fffaf5] flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full mb-1">
                      <CheckCircle2 className="size-3.5" /> Confirmed Rental
                    </span>
                    <h4 className="font-bold text-base text-charcoal">Royal Enfield Classic 350</h4>
                    <p className="text-xs text-muted-foreground">Booking ID: #KB-82419</p>
                  </div>
                  <span className="font-extrabold text-primary text-base">₹1,000</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border/60">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="size-3.5 text-primary" />
                    <span>14 Oct – 16 Oct 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="size-3.5 text-primary" />
                    <span>10:00 AM – 10:00 AM</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                    <MapPin className="size-3.5 text-primary" />
                    <span>Pick-up location: Rajkot Central</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => {
                    setBookingsModalOpen(false);
                    setActiveSection("");
                  }}
                  className="flex-1 rounded-full font-bold text-xs"
                >
                  Close
                </Button>
                <a
                  href="#vehicles"
                  onClick={(e) => {
                    setBookingsModalOpen(false);
                    scrollToSection(e, "vehicles");
                  }}
                  className="flex-1 inline-flex items-center justify-center rounded-full border border-primary text-primary font-bold text-xs hover:bg-primary/10 transition-colors"
                >
                  Browse Fleet
                </a>
              </div>
            </div>
          </div>
        )}

        <main>
          {/* Hero Section with Cinematic Background Image */}
          <section className="relative overflow-hidden py-[clamp(3.5rem,7vw,6.5rem)] px-[clamp(1rem,3.5vw,2rem)] bg-charcoal min-h-[clamp(380px,45vw,520px)] flex items-center">
            {/* Background Motorcycle Image & Rich Gradient Overlays */}
            <div className="absolute inset-0 z-0">
              <img
                alt="Motorcycle on open scenic road"
                className="size-full object-cover object-[center_right] sm:object-right"
                data-authorname="Harsh Khandelwal"
                data-authorurl="https://unsplash.com/@poopyshark"
                data-blurhash="LN9I6zofofjZT}fkWCazMxfQe.kC"
                data-photoid="-SZaE2O0q5Y"
                src="https://images.unsplash.com/photo-1763920227051-cba429369989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcGFya2VkJTIwcm9hZCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=85&w=1920"
              />
              {/* Gradient overlays for crystal-clear readability while keeping motorcycle visible on the right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            </div>

            <div className="relative z-10 max-w-7xl mr-auto ml-auto w-full">
              {/* Hero Main Content */}
              <div className="max-w-2xl flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
                <div className="flex flex-wrap items-center gap-[clamp(0.5rem,1vw,0.85rem)]">
                  <span className="font-bold uppercase text-orange-400 text-[clamp(0.75rem,1.1vw,0.875rem)] tracking-[0.2em] bg-black/45 px-3.5 py-1 rounded-full border border-orange-500/30 backdrop-blur-sm">
                    Your journey, your way
                  </span>
                  <div className="backdrop-blur-md rounded-full bg-white/15 py-1 px-3 flex items-center gap-1.5 border border-white/20 text-white text-[clamp(0.7rem,0.95vw,0.8rem)] font-medium shadow-sm">
                    <Star className="fill-amber-400 text-amber-400 size-3.5 shrink-0" />
                    <span>4.9/5 from 2,000+ riders</span>
                  </div>
                </div>

                <h1 className="font-extrabold text-white text-[clamp(2.35rem,5.2vw,4.25rem)] leading-[1.06] tracking-tight drop-shadow-md">
                  Move freely. <br className="hidden sm:inline" />
                  <span className="text-white">Rent confidently.</span>
                </h1>

                <p className="text-white/90 text-[clamp(1.05rem,1.7vw,1.35rem)] max-w-xl font-medium drop-shadow">
                  Cars and bikes, ready when you are.
                </p>

                <div className="flex flex-wrap items-center gap-[clamp(0.65rem,1.2vw,1rem)] pt-1">
                  <a
                    className="font-semibold rounded-full bg-primary text-primary-foreground text-[clamp(0.8rem,1vw,0.875rem)] inline-flex py-[clamp(0.6rem,1.1vw,0.8rem)] px-[clamp(1.25rem,2vw,1.65rem)] items-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    href="#book-now"
                    onClick={(e) => scrollToSection(e, "book-now")}
                  >
                    <CarFront className="size-4 shrink-0" />
                    Book a vehicle
                  </a>
                  <a
                    className="font-semibold rounded-full text-white text-[clamp(0.8rem,1vw,0.875rem)] border-2 border-white/80 bg-white/15 backdrop-blur-sm inline-flex py-[clamp(0.6rem,1.1vw,0.8rem)] px-[clamp(1.25rem,2vw,1.65rem)] items-center gap-2 hover:bg-white/30 hover:border-white transition-all whitespace-nowrap shrink-0"
                    href="#vehicles"
                    onClick={(e) => {
                      if (onNavigateVehicles) {
                        e.preventDefault();
                        onNavigateVehicles();
                      } else {
                        scrollToSection(e, "vehicles");
                      }
                    }}
                  >
                    Explore fleet
                    <ArrowRight className="size-4 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Moving Sliding Banner of Car & Bike Logos in India */}
          <BrandMarquee
            onSelectBrand={() => {
              if (onNavigateVehicles) {
                onNavigateVehicles();
              }
            }}
          />

          {/* Search Card Section (Outside the Hero) */}
          <section className="bg-accent py-[clamp(2rem,4vw,3.25rem)] px-[clamp(1rem,3.5vw,2rem)] border-b border-border/40">
            <div className="max-w-7xl mr-auto ml-auto">
              <Card
                className="shadow-[0px_20px_25px_-5px_rgba(0,_0,_0,_0.08),_0px_8px_10px_-6px_rgba(0,_0,_0,_0.06)] rounded-3xl p-[clamp(1.25rem,2.5vw,2.25rem)] gap-[clamp(1rem,2vw,1.5rem)] bg-white border border-border"
                id="book-now"
              >
                <CardHeader className="p-0 gap-2">
                  <CardTitle className="text-[clamp(1.25rem,2.2vw,1.55rem)] font-bold text-foreground">
                    Find your ride
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-[clamp(1rem,2vw,1.5rem)]">
                  <div className="grid gap-[clamp(0.75rem,1.3vw,1rem)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="flex flex-col gap-2 col-span-1 sm:col-span-2 lg:col-span-1">
                      <Label className="text-[clamp(0.75rem,1vw,0.85rem)] font-semibold text-charcoal">Pick-up location</Label>
                      <Input defaultValue="Rajkot" className="h-[clamp(38px,3.8vw,44px)] text-[clamp(0.8rem,1vw,0.875rem)]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-[clamp(0.75rem,1vw,0.85rem)] font-semibold text-charcoal">Pick-up date</Label>
                      <Input defaultValue="14 Oct 2026" className="h-[clamp(38px,3.8vw,44px)] text-[clamp(0.8rem,1vw,0.875rem)]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-[clamp(0.75rem,1vw,0.85rem)] font-semibold text-charcoal">Time</Label>
                      <Input defaultValue="10:00 AM" className="h-[clamp(38px,3.8vw,44px)] text-[clamp(0.8rem,1vw,0.875rem)]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-[clamp(0.75rem,1vw,0.85rem)] font-semibold text-charcoal">Drop-off date</Label>
                      <Input defaultValue="16 Oct 2026" className="h-[clamp(38px,3.8vw,44px)] text-[clamp(0.8rem,1vw,0.875rem)]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-[clamp(0.75rem,1vw,0.85rem)] font-semibold text-charcoal">Time</Label>
                      <Input defaultValue="10:00 AM" className="h-[clamp(38px,3.8vw,44px)] text-[clamp(0.8rem,1vw,0.875rem)]" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-[clamp(0.75rem,1.5vw,1.25rem)]">
                    <Tabs className="w-full sm:w-auto" defaultValue="all">
                      <TabsList className="grid grid-cols-4 w-full sm:w-[clamp(270px,30vw,420px)] h-[clamp(36px,3.8vw,42px)]">
                        <TabsTrigger value="all" className="text-[clamp(0.75rem,1vw,0.85rem)]">All</TabsTrigger>
                        <TabsTrigger value="bike" className="text-[clamp(0.75rem,1vw,0.85rem)]">Bike</TabsTrigger>
                        <TabsTrigger value="scooter" className="text-[clamp(0.75rem,1vw,0.85rem)]">Scooter</TabsTrigger>
                        <TabsTrigger value="car" className="text-[clamp(0.75rem,1vw,0.85rem)]">Car</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button
                      onClick={(e) => {
                        if (onNavigateVehicles) {
                          e.preventDefault();
                          onNavigateVehicles();
                        } else {
                          scrollToSection(e as any, "vehicles");
                        }
                      }}
                      className="rounded-full px-[clamp(1.25rem,2.2vw,2rem)] py-[clamp(0.55rem,1vw,0.75rem)] text-[clamp(0.8rem,1vw,0.875rem)] whitespace-nowrap shrink-0"
                    >
                      <span>Search vehicles</span>
                      <Search className="ml-2 size-4 shrink-0" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-[clamp(0.75rem,1vw,0.875rem)] flex items-center gap-2">
                    <Info className="text-primary size-4 shrink-0" />
                    <span>Minimum rental duration is 4 hours</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Featured Fleet Section */}
          <section
            className="flex mr-auto ml-auto py-[clamp(2.5rem,5.5vw,4.5rem)] px-[clamp(1rem,3.5vw,2rem)] flex-col gap-[clamp(1.5rem,3vw,2rem)] max-w-7xl"
            id="vehicles"
          >
            <div className="flex justify-between items-end gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-semibold uppercase text-primary text-[clamp(0.75rem,1.1vw,0.875rem)] tracking-[0.2em]">
                  Our fleet
                </p>
                <h2 className="font-bold text-[clamp(1.65rem,3.2vw,2.25rem)]">Hot vehicles 🔥</h2>
              </div>
              <a
                className="font-semibold text-primary text-[clamp(0.8rem,1vw,0.875rem)] whitespace-nowrap flex items-center hover:underline cursor-pointer"
                href="#vehicles"
                onClick={(e) => {
                  if (onNavigateVehicles) {
                    e.preventDefault();
                    onNavigateVehicles();
                  }
                }}
              >
                View all vehicles
                <ArrowRight className="inline ml-1 size-4" />
              </a>
            </div>
            <div className="grid gap-[clamp(1rem,2vw,1.5rem)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card
                onClick={() => onSelectVehicle ? onSelectVehicle("re-classic-350") : onNavigateVehicles?.()}
                className="p-0 overflow-hidden hover:-translate-y-1 transition-transform group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <img
                    alt="Royal Enfield Classic 350"
                    className="w-full h-[clamp(150px,16vw,178px)] object-cover group-hover:scale-105 transition-transform duration-300"
                    data-authorname="Harsh Khandelwal"
                    data-authorurl="https://unsplash.com/@poopyshark"
                    data-blurhash="LN9I6zofofjZT}fkWCazMxfQe.kC"
                    data-photoid="-SZaE2O0q5Y"
                    src="https://images.unsplash.com/photo-1763920227051-cba429369989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcGFya2VkJTIwcm9hZCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  />
                  <CardContent className="flex p-[clamp(0.85rem,1.6vw,1.25rem)] flex-col gap-[clamp(0.5rem,1vw,0.75rem)]">
                    <h3 className="font-semibold text-[clamp(0.95rem,1.2vw,1.05rem)] group-hover:text-primary transition-colors">Royal Enfield Classic 350</h3>
                    <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)] font-medium">₹500/day</p>
                  </CardContent>
                </div>
                <div className="p-3 pt-0">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectVehicle) {
                        onSelectVehicle("re-classic-350");
                      } else if (onNavigateVehicles) {
                        onNavigateVehicles();
                      } else {
                        scrollToSection(e as any, "book-now");
                      }
                    }}
                    className="w-full rounded-full bg-primary text-primary-foreground font-bold text-xs h-8 hover:brightness-105 shadow-sm"
                  >
                    Book now
                  </Button>
                </div>
              </Card>
              <Card
                onClick={() => onSelectVehicle ? onSelectVehicle("honda-activa-6g") : onNavigateVehicles?.()}
                className="p-0 overflow-hidden hover:-translate-y-1 transition-transform group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <img
                    alt="Honda Activa 6G"
                    className="w-full h-[clamp(150px,16vw,178px)] object-cover group-hover:scale-105 transition-transform duration-300"
                    data-authorname="Adhitya Sibikumar"
                    data-authorurl="https://unsplash.com/@adhitya_2505"
                    data-blurhash="LUF}=m589G%L~qr=9at8?bn$IUR+"
                    data-photoid="uOtlZohxgt8"
                    src="https://images.unsplash.com/photo-1771575520403-df44ea769881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwY2l0eSUyMHN0cmVldCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  />
                  <CardContent className="flex p-[clamp(0.85rem,1.6vw,1.25rem)] flex-col gap-[clamp(0.5rem,1vw,0.75rem)]">
                    <h3 className="font-semibold text-[clamp(0.95rem,1.2vw,1.05rem)] group-hover:text-primary transition-colors">Honda Activa 6G</h3>
                    <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)] font-medium">₹500/day</p>
                  </CardContent>
                </div>
                <div className="p-3 pt-0">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectVehicle) {
                        onSelectVehicle("honda-activa-6g");
                      } else if (onNavigateVehicles) {
                        onNavigateVehicles();
                      } else {
                        scrollToSection(e as any, "book-now");
                      }
                    }}
                    className="w-full rounded-full bg-primary text-primary-foreground font-bold text-xs h-8 hover:brightness-105 shadow-sm"
                  >
                    Book now
                  </Button>
                </div>
              </Card>
              <Card
                onClick={() => onSelectVehicle ? onSelectVehicle("maruti-swift") : onNavigateVehicles?.()}
                className="p-0 overflow-hidden hover:-translate-y-1 transition-transform group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <img
                    alt="Maruti Swift"
                    className="w-full h-[clamp(150px,16vw,178px)] object-cover group-hover:scale-105 transition-transform duration-300"
                    data-authorname="Petr"
                    data-authorurl="https://unsplash.com/@mpetrucho"
                    data-blurhash="LeJt-fE19Zxut.xbxaR%?dWBs;R*"
                    data-photoid="8czDAmtXdfs"
                    src="https://images.unsplash.com/photo-1596278693907-17a7151cf9f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxyZWQlMjBoYXRjaGJhY2slMjBjYXIlMjByb2FkfGVufDF8MHx8fDE3OTE4ODE0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  />
                  <CardContent className="flex p-[clamp(0.85rem,1.6vw,1.25rem)] flex-col gap-[clamp(0.5rem,1vw,0.75rem)]">
                    <h3 className="font-semibold text-[clamp(0.95rem,1.2vw,1.05rem)] group-hover:text-primary transition-colors">Maruti Swift</h3>
                    <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)] font-medium">₹1,500/day</p>
                  </CardContent>
                </div>
                <div className="p-3 pt-0">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectVehicle) {
                        onSelectVehicle("maruti-swift");
                      } else if (onNavigateVehicles) {
                        onNavigateVehicles();
                      } else {
                        scrollToSection(e as any, "book-now");
                      }
                    }}
                    className="w-full rounded-full bg-primary text-primary-foreground font-bold text-xs h-8 hover:brightness-105 shadow-sm"
                  >
                    Book now
                  </Button>
                </div>
              </Card>
              <Card
                onClick={() => onSelectVehicle ? onSelectVehicle("hyundai-creta") : onNavigateVehicles?.()}
                className="p-0 overflow-hidden hover:-translate-y-1 transition-transform group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <img
                    alt="Hyundai Creta"
                    className="w-full h-[clamp(150px,16vw,178px)] object-cover group-hover:scale-105 transition-transform duration-300"
                    data-authorname="Zac Gudakov"
                    data-authorurl="https://unsplash.com/@zacgudakov"
                    data-blurhash="LSC%23t7jZof00j[t7j[%Nt7a}j["
                    data-photoid="Lme_aDugnVQ"
                    src="https://images.unsplash.com/photo-1645791608306-6db92b84d498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxibGFjayUyMFNVViUyMHJvYWR8ZW58MXwwfHx8MTc5MTg4MTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080"
                  />
                  <CardContent className="flex p-[clamp(0.85rem,1.6vw,1.25rem)] flex-col gap-[clamp(0.5rem,1vw,0.75rem)]">
                    <h3 className="font-semibold text-[clamp(0.95rem,1.2vw,1.05rem)] group-hover:text-primary transition-colors">Hyundai Creta</h3>
                    <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)] font-medium">₹1,500/day</p>
                  </CardContent>
                </div>
                <div className="p-3 pt-0">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectVehicle) {
                        onSelectVehicle("hyundai-creta");
                      } else if (onNavigateVehicles) {
                        onNavigateVehicles();
                      } else {
                        scrollToSection(e as any, "book-now");
                      }
                    }}
                    className="w-full rounded-full bg-primary text-primary-foreground font-bold text-xs h-8 hover:brightness-105 shadow-sm"
                  >
                    Book now
                  </Button>
                </div>
              </Card>
            </div>
          </section>

          {/* How It Works Section */}
          <section
            className="bg-secondary py-[clamp(2.5rem,5.5vw,4.5rem)] px-[clamp(1rem,3.5vw,2rem)]"
            id="how-it-works"
          >
            <div className="flex mr-auto ml-auto flex-col gap-[clamp(1.5rem,3vw,2rem)] max-w-7xl">
              <div className="flex flex-col gap-2">
                <p className="font-semibold uppercase text-primary text-[clamp(0.75rem,1.1vw,0.875rem)] tracking-[0.2em]">
                  Simple from start to finish
                </p>
                <h2 className="font-bold text-[clamp(1.65rem,3.2vw,2.25rem)]">How it works</h2>
              </div>
              <div className="grid gap-[clamp(1rem,2.5vw,2rem)] grid-cols-1 md:grid-cols-3">
                <div className="rounded-2xl bg-card flex p-[clamp(1.25rem,2.2vw,1.75rem)] flex-col gap-[clamp(0.75rem,1.5vw,1rem)] shadow-soft">
                  <span className="font-bold rounded-full bg-primary text-primary-foreground flex justify-center items-center size-[clamp(2.25rem,3vw,2.5rem)] text-[clamp(0.875rem,1.2vw,1rem)] shadow-sm">
                    1
                  </span>
                  <h3 className="font-semibold text-[clamp(1rem,1.4vw,1.15rem)]">Pick a vehicle</h3>
                  <p className="text-muted-foreground text-[clamp(0.85rem,1.1vw,0.95rem)]">
                    Choose the ride that fits your plans.
                  </p>
                </div>
                <div className="rounded-2xl bg-card flex p-[clamp(1.25rem,2.2vw,1.75rem)] flex-col gap-[clamp(0.75rem,1.5vw,1rem)] shadow-soft">
                  <span className="font-bold rounded-full bg-primary text-primary-foreground flex justify-center items-center size-[clamp(2.25rem,3vw,2.5rem)] text-[clamp(0.875rem,1.2vw,1rem)] shadow-sm">
                    2
                  </span>
                  <h3 className="font-semibold text-[clamp(1rem,1.4vw,1.15rem)]">Confirm your trip</h3>
                  <p className="text-muted-foreground text-[clamp(0.85rem,1.1vw,0.95rem)]">
                    Select your dates and complete your booking.
                  </p>
                </div>
                <div className="rounded-2xl bg-card flex p-[clamp(1.25rem,2.2vw,1.75rem)] flex-col gap-[clamp(0.75rem,1.5vw,1rem)] shadow-soft">
                  <span className="font-bold rounded-full bg-primary text-primary-foreground flex justify-center items-center size-[clamp(2.25rem,3vw,2.5rem)] text-[clamp(0.875rem,1.2vw,1rem)] shadow-sm">
                    3
                  </span>
                  <h3 className="font-semibold text-[clamp(1rem,1.4vw,1.15rem)]">Ride away</h3>
                  <p className="text-muted-foreground text-[clamp(0.85rem,1.1vw,0.95rem)]">
                    Collect your vehicle and enjoy the journey.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="flex mr-auto ml-auto py-[clamp(2.5rem,5.5vw,4.5rem)] px-[clamp(1rem,3.5vw,2rem)] flex-col gap-[clamp(1.5rem,3vw,2rem)] max-w-7xl">
            <div className="flex flex-col gap-2">
              <p className="font-semibold uppercase text-primary text-[clamp(0.75rem,1.1vw,0.875rem)] tracking-[0.2em]">
                The keval car difference
              </p>
              <h2 className="font-bold text-[clamp(1.65rem,3.2vw,2.25rem)]">Why choose us</h2>
            </div>
            <div className="grid gap-[clamp(1rem,2vw,1.5rem)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)]">
                <BadgeIndianRupee className="text-primary size-[clamp(1.5rem,2.2vw,1.75rem)] shrink-0" />
                <h3 className="font-semibold text-[clamp(0.95rem,1.2vw,1.05rem)]">No hidden charges</h3>
                <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)]">
                  Clear pricing from the start.
                </p>
              </div>
              <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)]">
                <ShieldCheck className="text-primary size-[clamp(1.5rem,2.2vw,1.75rem)] shrink-0" />
                <h3 className="font-semibold text-[clamp(0.95rem,1.2vw,1.05rem)]">Verified vehicles</h3>
                <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)]">
                  Every ride is checked and ready.
                </p>
              </div>
              <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)]">
                <CalendarX2 className="text-primary size-[clamp(1.5rem,2.2vw,1.75rem)] shrink-0" />
                <h3 className="font-semibold text-[clamp(0.95rem,1.2vw,1.05rem)]">Free cancellation</h3>
                <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)]">
                  Plans change. Your booking can too.
                </p>
              </div>
              <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)]">
                <Headset className="text-primary size-[clamp(1.5rem,2.2vw,1.75rem)] shrink-0" />
                <h3 className="font-semibold text-[clamp(0.95rem,1.2vw,1.05rem)]">24/7 support</h3>
                <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)]">
                  We are here whenever you need us.
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Highlight Strip */}
          <section className="bg-primary py-[clamp(1.5rem,3vw,2.25rem)] px-[clamp(1rem,3vw,2rem)] shadow-sm">
            <div className="text-primary-foreground flex flex-col sm:flex-row mr-auto ml-auto justify-center items-center gap-[clamp(1.25rem,4vw,6rem)] max-w-7xl">
              <div className="flex items-center gap-[clamp(0.75rem,1.5vw,1rem)]">
                <Bike className="size-[clamp(1.5rem,2.4vw,2rem)] shrink-0" />
                <span className="font-bold text-[clamp(1.2rem,2.2vw,1.5rem)] whitespace-nowrap">Bikes from ₹500/day</span>
              </div>
              <div className="hidden sm:block bg-primary-foreground/40 w-px h-[clamp(1.5rem,2.5vw,2rem)]" />
              <div className="flex items-center gap-[clamp(0.75rem,1.5vw,1rem)]">
                <CarFront className="size-[clamp(1.5rem,2.4vw,2rem)] shrink-0" />
                <span className="font-bold text-[clamp(1.2rem,2.2vw,1.5rem)] whitespace-nowrap">Cars from ₹1,500/day</span>
              </div>
            </div>
          </section>

          {/* Rider Stories Section */}
          <section className="flex mr-auto ml-auto py-[clamp(2.5rem,5.5vw,4.5rem)] px-[clamp(1rem,3.5vw,2rem)] flex-col gap-[clamp(1.5rem,3vw,2rem)] max-w-7xl">
            <div className="flex flex-col gap-2">
              <p className="font-semibold uppercase text-primary text-[clamp(0.75rem,1.1vw,0.875rem)] tracking-[0.2em]">
                Rider stories
              </p>
              <h2 className="font-bold text-[clamp(1.65rem,3.2vw,2.25rem)]">
                Loved by riders across Rajkot
              </h2>
            </div>
            <div className="grid gap-[clamp(1rem,2vw,1.5rem)] grid-cols-1 md:grid-cols-3">
              <Card className="p-[clamp(1.25rem,2.2vw,1.75rem)] gap-4 shadow-soft">
                <CardContent className="flex p-0 flex-col gap-[clamp(0.75rem,1.2vw,1rem)]">
                  <div className="text-primary flex gap-1">
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                  </div>
                  <p className="text-muted-foreground text-[clamp(0.85rem,1.1vw,0.95rem)] leading-relaxed">
                    “The booking was quick, the bike was spotless, and the whole
                    experience felt wonderfully reliable.”
                  </p>
                  <p className="font-semibold text-[clamp(0.875rem,1.1vw,0.95rem)]">Aarav Mehta</p>
                </CardContent>
              </Card>
              <Card className="p-[clamp(1.25rem,2.2vw,1.75rem)] gap-4 shadow-soft">
                <CardContent className="flex p-0 flex-col gap-[clamp(0.75rem,1.2vw,1rem)]">
                  <div className="text-primary flex gap-1">
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                  </div>
                  <p className="text-muted-foreground text-[clamp(0.85rem,1.1vw,0.95rem)] leading-relaxed">
                    “I needed a car for a family trip and everything was exactly
                    as promised. No surprises at all.”
                  </p>
                  <p className="font-semibold text-[clamp(0.875rem,1.1vw,0.95rem)]">Priya Shah</p>
                </CardContent>
              </Card>
              <Card className="p-[clamp(1.25rem,2.2vw,1.75rem)] gap-4 shadow-soft">
                <CardContent className="flex p-0 flex-col gap-[clamp(0.75rem,1.2vw,1rem)]">
                  <div className="text-primary flex gap-1">
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                    <Star className="fill-primary size-4" />
                  </div>
                  <p className="text-muted-foreground text-[clamp(0.85rem,1.1vw,0.95rem)] leading-relaxed">
                    “Friendly support, flexible timings, and a great selection.
                    keval car is now my first choice.”
                  </p>
                  <p className="font-semibold text-[clamp(0.875rem,1.1vw,0.95rem)]">Rohan Desai</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="bg-secondary py-[clamp(2.5rem,5.5vw,4.5rem)] px-[clamp(1rem,3.5vw,2rem)]">
            <div className="flex mr-auto ml-auto flex-col gap-[clamp(1.5rem,3vw,2rem)] max-w-3xl">
              <div className="text-center flex flex-col gap-2">
                <p className="font-semibold uppercase text-primary text-[clamp(0.75rem,1.1vw,0.875rem)] tracking-[0.2em]">
                  Need to know
                </p>
                <h2 className="font-bold text-[clamp(1.65rem,3.2vw,2.25rem)]">
                  Frequently asked questions
                </h2>
              </div>
              <div className="flex flex-col gap-[clamp(0.6rem,1.2vw,0.75rem)]">
                <div className="rounded-xl bg-card shadow-soft">
                  <button className="font-semibold text-left flex p-[clamp(1rem,2vw,1.25rem)] justify-between items-center w-full text-[clamp(0.9rem,1.1vw,1rem)]">
                    What documents do I need?
                    <ChevronDown className="size-5 shrink-0" />
                  </button>
                  <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)] hidden p-[clamp(1rem,2vw,1.25rem)] pt-0">
                    You need a valid driving licence, government ID, and the
                    booking confirmation.
                  </p>
                </div>
                <div className="rounded-xl bg-card shadow-soft">
                  <button className="font-semibold text-left flex p-[clamp(1rem,2vw,1.25rem)] justify-between items-center w-full text-[clamp(0.9rem,1.1vw,1rem)]">
                    What about fuel?
                    <ChevronDown className="size-5 shrink-0" />
                  </button>
                  <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)] hidden p-[clamp(1rem,2vw,1.25rem)] pt-0">
                    Vehicles are provided with a standard fuel level and should
                    be returned at the same level.
                  </p>
                </div>
                <div className="rounded-xl bg-card shadow-soft">
                  <button className="font-semibold text-left flex p-[clamp(1rem,2vw,1.25rem)] justify-between items-center w-full text-[clamp(0.9rem,1.1vw,1rem)]">
                    Can I cancel my booking?
                    <ChevronDown className="size-5 shrink-0" />
                  </button>
                  <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)] hidden p-[clamp(1rem,2vw,1.25rem)] pt-0">
                    Yes. Free cancellation is available before your scheduled
                    pick-up time.
                  </p>
                </div>
                <div className="rounded-xl bg-card shadow-soft">
                  <button className="font-semibold text-left flex p-[clamp(1rem,2vw,1.25rem)] justify-between items-center w-full text-[clamp(0.9rem,1.1vw,1rem)]">
                    Do you offer delivery?
                    <ChevronDown className="size-5 shrink-0" />
                  </button>
                  <p className="text-muted-foreground text-[clamp(0.8rem,1vw,0.875rem)] hidden p-[clamp(1rem,2vw,1.25rem)] pt-0">
                    Vehicle delivery and collection options are available for
                    selected locations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Banner Section */}
          <section className="py-[clamp(2.5rem,5.5vw,5rem)] px-[clamp(1rem,3.5vw,2rem)]">
            <div className="rounded-3xl bg-primary text-primary-foreground flex flex-col md:flex-row mr-auto ml-auto p-[clamp(1.75rem,4vw,3rem)] justify-between items-start md:items-center gap-[clamp(1.25rem,2.5vw,2rem)] max-w-7xl shadow-card">
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-[clamp(1.75rem,3.6vw,2.5rem)] leading-tight">
                  Ready to hit the road?
                </h2>
                <p className="text-primary-foreground/80 text-[clamp(0.95rem,1.3vw,1.15rem)]">
                  Your next adventure starts with a better ride.
                </p>
              </div>
              <a
                className="font-semibold rounded-full bg-card text-card-foreground inline-flex py-[clamp(0.65rem,1.2vw,0.85rem)] px-[clamp(1.35rem,2.2vw,1.75rem)] items-center gap-2 whitespace-nowrap shadow-soft hover:shadow-card transition-all shrink-0 cursor-pointer"
                href="#book-now"
                onClick={(e) => scrollToSection(e, "book-now")}
              >
                Book your vehicle
                <ArrowRight className="size-4 shrink-0" />
              </a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer
          className="bg-secondary border-t border-t-border py-[clamp(1.75rem,3vw,2.5rem)] px-[clamp(1rem,3.5vw,2rem)]"
          id="contact"
        >
          <div className="flex flex-col sm:flex-row mr-auto ml-auto justify-between items-center gap-[clamp(1rem,2vw,1.5rem)] max-w-7xl">
            <div className="flex items-center gap-[clamp(0.5rem,1.2vw,0.75rem)] shrink-0">
              <span className="font-bold rounded-full bg-primary text-primary-foreground text-[clamp(0.9rem,1.2vw,1.125rem)] flex justify-center items-center size-[clamp(2rem,2.8vw,2.25rem)] shrink-0">
                K
              </span>
              <span className="font-semibold text-[clamp(1.1rem,1.5vw,1.25rem)] whitespace-nowrap">keval car</span>
            </div>
            <div className="text-muted-foreground text-[clamp(0.75rem,1vw,0.875rem)] flex items-center gap-[clamp(1rem,2.5vw,2rem)] whitespace-nowrap">
              <a href="#terms" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#cancellation" className="hover:text-foreground transition-colors">Cancellation policy</a>
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-muted-foreground text-[clamp(0.75rem,1vw,0.875rem)] whitespace-nowrap">© 2026 keval car</p>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a
          aria-label="Contact keval car on WhatsApp"
          className="shadow-card rounded-full bg-primary text-primary-foreground flex fixed right-[clamp(1rem,2.5vw,2rem)] bottom-[clamp(1rem,2.5vw,2rem)] justify-center items-center size-[clamp(3rem,4.2vw,3.5rem)] hover:scale-105 active:scale-95 transition-transform z-40 shrink-0"
          href="#contact"
        >
          <MessageCircle className="size-[clamp(1.25rem,1.8vw,1.5rem)] shrink-0" />
        </a>
      </div>
    </div>
  );
}
