const akanData = {
  0: { day: "Sunday", male: "Kwasi", female: "Akosua", trait: "Leader, confident, radiant" },
  1: { day: "Monday", male: "Kwadwo", female: "Adwoa", trait: "Calm, peaceful, thoughtful" },
  2: { day: "Tuesday", male: "Kwabena", female: "Abenaa", trait: "Bold, energetic, competitive" },
  3: { day: "Wednesday", male: "Kwaku", female: "Akua", trait: "Creative, curious, clever" },
  4: { day: "Thursday", male: "Yaw", female: "Yaa", trait: "Strong, courageous, confident" },
  5: { day: "Friday", male: "Kofi", female: "Afua", trait: "Adventurous, passionate, charming" },
  6: { day: "Saturday", male: "Kwame", female: "Ama", trait: "Wise, spiritual, reflective" }
};

function calculateDayOfWeek(day, month, year) {
  const adjusted = adjustDate(day, month, year);

  const CC = Math.floor(adjusted.year / 100);
  const YY = adjusted.year % 100;
  const MM = adjusted.month;
  const DD = adjusted.day;

  const d =
    ( (2 * CC - 1) +
      (45 * YY) +
      Math.floor((10 * (MM + 1)) / 26) +
      DD
    ) % 7;

  return d; 
}
function adjustDate(day, month, year) {
  if (month < 3) {
    month += 12;
    year -= 1;
  }
  return { day, month, year };
}
function isValidDate(day, month, year) {
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const isLeap =
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  if (isLeap) daysInMonth[1] = 29;

  return day <= daysInMonth[month - 1];
}

function getAkanName(dayIndex, gender) {
  const data = akanData[dayIndex];
  return data ? data[gender] : null;
}
function getDayTraits(dayIndex) {
  return akanData[dayIndex]?.trait;
}
function generateAkanName(event) {
  event.preventDefault();

  const day = Number(document.getElementById("day").value);
  const month = Number(document.getElementById("month").value);
  const year = Number(document.getElementById("year").value);
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (!gender) {
    alert("Please select a gender.");
    return;
  }

 if (!isValidDate(day, month, year)) {
  alert("Please enter a valid date.");
  return;
}

const dayIndex = calculateDayOfWeek(day, month, year);

  const akanName = getAkanName(dayIndex, gender);
  const traits = getDayTraits(dayIndex);
  const dayName = akanData[dayIndex].day;

  displayResult(akanName, dayName, traits);
}
function displayResult(name, day, traits) {
  const result = document.getElementById("result");

  result.innerHTML = `
    <h2>Your Akan Name</h2>
    <p><strong>${name}</strong></p>
    <p>Born on a <strong>${day}</strong></p>
    <p>Traits: ${traits}</p>
  `;
}
document
  .getElementById("akanForm")
  .addEventListener("submit", generateAkanName);
