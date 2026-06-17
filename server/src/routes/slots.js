import express from "express";
import { findNextAvailableSlot, getSerializedSlots, serializeSlot, slots } from "../data/slots.js";

export const slotsRouter = express.Router();

slotsRouter.get("/", (_req, res) => {
  res.json({
    message: "Delivery slots fetched successfully.",
    slots: getSerializedSlots()
  });
});

export function handleBookSlot(req, res) {
  const { slotId } = req.params;
  const slot = slots.find((item) => item.id === slotId);

  if (!slot) {
    return res.status(404).json({
      message: "Slot not found. Please choose a valid delivery slot.",
      code: "SLOT_NOT_FOUND"
    });
  }

  if (slot.currentBookings >= slot.maxCapacity) {
    const nextSlot = findNextAvailableSlot(slotId);

    return res.status(409).json({
      message: nextSlot
        ? `This slot is full. Next available slot: ${nextSlot.time}`
        : "This slot is full. No later delivery slots are available today.",
      code: "SLOT_FULL",
      nextAvailableSlot: nextSlot ? serializeSlot(nextSlot) : null,
      slot: serializeSlot(slot)
    });
  }

  slot.currentBookings += 1;

  res.json({
    message: `Booking confirmed for ${slot.time}.`,
    slot: serializeSlot(slot),
    slots: getSerializedSlots()
  });
}

slotsRouter.post("/book/:slotId", handleBookSlot);
