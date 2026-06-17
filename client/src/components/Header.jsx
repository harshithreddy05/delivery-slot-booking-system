import { CalendarCheck, PackageCheck } from "lucide-react";

export function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-cyan-400 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-white/18 shadow-lg ring-1 ring-white/30 backdrop-blur">
            <PackageCheck className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-50">Delivery Operations</p>
            <h1 className="text-xl font-bold tracking-normal sm:text-2xl">Slot Booking System</h1>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-white/25 backdrop-blur sm:flex">
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Same-day capacity view
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-12 pt-7 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-blue-100">
            Live availability dashboard
          </p>
          <h2 className="text-4xl font-bold tracking-normal sm:text-5xl">
            Book delivery capacity without overbooking.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
            Monitor each time window, confirm bookings, and guide users to the next open slot when a delivery window is already full.
          </p>
        </div>
        <div className="rounded-lg bg-white/14 p-5 shadow-2xl ring-1 ring-white/25 backdrop-blur">
          <p className="text-sm font-semibold text-blue-50">Today&apos;s workflow</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-white/16 p-3">
              <p className="text-2xl font-bold">View</p>
              <p className="text-xs text-blue-50">Slots</p>
            </div>
            <div className="rounded-lg bg-white/16 p-3">
              <p className="text-2xl font-bold">Book</p>
              <p className="text-xs text-blue-50">Capacity</p>
            </div>
            <div className="rounded-lg bg-white/16 p-3">
              <p className="text-2xl font-bold">Track</p>
              <p className="text-xs text-blue-50">Status</p>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
