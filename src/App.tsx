import { useState, useEffect } from "react";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import Screen4 from "./Screen4";
import Screen5 from "./Screen5";
import Screen6 from "./Screen6";
import Screen9 from "./Screen9";
import Screen12 from "./Screen12";
import Screen13 from "./Screen13";
import Screen14 from "./Screen14";
import { LayoutDashboard } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "vehicles"
    | "detail"
    | "checkout"
    | "bookings"
    | "booking-detail"
    | "confirmation"
    | "admin"
    | "admin-bookings"
    | "admin-vehicles"
  >(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (
        hash.includes("admin-vehicles") ||
        hash.includes("admin/vehicles") ||
        hash.includes("vehicles-admin")
      ) {
        return "admin-vehicles";
      }
      if (
        hash.includes("admin-bookings") ||
        hash.includes("admin/bookings") ||
        hash.includes("bookings-admin")
      ) {
        return "admin-bookings";
      }
      if (hash.includes("admin") || hash.includes("dashboard")) {
        return "admin";
      }
      if (
        hash.includes("confirmation") ||
        hash.includes("success") ||
        hash === "#booked"
      ) {
        return "confirmation";
      }
      if (hash.startsWith("#booking-")) {
        return "booking-detail";
      }
      if (hash.includes("my-bookings") || hash === "#bookings") {
        return "bookings";
      }
      if (hash.startsWith("#checkout") || hash.startsWith("#book-now")) {
        return "checkout";
      }
      if (hash.startsWith("#vehicle-")) {
        return "detail";
      }
      if (
        hash.includes("vehicles") ||
        window.location.search.includes("page=vehicles")
      ) {
        return "vehicles";
      }
    }
    return "home";
  });

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.toLowerCase().startsWith("#vehicle-")) {
        return hash.replace(/^#vehicle-/i, "");
      }
      if (hash.toLowerCase().startsWith("#checkout-")) {
        return hash.replace(/^#checkout-/i, "");
      }
    }
    return "re-classic-350";
  });

  const [selectedBookingId, setSelectedBookingId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.toLowerCase().startsWith("#booking-")) {
        return hash.replace(/^#booking-/i, "");
      }
    }
    return "RO-2026-000118";
  });

  const [bookingsModalOpen, setBookingsModalOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const lowerHash = hash.toLowerCase();
      if (
        lowerHash.includes("admin-vehicles") ||
        lowerHash.includes("admin/vehicles") ||
        lowerHash.includes("vehicles-admin")
      ) {
        setCurrentPage("admin-vehicles");
      } else if (
        lowerHash.includes("admin-bookings") ||
        lowerHash.includes("admin/bookings") ||
        lowerHash.includes("bookings-admin")
      ) {
        setCurrentPage("admin-bookings");
      } else if (lowerHash.includes("admin") || lowerHash.includes("dashboard")) {
        setCurrentPage("admin");
      } else if (
        lowerHash.includes("confirmation") ||
        lowerHash.includes("success") ||
        lowerHash === "#booked"
      ) {
        setCurrentPage("confirmation");
      } else if (lowerHash.startsWith("#booking-")) {
        const id = hash.replace(/^#booking-/i, "");
        if (id) setSelectedBookingId(id);
        setCurrentPage("booking-detail");
      } else if (lowerHash.includes("my-bookings") || lowerHash === "#bookings") {
        setCurrentPage("bookings");
      } else if (lowerHash.startsWith("#checkout")) {
        if (lowerHash.startsWith("#checkout-")) {
          const id = hash.replace(/^#checkout-/i, "");
          if (id) setSelectedVehicleId(id);
        }
        setCurrentPage("checkout");
      } else if (lowerHash.startsWith("#book-now")) {
        setCurrentPage("checkout");
      } else if (lowerHash.startsWith("#vehicle-")) {
        const id = hash.replace(/^#vehicle-/i, "");
        setSelectedVehicleId(id);
        setCurrentPage("detail");
      } else if (
        lowerHash.includes("vehicles-page") ||
        lowerHash === "#vehicles"
      ) {
        setCurrentPage("vehicles");
      } else if (lowerHash === "#home" || lowerHash === "") {
        setCurrentPage("home");
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigateToVehicles = () => {
    window.location.hash = "#vehicles-page";
    setCurrentPage("vehicles");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    window.location.hash = "#home";
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToDetail = (vehicleId: string) => {
    window.location.hash = `#vehicle-${vehicleId}`;
    setSelectedVehicleId(vehicleId);
    setCurrentPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToCheckout = (vehicleId?: string) => {
    const id = vehicleId || selectedVehicleId || "re-classic-350";
    window.location.hash = `#checkout-${id}`;
    setSelectedVehicleId(id);
    setCurrentPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToBookings = () => {
    window.location.hash = "#my-bookings";
    setCurrentPage("bookings");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToBookingDetail = (bookingId: string) => {
    window.location.hash = `#booking-${bookingId}`;
    setSelectedBookingId(bookingId);
    setCurrentPage("booking-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToConfirmation = () => {
    window.location.hash = "#confirmation";
    setCurrentPage("confirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToAdmin = () => {
    window.location.hash = "#admin";
    setCurrentPage("admin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToAdminBookings = () => {
    window.location.hash = "#admin-bookings";
    setCurrentPage("admin-bookings");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToAdminVehicles = () => {
    window.location.hash = "#admin-vehicles";
    setCurrentPage("admin-vehicles");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {currentPage === "admin-vehicles" ? (
        <Screen14
          onNavigateHome={navigateToHome}
          onNavigateAdminDashboard={navigateToAdmin}
          onNavigateAdminBookings={navigateToAdminBookings}
        />
      ) : currentPage === "admin-bookings" ? (
        <Screen13
          onNavigateHome={navigateToHome}
          onNavigateAdminDashboard={navigateToAdmin}
          onNavigateVehicles={navigateToVehicles}
          onNavigateAdminVehicles={navigateToAdminVehicles}
        />
      ) : currentPage === "admin" ? (
        <Screen12
          onNavigateHome={navigateToHome}
          onNavigateVehicles={navigateToVehicles}
          onNavigateBookings={navigateToBookings}
          onNavigateAdminBookings={navigateToAdminBookings}
          onNavigateAdminVehicles={navigateToAdminVehicles}
        />
      ) : currentPage === "confirmation" ? (
        <Screen9
          vehicleId={selectedVehicleId}
          bookingCode="RO-2026-000123"
          onNavigateHome={navigateToHome}
          onNavigateVehicles={navigateToVehicles}
          onNavigateBookings={navigateToBookings}
          onViewBookingDetail={navigateToBookingDetail}
          onNavigateCheckout={navigateToCheckout}
        />
      ) : currentPage === "booking-detail" ? (
        <Screen6
          bookingId={selectedBookingId}
          onNavigateHome={navigateToHome}
          onNavigateVehicles={navigateToVehicles}
          onNavigateBookings={navigateToBookings}
          onNavigateCheckout={navigateToCheckout}
        />
      ) : currentPage === "bookings" ? (
        <Screen5
          onNavigateHome={navigateToHome}
          onNavigateVehicles={navigateToVehicles}
          onNavigateCheckout={navigateToCheckout}
          onSelectVehicle={navigateToDetail}
          onSelectBooking={navigateToBookingDetail}
        />
      ) : currentPage === "checkout" ? (
        <Screen4
          vehicleId={selectedVehicleId}
          onNavigateHome={navigateToHome}
          onNavigateVehicles={navigateToVehicles}
          onPaymentSuccess={navigateToConfirmation}
          bookingsModalOpen={bookingsModalOpen}
          setBookingsModalOpen={navigateToBookings}
        />
      ) : currentPage === "detail" ? (
        <Screen3
          vehicleId={selectedVehicleId}
          onNavigateHome={navigateToHome}
          onNavigateVehicles={navigateToVehicles}
          onNavigateCheckout={navigateToCheckout}
          bookingsModalOpen={bookingsModalOpen}
          setBookingsModalOpen={navigateToBookings}
        />
      ) : currentPage === "vehicles" ? (
        <Screen2
          onNavigateHome={navigateToHome}
          onSelectVehicle={navigateToDetail}
          onNavigateCheckout={navigateToCheckout}
          bookingsModalOpen={bookingsModalOpen}
          setBookingsModalOpen={navigateToBookings}
        />
      ) : (
        <Screen1
          onNavigateVehicles={navigateToVehicles}
          onSelectVehicle={navigateToDetail}
          onNavigateCheckout={navigateToCheckout}
          bookingsModalOpen={bookingsModalOpen}
          setBookingsModalOpen={navigateToBookings}
        />
      )}

      {/* Floating Admin Switcher */}
      {currentPage !== "admin" &&
      currentPage !== "admin-bookings" &&
      currentPage !== "admin-vehicles" ? (
        <button
          onClick={navigateToAdmin}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-charcoal text-white text-xs font-semibold shadow-lg hover:bg-black hover:scale-105 transition-all border border-gray-700 opacity-80 hover:opacity-100"
          title="Open Admin Dashboard"
        >
          <LayoutDashboard className="size-3.5 text-primary" />
          <span>Admin Portal</span>
        </button>
      ) : null}
    </>
  );
}
