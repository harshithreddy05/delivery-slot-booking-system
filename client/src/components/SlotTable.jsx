export function SlotTable({ slots }) {
  return (
    <section className="rounded-lg bg-cardBg shadow-soft ring-1 ring-slate-200/70">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-bold text-slate-950">Availability Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">A quick operational view of every delivery window.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-bold">Slot Time</th>
              <th className="px-5 py-3 font-bold">Capacity</th>
              <th className="px-5 py-3 font-bold">Booked Count</th>
              <th className="px-5 py-3 font-bold">Available Count</th>
              <th className="px-5 py-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {slots.map((slot) => (
              <tr key={slot.id} className="transition hover:bg-blue-50/50">
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-950">{slot.time}</td>
                <td className="px-5 py-4 text-slate-700">{slot.maxCapacity}</td>
                <td className="px-5 py-4 text-slate-700">{slot.currentBookings}</td>
                <td className="px-5 py-4 text-slate-700">{slot.availableSpaces}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      slot.status === "Full" ? "bg-red-50 text-error" : "bg-green-50 text-success"
                    }`}
                  >
                    {slot.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
