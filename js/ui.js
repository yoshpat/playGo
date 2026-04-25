// show welcome lable
export function renderWelcome(lable, name){
  lable.textContent = `ברוך הבא ${name}`;
}

// make the date picker show the todays date
export function renderDate(datePicker){
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  
  // set date to current date
  datePicker.value = `${year}-${month}-${day}`;
  // cant chose date that is before current date
  datePicker.min = datePicker.value;
  return datePicker.value;
}

// render the grid, show each date and time, if empty or available
export function renderGrid(container, hammocks, times, date, bookings, onClick) {
  container.innerHTML = "";

  // Header row
  const cell = document.createElement("div");
  cell.textContent = "מספר ערסל"
  container.appendChild(cell); // empty corner

  times.forEach(time => {
    const cell = document.createElement("div");
    cell.textContent = time;
    container.appendChild(cell);
  });

  // Rows
  for (let h = 1; h <= hammocks; h++) {
    const label = document.createElement("div");
    label.textContent = `${h}`;
    container.appendChild(label);

    times.forEach(time => {
      // key is date - hammock number - time hh:mm
      // todo: add to a db and sync with it
      // make this db output reports to mom
      const key = `${date}-${h}-${time}`;
      const isBooked = bookings[key];

      const cell = document.createElement("div");
      cell.className = "cell " + (isBooked ? "booked" : "available");

      cell.onclick = () => onClick(key);

      container.appendChild(cell);
    });
  }
}