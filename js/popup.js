const popup = document.querySelector('.popup');
const popupIcon = document.querySelector('.popup__icon');
const popupText = document.querySelector('.popup__text');

// these can be a single function --with a single arg that determines success or failure 
function activateSuccessPopup() {
  popup.classList.add('popup--success');
  popupIcon.classList.add('popup__icon--success');
  popup.style.display = 'flex';
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('popup--success');
  popupIcon.classList.remove('popup__icon--success');
  }, 3000);
};

function activateFailurePopup() {
  popup.classList.add('popup--failure');
  popupIcon.classList.add('popup__icon--failure');
  popup.style.display = 'flex';
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('popup--failure');
  popupIcon.classList.remove('popup__icon--failure');
  }, 3000);
};






