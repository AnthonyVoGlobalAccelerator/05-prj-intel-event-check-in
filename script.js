const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");

let count = 0;
const maxCount = 50;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  count++;

  const percentage = Math.round((count / maxCount) * 100) + "%";
  const teamCounter = document.getElementById(team + "Count");
  const current = parseInt(teamCounter.textContent);

  attendeeCount.textContent = count;
  progressBar.style.width = percentage;
  teamCounter.textContent = current + 1;
  greeting.textContent = `Welcome, ${name}, from ${teamName}!`;
  greeting.className = "success-message";
  greeting.style.display = "block";

  form.reset();
});
