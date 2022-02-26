const popup = document.querySelector('.popup');
const popupIcon = document.querySelector('.popup__icon');
const popupText = document.querySelector('.popup__text');

// these can be a single function --with a single arg that determines success or failure

// success check: fa-check-circle
// faulure check:  fa-ban
function activateSuccessPopup(message) {
  popupText.textContent = message;
  popup.classList.add('popup--success');
  popupIcon.classList.add('fa-check-circle', 'popup__icon--success');
  popup.style.display = 'flex';
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('popup--success');
    popupIcon.classList.remove('fa-check-circle', 'popup__icon--success');
  }, 3000);
}

function activateFailurePopup(message) {
  popupText.textContent = message;
  popup.classList.add('popup--failure');
  popupIcon.classList.add('fa-ban', 'popup__icon--failure');
  popup.style.display = 'flex';
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('popup--failure');
    popupIcon.classList.remove('fa-ban', 'popup__icon--failure');
  }, 3000);
}
