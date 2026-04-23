import { DAYS, HAMMOCKS, generateTimeSlots, bookings } from "./data.js";
import { renderDays, renderGrid } from "./ui.js";

const daySelect = document.getElementById("daySelect");
const grid = document.getElementById("grid");

const times = generateTimeSlots();

// Init UI
renderDays(daySelect, DAYS);

let currentDay = DAYS[0];

// Render initial grid
updateGrid();

// Change day
daySelect.addEventListener("change", (e) => {
  currentDay = e.target.value;
  updateGrid();
});

// Booking logic
function toggleBooking(key) {
  const existing = bookings[key];

  const password = prompt("Set or enter password for this slot:");
  if(password === "")
  {
    alert("empty password ❌");
    return;
  }

  // CASE 1: slot is EMPTY → book it
  if (!existing) {
    bookings[key] = { password };
    updateGrid();
    return;
  }

  // CASE 2: slot is already booked → only owner can remove
  if (existing.password === password) {
    delete bookings[key];
  } else {
    alert("Wrong password ❌");
  }
  updateGrid();
}

function updateGrid() {
  renderGrid(grid, HAMMOCKS, times, currentDay, bookings, toggleBooking);
}