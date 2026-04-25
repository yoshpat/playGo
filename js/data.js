// Core configuration

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
// structure: key -> { password: string, name: string }

// ask for user name, for future reports
export function getUserName(){
  do{
    var user_name = prompt("הכנס שם:");
    if(user_name == "")
    {
      alert("שם ריק ❌");
    }
  }while(user_name === "");
  return user_name;
}