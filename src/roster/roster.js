import { API_BASE_URL, requireSession, renderTopbar } from "../../assets/scripts/main.js";
const DUTY_LABELS = { on_duty: "On Duty", on_break: "On Break", off_duty: "Off Duty" };

const updateInterval = 60_000;
let updateTimer = null;

document.addEventListener("DOMContentLoaded", async () => {
  const officer = await requireSession();
  if (!officer) return;

  const rosterSubtitle = document.getElementById("roster-subtitle");
  rosterSubtitle.textContent = `Updated every ${updateInterval / 1000} seconds.`;

  if (updateTimer) clearTimeout(updateTimer);
  renderTopbar(officer);
  updateRoster();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    updateRoster();
  } else if (updateTimer) {
    clearTimeout(updateTimer);
  }
});

async function updateRoster() {
  await loadRoster();
  updateTimer = setTimeout(updateRoster, updateInterval);
}

async function loadRoster() {
  /** @type {HTMLTableSectionElement} */
  const tbody = document.getElementById("roster-table-body");

  try {
    const response = await fetch(`${API_BASE_URL}/officers.php?action=roster`, {
      credentials: "same-origin",
    });

    if (!response.ok) throw new Error("Failed to load roster.");
    const data = await response.json();

    tbody.innerHTML = "";
    data.forEach((officer) => {
      const row = tbody.insertRow();
      row.insertCell(0).textContent = officer.badgeNumber;
      row.insertCell(1).textContent = officer.name;
      row.insertCell(2).textContent = officer.rank;
      row.insertCell(3).textContent = officer.division;

      const statusCell = row.insertCell(4);
      const statusInfo = document.createElement("p");
      const statusIn = document.createElement("span");
      const statusClass =
        { on_duty: "on", on_break: "break", off_duty: "off" }[officer.dutyStatus] || "off";

      statusIn.className = `status-dot status-dot--${statusClass}`;
      statusInfo.appendChild(statusIn);
      statusInfo.append(normalizeStatus(officer.dutyStatus));
      statusCell.appendChild(statusInfo);
    });
  } catch (err) {
    console.error("Error loading roster:", err);
  }
}

function normalizeStatus(status) {
  return DUTY_LABELS[status] ?? status;
}
