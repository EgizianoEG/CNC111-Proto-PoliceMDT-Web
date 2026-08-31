import { API_BASE_URL, requireSession, renderTopbar } from "../../assets/scripts/main.js";

document.addEventListener("DOMContentLoaded", async () => {
  const officer = await requireSession();
  if (officer) renderTopbar(officer);

  /** @type {HTMLImageElement} */
  const officerPortrait = document.getElementById("officer-portrait");
  console.log(officer, officerPortrait);
  if (officer && officerPortrait) {
    console.log(true);
    officerPortrait.src = officer.photoUrl || "https://placehold.co/80";
  }

  loadStats();
  loadActiveBolos();
});

async function loadStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/officers.php?action=stats`, {
      credentials: "same-origin",
    });

    if (!response.ok) throw new Error("Failed to load stats.");
    const stats = await response.json();

    setStatValue("citations-filed", stats.citationsFiled);
    setStatValue("open-incidents", stats.openIncidents);
    setStatValue("officers-on-duty", stats.officersOnDuty);
    setStatValue("active-bolos-count", stats.activeBolos);
  } catch (err) {
    console.error(err);
  }
}

function setStatValue(statId, value) {
  const el = document.querySelector(`[data-stat="${statId}"]`);
  if (el) el.textContent = value;
}

async function loadActiveBolos() {
  /** @type {HTMLTableSectionElement} */
  const tbody = document.getElementById("active-bolos-body");

  try {
    const response = await fetch(`${API_BASE_URL}/bolos.php?status=active`, {
      credentials: "same-origin",
    });

    if (!response.ok) throw new Error("Failed to load BOLOs.");
    const bolos = await response.json();

    if (bolos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">No active BOLOs right now.</td></tr>';
      return;
    }

    tbody.innerHTML = "";
    bolos.forEach((bolo) => {
      const row = tbody.insertRow();

      const idCell = row.insertCell(0);
      const vehPlateCell = row.insertCell(1);
      const subjectVehCell = row.insertCell(2);
      const reasonCell = row.insertCell(3);
      const priorityCell = row.insertCell(4);
      const dateIssuedCell = row.insertCell(5);

      const yearSuffix = new Date().getFullYear() % 100;
      const boloId = `${yearSuffix}-${bolo.id.toString().padStart(4, "0")}`;
      const priority = bolo.priority || "normal";
      const issued = new Date(bolo.issuedOn).toLocaleDateString();
      const issuedRelative = issuedRelativeTime(new Date(bolo.issuedOn));
      const subjVehDescription =
        `${bolo.subjectName || ""}${bolo.vehicleDescription ? ` (${bolo.vehicleDescription})` : ""}`.trim();

      idCell.textContent = boloId;
      vehPlateCell.textContent = escapeHtml(bolo.plateNumber || "—");
      subjectVehCell.textContent = subjVehDescription;
      reasonCell.textContent = escapeHtml(bolo.reason || "—");
      priorityCell.textContent = priority;
      dateIssuedCell.textContent = `${issued} (${issuedRelative})`;

      // @todo: Add click event to go to bolo details page when implemented
      // row.addEventListener("click", () => {
      //   window.location.href = `/sdpd-mdt/bolo.php?id=${bolo.id}`;
      // });
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="5">Could not load BOLOs. Try refreshing.</td></tr>';
    console.error(err);
  }
}

/**
 * Converts a Date object to a relative time string (e.g., "5 hours ago").
 * @param {Date} issuedOn
 */
function issuedRelativeTime(issuedOn) {
  const now = new Date();
  const diffMs = now - issuedOn;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

/**
 * Escapes HTML special characters in a string to prevent any rendering issues.
 * @param {string} str
 * @returns
 */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
