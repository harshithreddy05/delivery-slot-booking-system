import cors from "cors";
import express from "express";
import morgan from "morgan";
import { handleBookSlot, slotsRouter } from "./routes/slots.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "delivery-slot-booking-api" });
});

app.use("/slots", slotsRouter);
app.post("/book/:slotId", handleBookSlot);

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} was not found.`,
    code: "ROUTE_NOT_FOUND"
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    message: "Something went wrong while processing your request.",
    code: "INTERNAL_SERVER_ERROR"
  });
});

app.listen(PORT, () => {
  console.log(`Delivery slot API running on http://localhost:${PORT}`);
});
