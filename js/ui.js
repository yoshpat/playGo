export function renderDays(select, days) {
  days.forEach(day => {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    select.appendChild(option);
  });
}

export function renderGrid(container, hammocks, times, day, bookings, onClick) {
  container.innerHTML = "";

  // Header row
  container.appendChild(document.createElement("div")); // empty corner

  times.forEach(time => {
    const cell = document.createElement("div");
    cell.textContent = time;
    container.appendChild(cell);
  });

  // Rows
  for (let h = 1; h <= hammocks; h++) {
    const label = document.createElement("div");
    label.textContent = `H${h}`;
    container.appendChild(label);

    times.forEach(time => {
      const key = `${day}-${h}-${time}`;
      const isBooked = bookings[key];

      const cell = document.createElement("div");
      cell.className = "cell " + (isBooked ? "booked" : "available");

      cell.onclick = () => onClick(key);

      container.appendChild(cell);
    });
  }
}