export function MetricCard({ icon: Icon, label, value, tone }) {
  return (
    <article className="rounded-lg bg-cardBg p-5 shadow-soft ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-lg ${tone}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
