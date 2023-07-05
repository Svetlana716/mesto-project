export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
};

export function closePopups(evt) {
  evt.preventDefault();
  closePopup(evt.target.closest('.popup'));
};

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
};

export function mouseHandler(evt) {
  if (evt.currentTarget === evt.target) {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
};
