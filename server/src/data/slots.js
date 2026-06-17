export const slots = [
  {
    id: "slot-09",
    time: "9:00 AM - 10:00 AM",
    maxCapacity: 6,
    currentBookings: 2
  },
  {
    id: "slot-10",
    time: "10:00 AM - 11:00 AM",
    maxCapacity: 5,
    currentBookings: 5
  },
  {
    id: "slot-11",
    time: "11:00 AM - 12:00 PM",
    maxCapacity: 8,
    currentBookings: 3
  },
  {
    id: "slot-12",
    time: "12:00 PM - 1:00 PM",
    maxCapacity: 4,
    currentBookings: 1
  },
  {
    id: "slot-14",
    time: "2:00 PM - 3:00 PM",
    maxCapacity: 7,
    currentBookings: 6
  },
  {
    id: "slot-15",
    time: "3:00 PM - 4:00 PM",
    maxCapacity: 5,
    currentBookings: 0
  }
];

export function serializeSlot(slot) {
  const availableSpaces = Math.max(slot.maxCapacity - slot.currentBookings, 0);

  return {
    id: slot.id,
    time: slot.time,
    maxCapacity: slot.maxCapacity,
    currentBookings: slot.currentBookings,
    availableSpaces,
    status: availableSpaces > 0 ? "Available" : "Full"
  };
}

export function getSerializedSlots() {
  return slots.map(serializeSlot);
}

export function findNextAvailableSlot(slotId) {
  const currentIndex = slots.findIndex((slot) => slot.id === slotId);
  const searchStart = currentIndex >= 0 ? currentIndex + 1 : 0;

  return slots.slice(searchStart).find((slot) => slot.currentBookings < slot.maxCapacity) ?? null;
}
