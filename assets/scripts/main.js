export const API_BASE_URL = "/sdpd-mdt/api";
export const HTML_BASE_URL = "/sdpd-mdt/src";
export const DUTY_LABELS = { on_duty: "On Duty", on_break: "On Break", off_duty: "Off Duty" };

export async function requireSession() {
  try {
    const response = await fetch(`${API_BASE_URL}/session.php`, { credentials: "same-origin" });
    if (!response.ok) {
      window.location.href = "../../errors/401.html";
      return null;
    }
    const data = await response.json();
    return data.officer;
  } catch {
    window.location.href = "../../errors/401.html";
    return null;
  }
}

export function renderTopbar(officer) {
  const officerEl = document.querySelector(".topbar__officer");
  const shiftEl = document.querySelector(".topbar__shift");
  const logoutLink = document.querySelector(".topbar__status .btn--ghost");

  if (officerEl) officerEl.textContent = `${officer.name} · #${officer.badgeNumber}`;
  if (shiftEl) shiftEl.textContent = DUTY_LABELS[officer.dutyStatus] || officer.dutyStatus;

  if (logoutLink) {
    logoutLink.addEventListener("click", handleLogout);
  }
}

async function handleLogout(event) {
  event.preventDefault();
  try {
    await fetch(`${API_BASE_URL}/logout.php`, { method: "POST", credentials: "same-origin" });
  } finally {
    window.location.href = `${HTML_BASE_URL}/login/login.html`;
  }
}
