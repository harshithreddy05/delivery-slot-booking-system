const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || "Request failed.");
    error.payload = payload;
    throw error;
  }

  return payload;
}

export function fetchSlots() {
  return request("/slots");
}

export function bookSlot(slotId) {
  return request(`/book/${slotId}`, { method: "POST" });
}
