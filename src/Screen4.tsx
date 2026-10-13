import { useState, useMemo } from "react";
import {
  Baby,
  CalendarPlus,
  CarFront,
  Check,
  CircleHelp,
  ClipboardList,
  CreditCard,
  FileImage,
  HardHat,
  Landmark,
  MapPin,
  Navigation,
  QrCode,
  ShieldCheck,
  TriangleAlert,
  Upload,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import confetti from "canvas-confetti";

import { FallbackComponent } from "./CustomComponents";
import "./8125257c-d8cd-4007-a63c-8f8075a7d0ec.css";
import "./Screen-4.screen.css";
import { VEHICLES_DATA, Vehicle } from "@/data/vehicles";

interface Screen4Props {
  vehicleId?: string;
  onNavigateHome: () => void;
  onNavigateVehicles: () => void;
  onPaymentSuccess?: () => void;
  bookingsModalOpen?: boolean;
  setBookingsModalOpen?: (open: boolean) => void;
}

export default function Screen4({
  vehicleId = "re-classic-350",
  onNavigateHome,
  onNavigateVehicles,
  onPaymentSuccess,
  setBookingsModalOpen,
}: Screen4Props) {
  const vehicle: Vehicle = useMemo(() => {
    const found = VEHICLES_DATA.find((v) => v.id === vehicleId);
    return found || VEHICLES_DATA[0];
  }, [vehicleId]);

  // Add-on states
  const [helmetEnabled, setHelmetEnabled] = useState(false);
  const [childSeatEnabled, setChildSeatEnabled] = useState(false);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [insuranceEnabled, setInsuranceEnabled] = useState(true);

  // Policy checkbox
  const [policyAccepted, setPolicyAccepted] = useState(true);

  // Payment modal states
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [upiId, setUpiId] = useState("howard@oksbi");

  // License replace simulation
  const [licenseFileName, setLicenseFileName] = useState("DL-GJ03-20220084.jpg");

  // Pricing calculations
  const rentalDays = 2;
  const rentalBase = vehicle.priceDay * rentalDays;

  const addOnsTotal = useMemo(() => {
    let sum = 0;
    if (helmetEnabled) sum += 50 * rentalDays;
    if (childSeatEnabled) sum += 100 * rentalDays;
    if (gpsEnabled) sum += 150 * rentalDays;
    if (insuranceEnabled) sum += 100 * rentalDays;
    return sum;
  }, [helmetEnabled, childSeatEnabled, gpsEnabled, insuranceEnabled, rentalDays]);

  const discountAmount = Math.round((rentalBase + addOnsTotal) * 0.1); // 10% coupon
  const subtotalAfterCoupon = rentalBase + addOnsTotal - discountAmount;
  const gstAmount = Math.round(subtotalAfterCoupon * 0.18);
  const deposit = vehicle.deposit || 2000;
  const totalToPay = subtotalAfterCoupon + gstAmount + deposit;

  const handlePayNow = () => {
    if (!policyAccepted) {
      alert("Please accept the Terms, Cancellation and Late Fee policy to continue.");
      return;
    }
    setPaymentModalOpen(true);
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#f97316", "#22c55e", "#ffedd5"],
      });
      setTimeout(() => {
        setPaymentModalOpen(false);
        setPaymentSuccess(false);
        if (onPaymentSuccess) {
          onPaymentSuccess();
        } else {
          setBookingsModalOpen?.(true);
        }
      }, 2000);
    }, 1800);
  };

  return (
    <div data-appearance="light" className="min-h-screen bg-background text-foreground">
      {/* Header matching established structure: How it works -> Vehicles -> My Bookings (no Contact) */}
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
              onClick={() => setBookingsModalOpen?.(true)}
              className="font-medium text-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ClipboardList className="size-4" />
              My Bookings
            </button>
          </nav>

          <button
            onClick={handlePayNow}
            className="font-semibold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm inline-flex ml-auto py-2.5 px-5 sm:py-3 sm:px-6 items-center gap-2 transition-all hover:scale-105 shadow-sm active:scale-95"
          >
            <CalendarPlus className="size-4" />
            Book now
          </button>
        </div>
      </header>

      {/* Main Review and Checkout Container */}
      <main className="flex mr-auto ml-auto pt-8 sm:pt-10 px-4 sm:px-8 pb-16 flex-col gap-8 max-w-7xl">
        {/* Stepper Header */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="flex flex-col gap-1.5">
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Checkout step 3 of 3
              </p>
              <h1 className="font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
                Review your booking
              </h1>
              <p className="text-muted-foreground text-sm">
                {vehicle.name} · No real payment or upload occurs.
              </p>
            </div>

            {/* Step badges */}
            <div className="text-xs sm:text-sm flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="text-primary flex items-center gap-2">
                <span className="font-semibold rounded-full bg-primary text-primary-foreground text-xs flex justify-center items-center size-7 sm:size-8 shadow-sm">
                  <Check className="size-3.5 sm:size-4" />
                </span>
                <span className="font-semibold">1 Trip details</span>
              </div>
              <div className="bg-primary/40 w-8 sm:w-16 h-px" />
              <div className="text-primary flex items-center gap-2">
                <span className="font-semibold rounded-full bg-primary text-primary-foreground text-xs flex justify-center items-center size-7 sm:size-8 shadow-sm">
                  <Check className="size-3.5 sm:size-4" />
                </span>
                <span className="font-semibold">2 Add-ons</span>
              </div>
              <div className="bg-primary/40 w-8 sm:w-16 h-px" />
              <div className="text-foreground flex items-center gap-2">
                <span className="font-bold rounded-full bg-accent text-accent-foreground text-xs border-2 border-primary flex justify-center items-center size-7 sm:size-8 ring-2 ring-primary/20">
                  3
                </span>
                <span className="font-bold">3 Review</span>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="rounded-full bg-muted w-full h-2 overflow-hidden">
            <div className="rounded-full bg-primary size-full transition-all duration-500" />
          </div>
        </section>

        {/* 2-Column Responsive Layout: Details + Sticky Price Summary Aside */}
        <div className="grid items-start gap-8 grid-cols-1 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-6">
            {/* Trip Details Card */}
            <Card className="p-6 gap-4 border border-border bg-card shadow-sm">
              <CardHeader className="p-0 flex-row justify-between items-center gap-2 pb-2">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-accent text-accent-foreground flex justify-center items-center size-10">
                    <MapPin className="size-5 text-primary" />
                  </span>
                  <div className="flex flex-col">
                    <CardTitle className="text-lg font-bold text-foreground">Trip details</CardTitle>
                    <CardDescription className="text-muted-foreground text-xs">
                      {vehicle.name} ({vehicle.type})
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-accent text-accent-foreground border border-primary/20 font-semibold">
                  Completed
                </Badge>
              </CardHeader>
              <CardContent className="rounded-xl bg-secondary border border-border/40 grid p-4 sm:p-5 gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold uppercase text-muted-foreground text-[11px] tracking-wide">
                    Pickup store
                  </span>
                  <span className="font-bold text-sm text-foreground">Rajkot store</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold uppercase text-muted-foreground text-[11px] tracking-wide">
                    Pickup
                  </span>
                  <span className="font-bold text-sm text-foreground">14 Oct 2026 10:00 AM</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold uppercase text-muted-foreground text-[11px] tracking-wide">
                    Return
                  </span>
                  <span className="font-bold text-sm text-foreground">16 Oct 2026 10:00 AM</span>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons Card */}
            <Card className="p-6 gap-4 border border-border bg-card shadow-sm">
              <CardHeader className="p-0 gap-1 pb-3">
                <CardTitle className="text-lg font-bold text-foreground">Add-ons</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Choose what you need for your ride in Rajkot.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex p-0 flex-col gap-3">
                {/* Helmet */}
                <div className="rounded-xl border border-border flex p-4 justify-between items-center bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-lg bg-muted flex items-center justify-center">
                      <FallbackComponent className="text-primary size-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-foreground">Helmet</span>
                      <span className="text-muted-foreground text-xs">
                        ₹50/day
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={helmetEnabled}
                    onCheckedChange={setHelmetEnabled}
                  />
                </div>

                {/* Child seat */}
                <div className="rounded-xl border border-border flex p-4 justify-between items-center bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-lg bg-muted flex items-center justify-center">
                      <Baby className="text-primary size-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-foreground">Child seat</span>
                      <span className="text-muted-foreground text-xs">
                        ₹100/day
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={childSeatEnabled}
                    onCheckedChange={setChildSeatEnabled}
                  />
                </div>

                {/* GPS */}
                <div className="rounded-xl border border-border flex p-4 justify-between items-center bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-lg bg-muted flex items-center justify-center">
                      <Navigation className="text-primary size-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-foreground">GPS</span>
                      <span className="text-muted-foreground text-xs">
                        ₹150/day
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={gpsEnabled}
                    onCheckedChange={setGpsEnabled}
                  />
                </div>

                {/* Extra insurance */}
                <div className="rounded-xl border border-border flex p-4 justify-between items-center bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-lg bg-muted flex items-center justify-center">
                      <ShieldCheck className="text-primary size-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-foreground">Extra insurance</span>
                      <span className="text-muted-foreground text-xs">
                        ₹100/day · Comprehensive damage cover
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={insuranceEnabled}
                    onCheckedChange={setInsuranceEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Driving Licence Card */}
            <Card className="p-6 gap-4 border border-border bg-card shadow-sm">
              <CardHeader className="p-0 gap-1 pb-3">
                <CardTitle className="text-lg font-bold text-foreground">Driving licence</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Your document is shown as a preview only.
                </CardDescription>
              </CardHeader>
              <CardContent className="rounded-xl bg-secondary border border-border flex p-4 justify-between items-center">
                <div className="flex items-center gap-3.5">
                  <div className="rounded-xl bg-background text-primary flex justify-center items-center size-12 shadow-sm border border-border">
                    <FileImage className="size-6 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-foreground truncate max-w-[200px] sm:max-w-none">
                      {licenseFileName}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      Preview only · no upload occurs
                    </span>
                  </div>
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setLicenseFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <span className="inline-flex items-center justify-center rounded-xl border border-input bg-background px-4 py-2 text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm">
                    Replace
                  </span>
                </label>
              </CardContent>
            </Card>

            {/* Coupon Card */}
            <Card className="p-6 gap-4 border border-border bg-card shadow-sm">
              <CardHeader className="p-0 gap-1 pb-3">
                <CardTitle className="text-lg font-bold text-foreground">Coupon</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Apply a promotional code to your booking.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex p-0 items-center gap-3">
                <Input
                  className="max-w-xs font-mono font-semibold uppercase tracking-wider text-sm h-10"
                  defaultValue="WELCOME10"
                  readOnly
                />
                <Badge className="bg-emerald-600 text-white font-semibold py-1 px-3 flex items-center shadow-sm">
                  <Check className="mr-1 size-3.5" />
                  Applied (10% off)
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Aside Price Summary Card */}
          <aside className="flex sticky top-24 flex-col gap-4">
            <Card className="p-6 gap-6 border border-border bg-card shadow-lg rounded-2xl">
              <CardHeader className="p-0 gap-1 pb-2">
                <CardTitle className="text-xl font-bold text-foreground">Price summary</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {vehicle.name} · {rentalDays} days
                </CardDescription>
              </CardHeader>
              <CardContent className="flex p-0 flex-col gap-4">
                <div className="text-sm flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Rental ({rentalDays} days)</span>
                  <span className="font-semibold text-foreground">₹{rentalBase.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-sm flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Add-ons</span>
                  <span className="font-semibold text-foreground">₹{addOnsTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-sm flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Coupon (WELCOME10)</span>
                  <span className="font-semibold text-emerald-600">-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-sm flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">GST 18%</span>
                  <span className="font-semibold text-foreground">₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-sm border-t border-border pt-4 flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">
                    Refundable deposit
                  </span>
                  <span className="font-semibold text-foreground">₹{deposit.toLocaleString("en-IN")}</span>
                </div>
                <div className="font-bold text-lg border-t border-border pt-4 flex justify-between items-center">
                  <span>Total to pay</span>
                  <span className="text-primary text-xl">₹{totalToPay.toLocaleString("en-IN")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Late Return Policy Warning */}
            <div className="rounded-xl bg-accent text-accent-foreground text-xs sm:text-sm border border-primary/30 flex p-4 gap-3 shadow-sm">
              <TriangleAlert className="mt-0.5 shrink-0 size-5 text-primary" />
              <p className="leading-relaxed">
                <span className="font-bold text-foreground">Late return: </span>
                30-minute grace period, then 1.5× hourly rate for every started hour.
              </p>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="rounded-xl bg-card border border-border flex p-4 items-start gap-3 shadow-sm">
              <Checkbox
                checked={policyAccepted}
                onCheckedChange={(checked) => setPolicyAccepted(!!checked)}
                id="policy"
                className="mt-0.5"
              />
              <label className="text-xs sm:text-sm leading-5 text-muted-foreground cursor-pointer select-none" htmlFor="policy">
                I accept the <span className="font-medium text-foreground underline">Terms</span>, <span className="font-medium text-foreground underline">Cancellation</span> and <span className="font-medium text-foreground underline">Late Fee policy</span>
              </label>
            </div>

            {/* Pay Now Button */}
            <Button
              onClick={handlePayNow}
              className="font-bold bg-primary hover:bg-primary/90 text-primary-foreground text-base w-full h-12 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
            >
              Pay now · ₹{totalToPay.toLocaleString("en-IN")}
            </Button>
            <p className="text-center text-muted-foreground text-xs">
              Demo checkout only. No real payment or upload occurs.
            </p>
          </aside>
        </div>
      </main>

      {/* Payment Method Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in">
          <Card className="shadow-2xl p-6 gap-6 w-full max-w-lg bg-card border border-border rounded-2xl relative">
            <CardHeader className="p-0 gap-1">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-foreground">
                  Choose payment method
                </CardTitle>
                <Button
                  onClick={() => setPaymentModalOpen(false)}
                  size="icon"
                  variant="ghost"
                  className="rounded-full size-8"
                >
                  <X className="size-4" />
                </Button>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                No real payment will be processed.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex p-0 flex-col gap-6">
              {paymentSuccess ? (
                <div className="py-8 flex flex-col items-center justify-center text-center gap-3 animate-in zoom-in-95">
                  <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <h3 className="font-bold text-xl text-emerald-800">
                    Payment Successful!
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Your ride <span className="font-bold text-foreground">{vehicle.name}</span> is reserved for 14 Oct 2026 at Rajkot store.
                  </p>
                </div>
              ) : (
                <>
                  <Tabs
                    className="w-full"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <TabsList className="grid grid-cols-3 w-full h-11">
                      <TabsTrigger value="upi" className="text-xs font-semibold gap-1.5">
                        <QrCode className="size-3.5" />
                        UPI
                      </TabsTrigger>
                      <TabsTrigger value="card" className="text-xs font-semibold gap-1.5">
                        <CreditCard className="size-3.5" />
                        Card
                      </TabsTrigger>
                      <TabsTrigger value="netbanking" className="text-xs font-semibold gap-1.5">
                        <Landmark className="size-3.5" />
                        Netbanking
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {paymentMethod === "upi" && (
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-xs text-foreground" htmlFor="upi">
                        UPI ID
                      </label>
                      <Input
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        id="upi"
                        placeholder="name@bank"
                        className="h-10 text-sm"
                      />
                      <span className="text-[11px] text-muted-foreground">
                        Supports GPay, PhonePe, Paytm & BHIM UPI
                      </span>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold text-xs text-foreground">Card number</label>
                        <Input defaultValue="4532 •••• •••• 8821" className="h-10 text-sm font-mono" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-semibold text-xs text-foreground">Valid thru</label>
                          <Input defaultValue="11/28" className="h-10 text-sm" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-semibold text-xs text-foreground">CVV</label>
                          <Input defaultValue="•••" type="password" className="h-10 text-sm" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-xs text-foreground">Select bank</label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <Button variant="outline" className="justify-start font-medium text-xs h-9">State Bank of India</Button>
                        <Button variant="outline" className="justify-start font-medium text-xs h-9">HDFC Bank</Button>
                        <Button variant="outline" className="justify-start font-medium text-xs h-9">ICICI Bank</Button>
                        <Button variant="outline" className="justify-start font-medium text-xs h-9">Axis Bank</Button>
                      </div>
                    </div>
                  )}

                  <div className="rounded-xl bg-secondary/80 border border-border text-muted-foreground text-xs p-3">
                    Demo payment mode active. No actual debit occurs on your bank account.
                  </div>

                  <Button
                    onClick={handleProcessPayment}
                    disabled={isProcessingPayment}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold w-full h-11 rounded-full shadow-md text-sm"
                  >
                    {isProcessingPayment ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="size-4 animate-spin" />
                        Processing payment...
                      </span>
                    ) : (
                      `Pay ₹${totalToPay.toLocaleString("en-IN")}`
                    )}
                  </Button>
                  <p className="text-center text-muted-foreground text-xs">
                    Demo payment only · succeeds after 2 seconds
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
