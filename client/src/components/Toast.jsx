import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info
};

const tones = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-blue-200 bg-blue-50 text-blue-800"
};

export function Toast({ toast, onClose }) {
  if (!toast) {
    return null;
  }

  const Icon = icons[toast.type] || Info;

  return (
    <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-md animate-slide-in">
      <div className={`flex items-start gap-3 rounded-lg border p-4 shadow-soft ${tones[toast.type] || tones.info}`}>
        <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p className="flex-1 text-sm font-semibold leading-6">{toast.message}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 transition hover:bg-white/70"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
