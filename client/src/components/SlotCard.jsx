import { CheckCircle2, Clock, Loader2 } from "lucide-react";

export function SlotCard({ slot, isBooking, onBook }) {
  const isFull = slot.status === "Full";
  const utilization = Math.round((slot.currentBookings / slot.maxCapacity) * 100);

  return (
    <article className="rounded-lg bg-cardBg p-5 shadow-soft ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <p className="text-sm font-semibold">Delivery window</p>
          </div>
          <h3 className="mt-2 text-xl font-bold text-slate-950">{slot.time}</h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            isFull ? "bg-red-50 text-error ring-1 ring-red-100" : "bg-green-50 text-success ring-1 ring-green-100"
          }`}
        >
          {isFull ? "Slot Full" : "Available"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-slate-500">Capacity</p>
          <p className="mt-1 text-lg font-bold text-slate-950">{slot.maxCapacity}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-slate-500">Booked</p>
          <p className="mt-1 text-lg font-bold text-slate-950">{slot.currentBookings}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-slate-500">Open</p>
          <p className="mt-1 text-lg font-bold text-slate-950">{slot.availableSpaces}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-600">Utilization</span>
          <span className="font-bold text-slate-900">{utilization}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isFull ? "bg-error" : utilization >= 80 ? "bg-warning" : "bg-success"
            }`}
            style={{ width: `${utilization}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-2">
        <button
          type="button"
          onClick={() => onBook(slot.id)}
          disabled={isFull || isBooking}
          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold text-white shadow-lg transition duration-300 ${
            isFull
              ? "bg-slate-400"
              : "bg-primary hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-200"
          } disabled:cursor-not-allowed disabled:opacity-80`}
        >
          {isBooking ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
          {isFull ? "Slot Full" : "Book Slot"}
        </button>
        {isFull && (
          <button
            type="button"
            onClick={() => onBook(slot.id)}
            disabled={isBooking}
            className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-amber-200 bg-amber-50 px-4 text-sm font-bold text-amber-700 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-100 disabled:cursor-wait disabled:opacity-75"
          >
            Suggest Next Slot
          </button>
        )}
      </div>
    </article>
  );
}
