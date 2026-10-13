import { useMemo } from "react";
import {
  CalendarPlus,
  CarFront,
  Check,
  CircleHelp,
  ClipboardList,
  Download,
  IdCard,
  Clock,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import "./8125257c-d8cd-4007-a63c-8f8075a7d0ec.css";
import "./Screen-9.screen.css";
import { VEHICLES_DATA, Vehicle } from "@/data/vehicles";

interface Screen9Props {
  vehicleId?: string;
  bookingCode?: string;
  onNavigateHome: () => void;
  onNavigateVehicles: () => void;
  onNavigateBookings: () => void;
  onViewBookingDetail?: (bookingId: string) => void;
  onNavigateCheckout?: () => void;
}

export default function Screen9({
  vehicleId = "honda-activa-6g",
  bookingCode = "RO-2026-000123",
  onNavigateHome,
  onNavigateVehicles,
  onNavigateBookings,
  onViewBookingDetail,
  onNavigateCheckout,
}: Screen9Props) {
  const vehicle: Vehicle = useMemo(() => {
    const found = VEHICLES_DATA.find((v) => v.id === vehicleId);
    return found || VEHICLES_DATA[1]; // default to Honda Activa 6G
  }, [vehicleId]);

  const handleDownloadInvoice = () => {
    const invoiceContent = `KEVAL CAR RENTAL RECEIPT\nBooking Code: ${bookingCode}\nVehicle: ${vehicle.name} (${vehicle.type})\nPickup Store: Rajkot Central\nDates: 14 Oct 2026, 10:00 AM – 16 Oct 2026, 10:00 AM\nTotal Paid: ₹1,770 (Demo checkout)\nPayment Status: Confirmed\nGST Number: 24AABCK1234F1Z8\nKeval Car - Rajkot, Gujarat\nHave a safe and happy journey!`;
    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Booking-${bookingCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div data-appearance="light" className="min-h-screen bg-background text-foreground">
      {/* Header conforming to established structure: How it works -> Vehicles -> My Bookings (no Contact) */}
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
              className="font-medium text-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
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

      {/* Main Confirmation Content */}
      <main className="flex mr-auto ml-auto pt-8 sm:pt-12 px-4 sm:px-8 pb-16 flex-col items-center gap-8 max-w-4xl">
        {/* Success Icon & Headings */}
        <section className="text-center flex flex-col items-center gap-3">
          <div className="rounded-full bg-accent text-primary flex justify-center items-center size-20 shadow-md ring-8 ring-primary/10">
            <Check className="size-10 text-primary" strokeWidth={3} />
          </div>
          <h1 className="font-bold text-3xl sm:text-4xl tracking-tight text-foreground mt-2">
            Your ride is booked!
          </h1>
          <p className="text-muted-foreground text-base max-w-md">
            We’ve saved your booking on this device and dispatched your confirmation.
          </p>
          <p className="font-medium text-foreground text-sm">
            Booking code: <span className="font-bold text-primary font-mono ml-1">{bookingCode}</span>
          </p>
        </section>

        {/* Booking Summary Card */}
        <Card className="p-6 gap-6 w-full border border-border bg-card shadow-sm rounded-2xl">
          <CardHeader className="p-0 flex-row justify-between items-start gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                Booking summary
              </p>
              <h2 className="font-bold text-2xl text-foreground">
                {vehicle.name}
              </h2>
            </div>
            <span className="font-bold rounded-full bg-accent text-primary text-xs tracking-wider py-1 px-3 border border-primary/20">
              UPCOMING
            </span>
          </CardHeader>

          <CardContent className="grid p-0 gap-6 grid-cols-1 sm:grid-cols-3 pt-2">
            <div className="flex flex-col gap-1">
              <span className="font-semibold uppercase text-muted-foreground text-xs tracking-wide">
                Pickup
              </span>
              <span className="font-bold text-sm text-foreground">Rajkot Central</span>
              <span className="text-muted-foreground text-xs">
                14 Oct 2026 10:00 AM
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold uppercase text-muted-foreground text-xs tracking-wide">
                Return
              </span>
              <span className="font-bold text-sm text-foreground">Rajkot Central</span>
              <span className="text-muted-foreground text-xs">
                16 Oct 2026 10:00 AM
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold uppercase text-muted-foreground text-xs tracking-wide">
                Total Paid
              </span>
              <span className="font-extrabold text-2xl text-primary">₹1,770</span>
            </div>
          </CardContent>

          <CardFooter className="rounded-xl bg-muted/80 border border-border/60 flex p-4 justify-between items-center gap-4 mt-2">
            <span className="font-semibold text-xs sm:text-sm text-foreground">
              Rental Countdown
            </span>
            <span className="font-bold text-primary text-xs sm:text-sm">
              Pick-up starts in 02d 05h 14m
            </span>
          </CardFooter>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            onClick={() => {
              if (onViewBookingDetail) {
                onViewBookingDetail(bookingCode);
              } else {
                onNavigateBookings();
              }
            }}
            className="font-bold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm py-3 px-6 shadow-md hover:scale-105 transition-all"
          >
            View my booking
          </Button>
          <Button
            onClick={handleDownloadInvoice}
            className="font-bold rounded-full text-sm border-border py-3 px-6 gap-2 hover:bg-muted transition-all"
            variant="outline"
          >
            <Download className="size-4 text-primary" />
            Download invoice
          </Button>
        </div>

        <p className="text-muted-foreground text-xs sm:text-sm">
          Demo payment successful · no money was charged
        </p>

        {/* 3 Quick Checklist Cards */}
        <section className="grid gap-4 grid-cols-1 sm:grid-cols-3 w-full">
          <Card className="p-5 gap-3 border border-border bg-card shadow-sm rounded-xl flex items-center gap-3">
            <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
              <IdCard className="size-5" />
            </div>
            <h3 className="font-bold text-sm text-foreground">
              Bring your driving licence
            </h3>
          </Card>

          <Card className="p-5 gap-3 border border-border bg-card shadow-sm rounded-xl flex items-center gap-3">
            <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
              <Clock className="size-5" />
            </div>
            <h3 className="font-bold text-sm text-foreground">
              Arrive 10 minutes early
            </h3>
          </Card>

          <Card className="p-5 gap-3 border border-border bg-card shadow-sm rounded-xl flex items-center gap-3">
            <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
              <Smile className="size-5" />
            </div>
            <h3 className="font-bold text-sm text-foreground">
              Enjoy your ride
            </h3>
          </Card>
        </section>

        {/* Back to Vehicles link */}
        <button
          onClick={onNavigateVehicles}
          className="underline-offset-4 underline font-bold text-primary hover:text-primary/80 text-sm cursor-pointer transition-colors"
        >
          Back to vehicles
        </button>
      </main>
    </div>
  );
}
