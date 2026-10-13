import { useState } from "react";
import {
  BarChart3,
  Bell,
  CalendarDays,
  CarFront,
  ChevronsUpDown,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Users,
  X,
  ArrowLeft,
  CheckCircle2,
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

import "./8125257c-d8cd-4007-a63c-8f8075a7d0ec.css";
import "./Screen-13.screen.css";

interface BookingRecord {
  id: string;
  customer: string;
  phone: string;
  email: string;
  vehicle: string;
  pickupTime: string;
  pickupFull: string;
  returnTime: string;
  returnFull: string;
  location: string;
  amount: string;
  status: "Upcoming" | "Active" | "Overdue" | "Completed" | "Cancelled";
  deposit: string;
  lateFee: string;
  damage: string;
  refund: string;
}

const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: "RO-2026-000123",
    customer: "Meera Shah",
    phone: "+91 98251 23456",
    email: "meera.shah@example.com",
    vehicle: "Honda Activa 6G",
    pickupTime: "14 Oct, 10:00",
    pickupFull: "14 Oct 2026 · 10:00 AM",
    returnTime: "16 Oct, 10:00",
    returnFull: "16 Oct 2026 · 10:00 AM",
    location: "Ahmedabad Airport",
    amount: "₹1,770",
    status: "Upcoming",
    deposit: "₹1,000",
    lateFee: "− ₹0",
    damage: "− ₹0",
    refund: "₹1,000",
  },
  {
    id: "RO-2026-000118",
    customer: "Dhruv Patel",
    phone: "+91 98765 43210",
    email: "dhruv.patel@example.com",
    vehicle: "Royal Enfield Classic 350",
    pickupTime: "12 Oct, 09:00",
    pickupFull: "12 Oct 2026 · 09:00 AM",
    returnTime: "15 Oct, 09:00",
    returnFull: "15 Oct 2026 · 09:00 AM",
    location: "Rajkot Central",
    amount: "₹3,420",
    status: "Active",
    deposit: "₹2,000",
    lateFee: "− ₹180",
    damage: "− ₹0",
    refund: "₹1,820",
  },
  {
    id: "RO-2026-000111",
    customer: "Riya Desai",
    phone: "+91 97234 56789",
    email: "riya.desai@example.com",
    vehicle: "Maruti Swift",
    pickupTime: "08 Oct, 11:00",
    pickupFull: "08 Oct 2026 · 11:00 AM",
    returnTime: "11 Oct, 11:00",
    returnFull: "11 Oct 2026 · 11:00 AM",
    location: "Vadodara Station",
    amount: "₹8,940",
    status: "Overdue",
    deposit: "₹3,000",
    lateFee: "− ₹1,840",
    damage: "− ₹0",
    refund: "₹1,160",
  },
  {
    id: "RO-2026-000104",
    customer: "Harsh Mehta",
    phone: "+91 98980 12345",
    email: "harsh.mehta@example.com",
    vehicle: "Hyundai Creta",
    pickupTime: "03 Oct, 10:00",
    pickupFull: "03 Oct 2026 · 10:00 AM",
    returnTime: "06 Oct, 10:00",
    returnFull: "06 Oct 2026 · 10:00 AM",
    location: "Surat City Hub",
    amount: "₹9,860",
    status: "Completed",
    deposit: "₹4,000",
    lateFee: "− ₹0",
    damage: "− ₹0",
    refund: "₹4,000",
  },
  {
    id: "RO-2026-000099",
    customer: "Neel Joshi",
    phone: "+91 94260 98765",
    email: "neel.joshi@example.com",
    vehicle: "TVS Jupiter",
    pickupTime: "28 Sep, 09:00",
    pickupFull: "28 Sep 2026 · 09:00 AM",
    returnTime: "29 Sep, 09:00",
    returnFull: "29 Sep 2026 · 09:00 AM",
    location: "Rajkot Central",
    amount: "₹1,180",
    status: "Cancelled",
    deposit: "₹1,000",
    lateFee: "− ₹0",
    damage: "− ₹0",
    refund: "₹1,000",
  },
  {
    id: "RO-2026-000096",
    customer: "Aarav Trivedi",
    phone: "+91 98240 55443",
    email: "aarav.trivedi@example.com",
    vehicle: "Kia Sonet",
    pickupTime: "10 Oct, 12:00",
    pickupFull: "10 Oct 2026 · 12:00 PM",
    returnTime: "12 Oct, 12:00",
    returnFull: "12 Oct 2026 · 12:00 PM",
    location: "Ahmedabad Airport",
    amount: "₹6,280",
    status: "Upcoming",
    deposit: "₹3,000",
    lateFee: "− ₹0",
    damage: "− ₹0",
    refund: "₹3,000",
  },
  {
    id: "RO-2026-000089",
    customer: "Kavya Rao",
    phone: "+91 97123 44556",
    email: "kavya.rao@example.com",
    vehicle: "Tata Nexon",
    pickupTime: "07 Oct, 10:30",
    pickupFull: "07 Oct 2026 · 10:30 AM",
    returnTime: "09 Oct, 10:30",
    returnFull: "09 Oct 2026 · 10:30 AM",
    location: "Gandhinagar Sector 11",
    amount: "₹5,740",
    status: "Active",
    deposit: "₹3,000",
    lateFee: "− ₹0",
    damage: "− ₹0",
    refund: "₹3,000",
  },
  {
    id: "RO-2026-000081",
    customer: "Yash Soni",
    phone: "+91 99090 88776",
    email: "yash.soni@example.com",
    vehicle: "Honda City",
    pickupTime: "01 Oct, 09:30",
    pickupFull: "01 Oct 2026 · 09:30 AM",
    returnTime: "04 Oct, 09:30",
    returnFull: "04 Oct 2026 · 09:30 AM",
    location: "Surat City Hub",
    amount: "₹7,620",
    status: "Completed",
    deposit: "₹3,500",
    lateFee: "− ₹0",
    damage: "− ₹0",
    refund: "₹3,500",
  },
];

