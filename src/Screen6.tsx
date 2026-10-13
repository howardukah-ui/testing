import { useState, useEffect, useMemo } from "react";
import {
  CalendarClock,
  CalendarPlus,
  CarFront,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock3,
  Download,
  Info,
  KeyRound,
  MapPin,
  Route,
  TriangleAlert,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from "canvas-confetti";

import "./8125257c-d8cd-4007-a63c-8f8075a7d0ec.css";
import "./Screen-6.screen.css";
import { VEHICLES_DATA } from "@/data/vehicles";

interface Screen6Props {
  bookingId?: string;
  onNavigateHome: () => void;
  onNavigateVehicles: () => void;
  onNavigateBookings: () => void;
  onNavigateCheckout?: () => void;
}

export default function Screen6({
  bookingId = "RO-2026-000118",
  onNavigateHome,
  onNavigateVehicles,
  onNavigateBookings,
  onNavigateCheckout,
}: Screen6Props) {
  // Live ticking countdown state
  const [secondsRemaining, setSecondsRemaining] = useState(6138); // 1h 42m 18s
  const [extensionConfirmed, setExtensionConfirmed] = useState(false);
  const [newDropoff, setNewDropoff] = useState("14 Oct 2026 08:30 PM");
  const [duesPaid, setDuesPaid] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(secondsRemaining / (3600 * 24));
  const hours = Math.floor((secondsRemaining % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const padZero = (n: number) => String(n).padStart(2, "0");

  const handleConfirmExtension = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#f97316", "#22c55e", "#ffedd5"],
    });
    setExtensionConfirmed(true);
    setSecondsRemaining((prev) => prev + 7200); // add 2 hours
    setTimeout(() => setExtensionConfirmed(false), 4000);
  };

  const handleDownloadInvoice = () => {
    const invoiceContent = `KEVAL CAR RENTAL INVOICE\nBooking ID: ${bookingId}\nVehicle: Royal Enfield Classic 350\nPickup: 14 Oct 2026, 10:00 AM\nReturn: 14 Oct 2026, 06:30 PM\nTotal Amount: ₹3,180 (GST & Deposit Paid)\nStatus: Confirmed / Active\nStore: Rajkot Central, Gujarat\nThank you for choosing Keval Car!`;
    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div data-appearance="light" className="min-h-screen bg-background text-foreground">
      {/* Header conforming to site standard: How it works -> Vehicles -> My Bookings (no Contact) */}
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
              className="font-medium text-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <CarFront className="size-4" />
              Vehicles
            </button>
            <button
              onClick={onNavigateBookings}
              className="font-semibold text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer border-b-2 border-primary h-full"
            >
              <ClipboardList className="size-4" />
              My Bookings
            </button>
          </nav>

          <button
            onClick={() => onNavigateCheckout?.()}
            className="font-semibold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm inline-flex ml-auto py-2.5 px-5 sm:py-3 sm:px-6 items-center gap-2 transition-all hover:scale-105 shadow-sm active:scale-95"
          >
            <CalendarPlus className="size-4" />
            Book now
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex mr-auto ml-auto pt-6 sm:pt-8 px-4 sm:px-8 pb-16 flex-col gap-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground text-xs sm:text-sm flex items-center gap-2"
        >
          <button
            onClick={onNavigateBookings}
            className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            My bookings
          </button>
          <ChevronRight className="size-3.5 text-muted-foreground/60" />
          <span className="font-semibold text-primary font-mono">{bookingId}</span>
        </nav>

        {/* Section 1: Active Booking Overview + Live Rental Countdown */}
        <section className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
          <Card className="p-6 gap-6 border border-border bg-card shadow-sm rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Active booking
                </p>
                <h1 className="font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
                  Royal Enfield Classic 350
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm font-mono">
                  Booking ID {bookingId}
                </p>
              </div>
              <Badge className="rounded-full bg-primary text-primary-foreground font-bold text-xs py-1 px-3.5 shadow-sm">
                ACTIVE
              </Badge>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              <div className="rounded-xl bg-secondary/80 border border-border/50 flex p-4 items-center gap-3">
                <MapPin className="text-primary size-5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-muted-foreground text-[11px] uppercase font-semibold">
                    Pickup location
                  </span>
                  <span className="font-bold text-sm text-foreground">Rajkot Central</span>
                </div>
              </div>
              <div className="rounded-xl bg-secondary/80 border border-border/50 flex p-4 items-center gap-3">
                <CalendarClock className="text-primary size-5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-muted-foreground text-[11px] uppercase font-semibold">
                    Return by
                  </span>
                  <span className="font-bold text-sm text-foreground">14 Oct 2026, 06:30 PM</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden h-[220px] sm:h-[280px] w-full bg-muted">
              <img
                alt="Royal Enfield Classic 350"
                className="w-full h-full object-cover"
                data-authorname="Harsh Khandelwal"
                data-authorurl="https://unsplash.com/@poopyshark"
                data-blurhash="LN9I6zofofjZT}fkWCazMxfQe.kC"
                data-photoid="-SZaE2O0q5Y"
                src="https://images.unsplash.com/photo-1763920227051-cba429369989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcGFya2VkJTIwcm9hZCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              />
            </div>
          </Card>

          {/* Rental Countdown Card */}
          <Card className="bg-accent p-6 gap-6 border border-accent border-primary/20 shadow-sm rounded-2xl flex flex-col justify-between">
            <div className="flex flex-col gap-1.5">
              <p className="font-bold uppercase text-primary text-xs tracking-wider">
                Rental Countdown
              </p>
              <h2 className="font-bold text-2xl text-foreground">Time left to return</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Your live booking countdown clock
              </p>
            </div>

            <div className="grid gap-2.5 grid-cols-4">
              <div className="rounded-xl bg-card border border-primary/30 flex p-3 sm:p-4 flex-col items-center gap-1 shadow-sm">
                <span className="font-extrabold text-primary text-3xl sm:text-4xl tabular-nums">
                  {padZero(days)}
                </span>
                <span className="font-medium text-muted-foreground text-[11px] sm:text-xs">
                  Days
                </span>
              </div>
              <div className="rounded-xl bg-card border border-primary/30 flex p-3 sm:p-4 flex-col items-center gap-1 shadow-sm">
                <span className="font-extrabold text-primary text-3xl sm:text-4xl tabular-nums">
                  {padZero(hours)}
                </span>
                <span className="font-medium text-muted-foreground text-[11px] sm:text-xs">
                  Hours
                </span>
              </div>
              <div className="rounded-xl bg-card border border-primary/30 flex p-3 sm:p-4 flex-col items-center gap-1 shadow-sm">
                <span className="font-extrabold text-primary text-3xl sm:text-4xl tabular-nums">
                  {padZero(minutes)}
                </span>
                <span className="font-medium text-muted-foreground text-[11px] sm:text-xs">
                  Minutes
                </span>
              </div>
              <div className="rounded-xl bg-card border border-primary/30 flex p-3 sm:p-4 flex-col items-center gap-1 shadow-sm">
                <span className="font-extrabold text-primary text-3xl sm:text-4xl tabular-nums">
                  {padZero(seconds)}
                </span>
                <span className="font-medium text-muted-foreground text-[11px] sm:text-xs">
                  Seconds
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-card text-muted-foreground text-xs border border-primary/20 flex p-4 items-center gap-3 shadow-sm">
              <Info className="text-primary size-5 shrink-0" />
              <span>Keep an eye on the countdown to return on time and avoid late return charges.</span>
            </div>
          </Card>
        </section>

        {/* Section 2: Booking Timeline & Price Breakdown */}
        <section className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
          {/* Booking Timeline */}
          <Card className="p-6 gap-6 border border-border bg-card shadow-sm rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0.5">
                <h2 className="font-bold text-xl text-foreground">Booking timeline</h2>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Your rental journey milestone checkpoints
                </p>
              </div>
              <Route className="text-primary size-5" />
            </div>

            <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-4 flex flex-col gap-2.5 bg-card">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary text-primary-foreground flex justify-center items-center size-7 text-xs font-bold">
                    <Check className="size-4" />
                  </span>
                  <span className="font-bold text-sm text-foreground">Booked</span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  10 Oct 2026<br />09:14 AM
                </p>
              </div>

              <div className="rounded-xl border border-border p-4 flex flex-col gap-2.5 bg-card">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary text-primary-foreground flex justify-center items-center size-7 text-xs font-bold">
                    <KeyRound className="size-4" />
                  </span>
                  <span className="font-bold text-sm text-foreground">Picked up</span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  14 Oct 2026<br />10:00 AM
                </p>
              </div>

              <div className="rounded-xl bg-accent border-2 border-primary p-4 flex flex-col gap-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary text-primary-foreground flex justify-center items-center size-7 text-xs font-bold">
                    <Clock3 className="size-4" />
                  </span>
                  <span className="font-bold text-sm text-foreground">Return due</span>
                </div>
                <p className="text-foreground text-xs leading-relaxed font-semibold">
                  14 Oct 2026<br />06:30 PM
                </p>
              </div>
            </div>
          </Card>

          {/* Price Breakdown */}
          <Card className="p-6 gap-4 border border-border bg-card shadow-sm rounded-2xl flex flex-col justify-between">
            <h2 className="font-bold text-xl text-foreground">Price breakdown</h2>
            <div className="text-sm flex flex-col gap-3.5">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Rental</span>
                <span className="font-semibold text-foreground">₹1,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="font-semibold text-foreground">₹180</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Refundable deposit</span>
                <span className="font-semibold text-foreground">₹2,000</span>
              </div>
              <div className="font-bold text-base border-t border-border pt-4 flex justify-between items-center">
                <span>Total</span>
                <span className="text-primary text-xl">₹3,180</span>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 3: Overdue Notice & Booking Actions */}
        <section className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
          {/* Overdue Card */}
          <Card className="border border-destructive/40 p-6 gap-4 bg-card shadow-sm rounded-2xl flex flex-col justify-between">
            <div className="text-destructive-foreground rounded-xl bg-destructive flex py-2.5 px-4 justify-between items-center shadow-sm">
              <span className="font-bold tracking-wider text-xs">
                {duesPaid ? "SETTLED" : "OVERDUE DEMO"}
              </span>
              <TriangleAlert className="size-4" />
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="font-bold text-destructive text-xl sm:text-2xl">
                  {duesPaid ? "All dues settled" : "Overdue by 00h 18m"}
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  Grace period ends in 12:30
                </p>
              </div>
              <p className="font-bold text-destructive text-lg">
                {duesPaid ? "₹0" : "₹75"}
              </p>
            </div>

            <p className="text-muted-foreground text-xs">
              Return now or extend your rental below to avoid automatic late charges.
            </p>

            <Button
              onClick={() => {
                setDuesPaid(true);
                confetti({ particleCount: 50 });
              }}
              disabled={duesPaid}
              className={`w-fit text-xs font-bold rounded-full h-9 px-5 ${
                duesPaid
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              }`}
            >
              {duesPaid ? "Dues Paid ✓" : "Pay dues"}
            </Button>
          </Card>

          {/* Booking Actions */}
          <Card className="p-6 gap-4 border border-border bg-card shadow-sm rounded-2xl flex flex-col justify-between">
            <h2 className="font-bold text-xl text-foreground">Booking actions</h2>
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleDownloadInvoice}
                className="justify-start gap-2 text-xs font-bold h-10 rounded-xl"
                variant="outline"
              >
                <Download className="size-4 text-primary" />
                Download invoice
              </Button>
              <Button
                onClick={() => {
                  if (confirm("Are you sure you want to cancel this booking? 100% refund will be processed to source.")) {
                    onNavigateBookings();
                  }
                }}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 justify-start gap-2 text-xs font-bold h-10 rounded-xl"
                variant="outline"
              >
                <XCircle className="size-4" />
                Cancel booking
              </Button>
              <Button
                onClick={() => {
                  const el = document.getElementById("extend-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground justify-start gap-2 text-xs font-bold h-10 rounded-xl shadow-sm"
              >
                <CalendarPlus className="size-4" />
                Extend rental
              </Button>
            </div>
          </Card>
        </section>

        {/* Section 4: Extend Rental Card */}
        <Card id="extend-section" className="p-6 gap-6 border border-border bg-card shadow-sm rounded-2xl">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <h2 className="font-bold text-xl text-foreground">Extend rental</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Update your drop-off time seamlessly
              </p>
            </div>
            <CalendarClock className="text-primary size-5" />
          </div>

          {extensionConfirmed ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="size-6 text-emerald-600" />
              <div>
                <span className="font-bold text-sm text-emerald-800 block">
                  Extension Confirmed!
                </span>
                <span className="text-xs text-emerald-700">
                  New drop-off set to {newDropoff}. 2 hours added to your rental countdown.
                </span>
              </div>
            </div>
          ) : (
            <div className="grid items-end gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-[1fr_1fr_auto]">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-foreground">
                  New drop-off
                </label>
                <input
                  value={newDropoff}
                  onChange={(e) => setNewDropoff(e.target.value)}
                  className="rounded-xl bg-background text-xs sm:text-sm border border-input py-2.5 px-4 h-11 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-xs text-foreground">Extra charge</span>
                <span className="font-bold rounded-xl bg-secondary text-xs sm:text-sm py-2.5 px-4 h-11 flex items-center border border-border/50 text-foreground">
                  ₹300
                </span>
              </div>
              <Button
                onClick={handleConfirmExtension}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-bold text-xs sm:text-sm h-11 px-6 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Check className="size-4" />
                Confirm extension
              </Button>
            </div>
          )}
        </Card>

        <p className="text-muted-foreground text-xs">
          Countdowns use the shared demo clock. All timestamps shown in Indian Standard Time (IST).
        </p>
      </main>

      {/* Floating Demo Mode badge */}
      <div className="font-medium shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-full bg-card text-muted-foreground text-xs border border-border fixed bottom-6 left-6 py-2 px-4 backdrop-blur-md z-40">
        Demo mode
      </div>
    </div>
  );
}
