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
  if (bookings[key]) {
    delete bookings[key];
  } else {
    bookings[key] = true;
  }

  updateGrid();
}

function updateGrid() {
  renderGrid(grid, HAMMOCKS, times, currentDay, bookings, toggleBooking);
}