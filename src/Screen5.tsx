import { useState } from "react";
import {
  ArrowRight,
  Bike,
  CalendarDays,
  CalendarPlus,
  CarFront,
  CircleHelp,
  ClipboardList,
  Clock3,
  HardDrive,
  Scooter,
  Timer,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "./8125257c-d8cd-4007-a63c-8f8075a7d0ec.css";
import "./Screen-5.screen.css";

interface Screen5Props {
  onNavigateHome: () => void;
  onNavigateVehicles: () => void;
  onNavigateCheckout?: () => void;
  onSelectVehicle?: (vehicleId: string) => void;
  onSelectBooking?: (bookingId: string) => void;
}

export default function Screen5({
  onNavigateHome,
  onNavigateVehicles,
  onNavigateCheckout,
  onSelectVehicle,
  onSelectBooking,
}: Screen5Props) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<string | null>(null);

  return (
    <div data-appearance="light" className="min-h-screen bg-background text-foreground">
      {/* Header with established structure: How it works -> Vehicles -> My Bookings (highlighted) */}
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
              onClick={() => setActiveTab("upcoming")}
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

      {/* Main Bookings Container */}
      <main className="flex mr-auto ml-auto pt-8 sm:pt-12 px-4 sm:px-8 pb-16 flex-col gap-8 max-w-7xl">
        {/* Header Title + Stored badge */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-bold text-3xl sm:text-4xl tracking-tight text-foreground">
              My bookings
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Your reservations, all in one place
            </p>
          </div>
          <div className="rounded-full bg-secondary text-secondary-foreground text-xs sm:text-sm border border-border flex py-2 px-4 items-center gap-2 shadow-sm">
            <HardDrive className="size-4 text-primary" />
            <span className="font-medium">Stored on this device</span>
          </div>
        </div>

        {/* Status Tabs */}
        <Tabs
          className="flex flex-col gap-6"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="rounded-full bg-muted p-1 w-fit h-12 flex flex-wrap shadow-inner border border-border/60">
            <TabsTrigger className="rounded-full px-5 sm:px-6 text-xs sm:text-sm font-semibold" value="upcoming">
              Upcoming
            </TabsTrigger>
            <TabsTrigger className="rounded-full px-5 sm:px-6 text-xs sm:text-sm font-semibold" value="active">
              Active
            </TabsTrigger>
            <TabsTrigger className="rounded-full px-5 sm:px-6 text-xs sm:text-sm font-semibold" value="completed">
              Completed
            </TabsTrigger>
            <TabsTrigger className="rounded-full px-5 sm:px-6 text-xs sm:text-sm font-semibold" value="cancelled">
              Cancelled
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Bookings Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Card 1: Honda Activa 6G (UPCOMING) */}
          {(activeTab === "upcoming" || activeTab === "all") && (
            <Card className="p-0 border border-border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr] md:grid-cols-[280px_1fr]">
                <div className="bg-muted h-[220px] sm:h-full min-h-[220px] sm:min-h-[300px] overflow-hidden relative group">
                  <img
                    alt="Honda Activa 6G"
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-authorname="Adhitya Sibikumar"
                    data-authorurl="https://unsplash.com/@adhitya_2505"
                    data-blurhash="LUF}=m589G%L~qr=9at8?bn$IUR+"
                    data-photoid="uOtlZohxgt8"
                    src="https://images.unsplash.com/photo-1771575520403-df44ea769881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwY2l0eSUyMHN0cmVldCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  />
                </div>
                <div className="flex p-5 sm:p-6 flex-col gap-5 justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="font-bold text-xl sm:text-2xl text-foreground">
                          Honda Activa 6G
                        </h2>
                        <Badge className="font-bold rounded-full bg-primary text-primary-foreground text-xs py-0.5 px-2.5">
                          UPCOMING
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs font-mono">
                        Booking code RO-2026-000123
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-accent text-primary">
                      <Scooter className="size-5" />
                    </div>
                  </div>

                  <div className="rounded-xl bg-secondary/80 border border-border/50 grid p-3.5 sm:p-4 gap-3 grid-cols-2 text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-muted-foreground text-[11px] uppercase font-semibold">
                        Location
                      </span>
                      <span className="font-bold text-foreground">Rajkot Central</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-muted-foreground text-[11px] uppercase font-semibold">
                        Total
                      </span>
                      <span className="font-bold text-foreground text-sm">₹1,770</span>
                    </div>
                    <div className="text-xs font-medium flex items-center gap-2 col-span-2 pt-1 border-t border-border/40 text-foreground">
                      <CalendarDays className="text-primary size-4 shrink-0" />
                      <span>14 Oct 2026 10:00 AM</span>
                      <ArrowRight className="text-muted-foreground size-3.5 shrink-0" />
                      <span>16 Oct 2026 10:00 AM</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-accent/60 border border-accent flex py-2.5 px-3.5 justify-between items-center text-xs">
                    <span className="font-semibold text-accent-foreground">
                      Pick-up starts in 02d 05h 14m
                    </span>
                    <Timer className="text-primary size-4" />
                  </div>

                  <Button
                    onClick={() => onSelectBooking ? onSelectBooking("RO-2026-000123") : onSelectVehicle?.("honda-activa-6g")}
                    className="rounded-full px-6 w-fit h-9 text-xs font-bold shadow-sm"
                  >
                    View details
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Card 2: Royal Enfield Classic 350 (ACTIVE) */}
          {(activeTab === "active" || activeTab === "all") && (
            <Card className="p-0 border border-border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr] md:grid-cols-[280px_1fr]">
                <div className="bg-muted h-[220px] sm:h-full min-h-[220px] sm:min-h-[300px] overflow-hidden relative group">
                  <img
                    alt="Royal Enfield Classic 350"
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-authorname="Harsh Khandelwal"
                    data-authorurl="https://unsplash.com/@poopyshark"
                    data-blurhash="LN9I6zofofjZT}fkWCazMxfQe.kC"
                    data-photoid="-SZaE2O0q5Y"
                    src="https://images.unsplash.com/photo-1763920227051-cba429369989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcGFya2VkJTIwcm9hZCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  />
                </div>
                <div className="flex p-5 sm:p-6 flex-col gap-5 justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="font-bold text-xl sm:text-2xl text-foreground">
                          Royal Enfield Classic 350
                        </h2>
                        <Badge className="font-bold rounded-full bg-emerald-600 text-white text-xs py-0.5 px-2.5">
                          ACTIVE
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs font-mono">
                        Booking code RO-2026-000118
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-accent text-primary">
                      <Bike className="size-5" />
                    </div>
                  </div>

                  <div className="rounded-xl bg-secondary/80 border border-border/50 grid p-3.5 sm:p-4 gap-3 grid-cols-2 text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-muted-foreground text-[11px] uppercase font-semibold">
                        Location
                      </span>
                      <span className="font-bold text-foreground">Rajkot</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-muted-foreground text-[11px] uppercase font-semibold">
                        Total
                      </span>
                      <span className="font-bold text-foreground text-sm">₹1,286</span>
                    </div>
                    <div className="text-xs font-medium flex items-center gap-2 col-span-2 pt-1 border-t border-border/40 text-foreground">
                      <Clock3 className="text-emerald-600 size-4 shrink-0" />
                      <span>Ends today 06:30 PM</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-muted border border-border flex py-2.5 px-3.5 justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">
                      01h 42m 18s remaining
                    </span>
                    <Timer className="text-emerald-600 size-4" />
                  </div>

                  <Button
                    onClick={() => onSelectBooking ? onSelectBooking("RO-2026-000118") : onSelectVehicle?.("re-classic-350")}
                    className="rounded-full px-6 w-fit h-9 text-xs font-bold"
                    variant="outline"
                  >
                    View details
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Empty states for Completed and Cancelled */}
          {activeTab === "completed" && (
            <div className="col-span-full py-16 text-center flex flex-col items-center gap-3 bg-card rounded-2xl border border-dashed border-border p-8">
              <CheckCircle2 className="size-12 text-muted-foreground/40" />
              <h3 className="font-bold text-base text-foreground">No completed trips yet</h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                Trips you finish will appear here along with your invoices and deposit refund statuses.
              </p>
            </div>
          )}

          {activeTab === "cancelled" && (
            <div className="col-span-full py-16 text-center flex flex-col items-center gap-3 bg-card rounded-2xl border border-dashed border-border p-8">
              <XCircle className="size-12 text-muted-foreground/40" />
              <h3 className="font-bold text-base text-foreground">No cancelled bookings</h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                You have not cancelled any reservations. Keval Car offers 100% free cancellation up to 6 hours before pickup.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
