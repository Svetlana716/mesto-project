import { openPopup, closePopup } from './utils.js'
import { inputUserName, inputDescription } from './validate.js'

const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__user-name');
const profileDescription = document.querySelector('.profile__description');

const popupAddNewCard = document.querySelector('.popup_type_add-new-card');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');

const popupFullImage = document.querySelector('.popup_type_full-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

const buttonsClosePopups = document.querySelectorAll('.popup__close-button');

function openProfilePopup(evt) {
  evt.preventDefault();
  openPopup(popupProfile);
  inputUserName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

};

function openNewPlacePopup(evt) {
  evt.preventDefault();
  openPopup(popupAddNewCard);
};

function closePopups (evt) {
  evt.preventDefault();
  closePopup(evt.target.closest('.popup'));
};

function keyHandler (evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    })
  }
};

function mouseHandler (evt) {
  if (evt.currentTarget === evt.target) {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    })
  }
};

export {buttonOpenPopupProfile, buttonOpenPopupAddNewCard, popups, buttonsClosePopups, openProfilePopup, openNewPlacePopup, mouseHandler, closePopups, keyHandler, popupImage, popupImageTitle, popupFullImage, profileName, profileDescription, };
