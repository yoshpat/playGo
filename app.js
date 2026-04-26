const grid = document.getElementById("grid");
const datePicker = document.getElementById("datePicker");
const saveBtn = document.getElementById("save");

const modal = document.getElementById("modal");
const confirmBtn = document.getElementById("confirm");
const closeBtn = document.getElementById("close");

let selected = null;

const hours = ["18:00", "19:00", "20:00", "21:00"];

// 🔹 load data from localStorage
function getData() {
  return JSON.parse(localStorage.getItem("reservations") || "[]");
}

// 🔹 save data
function setData(data) {
  localStorage.setItem("reservations", JSON.stringify(data));
}

// 🔹 render grid
function render() {
  const date = datePicker.value;
  const reservations = getData().filter(r => r.date === date);

  grid.innerHTML = "";

  hours.forEach(hour => {
    const list = reservations.filter(r => r.hour === hour);

    const cell = document.createElement("div");
    cell.className = "cell";

    cell.innerHTML = `
        <b>${hour}</b><br>
        ${list.map(r => `
        <div class="user">
        ${r.name}
        <button onclick="cancelReservation('${r.date}','${r.hour}','${r.name}')">x</button>
        </div>
    `).join("")}`;

    if (list.length >= 12) {
      cell.classList.add("booked");
      cell.onclick = null;
    }

    cell.onclick = () => {
      selected = { hour };
      saveBtn.disabled = false;
    };

    grid.appendChild(cell);
  });
}

// 🔹 set today
const today = new Date();
datePicker.value = today.toISOString().split("T")[0];

datePicker.onchange = render;

// 🔹 open modal
saveBtn.onclick = () => {
  modal.classList.remove("hidden");
};

// 🔹 confirm reservation
confirmBtn.onclick = () => {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  if (!name || !password) return alert("יש למלא את כל השדות");

  const data = getData();

  const sameSlot = data.filter(
    r => r.date === datePicker.value && r.hour === selected.hour
  );

  if (sameSlot.length >= 12) {
    modal.classList.add("hidden");
    saveBtn.disabled = true;
    return alert("Full");
  }

  const exists = data.find(r =>
  r.date === datePicker.value &&
  r.hour === selected.hour &&
  r.name === name
    );

    if (exists) {
    return alert("השם כבר רשום לשעה זו");
    }

  data.push({
    date: datePicker.value,
    hour: selected.hour,
    name,
    password
  });

  setData(data);

  modal.classList.add("hidden");
  saveBtn.disabled = true;

  render();
};

// close without regiseter
closeBtn.onclick = () => {
    modal.classList.add("hidden");
    saveBtn.disabled = true;
}

function cancelReservation(date, hour, name) {
  const password = prompt("לביטול הכנס סיסמא");

  if (!password) return;

  let data = getData();

  const index = data.findIndex(r => {
    if (password === "000") {
      return r.date === date && r.hour === hour && r.name === name;
    }
    return (
      r.date === date &&
      r.hour === hour &&
      r.name === name &&
      r.password === password
    );
  });

  if (index === -1) {
    alert("סיסמא שגויה");
    return;
  }

  data.splice(index, 1);
  setData(data);
  render();
}

// init
render();