const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const celebration = document.getElementById("celebration");
const attendeeList = document.getElementById("attendeeList");

const maxCount = 50;
let attendees = [];

function loadAttendees() {
  if (typeof localStorage === "undefined") {
    return [];
  }

  const savedAttendees = localStorage.getItem("summitAttendees");

  if (!savedAttendees) {
    return [];
  }

  try {
    return JSON.parse(savedAttendees);
  } catch (error) {
    return [];
  }
}

function saveAttendees() {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("summitAttendees", JSON.stringify(attendees));
  }
}

function renderApp() {
  attendeeCount.textContent = attendees.length;

  const percentage =
    Math.min(Math.round((attendees.length / maxCount) * 100), 100) + "%";
  progressBar.style.width = percentage;

  const teamCounts = {
    water: 0,
    zero: 0,
    power: 0,
  };

  attendees.forEach(function (attendee) {
    teamCounts[attendee.team]++;
  });

  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;

  if (attendeeList) {
    attendeeList.innerHTML = "";

    attendees.forEach(function (attendee) {
      const listItem = document.createElement("li");
      listItem.textContent = `${attendee.name} - ${attendee.teamName}`;
      attendeeList.appendChild(listItem);
    });
  }

  if (attendees.length >= maxCount) {
    celebration.textContent = "🎉 Attendance goal reached!";
    celebration.style.display = "block";
  } else {
    celebration.style.display = "none";
  }
}

attendees = loadAttendees();
renderApp();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  attendees.push({
    name: name,
    team: team,
    teamName: teamName,
  });

  saveAttendees();
  renderApp();

  greeting.textContent = `Welcome, ${name}, from ${teamName}!`;
  greeting.className = "success-message";
  greeting.style.display = "block";

  form.reset();
});
