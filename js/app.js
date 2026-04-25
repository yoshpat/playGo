import { HAMMOCKS, generateTimeSlots, bookings, getUserName } from "./data.js";
import { renderDate, renderGrid, renderWelcome } from "./ui.js";

// todo: change to false before adding!!
// jump over user name assign for easy develupment
const easy_mode = false;

const welcomeLable = document.getElementById("welcomeLable");
const grid = document.getElementById("grid");
const dateInput = document.getElementById("date");

var user_name = "";
var chosen_date = "";
// jump over user name assign for easy develupment
if(easy_mode)
{
  user_name = "יוגב";
}
else{
  // get user name
  user_name = getUserName();
}
const times = generateTimeSlots();

// Init UI
renderWelcome(welcomeLable, user_name);

// init date
chosen_date = renderDate(dateInput)


// Render initial grid
updateGrid();


// Change day
dateInput.addEventListener("change", (e) => {
  chosen_date = e.target.value;
  updateGrid();
});

// Booking logic
function toggleBooking(key) {
  const existing = bookings[key];

  const password = prompt("הכנס סיסמא:");
  if(password === "")
  {
    alert("סיסמא ריקה ❌");
    return;
  }

  // CASE 1: slot is EMPTY → book it
  if (!existing) {
    bookings[key] = { password: password, name: user_name };
    updateGrid();
    return;
  }

  // CASE 2: slot is already booked → only owner can remove
  if (existing.password === password) {
    delete bookings[key];
  } else {
    alert("סיסמא שגויה ❌");
    alert(key);
  }
  updateGrid();
}

function updateGrid() {
  renderGrid(grid, HAMMOCKS, times, chosen_date, bookings, toggleBooking);
}