const alertEl = document.querySelector('.alert');
const alertBar = document.querySelector('.alert__bar');
const alertSuccessIcon = document.querySelector('.alert__icon--success');
const alertErrorIcon = document.querySelector('.alert__icon--error');
const alertTextEl = document.querySelector('.alert__text');
const alertCancelBtn = document.querySelector('.alert__cancel-btn');

const sidebarAlertEl = document.querySelector('.sidebar-alert');
const sidebarBar = document.querySelector('.sidebar-alert__bar');
const sidebarAlertSuccessIcon = document.querySelector(
  '.sidebar-alert__icon--success'
);
const sidebarAlertErrorIcon = document.querySelector(
  '.sidebar-alert__icon--error'
);
const sidebarAlertTextEl = document.querySelector('.sidebar-alert__text');
const sidebarAlertCancelBtn = document.querySelector(
  '.sidebar-alert__cancel-btn'
);
// might need to remove previous alert timeout in order for new alerts to stay active for specified time
// otherwise, alert will 'catch' tail end of previous alert setTimeout that removes 'display' classes

alertCancelBtn.onclick = removeAlert;
if (sidebarAlertCancelBtn) sidebarAlertCancelBtn.onclick = removeSidebarAlert;
export function activateAlert(msg, isSuccess) {
  alertTextEl.textContent = msg;
  alertEl.style.display = 'flex';
  if (isSuccess) {
    alertBar.classList.add('alert__bar--success');
    alertSuccessIcon.style.display = 'block';
  } else {
    alertBar.classList.add('alert__bar--error');
    alertErrorIcon.style.display = 'block';
  }
  setTimeout(() => removeAlert(), 3000);
}
function removeAlert() {
  alertEl.style.display = 'none';
  alertBar.classList.remove('alert__bar--success', 'alert__bar--failure');
  alertSuccessIcon.style.display = 'none';
  alertErrorIcon.style.display = 'none';
}
export function activateSidebarAlert(msg, isSuccess) {
  sidebarAlertTextEl.textContent = msg;
  sidebarAlertEl.style.display = 'flex';

  if (isSuccess) {
    sidebarBar.classList.add('sidebar-alert__bar--success');
    sidebarAlertSuccessIcon.style.display = 'block';
  } else {
    sidebarBar.classList.add('alert__bar--error');
    sidebarAlertErrorIcon.style.display = 'block';
  }
  setTimeout(() => removeSidebarAlert(), 3000);
}
function removeSidebarAlert() {
  sidebarAlertEl.style.display = 'none';
  sidebarBar.classList.remove(
    '.sidebar-alert__bar--success',
    '.sidebar-alert__bar--error'
  );
  sidebarAlertSuccessIcon.style.display = 'none';
  sidebarAlertErrorIcon.style.display = 'none';
}
