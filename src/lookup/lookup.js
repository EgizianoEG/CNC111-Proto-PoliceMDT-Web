import { API_BASE_URL, requireSession, renderTopbar } from "../../assets/scripts/main.js";

document.addEventListener("DOMContentLoaded", async () => {
  const officer = await requireSession();
  if (!officer) return;
  renderTopbar(officer);

  const form = document.getElementById("lookup-form");
  form.addEventListener("submit", handleLookupSubmit);
});

async function handleLookupSubmit(event) {
  event.preventDefault();

  const category = document.getElementById("lookup-type").value;
  const query = document.getElementById("lookup-query").value.trim();

  const validationError = validateLookupInput(query);
  if (validationError) {
    displayError(validationError);
    return;
  }

  const button = document.getElementById("lookup-button");
  button.disabled = true;
  button.textContent = "Searching...";
  displayError("Searching...");

  try {
    const response = await fetch(
      `${API_BASE_URL}/lookup.php?category=${encodeURIComponent(category)}&q=${encodeURIComponent(query)}`,
      { credentials: "same-origin" }
    );

    const data = await response.json();

    if (!response.ok) {
      displayError(data.error || "Search failed. Try again.");
      return;
    }

    renderResults(category, data.results);
  } catch (error) {
    displayError("Could not reach the server. Check that it is running and try again.");
    console.error(error);
  } finally {
    button.disabled = false;
    button.textContent = "Search";
  }
}

function validateLookupInput(query) {
  if (query === "" || query.length < 2) {
    return "Enter at least 2 characters to search.";
  }

  return null;
}

function renderResults(category, results) {
  const table = document.getElementById("lookup-results-table");
  const thead = document.getElementById("lookup-results-head");
  const tbody = document.getElementById("lookup-results-body");

  if (results.length === 0) {
    table.hidden = true;
    displayError("No results found.");
    return;
  }

  if (category === "individuals") {
    thead.innerHTML =
      "<tr><th>Photo</th><th>Name</th><th>Date of Birth</th><th>Gender</th><th>Address</th></tr>";
    tbody.innerHTML = "";
    results.forEach((person) => {
      const row = tbody.insertRow();

      const photoCell = row.insertCell(0);
      const photo = document.createElement("img");

      photo.src = person.photoUrl || "https://placehold.co/48";
      photo.alt = `Photo of ${person.fullName}`;
      photo.className = "result-photo";
      photoCell.appendChild(photo);

      row.insertCell(1).textContent = person.fullName;
      row.insertCell(2).textContent = person.dateOfBirth || "—";
      row.insertCell(3).textContent = person.gender || "—";
      row.insertCell(4).textContent = person.address || "—";
    });
  } else if (category === "incidents") {
    thead.innerHTML = "<tr><th>Type</th><th>Description</th><th>Status</th><th>Reported</th></tr>";
    tbody.innerHTML = "";
    results.forEach((incident) => {
      const row = tbody.insertRow();
      row.insertCell(0).textContent = incident.type;
      row.insertCell(1).textContent = incident.description;
      row.insertCell(2).textContent = incident.status;
      row.insertCell(3).textContent = new Date(incident.reportedOn).toLocaleDateString();
    });
  }

  table.hidden = false;
  hideNotice();
}

function displayError(message) {
  const notice = document.getElementById("lookup-results-notice");
  const table = document.getElementById("lookup-results-table");
  notice.textContent = message;
  notice.hidden = false;
  table.hidden = true;
}

function hideNotice() {
  document.getElementById("lookup-results-notice").hidden = true;
}
