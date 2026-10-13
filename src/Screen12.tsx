import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Car,
  Clock3,
  FileWarning,
  KeyRound,
  LayoutDashboard,
  Settings,
  TriangleAlert,
  Users,
  Wrench,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
} from "recharts";
import { FallbackComponent } from "./CustomComponents";
import "./8125257c-d8cd-4007-a63c-8f8075a7d0ec.css";
import "./Screen-12.screen.css";

interface Screen12Props {
  onNavigateHome?: () => void;
  onNavigateVehicles?: () => void;
  onNavigateBookings?: () => void;
  onNavigateAdminBookings?: () => void;
  onNavigateAdminVehicles?: () => void;
}

export default function Screen12({
  onNavigateHome,
  onNavigateVehicles,
  onNavigateBookings,
  onNavigateAdminBookings,
  onNavigateAdminVehicles,
}: Screen12Props = {}) {
  return (
    <div data-appearance="light">
      <div className="bg-background text-foreground w-full h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="font-sans bg-background text-foreground flex min-h-screen">
          <aside className="bg-sidebar border-y-sidebar-border border-r border-r-sidebar-border border-l-sidebar-border flex pt-6 pr-6 pb-6 pl-6 flex-col shrink-0 w-64">
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
            <nav className="flex pt-6 flex-col flex-1 gap-2">
              <div className="font-semibold rounded-lg bg-sidebar-accent text-sidebar-accent-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 cursor-pointer">
                <LayoutDashboard className="size-4" />
                Dashboard
              </div>
              <div
                className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 cursor-pointer hover:bg-muted transition-colors"
                onClick={onNavigateAdminVehicles || onNavigateVehicles}
              >
                <Car className="size-4" />
                Vehicles
              </div>
              <div
                className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 cursor-pointer hover:bg-muted transition-colors"
                onClick={onNavigateAdminBookings || onNavigateBookings}
              >
                <CalendarDays className="size-4" />
                Bookings
              </div>
              <div className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 cursor-pointer hover:bg-muted transition-colors">
                <Users className="size-4" />
                Customers
              </div>
              <div className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 cursor-pointer hover:bg-muted transition-colors">
                <BarChart3 className="size-4" />
                Reports
              </div>
              <div className="rounded-lg text-sidebar-foreground text-sm flex pt-3 pr-4 pb-3 pl-4 items-center gap-3 cursor-pointer hover:bg-muted transition-colors">
                <Settings className="size-4" />
                Settings
              </div>
            </nav>
            <div className="text-sidebar-foreground text-sm border-x-sidebar-border border-t border-t-sidebar-border border-b-sidebar-border flex pt-6 items-center gap-3">
              <div className="font-semibold rounded-full bg-accent text-accent-foreground flex justify-center items-center size-9">
                A
              </div>
              <div>
                <div className="font-semibold">Aakash</div>
                <div className="text-muted-foreground text-xs">
                  Administrator
                </div>
              </div>
            </div>
          </aside>
          <main className="flex flex-col flex-1 min-w-0">
            <header className="bg-card border-t-border border-r-border border-b border-b-border border-l-border flex pr-8 pl-8 justify-between items-center h-20">
              <h1 className="font-semibold text-2xl">Dashboard</h1>
              <div className="flex items-center gap-4">
                <Bell className="text-muted-foreground size-5 hover:text-foreground cursor-pointer transition-colors" />
                <div className="bg-border w-px h-8" />
                <span className="text-muted-foreground text-sm">
                  Wednesday, 14 Oct 2026
                </span>
              </div>
            </header>
            <div className="pt-8 pr-8 pb-8 pl-8 flex-1">
              <div className="flex mb-6 justify-between items-end">
                <div>
                  <p className="font-semibold text-2xl">Good morning, Aakash</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Wednesday, 14 Oct 2026
                  </p>
                </div>
                <div className="rounded-lg bg-card text-muted-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-3 pr-4 pb-3 pl-4 items-center gap-2">
                  <Clock3 className="text-primary size-4" />
                  Demo clock · All figures follow the shared demo now value
                </div>
              </div>
              <div className="grid mb-6 gap-4 grid-cols-4">
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-4">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-2">
                    <CardTitle className="font-medium text-muted-foreground text-sm">
                      Today’s pick-ups
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pr-0 pb-0 pl-0">
                    <div className="font-semibold text-3xl">8</div>
                    <ArrowUpRight className="text-chart-2 mt-2 size-4" />
                  </CardContent>
                </Card>
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-4">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-2">
                    <CardTitle className="font-medium text-muted-foreground text-sm">
                      Today’s returns
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pr-0 pb-0 pl-0">
                    <div className="font-semibold text-3xl">5</div>
                    <ArrowDownRight className="text-chart-3 mt-2 size-4" />
                  </CardContent>
                </Card>
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-4">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-2">
                    <CardTitle className="font-medium text-muted-foreground text-sm">
                      Active rentals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pr-0 pb-0 pl-0">
                    <div className="font-semibold text-3xl">12</div>
                    <KeyRound className="text-primary mt-2 size-4" />
                  </CardContent>
                </Card>
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-4">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-2">
                    <CardTitle className="font-medium text-muted-foreground text-sm">
                      Overdue rentals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pr-0 pb-0 pl-0">
                    <div className="flex items-baseline gap-3">
                      <span className="font-semibold text-3xl">2</span>
                      <span className="font-medium text-destructive text-sm">
                        ₹1,840 late fee
                      </span>
                    </div>
                    <TriangleAlert className="text-destructive mt-2 size-4" />
                  </CardContent>
                </Card>
              </div>
              <div className="grid mb-6 gap-4 grid-cols-3">
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-4">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                    <CardTitle className="font-medium text-muted-foreground text-sm">
                      Revenue today
                    </CardTitle>
                    <CardDescription>14 Oct 2026</CardDescription>
                  </CardHeader>
                  <CardContent className="font-semibold text-2xl pt-0 pr-0 pb-0 pl-0">
                    ₹42,650
                  </CardContent>
                </Card>
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-4">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                    <CardTitle className="font-medium text-muted-foreground text-sm">
                      Revenue this week
                    </CardTitle>
                    <CardDescription>8–14 Oct 2026</CardDescription>
                  </CardHeader>
                  <CardContent className="font-semibold text-2xl pt-0 pr-0 pb-0 pl-0">
                    ₹2,18,400
                  </CardContent>
                </Card>
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-4">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                    <CardTitle className="font-medium text-muted-foreground text-sm">
                      Revenue this month
                    </CardTitle>
                    <CardDescription>October 2026</CardDescription>
                  </CardHeader>
                  <CardContent className="font-semibold text-2xl pt-0 pr-0 pb-0 pl-0">
                    ₹7,84,200
                  </CardContent>
                </Card>
              </div>
              <div className="grid mb-6 gap-6 grid-cols-3">
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-6 col-span-2">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                    <CardTitle>Revenue overview</CardTitle>
                    <CardDescription>
                      Daily revenue for the last 14 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pr-0 pb-0 pl-0">
                    <ChartContainer
                      config={{
                        revenue: {
                          label: "Revenue",
                          color: "oklch(0.705 0.191 47.5)",
                        },
                      }}
                      className="w-full h-64"
                    >
                      <RechartsAreaChart
                        data={[
                          { date: "1 Oct", revenue: 38200 },
                          { date: "2 Oct", revenue: 41500 },
                          { date: "3 Oct", revenue: 36800 },
                          { date: "4 Oct", revenue: 45200 },
                          { date: "5 Oct", revenue: 48900 },
                          { date: "6 Oct", revenue: 43100 },
                          { date: "7 Oct", revenue: 50700 },
                          { date: "8 Oct", revenue: 46200 },
                          { date: "9 Oct", revenue: 52100 },
                          { date: "10 Oct", revenue: 54800 },
                          { date: "11 Oct", revenue: 50300 },
                          { date: "12 Oct", revenue: 57600 },
                          { date: "13 Oct", revenue: 61200 },
                          { date: "14 Oct", revenue: 64200 },
                        ]}
                      >
                        <CartesianGrid
                          vertical={false}
                          stroke="oklch(0.9 0.018 75)"
                        />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="oklch(0.705 0.191 47.5)"
                          fill="oklch(0.93 0.045 65)"
                          strokeWidth={3}
                        />
                      </RechartsAreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-6">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                    <CardTitle>Bookings by vehicle type</CardTitle>
                    <CardDescription>
                      Current booking distribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex pt-0 pr-0 pb-0 pl-0 items-center gap-6">
                    <ChartContainer
                      config={{
                        bikes: {
                          label: "Bikes",
                          color: "oklch(0.705 0.191 47.5)",
                        },
                        scooters: {
                          label: "Scooters",
                          color: "oklch(0.62 0.17 155)",
                        },
                        cars: { label: "Cars", color: "oklch(0.58 0.15 255)" },
                      }}
                      className="size-48"
                    >
                      <RechartsPieChart>
                        <Pie
                          data={[
                            {
                              type: "Bikes",
                              value: 46,
                              fill: "oklch(0.705 0.191 47.5)",
                            },
                            {
                              type: "Scooters",
                              value: 28,
                              fill: "oklch(0.62 0.17 155)",
                            },
                            {
                              type: "Cars",
                              value: 26,
                              fill: "oklch(0.58 0.15 255)",
                            },
                          ]}
                          dataKey="value"
                          nameKey="type"
                          innerRadius={55}
                          outerRadius={78}
                          strokeWidth={3}
                        />
                      </RechartsPieChart>
                    </ChartContainer>
                    <div className="text-sm">
                      <div className="flex mb-4 items-center gap-3">
                        <span className="rounded-full bg-primary size-3" />
                        Bikes<strong className="ml-auto">46%</strong>
                      </div>
                      <div className="flex mb-4 items-center gap-3">
                        <span className="rounded-full bg-chart-2 size-3" />
                        Scooters<strong className="ml-auto">28%</strong>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-chart-3 size-3" />
                        Cars<strong className="ml-auto">26%</strong>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-6 grid-cols-2">
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-4">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                    <CardTitle>Top 5 most rented vehicles</CardTitle>
                    <CardDescription>Ranked by total bookings</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pr-0 pb-0 pl-0">
                    <div className="border-t-border border-r-border border-b border-b-border border-l-border flex mb-1 pt-3 pb-3 items-center gap-4">
                      <span className="font-semibold text-muted-foreground text-sm w-6">
                        01
                      </span>
                      <FallbackComponent className="text-primary size-5" />
                      <span className="font-medium flex-1">
                        Honda Activa 6G
                      </span>
                      <span className="text-muted-foreground text-sm">
                        18 bookings
                      </span>
                    </div>
                    <div className="border-t-border border-r-border border-b border-b-border border-l-border flex mb-1 pt-3 pb-3 items-center gap-4">
                      <span className="font-semibold text-muted-foreground text-sm w-6">
                        02
                      </span>
                      <FallbackComponent className="text-primary size-5" />
                      <span className="font-medium flex-1">
                        Royal Enfield Classic 350
                      </span>
                      <span className="text-muted-foreground text-sm">
                        15 bookings
                      </span>
                    </div>
                    <div className="border-t-border border-r-border border-b border-b-border border-l-border flex mb-1 pt-3 pb-3 items-center gap-4">
                      <span className="font-semibold text-muted-foreground text-sm w-6">
                        03
                      </span>
                      <Car className="text-primary size-5" />
                      <span className="font-medium flex-1">Maruti Swift</span>
                      <span className="text-muted-foreground text-sm">
                        12 bookings
                      </span>
                    </div>
                    <div className="border-t-border border-r-border border-b border-b-border border-l-border flex mb-1 pt-3 pb-3 items-center gap-4">
                      <span className="font-semibold text-muted-foreground text-sm w-6">
                        04
                      </span>
                      <FallbackComponent className="text-primary size-5" />
                      <span className="font-medium flex-1">TVS Jupiter</span>
                      <span className="text-muted-foreground text-sm">
                        11 bookings
                      </span>
                    </div>
                    <div className="flex pt-3 pb-3 items-center gap-4">
                      <span className="font-semibold text-muted-foreground text-sm w-6">
                        05
                      </span>
                      <Car className="text-primary size-5" />
                      <span className="font-medium flex-1">Hyundai Creta</span>
                      <span className="text-muted-foreground text-sm">
                        9 bookings
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-4">
                  <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                    <CardTitle>Alerts</CardTitle>
                    <CardDescription>Items requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pr-0 pb-0 pl-0">
                    <div className="rounded-lg bg-muted flex mb-4 pt-4 pr-4 pb-4 pl-4 items-center gap-4">
                      <FileWarning className="text-destructive size-5" />
                      <div className="flex-1">
                        <div className="font-medium">
                          Insurance expiring soon
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Maruti Swift · 18 Oct 2026
                        </div>
                      </div>
                      <Badge variant="destructive">High</Badge>
                    </div>
                    <div className="rounded-lg bg-muted flex mb-4 pt-4 pr-4 pb-4 pl-4 items-center gap-4">
                      <FileWarning className="text-primary size-5" />
                      <div className="flex-1">
                        <div className="font-medium">PUC expiring soon</div>
                        <div className="text-muted-foreground text-sm">
                          TVS Jupiter · 20 Oct 2026
                        </div>
                      </div>
                      <Badge className="bg-accent text-accent-foreground">
                        Medium
                      </Badge>
                    </div>
                    <div className="rounded-lg bg-muted flex pt-4 pr-4 pb-4 pl-4 items-center gap-4">
                      <Wrench className="text-chart-3 size-5" />
                      <div className="flex-1">
                        <div className="font-medium">
                          Vehicle due for service
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Royal Enfield Classic 350 · 22 Oct 2026
                        </div>
                      </div>
                      <Badge variant="secondary">Scheduled</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
