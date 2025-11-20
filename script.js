const timeEl = document.getElementById("time");
const ampmEl = document.getElementById("ampm");
const dateEl = document.getElementById("date");

const phases = [
  { name: "night", start: 0 },
  { name: "morning", start: 5 },
  { name: "day", start: 11 },
  { name: "evening", start: 17 },
  { name: "night", start: 20 },
];

function formatTwoDigits(value) {
  return String(value).padStart(2, "0");
}

function getPhase(hours) {
  for (let i = phases.length - 1; i >= 0; i -= 1) {
    if (hours >= phases[i].start) {
      return phases[i].name;
    }
  }
  return "night";
}

function updateClock() {
  const now = new Date();
  const hours24 = now.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours24 >= 12 ? "PM" : "AM";

  timeEl.textContent = `${formatTwoDigits(hours12)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
  ampmEl.textContent = ampm;
  dateEl.textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  document.body.setAttribute("data-phase", getPhase(hours24));
}

updateClock();
setInterval(updateClock, 1000);

