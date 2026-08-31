import { API_BASE_URL } from "../../assets/scripts/main.js";

document.addEventListener("DOMContentLoaded", async function onLoginPageLoad() {
  await redirectIfAlreadyLoggedIn();

  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const submitButton = document.getElementById("login-button");
  const togglePasswordButton = document.getElementById("toggle-password");

  form.addEventListener("submit", handleLoginSubmit);
  if (togglePasswordButton) {
    togglePasswordButton.addEventListener("click", togglePasswordVisibility);
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    clearError();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const validationError = validateLoginInput(username, password);

    if (validationError) {
      displayError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        displayError(data.message ?? "Invalid username or password.");
        setLoading(false);
        return;
      }

      window.location.href = "../dashboard/dashboard.html";
    } catch (err) {
      displayError(
        "Something went wrong while reaching the server. Check that it is running and try again.\n\n" +
          err.message
      );

      setLoading(false);
    }
  }

  function validateLoginInput(username, password) {
    if (username === "" || password === "") {
      return "Badge number/username and password are both required.";
    }

    if (!/^\w{6,32}$/.test(username)) {
      return "Badge number/username looks too short. It must be 6-32 characters long and contain only letters, numbers, and underscores.";
    }

    return null;
  }

  function displayError(message) {
    let errorEl = document.getElementById("login-error");
    if (!errorEl) {
      errorEl = document.createElement("p");
      errorEl.id = "login-error";
      errorEl.className = "login-error";
      form.insertBefore(errorEl, submitButton);
    }

    errorEl.style.display = "block";
    errorEl.textContent = message;
  }

  function clearError() {
    const errorEl = document.getElementById("login-error");
    if (errorEl) errorEl.remove();
  }

  function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? "Checking..." : "Access Terminal";
  }
});

function togglePasswordVisibility() {
  /** @type {HTMLInputElement} */
  const passwordInput = document.getElementById("password");
  /** @type {HTMLButtonElement} */
  const togglePassword = document.getElementById("toggle-password");
  if (!(passwordInput && togglePassword)) {
    return;
  }

  const isPasswordVisible = passwordInput.type === "text";
  passwordInput.type = isPasswordVisible ? "password" : "text";
  togglePassword.classList.toggle("fa-eye", !isPasswordVisible);
  togglePassword.classList.toggle("fa-eye-slash", isPasswordVisible);
}

async function redirectIfAlreadyLoggedIn() {
  try {
    const response = await fetch(`${API_BASE_URL}/session.php`, { credentials: "same-origin" });
    if (response.ok) {
      window.location.href = "../dashboard/dashboard.html";
    }
  } catch {
    // ignored.
  }
}
