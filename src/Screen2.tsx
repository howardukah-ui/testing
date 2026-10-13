import { useState, useEffect, useMemo } from "react";
import {
  CalendarDays,
  CalendarPlus,
  CarFront,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Heart,
  Info,
  Mail,
  Menu,
  MessageCircle,
  Search,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import confetti from "canvas-confetti";

import "./8125257c-d8cd-4007-a63c-8f8075a7d0ec.css";
import "./Screen-2.screen.css";

import { VEHICLES_DATA, Vehicle } from "@/data/vehicles";

interface Screen2Props {
  onNavigateHome?: () => void;
  onSelectVehicle?: (vehicleId: string) => void;
  onNavigateCheckout?: (vehicleId?: string) => void;
  bookingsModalOpen?: boolean;
  setBookingsModalOpen?: (open: boolean) => void;
}

export default function Screen2({
  onNavigateHome,
  onSelectVehicle,
  onNavigateCheckout,
  bookingsModalOpen: externalBookingsModalOpen,
  setBookingsModalOpen: externalSetBookingsModalOpen,
}: Screen2Props) {
  // Mobile drawer states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalBookingsModalOpen, setInternalBookingsModalOpen] = useState(false);
  const [bookedVehicle, setBookedVehicle] = useState<string | null>(null);

  const bookingsModalOpen =
    externalBookingsModalOpen !== undefined ? externalBookingsModalOpen : internalBookingsModalOpen;
  const setBookingsModalOpen =
    externalSetBookingsModalOpen || setInternalBookingsModalOpen;

  const [activeSection, setActiveSection] = useState<string>("");

  // Only highlight Vehicles when user scrolls into the vehicles section
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("vehicles");
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {
          setActiveSection("vehicles");
        } else {
          setActiveSection("");
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `transition-all text-[clamp(0.75rem,0.9vw,0.875rem)] flex items-center gap-1.5 whitespace-nowrap shrink-0 px-4 py-1.5 rounded-full ${
      isActive
        ? "bg-primary text-primary-foreground font-bold shadow-sm"
        : "text-foreground font-medium hover:text-primary hover:bg-black/5"
    }`;
  };

  const scrollToVehicles = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection("vehicles");
    setMobileMenuOpen(false);
    const el = document.getElementById("vehicles");
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Active filter tab (All | Bike | Scooter | Car)
  const [activeTab, setActiveTab] = useState<string>("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [searchLocation, setSearchLocation] = useState("Rajkot");

  // Favorite states
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBookVehicle = (name: string) => {
    setBookedVehicle(name);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#F97316", "#EA580C", "#FFD700", "#1F2937"],
      });
    } catch {
      // Confetti fallback
    }
  };

  const filteredVehicles = useMemo(() => {
    let list = VEHICLES_DATA.filter((item) => {
      if (activeTab !== "all" && item.type.toLowerCase() !== activeTab.toLowerCase()) {
        return false;
      }
      return true;
    });

    if (sortBy === "price-low") {
      list = [...list].sort((a, b) => a.priceDay - b.priceDay);
    } else if (sortBy === "price-high") {
      list = [...list].sort((a, b) => b.priceDay - a.priceDay);
    } else if (sortBy === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeTab, sortBy]);

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
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome?.();
              }}
            >
              <span className="font-bold rounded-full bg-primary text-primary-foreground text-lg flex justify-center items-center size-9 group-hover:scale-105 transition-transform shadow-sm">
                K
              </span>
              <span className="font-semibold text-foreground text-xl tracking-tight group-hover:text-primary transition-colors">
                keval car
              </span>
            </a>

            {/* Navigation: How it works, Vehicles (active with bottom border), My Bookings */}
            <nav
              aria-label="Main navigation"
              className="hidden md:flex ml-16 items-center gap-10 h-full"
            >
              <a
                className="font-medium text-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome?.();
                  setTimeout(() => {
                    const el = document.getElementById("how-it-works");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                <CircleHelp className="size-4" />
                <span>How it works</span>
              </a>
              <button
                type="button"
                onClick={scrollToVehicles}
                className="font-semibold text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer border-b-2 border-primary h-full"
              >
                <CarFront className="size-4" />
                <span>Vehicles</span>
              </button>
              <button
                type="button"
                onClick={() => setBookingsModalOpen(true)}
                className="font-medium text-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ClipboardList className="size-4" />
                <span>My Bookings</span>
              </button>
            </nav>

            {/* Right: Book Now button & Mobile menu toggle */}
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
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome?.();
                }}
                className={`py-2 px-3.5 rounded-xl flex items-center gap-2.5 text-sm text-foreground hover:bg-black/5 cursor-pointer ${
                  activeSection === "how-it-works" ? "bg-primary text-primary-foreground font-bold shadow-sm" : ""
                }`}
                href="#how-it-works"
              >
                <CircleHelp className="size-4" />
                How it works
              </a>
              <a
                onClick={scrollToVehicles}
                className="py-2 px-3.5 rounded-xl flex items-center gap-2.5 text-sm bg-primary text-primary-foreground font-bold shadow-sm"
                href="#vehicles"
              >
                <CarFront className="size-4" />
                Vehicles
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingsModalOpen(true);
                }}
                className="py-2 px-3.5 rounded-xl flex items-center gap-2.5 text-sm text-left text-foreground hover:bg-black/5"
              >
                <ClipboardList className="size-4" />
                My Bookings
              </button>
              <a
                href="#book-now"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const el = document.getElementById("book-now");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-1 py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold bg-primary text-primary-foreground shadow-sm hover:brightness-105"
              >
                <CalendarPlus className="size-4" />
                Book now
              </a>
            </div>
          )}
        </header>

        {/* My Bookings Modal */}
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
                  onClick={() => setBookingsModalOpen(false)}
                  className="p-1.5 hover:bg-black/5 rounded-full text-muted-foreground hover:text-charcoal transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-cream border border-border/60 mb-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    Confirmed
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    #KB-8492
                  </span>
                </div>
                <h4 className="font-bold text-charcoal">Royal Enfield Classic 350</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pick-up: 14 Oct 2026, 10:00 AM · Rajkot Central
                </p>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/40 text-xs font-semibold">
                  <span>Total Paid: ₹1,000 (2 days)</span>
                  <span className="text-primary hover:underline cursor-pointer">
                    View voucher
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setBookingsModalOpen(false)}
                  className="w-full rounded-full font-bold text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Booking Confirmation Dialog */}
        {bookedVehicle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-border text-center relative animate-in zoom-in-95">
              <div className="size-14 mx-auto mb-3 rounded-full bg-orange-100 text-primary flex items-center justify-center">
                <CarFront className="size-7" />
              </div>
              <h3 className="text-xl font-bold text-charcoal">Booking Initiated!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                You selected <strong className="text-charcoal">{bookedVehicle}</strong>. Our team in Rajkot will confirm your reservation shortly.
              </p>
              <Button
                onClick={() => setBookedVehicle(null)}
                className="w-full rounded-full mt-5 font-bold"
              >
                Got it
              </Button>
            </div>
          </div>
        )}

        <main>
          {/* Breadcrumb row */}
          <div className="bg-accent px-[clamp(1rem,3.5vw,2rem)] pt-5 pb-1">
            <div className="max-w-7xl mr-auto ml-auto text-muted-foreground text-xs sm:text-sm flex items-center gap-2">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome?.();
                }}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Home
              </a>
              <ChevronRight className="size-4" />
              <span className="text-foreground font-semibold">Vehicles</span>
            </div>
          </div>

          {/* Warm Cream Body Section with "Find your ride" Card */}
          <section className="bg-accent py-[clamp(1.5rem,3.5vw,2.5rem)] px-[clamp(1rem,3.5vw,2rem)] border-b border-border/40">
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
                      <Label className="text-[clamp(0.75rem,1vw,0.85rem)] font-semibold text-charcoal">
                        Pick-up location
                      </Label>
                      <Input
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="h-[clamp(38px,3.8vw,44px)] text-[clamp(0.8rem,1vw,0.875rem)]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-[clamp(0.75rem,1vw,0.85rem)] font-semibold text-charcoal">
                        Pick-up date
                      </Label>
                      <Input
                        defaultValue="14 Oct 2026"
                        className="h-[clamp(38px,3.8vw,44px)] text-[clamp(0.8rem,1vw,0.875rem)]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-[clamp(0.75rem,1vw,0.85rem)] font-semibold text-charcoal">
                        Time
                      </Label>
                      <Input
                        defaultValue="10:00 AM"
                        className="h-[clamp(38px,3.8vw,44px)] text-[clamp(0.8rem,1vw,0.875rem)]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-[clamp(0.75rem,1vw,0.85rem)] font-semibold text-charcoal">
                        Drop-off date
                      </Label>
                      <Input
                        defaultValue="16 Oct 2026"
                        className="h-[clamp(38px,3.8vw,44px)] text-[clamp(0.8rem,1vw,0.875rem)]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-[clamp(0.75rem,1vw,0.85rem)] font-semibold text-charcoal">
                        Time
                      </Label>
                      <Input
                        defaultValue="10:00 AM"
                        className="h-[clamp(38px,3.8vw,44px)] text-[clamp(0.8rem,1vw,0.875rem)]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-[clamp(0.75rem,1.5vw,1.25rem)]">
                    <Tabs
                      className="w-full sm:w-auto"
                      value={activeTab}
                      onValueChange={(val) => setActiveTab(val)}
                    >
                      <TabsList className="grid grid-cols-4 w-full sm:w-[clamp(270px,30vw,420px)] h-[clamp(36px,3.8vw,42px)]">
                        <TabsTrigger value="all" className="text-[clamp(0.75rem,1vw,0.85rem)]">
                          All
                        </TabsTrigger>
                        <TabsTrigger value="bike" className="text-[clamp(0.75rem,1vw,0.85rem)]">
                          Bike
                        </TabsTrigger>
                        <TabsTrigger value="scooter" className="text-[clamp(0.75rem,1vw,0.85rem)]">
                          Scooter
                        </TabsTrigger>
                        <TabsTrigger value="car" className="text-[clamp(0.75rem,1vw,0.85rem)]">
                          Car
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button className="rounded-full px-[clamp(1.25rem,2.2vw,2rem)] py-[clamp(0.55rem,1vw,0.75rem)] text-[clamp(0.8rem,1vw,0.875rem)] whitespace-nowrap shrink-0">
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

          {/* Fleet Section (Matches screenshot style) */}
          <section
            className="flex mr-auto ml-auto py-[clamp(2.5rem,5.5vw,4.5rem)] px-[clamp(1rem,3.5vw,2rem)] flex-col gap-[clamp(1.5rem,3vw,2.5rem)] max-w-7xl"
            id="vehicles"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold uppercase text-primary text-[clamp(0.75rem,1.1vw,0.875rem)] tracking-[0.2em]">
                  Our fleet
                </p>
                <h2 className="font-bold text-[clamp(1.65rem,3.2vw,2.25rem)] text-foreground tracking-tight">
                  Featured vehicles
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                  <CalendarDays className="size-3.5 text-primary" />
                  <span>Showing {filteredVehicles.length} rides ready for booking</span>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="font-medium text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
                  Sort by
                </span>
                <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
                  <SelectTrigger className="rounded-xl bg-card border-border w-[clamp(140px,20vw,180px)] h-9 text-xs sm:text-sm">
                    <SelectValue placeholder="Recommended" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to high</SelectItem>
                    <SelectItem value="price-high">Price: High to low</SelectItem>
                    <SelectItem value="rating">Top rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Vehicles Grid - matching screenshot 4-column layout */}
            <div className="grid gap-[clamp(1rem,2vw,1.5rem)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {filteredVehicles.map((vehicle) => {
                const isFav = !!favorites[vehicle.id];
                return (
                  <Card
                    key={vehicle.id}
                    onClick={() => onSelectVehicle?.(vehicle.id)}
                    className="p-0 overflow-hidden rounded-2xl bg-card border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between cursor-pointer"
                  >
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        alt={vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={vehicle.image}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(vehicle.id);
                        }}
                        className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/85 backdrop-blur-sm shadow-sm hover:bg-white text-muted-foreground transition-all hover:scale-110"
                        aria-label={`Favorite ${vehicle.name}`}
                      >
                        <Heart
                          className={`size-3.5 transition-colors ${
                            isFav
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    </div>

                    <CardContent className="flex p-[clamp(0.85rem,1.6vw,1.25rem)] flex-col gap-2 flex-1 justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h3 className="font-semibold text-[clamp(0.95rem,1.2vw,1.05rem)] text-foreground tracking-tight group-hover:text-primary transition-colors">
                            {vehicle.name}
                          </h3>
                        </div>

                        <div className="flex mt-1.5 items-center gap-2">
                          <span className="font-semibold rounded-full bg-accent text-accent-foreground text-[11px] py-0.5 px-2">
                            {vehicle.type}
                          </span>
                          <span className="text-xs font-semibold flex items-center gap-1 text-charcoal">
                            <Star className="fill-primary text-primary size-3" />
                            {vehicle.rating}
                          </span>
                        </div>

                        <p className="text-muted-foreground text-xs mt-1.5 font-medium">
                          {vehicle.specs}
                        </p>
                      </div>

                      <div className="flex justify-between items-end pt-3 border-t border-border/40 mt-1">
                        <div>
                          <div className="flex items-baseline">
                            <span className="font-bold text-base sm:text-lg text-foreground">
                              ₹{vehicle.priceDay}
                            </span>
                            <span className="text-muted-foreground text-xs ml-0.5">
                              /day
                            </span>
                          </div>
                          <span className="text-muted-foreground text-[11px] block font-medium">
                            ₹{vehicle.priceHour}/hour
                          </span>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectVehicle) {
                              onSelectVehicle(vehicle.id);
                            } else {
                              handleBookVehicle(vehicle.name);
                            }
                          }}
                          className="rounded-full bg-primary text-primary-foreground font-bold text-xs px-3.5 py-1.5 h-8 hover:brightness-105 shadow-sm"
                        >
                          Book now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredVehicles.length === 0 && (
                <div className="col-span-full py-16 text-center flex flex-col items-center gap-3 bg-card rounded-2xl border border-dashed border-border p-8">
                  <CarFront className="size-10 text-muted-foreground opacity-50" />
                  <h3 className="font-bold text-base">No vehicles found in this category</h3>
                  <p className="text-xs text-muted-foreground max-w-sm">
                    Select &quot;All&quot; to view all cars, bikes, and scooters available in Rajkot.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("all")}
                    className="rounded-full mt-2 text-xs font-bold"
                  >
                    Show all vehicles
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Floating WhatsApp CTA */}
        <a
          aria-label="Chat on WhatsApp"
          className="font-semibold shadow-lg rounded-full bg-primary text-primary-foreground text-xs sm:text-sm inline-flex fixed right-[clamp(1rem,2vw,1.5rem)] bottom-[clamp(1rem,2vw,1.5rem)] py-2.5 px-4 items-center gap-2 z-40 hover:scale-105 active:scale-95 transition-all"
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="size-4 shrink-0" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
