import { keyHandler } from './modal.js'

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like_active');
};

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

export {openPopup, closePopup, likeCard, deleteCard};
