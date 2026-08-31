import { API_BASE_URL, requireSession, renderTopbar } from "../../assets/scripts/main.js";

document.addEventListener("DOMContentLoaded", async () => {
  const officer = await requireSession();
  if (!officer) return;

  renderTopbar(officer);
  loadActiveBolos();

  const form = document.getElementById("bolo-form");
  form.addEventListener("submit", (event) => handleBoloSubmit(event, officer));
});

async function loadActiveBolos() {
  const tbody = document.getElementById("bolos-table-body");

  try {
    const response = await fetch(`${API_BASE_URL}/bolos.php?status=active`, {
      credentials: "same-origin",
    });

    if (!response.ok) throw new Error("Failed to load BOLOs.");
    const bolos = await response.json();

    renderBolosTable(bolos);
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="6">Could not load BOLOs. Try refreshing.</td></tr>';
    console.error(err);
  }
}

function renderBolosTable(bolos) {
  const tbody = document.getElementById("bolos-table-body");

  if (bolos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">No active BOLOs right now.</td></tr>';
    return;
  }

  tbody.innerHTML = "";
  bolos.forEach((bolo) => {
    const row = tbody.insertRow();

    const subject = bolo.subjectName || bolo.vehicleDescription || "Unknown subject";
    const plate = bolo.plateNumber || "—";
    const issued = new Date(bolo.issuedOn).toLocaleDateString();
    const boloId = `${new Date(bolo.issuedOn).getFullYear() % 100}-${bolo.id.toString().padStart(4, "0")}`;

    const badge = document.createElement("span");
    badge.className = `priority-badge priority-badge--${bolo.priority}`;
    badge.textContent = bolo.priority;

    row.insertCell(0).textContent = boloId;
    row.insertCell(1).textContent = plate;
    row.insertCell(2).textContent = subject;
    row.insertCell(3).textContent = bolo.reason;
    row.insertCell(4).appendChild(badge);
    row.insertCell(5).textContent = issued;
    row.insertCell(6).textContent = bolo.officerName;
  });
}

async function handleBoloSubmit(event, officer) {
  event.preventDefault();
  clearFormError();

  const subjectName = document.getElementById("subject-name").value.trim();
  const plateNumber = document.getElementById("plate-number").value.trim();
  const vehicleDescription = document.getElementById("vehicle-description").value.trim();
  const reason = document.getElementById("reason").value.trim();
  const priority = document.getElementById("priority").value;

  const validationError = validateBoloInput(subjectName, plateNumber, reason);
  if (validationError) {
    showFormError(validationError);
    return;
  }

  const submitButton = document.getElementById("bolo-submit-button");
  submitButton.disabled = true;
  submitButton.textContent = "Filing...";

  try {
    const response = await fetch(`${API_BASE_URL}/bolos.php`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        officerId: officer.id,
        subjectName,
        plateNumber,
        vehicleDescription,
        reason,
        priority,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      const message = data.errors ? data.errors.join(" ") : "Could not file BOLO.";
      showFormError(message);
      return;
    }

    document.getElementById("bolo-form").reset();
    loadActiveBolos();
  } catch (err) {
    showFormError("Could not reach the server. Check that it is running and try again.");
    console.error(err);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "File BOLO";
  }
}

function validateBoloInput(subjectName, plateNumber, reason) {
  if (subjectName === "" && plateNumber === "") {
    return "Provide at least a subject name or a plate number.";
  }
  if (plateNumber !== "" && !/^[A-Z0-9]{2,10}$/i.test(plateNumber)) {
    return "Plate number format looks invalid.";
  }
  if (reason === "") {
    return "A reason for the BOLO is required.";
  }
  return null;
}

function showFormError(message) {
  const form = document.getElementById("bolo-form");
  let errorEl = document.getElementById("bolo-form-error");

  if (!errorEl) {
    errorEl = document.createElement("p");
    errorEl.id = "bolo-form-error";
    errorEl.className = "form-error";
    form.insertBefore(errorEl, document.getElementById("bolo-submit-button"));
  }

  errorEl.textContent = message;
}

function clearFormError() {
  const errorEl = document.getElementById("bolo-form-error");
  if (errorEl) errorEl.remove();
}
