// Core configuration

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

export const HAMMOCKS = 12;

// Generate time slots (16:00 → 22:00 every 30 min)
export function generateTimeSlots() {
  const slots = [];
  let hour = 16;
  let minute = 0;

  while (hour < 22 || (hour === 22 && minute === 0)) {
    slots.push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    );

    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  return slots;
}

// Booking state (in-memory)
export const bookings = {};
// structure: key -> { password: string }