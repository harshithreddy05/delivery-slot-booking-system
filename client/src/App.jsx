import { CalendarDays, ClipboardCheck, PackageOpen, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { bookSlot, fetchSlots } from "./api/slots";
import { Header } from "./components/Header";
import { MetricCard } from "./components/MetricCard";
import { SlotCard } from "./components/SlotCard";
import { SlotTable } from "./components/SlotTable";
import { Toast } from "./components/Toast";

function App() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingSlotId, setBookingSlotId] = useState(null);
  const [toast, setToast] = useState(null);

  const metrics = useMemo(() => {
    const totalCapacity = slots.reduce((sum, slot) => sum + slot.maxCapacity, 0);
    const totalBookings = slots.reduce((sum, slot) => sum + slot.currentBookings, 0);
    const availableSlots = slots.filter((slot) => slot.availableSpaces > 0).length;

    return {
      totalSlots: slots.length,
      totalCapacity,
      totalBookings,
      availableSlots
    };
  }, [slots]);

  useEffect(() => {
    let isMounted = true;

    fetchSlots()
      .then((data) => {
        if (isMounted) {
          setSlots(data.slots);
        }
      })
      .catch((error) => {
        setToast({ type: "error", message: error.message || "Unable to load slots." });
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function handleBook(slotId) {
    setBookingSlotId(slotId);

    try {
      const data = await bookSlot(slotId);
      setSlots(data.slots);
      setToast({ type: "success", message: data.message });
    } catch (error) {
      const payload = error.payload;

      if (payload?.slot) {
        setSlots((currentSlots) =>
          currentSlots.map((slot) => (slot.id === payload.slot.id ? payload.slot : slot))
        );
      }

      setToast({ type: payload?.code === "SLOT_FULL" ? "info" : "error", message: error.message });
    } finally {
      setBookingSlotId(null);
    }
  }

  return (
    <div className="min-h-screen bg-appBg text-slate-900">
      <Header />
      <Toast toast={toast} onClose={() => setToast(null)} />

      <main className="mx-auto -mt-7 max-w-7xl px-5 pb-12 sm:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={CalendarDays} label="Total Slots" value={metrics.totalSlots} tone="bg-blue-50 text-primary" />
          <MetricCard icon={Truck} label="Total Capacity" value={metrics.totalCapacity} tone="bg-sky-50 text-secondary" />
          <MetricCard icon={ClipboardCheck} label="Total Bookings" value={metrics.totalBookings} tone="bg-green-50 text-success" />
          <MetricCard icon={PackageOpen} label="Available Slots" value={metrics.availableSlots} tone="bg-amber-50 text-warning" />
        </section>

        {loading ? (
          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-72 animate-pulse rounded-lg bg-white shadow-soft ring-1 ring-slate-200/70" />
            ))}
          </section>
        ) : slots.length === 0 ? (
          <section className="mt-8 rounded-lg bg-white p-10 text-center shadow-soft ring-1 ring-slate-200/70">
            <h2 className="text-xl font-bold text-slate-950">No delivery slots available</h2>
            <p className="mt-2 text-slate-500">Add slots on the server to start accepting bookings.</p>
          </section>
        ) : (
          <>
            <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {slots.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  isBooking={bookingSlotId === slot.id}
                  onBook={handleBook}
                />
              ))}
            </section>

            <div className="mt-8">
              <SlotTable slots={slots} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
