import { useState } from "react";
import {
  Bell,
  Bike,
  CalendarDays,
  Car,
  CarFront,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Star,
  Users,
  X,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import "./8125257c-d8cd-4007-a63c-8f8075a7d0ec.css";
import "./Screen-14.screen.css";

interface VehicleItem {
  id: string;
  name: string;
  reg: string;
  type: "Bike" | "Scooter" | "Car";
  rating: number;
  dayRate: number;
  hourlyRate: number;
  deposit: number;
  includedKm: number;
  status: "Available" | "Rented" | "Maintenance";
  isAvailableChecked: boolean;
}

const INITIAL_FLEET: VehicleItem[] = [
  {
    id: "re-classic-350",
    name: "Royal Enfield Classic 350",
    reg: "GJ-01-AB-1234",
    type: "Bike",
    rating: 4.8,
    dayRate: 1200,
    hourlyRate: 150,
    deposit: 5000,
    includedKm: 120,
    status: "Available",
    isAvailableChecked: true,
  },
  {
    id: "honda-activa-6g",
    name: "Honda Activa 6G",
    reg: "GJ-03-AB-4821",
    type: "Scooter",
    rating: 4.7,
    dayRate: 500,
    hourlyRate: 50,
    deposit: 2000,
    includedKm: 100,
    status: "Available",
    isAvailableChecked: true,
  },
  {
    id: "maruti-swift",
    name: "Maruti Swift",
    reg: "GJ-06-CD-9988",
    type: "Car",
    rating: 4.6,
    dayRate: 2000,
    hourlyRate: 250,
    deposit: 8000,
    includedKm: 150,
    status: "Rented",
    isAvailableChecked: true,
  },
  {
    id: "hyundai-creta",
    name: "Hyundai Creta",
    reg: "GJ-05-XY-7766",
    type: "Car",
    rating: 4.9,
    dayRate: 3200,
    hourlyRate: 400,
    deposit: 12000,
    includedKm: 200,
    status: "Maintenance",
    isAvailableChecked: true,
  },
  {
    id: "ktm-duke-200",
    name: "KTM Duke 200",
    reg: "GJ-01-KT-3344",
    type: "Bike",
    rating: 4.8,
    dayRate: 1500,
    hourlyRate: 180,
    deposit: 6000,
    includedKm: 120,
    status: "Available",
    isAvailableChecked: true,
  },
  {
    id: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    reg: "GJ-01-TY-5544",
    type: "Car",
    rating: 4.9,
    dayRate: 3500,
    hourlyRate: 450,
    deposit: 15000,
    includedKm: 250,
    status: "Rented",
    isAvailableChecked: false,
  },
];

interface Screen14Props {
  onNavigateHome?: () => void;
  onNavigateAdminDashboard?: () => void;
  onNavigateAdminBookings?: () => void;
}

export default function Screen14({
  onNavigateHome,
  onNavigateAdminDashboard,
  onNavigateAdminBookings,
}: Screen14Props = {}) {
  const [vehicles, setVehicles] = useState<VehicleItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("keval_admin_fleet");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // ignore error
        }
      }
    }
    return INITIAL_FLEET;
  });

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem>(
    vehicles[1] || INITIAL_FLEET[1] // Honda Activa 6G
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit form state
  const [editName, setEditName] = useState(selectedVehicle.name);
  const [editReg, setEditReg] = useState(selectedVehicle.reg);
  const [editType, setEditType] = useState<string>(selectedVehicle.type);
  const [editStatus, setEditStatus] = useState<string>(selectedVehicle.status);
  const [editDayRate, setEditDayRate] = useState(String(selectedVehicle.dayRate));
  const [editHourlyRate, setEditHourlyRate] = useState(
    String(selectedVehicle.hourlyRate)
  );
  const [editDeposit, setEditDeposit] = useState(String(selectedVehicle.deposit));
  const [editIncludedKm, setEditIncludedKm] = useState(
    String(selectedVehicle.includedKm)
  );

  const handleSelectVehicleForEdit = (v: VehicleItem) => {
    setSelectedVehicle(v);
    setEditName(v.name);
    setEditReg(v.reg);
    setEditType(v.type);
    setEditStatus(v.status);
    setEditDayRate(String(v.dayRate));
    setEditHourlyRate(String(v.hourlyRate));
    setEditDeposit(String(v.deposit));
    setEditIncludedKm(String(v.includedKm));
  };

  const handleToggleAvailable = (id: string, newChecked: boolean) => {
    const updated = vehicles.map((v) =>
      v.id === id ? { ...v, isAvailableChecked: newChecked } : v
    );
    setVehicles(updated);
    if (selectedVehicle.id === id) {
      setSelectedVehicle({ ...selectedVehicle, isAvailableChecked: newChecked });
    }
    try {
      localStorage.setItem("keval_admin_fleet", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSaveChanges = () => {
    const updated = vehicles.map((v) => {
      if (v.id === selectedVehicle.id) {
        return {
          ...v,
          name: editName,
          reg: editReg,
          type: editType as VehicleItem["type"],
          status: editStatus as VehicleItem["status"],
          dayRate: Number(editDayRate) || v.dayRate,
          hourlyRate: Number(editHourlyRate) || v.hourlyRate,
          deposit: Number(editDeposit) || v.deposit,
          includedKm: Number(editIncludedKm) || v.includedKm,
        };
      }
      return v;
    });
    setVehicles(updated);
    try {
      localStorage.setItem("keval_admin_fleet", JSON.stringify(updated));
    } catch {
      // ignore
    }
    setToastMessage(`Saved changes for ${editName}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      !searchQuery ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.reg.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      typeFilter === "All" || v.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "All" ||
      v.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

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
              <div className="font-bold rounded-full bg-primary text-primary-foreground text-lg flex justify-center items-center size-9 transition-transform group-hover:scale-105">
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
              <button className="font-semibold rounded-lg bg-sidebar-accent text-sidebar-accent-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 text-left">
                <Car className="size-4" />
                Vehicles
              </button>
              <button
                className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 hover:bg-muted transition-colors text-left"
                onClick={onNavigateAdminBookings}
              >
                <CalendarDays className="size-4" />
                Bookings
              </button>
              <button className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 hover:bg-muted transition-colors text-left">
                <Users className="size-4" />
                Customers
              </button>
            </nav>
            <button className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 hover:bg-muted transition-colors text-left">
              <Settings className="size-4" />
              Settings
            </button>
          </aside>
          <main className="flex flex-col flex-1 min-w-0">
            <header className="bg-card border-t-border border-r-border border-b border-b-border border-l-border flex pr-8 pl-8 justify-between items-center h-20">
              <h1 className="font-semibold text-2xl">Vehicles</h1>
              <div className="flex items-center gap-4">
                <button className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2 hover:text-foreground transition-colors">
                  <Bell className="size-5" />
                </button>
                <div className="border-y-border border-r-border border-l border-l-border flex pl-4 items-center gap-3">
                  <div className="font-semibold rounded-full bg-accent text-sm flex justify-center items-center size-9">
                    A
                  </div>
                  <span className="font-medium text-sm">Admin</span>
                </div>
              </div>
            </header>

            {toastMessage && (
              <div className="mx-8 mt-4 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-2 text-sm shadow-sm">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{toastMessage}</span>
              </div>
            )}

            <div className="flex pt-8 pr-8 pb-8 pl-8 flex-1 gap-6 overflow-hidden">
              <section className="flex-1 min-w-0 overflow-y-auto">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="font-semibold text-3xl tracking-tight">
                      Vehicles
                    </h2>
                    <p className="text-muted-foreground text-sm mt-2">
                      {vehicles.length} vehicles in fleet
                    </p>
                  </div>
                  <button
                    className="font-semibold shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-lg bg-primary text-primary-foreground text-sm inline-flex pt-3 pr-5 pb-3 pl-5 items-center gap-2 hover:bg-primary/90 transition-colors"
                    onClick={() => {
                      setToastMessage("Add vehicle modal opened");
                      setTimeout(() => setToastMessage(null), 2500);
                    }}
                  >
                    <Plus className="size-4" />
                    Add vehicle
                  </button>
                </div>
                <div className="flex mt-8 justify-between items-center gap-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="-translate-y-1/2 text-muted-foreground absolute top-1/2 left-3 size-4" />
                    <input
                      placeholder="Search vehicles"
                      className="ring-primary rounded-lg bg-card text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-4 pl-10 w-full h-11"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground text-sm">
                      Type
                    </span>
                    <div className="rounded-lg bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-1 pr-1 pb-1 pl-1">
                      {["All", "Bike", "Scooter", "Car"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setTypeFilter(type)}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                            typeFilter === type
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex mt-4 items-center gap-2">
                  <span className="font-medium text-muted-foreground text-sm mr-1">
                    Status
                  </span>
                  {["All", "Available", "Rented", "Maintenance"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        statusFilter === status
                          ? "bg-muted text-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="grid mt-8 gap-6 grid-cols-3">
                  {filteredVehicles.map((vehicle) => {
                    const isSelected = selectedVehicle.id === vehicle.id;
                    return (
                      <div
                        key={vehicle.id}
                        onClick={() => handleSelectVehicleForEdit(vehicle)}
                        className={`shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card overflow-hidden cursor-pointer transition-all ${
                          isSelected
                            ? "border-2 border-primary ring-2 ring-primary/20"
                            : "border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border hover:border-gray-400"
                        }`}
                      >
                        <div className="bg-muted flex justify-center items-center h-36">
                          {vehicle.type === "Car" ? (
                            <CarFront className="text-muted-foreground size-16" />
                          ) : (
                            <Bike className="text-muted-foreground size-16" />
                          )}
                        </div>
                        <div className="flex pt-5 pr-5 pb-5 pl-5 flex-col gap-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{vehicle.name}</h3>
                              <span className="font-medium rounded-full bg-accent text-xs inline-flex mt-2 pt-1 pr-2.5 pb-1 pl-2.5">
                                {vehicle.type}
                              </span>
                            </div>
                            <span className="text-sm flex items-center gap-1">
                              <Star className="fill-primary text-primary size-4" />
                              {vehicle.rating}
                            </span>
                          </div>
                          <div className="text-xs grid gap-2 grid-cols-3">
                            <div>
                              <p className="text-muted-foreground">Day</p>
                              <p className="font-semibold mt-1">₹{vehicle.dayRate.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Hourly</p>
                              <p className="font-semibold mt-1">₹{vehicle.hourlyRate.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Deposit</p>
                              <p className="font-semibold mt-1">₹{vehicle.deposit.toLocaleString()}</p>
                            </div>
                          </div>
                          <div
                            className="border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="text-sm flex items-center gap-2">
                              {vehicle.status}
                              <Switch
                                checked={vehicle.isAvailableChecked}
                                onCheckedChange={(checked) =>
                                  handleToggleAvailable(vehicle.id, checked)
                                }
                              />
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectVehicleForEdit(vehicle);
                              }}
                              className="font-medium rounded-md text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-2 pr-3 pb-2 pl-3 hover:bg-muted transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {filteredVehicles.length === 0 && (
                    <div className="col-span-3 text-center py-12 text-muted-foreground">
                      No vehicles found matching filters.
                    </div>
                  )}
                </div>
              </section>

              {/* Right Edit Vehicle Drawer / Aside */}
              <aside className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6 shrink-0 w-[390px] overflow-y-auto">
                <div className="border-t-border border-r-border border-b border-b-border border-l-border flex pb-5 justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-xl">Edit vehicle</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Update vehicle details
                    </p>
                  </div>
                  <button
                    className="rounded-md text-muted-foreground pt-2 pr-2 pb-2 pl-2 hover:text-foreground transition-colors"
                    onClick={() => setToastMessage("Edit drawer active")}
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <div className="rounded-lg bg-muted flex mt-6 justify-center items-center h-40">
                  {editType === "Car" ? (
                    <CarFront className="text-muted-foreground size-20" />
                  ) : (
                    <Bike className="text-muted-foreground size-20" />
                  )}
                </div>
                <div className="flex mt-6 flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm">Name</label>
                    <input
                      className="rounded-lg text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 h-10"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm">Registration</label>
                    <input
                      className="rounded-lg text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 h-10"
                      value={editReg}
                      onChange={(e) => setEditReg(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm">Type</label>
                      <Select
                        value={editType}
                        onValueChange={(val) => setEditType(val)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bike">Bike</SelectItem>
                          <SelectItem value="Scooter">Scooter</SelectItem>
                          <SelectItem value="Car">Car</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm">Status</label>
                      <Select
                        value={editStatus}
                        onValueChange={(val) => setEditStatus(val)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="Rented">Rented</SelectItem>
                          <SelectItem value="Maintenance">
                            Maintenance
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm">Day rate</label>
                      <input
                        className="rounded-lg text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input pr-3 pl-3 h-10"
                        value={editDayRate}
                        onChange={(e) => setEditDayRate(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm">Hourly rate</label>
                      <input
                        className="rounded-lg text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input pr-3 pl-3 h-10"
                        value={editHourlyRate}
                        onChange={(e) => setEditHourlyRate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm">Deposit</label>
                      <input
                        className="rounded-lg text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input pr-3 pl-3 h-10"
                        value={editDeposit}
                        onChange={(e) => setEditDeposit(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm">Included km</label>
                      <input
                        className="rounded-lg text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input pr-3 pl-3 h-10"
                        value={editIncludedKm}
                        onChange={(e) => setEditIncludedKm(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveChanges}
                    className="font-semibold rounded-lg bg-primary text-primary-foreground text-sm mt-2 pt-3 pr-4 pb-3 pl-4 hover:bg-primary/90 transition-colors"
                  >
                    Save changes
                  </button>
                  <p className="text-center text-muted-foreground text-xs">
                    Changes persist in localStorage only.
                  </p>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
