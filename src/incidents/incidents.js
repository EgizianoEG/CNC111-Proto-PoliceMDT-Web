import { API_BASE_URL, requireSession, renderTopbar } from "../../assets/scripts/main.js";

document.addEventListener("DOMContentLoaded", async () => {
  const officer = await requireSession();
  if (!officer) return;

  renderTopbar(officer);
  loadIncidents();

  const form = document.getElementById("incident-form");
  form.addEventListener("submit", (event) => handleIncidentSubmit(event, officer));
});

async function loadIncidents() {
  const tbody = document.getElementById("incidents-table-body");

  try {
    const response = await fetch(`${API_BASE_URL}/incidents.php`, {
      credentials: "same-origin",
    });

    if (!response.ok) throw new Error("Failed to load incidents.");
    const incidents = await response.json();

    renderIncidentsTable(incidents);
  } catch (error) {
    tbody.innerHTML = '<tr><td colspan="6">Could not load incidents. Try refreshing.</td></tr>';
    console.error(error);
  }
}

function renderIncidentsTable(incidents) {
  const tbody = document.getElementById("incidents-table-body");

  if (incidents.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">No incidents reported yet.</td></tr>';
    return;
  }

  tbody.innerHTML = "";
  incidents.forEach((incident) => {
    const row = tbody.insertRow();

    row.insertCell(0).textContent = incident.type;
    row.insertCell(1).textContent = incident.description;
    row.insertCell(2).textContent = incident.location || "—";

    const statusCell = row.insertCell(3);
    const statusBadge = document.createElement("span");
    statusBadge.className = `status-badge status-badge--${statusToModifier(incident.status)}`;
    statusBadge.textContent = incident.status;
    statusCell.appendChild(statusBadge);

    row.insertCell(4).textContent = new Date(incident.reportedOn).toLocaleString();
    row.insertCell(5).textContent = incident.officerName;
  });
}

function statusToModifier(status) {
  const normalized = status.toLowerCase();
  if (normalized === "open") return "open";
  if (normalized.startsWith("closed")) return "closed";
  return "default";
}

async function handleIncidentSubmit(event, officer) {
  event.preventDefault();
  clearFormError();

  const type = document.getElementById("incident-type").value.trim();
  const location = document.getElementById("incident-location").value.trim();
  const description = document.getElementById("incident-description").value.trim();

  const validationError = validateIncidentInput(type, description);
  if (validationError) {
    showFormError(validationError);
    return;
  }

  const submitButton = document.getElementById("incident-submit-button");
  submitButton.disabled = true;
  submitButton.textContent = "Filing...";

  try {
    const response = await fetch(`${API_BASE_URL}/incidents.php`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        officerId: officer.id,
        type,
        description,
        location,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data.errors ? data.errors.join(" ") : "Could not file incident.";
      showFormError(message);
      return;
    }

    document.getElementById("incident-form").reset();
    loadIncidents();
  } catch (error) {
    showFormError("Could not reach the server. Check that it is running and try again.");
    console.error(error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "File Incident";
  }
}

function validateIncidentInput(type, description) {
  if (type === "") {
    return "Incident type is required.";
  } else if (description === "") {
    return "Description is required.";
  } else if (description.length < 10) {
    return "Description should be at least 10 characters.";
  }

  return null;
}

function showFormError(message) {
  const form = document.getElementById("incident-form");
  let errorEl = document.getElementById("incident-form-error");

  if (!errorEl) {
    errorEl = document.createElement("p");
    errorEl.id = "incident-form-error";
    errorEl.className = "form-error";
    form.insertBefore(errorEl, document.getElementById("incident-submit-button"));
  }

  errorEl.textContent = message;
}

function clearFormError() {
  const errorEl = document.getElementById("incident-form-error");
  if (errorEl) errorEl.remove();
}
