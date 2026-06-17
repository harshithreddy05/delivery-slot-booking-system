# Delivery Slot Booking System

A modern full-stack delivery slot booking dashboard built with React, Tailwind CSS, Node.js, and Express. The app stores slot data in memory, displays live capacity, prevents overbooking, and suggests the next available delivery window when a selected slot is full.

## Folder Structure

```text
delivery-slot-booking-system/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── server/
│   ├── src/
│   │   ├── data/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── package.json
└── README.md
```

## Features

- Prepopulated delivery slots with unique IDs, slot time, maximum capacity, current bookings, available spaces, and status.
- Booking flow that updates booked count and remaining capacity.
- Overbooking protection with disabled full-slot UI and backend validation.
- Next available slot suggestion when a full slot is selected.
- Responsive dashboard with metric cards, slot cards, a table view, progress bars, loading states, empty state, and toast notifications.
- In-memory data only. No database setup is required.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, lucide-react
- Backend: Node.js, Express.js
- Data: In-memory JavaScript arrays

## Setup

Install dependencies from the project root:

```bash
npm run install:all
```

## Run

Start both frontend and backend in development mode:

```bash
npm run dev
```

Default URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

You can also run each app separately:

```bash
npm run dev --prefix server
npm run dev --prefix client
```

## API Documentation

### GET `/slots`

Returns all delivery slots.

Example response:

```json
{
  "message": "Delivery slots fetched successfully.",
  "slots": [
    {
      "id": "slot-09",
      "time": "9:00 AM - 10:00 AM",
      "maxCapacity": 6,
      "currentBookings": 2,
      "availableSpaces": 4,
      "status": "Available"
    }
  ]
}
```

### POST `/book/:slotId`

Books one space in a delivery slot. The legacy alias `POST /slots/book/:slotId` is also supported by the server.

Successful response:

```json
{
  "message": "Booking confirmed for 9:00 AM - 10:00 AM.",
  "slot": {
    "id": "slot-09",
    "time": "9:00 AM - 10:00 AM",
    "maxCapacity": 6,
    "currentBookings": 3,
    "availableSpaces": 3,
    "status": "Available"
  },
  "slots": []
}
```

Full slot response:

```json
{
  "message": "This slot is full. Next available slot: 11:00 AM - 12:00 PM",
  "code": "SLOT_FULL",
  "nextAvailableSlot": {
    "id": "slot-11",
    "time": "11:00 AM - 12:00 PM",
    "maxCapacity": 8,
    "currentBookings": 3,
    "availableSpaces": 5,
    "status": "Available"
  }
}
```

Invalid slot response:

```json
{
  "message": "Slot not found. Please choose a valid delivery slot.",
  "code": "SLOT_NOT_FOUND"
}
```

## Assumptions

- Slot data resets whenever the backend server restarts.
- The system manages one delivery day at a time.
- Booking does not require user authentication because the focus is capacity management.
- The next available slot is searched after the selected slot in the current list order.

## UI Notes

Sample screenshots would show:

- A blue-to-sky gradient header with the application title and workflow summary.
- Four dashboard cards for total slots, total capacity, total bookings, and available slots.
- Responsive slot cards with utilization progress bars and animated booking buttons.
- A clean availability table showing slot time, capacity, booked count, available count, and status.
- Toast notifications for successful bookings, full-slot suggestions, and errors.

## AI Usage Note

AI tools were used to plan the app structure, generate the React components, implement the Express API, design the Tailwind dashboard, and prepare documentation. AI helped turn the requirements into a simple full-stack architecture, keep the booking logic easy to follow, and shape a polished interview-ready UI. The main challenge was balancing professional dashboard styling with simple business logic; it was resolved by separating API validation, reusable UI components, and clear slot serialization.
