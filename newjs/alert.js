const popup = document.querySelector('.popup');
const popupIcon = document.querySelector('.popup__icon');
const popupText = document.querySelector('.popup__text');

// might need to remove previous alert timeout in order for new alerts to stay active for specified time
// otherwise, alert will 'catch' tail end of previous alert setTimeout that removes 'display' classes
export function activateAlert(msg, isSuccess) {
  popupText.textContent = msg;
  popup.style.display = 'flex';
  if (isSuccess) {
    popup.classList.add('popup--success');
    popupIcon.classList.add('fa-check-circle', 'popup__icon--success');
  } else {
    popup.classList.add('popup--failure');
    popupIcon.classList.add('fa-ban', 'popup__icon--failure');
  }
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('popup--success', 'popup--failure');
    popupIcon.classList.remove(
      'fa-check-circle',
      'popup__icon--success',
      'fa-ban',
      'popup__icon--failure'
    );
  }, 3000);
}
