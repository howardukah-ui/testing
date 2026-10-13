import { useState, useMemo } from "react";
import {
  CalendarPlus,
  CarFront,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Info,
  MapPin,
  ReceiptText,
  Star,
  CheckCircle2,
  CalendarDays,
  ShieldCheck,
  Fuel,
  Gauge,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import confetti from "canvas-confetti";

import "./8125257c-d8cd-4007-a63c-8f8075a7d0ec.css";
import "./Screen-3.screen.css";
import { VEHICLES_DATA, Vehicle } from "@/data/vehicles";

interface Screen3Props {
  vehicleId?: string;
  onNavigateHome: () => void;
  onNavigateVehicles: () => void;
  onNavigateCheckout?: (vehicleId: string) => void;
  bookingsModalOpen?: boolean;
  setBookingsModalOpen?: (open: boolean) => void;
}

export default function Screen3({
  vehicleId = "re-classic-350",
  onNavigateHome,
  onNavigateVehicles,
  onNavigateCheckout,
  setBookingsModalOpen,
}: Screen3Props) {
  // Find vehicle by ID or fallback to first vehicle
  const vehicle: Vehicle = useMemo(() => {
    const found = VEHICLES_DATA.find((v) => v.id === vehicleId);
    return found || VEHICLES_DATA[0];
  }, [vehicleId]);

  // Gallery images with fallbacks
  const galleryImages = useMemo(() => {
    if (vehicle.gallery && vehicle.gallery.length >= 3) {
      return vehicle.gallery;
    }
    return [
      vehicle.image,
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ];
  }, [vehicle]);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [demoMode, setDemoMode] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Reservation inputs
  const [startDate, setStartDate] = useState("14 Oct 2026");
  const [endDate, setEndDate] = useState("16 Oct 2026");
  const [pickupTime, setPickupTime] = useState("10:00 AM");

  const rentalDays = 2;
  const rentalAmount = vehicle.priceDay * rentalDays;

  const handleReserve = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#f97316", "#ea580c", "#ffedd5"],
    });
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 6000);
  };

  const vehicleFeatures = vehicle.features || [
    "ABS",
    "Bluetooth navigation",
    "USB charging",
    vehicle.type === "Bike" || vehicle.type === "Scooter"
      ? "Helmet included"
      : "Air Conditioning",
  ];

  return (
    <div data-appearance="light" className="min-h-screen bg-background text-foreground">
      {/* Header matching site layout (How it works -> Vehicles -> My Bookings; no Contact) */}
      <header className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] bg-background/95 backdrop-blur-md border-b border-border sticky z-50 top-0 h-[72px]">
        <div className="flex mr-auto ml-auto px-4 sm:px-8 items-center h-full max-w-7xl">
          <button
            onClick={onNavigateHome}
            aria-label="keval car home"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <span className="font-bold rounded-full bg-primary text-primary-foreground text-lg flex justify-center items-center size-9 group-hover:scale-105 transition-transform shadow-sm">
              K
            </span>
            <span className="font-semibold text-foreground text-xl tracking-tight group-hover:text-primary transition-colors">
              keval car
            </span>
          </button>

          <nav
            aria-label="Main navigation"
            className="hidden md:flex ml-16 items-center gap-10 h-full"
          >
            <button
              onClick={() => {
                onNavigateHome();
                setTimeout(() => {
                  const el = document.getElementById("how-it-works");
                  el?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="font-medium text-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <CircleHelp className="size-4" />
              How it works
            </button>
            <button
              onClick={onNavigateVehicles}
              className="font-semibold text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer border-b-2 border-primary h-full"
            >
              <CarFront className="size-4" />
              Vehicles
            </button>
            <button
              onClick={() => setBookingsModalOpen?.(true)}
              className="font-medium text-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ClipboardList className="size-4" />
              My Bookings
            </button>
          </nav>

          <button
            onClick={() => {
              if (onNavigateCheckout) {
                onNavigateCheckout(vehicle.id);
              } else {
                const el = document.getElementById("reserve-card");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  handleReserve();
                }
              }
            }}
            className="font-semibold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm inline-flex ml-auto py-2.5 px-5 sm:py-3 sm:px-6 items-center gap-2 transition-all hover:scale-105 shadow-sm active:scale-95"
          >
            <CalendarPlus className="size-4" />
            Book now
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex mr-auto ml-auto pt-6 sm:pt-8 px-4 sm:px-8 pb-16 flex-col gap-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground text-xs sm:text-sm flex flex-wrap items-center gap-2"
        >
          <button
            onClick={onNavigateVehicles}
            className="hover:text-primary transition-colors font-medium flex items-center gap-1 cursor-pointer"
          >
            Vehicles
          </button>
          <ChevronRight className="size-3.5 text-muted-foreground/60" />
          <button
            onClick={onNavigateVehicles}
            className="hover:text-primary transition-colors capitalize cursor-pointer"
          >
            {vehicle.type}s
          </button>
          <ChevronRight className="size-3.5 text-muted-foreground/60" />
          <span className="font-semibold text-foreground truncate max-w-[240px] sm:max-w-none">
            {vehicle.name}
          </span>
        </nav>

        {/* 2-Column Responsive Layout: Detail Section + Aside Card */}
        <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] items-start">
          <section className="flex flex-col gap-8 min-w-0">
            {/* Gallery: Large photo on left + 3 thumbnails on right */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-[minmax(0,1fr)_112px]">
              {/* Main Image */}
              <div className="rounded-2xl bg-muted h-[320px] sm:h-[420px] md:h-[480px] overflow-hidden shadow-sm relative group">
                <img
                  alt={vehicle.name}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={galleryImages[activePhotoIndex]}
                />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Photo {activePhotoIndex + 1} of {galleryImages.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 sm:grid-cols-1 gap-3 sm:gap-4">
                {galleryImages.slice(0, 3).map((imgUrl, idx) => {
                  const isActive = activePhotoIndex === idx;
                  const labels = ["Front view", "Side view", "Detail view"];
                  return (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`rounded-xl bg-muted overflow-hidden h-[90px] sm:h-[149px] transition-all cursor-pointer relative group text-left ${
                        isActive
                          ? "border-2 border-primary ring-2 ring-primary/20 shadow-md"
                          : "border border-border hover:border-primary/50 opacity-80 hover:opacity-100"
                      }`}
                      aria-label={`${vehicle.name} ${labels[idx] || `photo ${idx + 1}`}`}
                    >
                      <img
                        alt={`${vehicle.name} ${labels[idx] || `photo ${idx + 1}`}`}
                        className="size-full object-cover group-hover:scale-105 transition-transform"
                        src={imgUrl}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title, Badges, Specs */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-accent text-accent-foreground px-3 py-1 font-semibold text-xs border border-accent">
                  {vehicle.type}
                </Badge>
                <div className="font-semibold text-foreground text-sm flex items-center gap-1">
                  <Star className="fill-primary text-primary size-4" />
                  {vehicle.rating}
                </div>
                <span className="text-muted-foreground text-sm">
                  ({vehicle.reviewsCount || 126} reviews)
                </span>
                <span className="text-muted-foreground text-sm">·</span>
                <div className="text-muted-foreground text-sm flex items-center gap-1">
                  <MapPin className="size-4 text-primary" />
                  Rajkot
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-foreground text-3xl sm:text-4xl tracking-tight">
                  {vehicle.name}
                </h1>
                <p className="font-semibold text-primary text-xl">
                  From ₹{vehicle.priceDay}/day · ₹{vehicle.priceHour}/hour
                </p>
              </div>

              {/* Specs Grid */}
              <div className="rounded-xl bg-card border border-border grid p-6 gap-4 grid-cols-2 sm:grid-cols-4 shadow-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Gauge className="size-3.5 text-primary" />
                    Engine
                  </span>
                  <span className="font-bold text-base text-foreground">
                    {vehicle.engine || (vehicle.type === "Car" ? "1197 cc" : "349 cc")}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-primary" />
                    Gearbox
                  </span>
                  <span className="font-bold text-base text-foreground">
                    {vehicle.gearbox || vehicle.transmission}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Fuel className="size-3.5 text-primary" />
                    Fuel
                  </span>
                  <span className="font-bold text-base text-foreground">
                    {vehicle.fuel}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Users className="size-3.5 text-primary" />
                    Seats
                  </span>
                  <span className="font-bold text-base text-foreground">
                    {vehicle.seats} seats
                  </span>
                </div>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-2.5">
                {vehicleFeatures.map((feat, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full py-1.5 px-3.5 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs hover:bg-emerald-100/80 transition-colors"
                  >
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Good to Know Card */}
            <Card className="bg-card border border-border p-6 gap-4 shadow-sm">
              <CardHeader className="p-0 gap-1 pb-4">
                <CardTitle className="text-xl font-bold text-foreground">Good to know</CardTitle>
              </CardHeader>
              <CardContent className="grid p-0 gap-5 sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase font-medium">
                    Included km
                  </span>
                  <span className="font-bold text-foreground text-base">
                    {vehicle.type === "Car" ? "150 km/day" : "100 km/day"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase font-medium">
                    Extra km
                  </span>
                  <span className="font-bold text-foreground text-base">
                    {vehicle.type === "Car" ? "₹8/km" : "₹4/km"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase font-medium">
                    Refundable deposit
                  </span>
                  <span className="font-bold text-foreground text-base">
                    ₹{vehicle.deposit.toLocaleString("en-IN")}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="text-muted-foreground text-xs border-t border-border pt-4 px-0 pb-0 gap-2 mt-4">
                <Info className="size-4 text-primary" />
                GST calculated at checkout · Fuel not included · Clean pickup guaranteed
              </CardFooter>
            </Card>

            {/* Reviews Section */}
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl text-foreground">Reviews</h2>
                <span className="text-xs font-semibold text-muted-foreground">
                  Verified renters
                </span>
              </div>
              <div className="grid gap-3.5">
                <Card className="bg-card border-border p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                        R
                      </div>
                      <span className="font-semibold text-xs text-foreground">Rahul M.</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <CardContent className="text-muted-foreground text-sm leading-6 p-0">
                    &ldquo;A smooth and comfortable ride for exploring the city and nearby roads.
                    The bike handled wonderfully and fuel economy was top notch.&rdquo;
                  </CardContent>
                </Card>

                <Card className="bg-card border-border p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                        P
                      </div>
                      <span className="font-semibold text-xs text-foreground">Priya S.</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <CardContent className="text-muted-foreground text-sm leading-6 p-0">
                    &ldquo;The vehicle was spotless, well-maintained, and ready right on time at the Rajkot center.
                    Very quick KYC verification process!&rdquo;
                  </CardContent>
                </Card>

                <Card className="bg-card border-border p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                        A
                      </div>
                      <span className="font-semibold text-xs text-foreground">Ankit V.</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <CardContent className="text-muted-foreground text-sm leading-6 p-0">
                    &ldquo;Great pickup experience, helpful staff, and the ride runs beautifully.
                    Will definitely book with Keval Car again!&rdquo;
                  </CardContent>
                </Card>
              </div>
            </section>
          </section>

          {/* Aside Reservation Sidebar */}
          <aside className="sticky top-24" id="reserve-card">
            <Card className="shadow-lg bg-card border-border p-6 gap-6 rounded-2xl">
              <CardHeader className="p-0 gap-1 pb-2">
                <CardTitle className="text-2xl font-bold text-foreground">
                  Reserve this ride
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Instant booking with verified document check
                </p>
              </CardHeader>

              <CardContent className="flex p-0 flex-col gap-5">
                {bookingSuccess ? (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center flex flex-col items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="size-8 text-green-600" />
                    <h4 className="font-bold text-green-800 text-sm">
                      Reservation Requested!
                    </h4>
                    <p className="text-xs text-green-700">
                      We have placed your hold for {vehicle.name}. Our Rajkot dispatch team will reach out to confirm your pickup!
                    </p>
                    <Button
                      onClick={() => setBookingSuccess(false)}
                      variant="outline"
                      className="mt-2 text-xs h-8 border-green-300 text-green-800"
                    >
                      Book another slot
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-3.5 grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="start-date" className="text-xs font-semibold text-foreground">
                          Pickup date
                        </Label>
                        <Input
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          id="start-date"
                          className="h-10 text-xs rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="end-date" className="text-xs font-semibold text-foreground">
                          Return date
                        </Label>
                        <Input
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          id="end-date"
                          className="h-10 text-xs rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="start-time" className="text-xs font-semibold text-foreground">
                        Pickup time
                      </Label>
                      <Input
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        id="start-time"
                        className="h-10 text-xs rounded-xl"
                      />
                    </div>

                    <div className="rounded-xl bg-muted/70 border border-border/60 text-xs flex p-4 justify-between items-center">
                      <div>
                        <span className="font-semibold text-foreground block">
                          {rentalDays} days · ₹{rentalAmount.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          Rental base before GST
                        </span>
                      </div>
                      <ReceiptText className="text-primary size-5" />
                    </div>

                    <Button
                      onClick={() => {
                        if (onNavigateCheckout) {
                          onNavigateCheckout(vehicle.id);
                        } else {
                          handleReserve();
                        }
                      }}
                      className="font-bold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-12 w-full shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                    >
                      Continue to checkout
                    </Button>
                  </>
                )}

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
                  <ShieldCheck className="size-4 text-primary" />
                  <span>Free cancellation up to 6 hours before pickup</span>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-muted-foreground text-xs mt-4">
              On mobile, this card becomes a sticky bottom bar.
            </p>
          </aside>
        </div>
      </main>

      {/* Demo Mode Toggle at bottom-left */}
      <div className="shadow-[0px_4px_6px_-1px_rgba(0,_0,_0,_0.1),_0px_2px_4px_-2px_rgba(0,_0,_0,_0.1)] rounded-full bg-card border border-border flex fixed z-40 bottom-6 left-6 py-2.5 px-4 items-center gap-3 backdrop-blur-md">
        <span className="font-medium text-xs sm:text-sm text-foreground">Demo mode</span>
        <Switch
          aria-label="Demo mode"
          checked={demoMode}
          onCheckedChange={setDemoMode}
        />
      </div>
    </div>
  );
}