interface Screen13Props {
  onNavigateHome?: () => void;
  onNavigateAdminDashboard?: () => void;
  onNavigateVehicles?: () => void;
  onNavigateAdminVehicles?: () => void;
}

export default function Screen13({
  onNavigateHome,
  onNavigateAdminDashboard,
  onNavigateVehicles,
  onNavigateAdminVehicles,
}: Screen13Props = {}) {
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord>(
    INITIAL_BOOKINGS[1] // Dhruv Patel
  );
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [settleRefundDone, setSettleRefundDone] = useState<boolean>(false);

  const filterTabs = [
    "All",
    "Upcoming",
    "Active",
    "Overdue",
    "Completed",
    "Cancelled",
  ];

  const filteredBookings = bookings.filter((b) => {
    const matchesTab =
      activeTab === "All" ||
      b.status.toLowerCase() === activeTab.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      b.id.toLowerCase().includes(query) ||
      b.customer.toLowerCase().includes(query) ||
      b.vehicle.toLowerCase().includes(query);
    return matchesTab && matchesSearch;
  });

  const handleStatusUpdate = (newStatus: BookingRecord["status"]) => {
    const updated = bookings.map((b) =>
      b.id === selectedBooking.id ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
    setActionNotice(`Booking ${selectedBooking.id} marked as ${newStatus}`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleSettleDeposit = () => {
    setSettleRefundDone(true);
    setActionNotice(
      `Deposit settled! Refund of ${selectedBooking.refund} processed to ${selectedBooking.customer}`
    );
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div data-appearance="light">
      <div className="bg-background text-foreground w-full h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="font-sans bg-background text-foreground flex min-h-screen">
          <aside className="bg-sidebar border-y-border border-r border-r-border border-l-border flex pt-6 pr-6 pb-6 pl-6 flex-col shrink-0 w-64">
            <div
              className="border-t-sidebar-border border-r-sidebar-border border-b border-b-sidebar-border border-l-sidebar-border flex pb-6 items-center gap-2 cursor-pointer group"
              onClick={onNavigateHome}
              title="Return to customer site"
            >
              <div className="font-bold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-9 transition-transform group-hover:scale-105">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg leading-tight">keval car</span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1 group-hover:text-primary">
                  <ArrowLeft className="size-3" /> Back to site
                </span>
              </div>
            </div>
            <nav className="flex pt-8 flex-col flex-1 gap-2">
              <button
                className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 hover:bg-muted transition-colors text-left"
                onClick={onNavigateAdminDashboard}
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </button>
              <button
                className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 hover:bg-muted transition-colors text-left"
                onClick={onNavigateAdminVehicles || onNavigateVehicles}
              >
                <CarFront className="size-4" />
                Vehicles
              </button>
              <button className="font-medium rounded-lg bg-sidebar-accent text-sidebar-accent-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 text-left">
                <CalendarDays className="size-4" />
                Bookings
              </button>
              <button className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 hover:bg-muted transition-colors text-left">
                <Users className="size-4" />
                Customers
              </button>
              <button className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 hover:bg-muted transition-colors text-left">
                <BarChart3 className="size-4" />
                Reports
              </button>
            </nav>
            <button className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 hover:bg-muted transition-colors text-left">
              <Settings className="size-4" />
              Settings
            </button>
          </aside>
          <main className="flex flex-col flex-1 min-w-0">
            <header className="bg-card border-t-border border-r-border border-b border-b-border border-l-border flex pr-8 pl-8 justify-between items-center h-20">
              <div>
                <h1 className="font-semibold text-xl">Bookings</h1>
                <p className="text-muted-foreground text-sm">
                  Manage rentals and booking activity
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="rounded-full text-muted-foreground pt-2 pr-2 pb-2 pl-2 hover:text-foreground transition-colors">
                  <Bell className="size-5" />
                </button>
                <div className="font-semibold rounded-full bg-accent text-accent-foreground text-sm flex justify-center items-center size-9">
                  AS
                </div>
              </div>
            </header>

            {actionNotice && (
              <div className="mx-8 mt-4 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{actionNotice}</span>
              </div>
            )}

            <div className="flex pt-8 pr-8 pb-8 pl-8 flex-1 gap-6 min-h-0">
              <section className="flex-1 min-w-0">
                <div className="flex mb-6 justify-between items-end">
                  <div>
                    <h2 className="font-semibold text-3xl tracking-tight">
                      Bookings
                    </h2>
                    <p className="text-muted-foreground text-sm mt-2">
                      25 demo bookings · Gujarat region
                    </p>
                  </div>
                  <Button
                    className="bg-primary text-primary-foreground gap-2 hover:bg-primary/90"
                    onClick={() => {
                      setActionNotice("New booking modal opened");
                      setTimeout(() => setActionNotice(null), 2500);
                    }}
                  >
                    <Plus className="size-4" />
                    New booking
                  </Button>
                </div>
                <div className="flex mb-6 items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="-translate-y-1/2 text-muted-foreground absolute top-1/2 left-3 size-4" />
                    <Input
                      placeholder="Search booking code or customer"
                      className="pl-9 h-11"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="whitespace-nowrap gap-2 h-11"
                  >
                    <CalendarDays className="size-4" />
                    <ChevronsUpDown className="size-4" />
                  </Button>
                </div>
                <div className="flex mb-6 items-center gap-2">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab
                          ? "bg-primary text-white shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <Card className="pt-0 pr-0 pb-0 pl-0 gap-4 overflow-hidden border-border">
                  <div className="overflow-x-auto">
                    <table className="text-left text-sm w-full">
                      <thead className="uppercase bg-muted/50 text-muted-foreground text-xs tracking-wide border-t-border border-r-border border-b border-b-border border-l-border">
                        <tr>
                          <th className="font-medium pt-4 pr-5 pb-4 pl-5">
                            Booking
                          </th>
                          <th className="font-medium pt-4 pr-5 pb-4 pl-5">
                            Customer
                          </th>
                          <th className="font-medium pt-4 pr-5 pb-4 pl-5">
                            Vehicle
                          </th>
                          <th className="font-medium pt-4 pr-5 pb-4 pl-5">
                            Pickup
                          </th>
                          <th className="font-medium pt-4 pr-5 pb-4 pl-5">
                            Return
                          </th>
                          <th className="font-medium pt-4 pr-5 pb-4 pl-5">
                            Amount
                          </th>
                          <th className="font-medium pt-4 pr-5 pb-4 pl-5">
                            Status
                          </th>
                          <th className="font-medium pt-4 pr-5 pb-4 pl-5" />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((b) => {
                          const isSelected = selectedBooking.id === b.id;
                          return (
                            <tr
                              key={b.id}
                              onClick={() => setSelectedBooking(b)}
                              className={`border-t-border border-r-border border-b border-b-border border-l-border cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-accent/20"
                                  : "hover:bg-muted/40"
                              }`}
                            >
                              <td className="font-medium pt-4 pr-5 pb-4 pl-5">
                                {b.id}
                              </td>
                              <td className="pt-4 pr-5 pb-4 pl-5">{b.customer}</td>
                              <td className="pt-4 pr-5 pb-4 pl-5">{b.vehicle}</td>
                              <td className="text-muted-foreground pt-4 pr-5 pb-4 pl-5">
                                {b.pickupTime}
                              </td>
                              <td className="text-muted-foreground pt-4 pr-5 pb-4 pl-5">
                                {b.returnTime}
                              </td>
                              <td className="font-medium pt-4 pr-5 pb-4 pl-5">
                                {b.amount}
                              </td>
                              <td className="pt-4 pr-5 pb-4 pl-5">
                                {b.status === "Upcoming" ? (
                                  <Badge className="bg-accent text-accent-foreground">
                                    Upcoming
                                  </Badge>
                                ) : b.status === "Active" ? (
                                  <Badge className="bg-chart-2/15 text-chart-2">
                                    Active
                                  </Badge>
                                ) : b.status === "Overdue" ? (
                                  <Badge variant="destructive">Overdue</Badge>
                                ) : b.status === "Completed" ? (
                                  <Badge className="bg-muted text-muted-foreground">
                                    Completed
                                  </Badge>
                                ) : (
                                  <Badge className="bg-destructive/10 text-destructive">
                                    Cancelled
                                  </Badge>
                                )}
                              </td>
                              <td className="pt-4 pr-5 pb-4 pl-5">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedBooking(b);
                                  }}
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                        {filteredBookings.length === 0 && (
                          <tr>
                            <td
                              colSpan={8}
                              className="text-center py-8 text-muted-foreground text-sm"
                            >
                              No bookings found matching "{searchQuery}"
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </section>
              <aside className="flex flex-col shrink-0 gap-6 w-[390px]">
                <Card className="pt-6 pr-6 pb-6 pl-6 gap-6 border-border">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="uppercase text-muted-foreground text-xs tracking-wide">
                          Booking details
                        </p>
                        <CardTitle className="text-xl mt-2">
                          {selectedBooking.id}
                        </CardTitle>
                      </div>
                      <button
                        className="rounded-md text-muted-foreground pt-1 pr-1 pb-1 pl-1 hover:text-foreground transition-colors"
                        onClick={() => setActionNotice("Details panel toggled")}
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pr-0 pb-0 pl-0">
                    <div className="mb-6">
                      <p className="font-medium">{selectedBooking.customer}</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {selectedBooking.phone}
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {selectedBooking.email}
                      </p>
                      <p className="text-primary font-medium text-xs mt-2">
                        {selectedBooking.vehicle}
                      </p>
                    </div>
                    <div className="border-y-primary/30 border-r-primary/30 border-l-2 border-l-primary/30 mb-6 pl-5">
                      <div className="relative mb-5">
                        <span className="ring-4 ring-background rounded-full bg-primary absolute top-1 -left-[26px] size-3" />
                        <p className="uppercase text-muted-foreground text-xs tracking-wide">
                          Pickup
                        </p>
                        <p className="font-medium mt-1">{selectedBooking.location}</p>
                        <p className="text-muted-foreground text-sm">
                          {selectedBooking.pickupFull}
                        </p>
                      </div>
                      <div className="relative">
                        <span className="ring-4 ring-background rounded-full bg-muted-foreground absolute top-1 -left-[26px] size-3" />
                        <p className="uppercase text-muted-foreground text-xs tracking-wide">
                          Return
                        </p>
                        <p className="font-medium mt-1">{selectedBooking.location}</p>
                        <p className="text-muted-foreground text-sm">
                          {selectedBooking.returnFull}
                        </p>
                      </div>
                    </div>
                    <div className="border-x-border border-t border-t-border border-b-border flex pt-5 justify-between items-center">
                      <span className="text-muted-foreground text-sm">
                        Total amount
                      </span>
                      <span className="font-semibold text-xl">
                        {selectedBooking.amount}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="grid pt-0 pr-0 pb-0 pl-0 gap-2 grid-cols-2">
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handleStatusUpdate("Active")}
                    >
                      Mark picked up
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate("Completed")}
                    >
                      Mark returned
                    </Button>
                    <Button
                      variant="outline"
                      className="text-destructive col-span-2 hover:bg-destructive/10"
                      onClick={() => handleStatusUpdate("Cancelled")}
                    >
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-accent/30 border-primary/30 pt-6 pr-6 pb-6 pl-6 gap-4">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                    <CardTitle className="text-base">Settle deposit</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      Review the final deposit settlement
                    </p>
                  </CardHeader>
                  <CardContent className="text-sm pt-0 pr-0 pb-0 pl-0">
                    <div className="flex mb-3 justify-between">
                      <span>Deposit</span>
                      <span>{selectedBooking.deposit}</span>
                    </div>
                    <div className="text-muted-foreground flex mb-3 justify-between">
                      <span>Late fee</span>
                      <span>{selectedBooking.lateFee}</span>
                    </div>
                    <div className="text-muted-foreground flex mb-3 justify-between">
                      <span>Damage</span>
                      <span>{selectedBooking.damage}</span>
                    </div>
                    <div className="font-semibold text-base border-x-border border-t border-t-border border-b-border flex pt-3 justify-between">
                      <span>Refund</span>
                      <span>{selectedBooking.refund}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="grid pt-0 pr-0 pb-0 pl-0 gap-2 grid-cols-2">
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleSettleDeposit}
                    >
                      Settle deposit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActionNotice("Deposit review dismissed");
                        setTimeout(() => setActionNotice(null), 2000);
                      }}
                    >
                      Close
                    </Button>
                  </CardFooter>
                </Card>

                <div className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
                  <div className="flex mb-4 justify-between items-center">
                    <h3 className="font-semibold">Settle deposit</h3>
                    <button
                      className="rounded-md text-muted-foreground pt-1 pr-1 pb-1 pl-1 hover:text-foreground transition-colors"
                      onClick={() => setSettleRefundDone(false)}
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {selectedBooking.deposit} deposit {selectedBooking.lateFee} late fee{" "}
                    {selectedBooking.damage} damage =
                    <span className="font-semibold text-foreground">
                      {" "}{selectedBooking.refund} refund
                    </span>
                  </p>
                  <Button
                    className="bg-primary text-primary-foreground mt-5 w-full hover:bg-primary/90"
                    onClick={handleSettleDeposit}
                  >
                    Confirm refund {selectedBooking.refund}
                  </Button>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
