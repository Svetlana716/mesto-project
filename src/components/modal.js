import { openPopup, closePopup } from './utils.js'
import { createCard, cardsList } from './card.js'
import { isValid, toggleButtonState } from './validate.js'
import { selectors } from './index.js'

const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__user-name');
const profileDescription = document.querySelector('.profile__description');

const formProfile = document.querySelector('.form_type_profile');
const inputUserName = formProfile.querySelector('.form__input_el_user-name');
const inputDescription = formProfile.querySelector('.form__input_el_description');

const popupAddNewCard = document.querySelector('.popup_type_add-new-card');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');

const formAddNewCard = document.querySelector('.form_type_add-new-card');
const inputNameFormAddNewCard = document.querySelector('.form__input_el_place-name');
const inputlinkFormAddNewCard = document.querySelector('.form__input_el_image-URL');

const popupFullImage = document.querySelector('.popup_type_full-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

const buttonsClosePopups = document.querySelectorAll('.popup__close-button');

function setInputValue() {
  inputUserName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function validateInputs(inputList, selectors) {
  inputList.forEach((input) => {
      const form = input.closest(selectors.formSelector);
      const button = form.querySelector(selectors.submitButtonSelector);
      toggleButtonState(inputList, button, selectors);
      isValid(form, input, selectors);
  })
}

function openProfilePopup(evt) {
  evt.preventDefault();
  openPopup(popupProfile);
  setInputValue();
  validateInputs([inputUserName, inputDescription], selectors);
};

function openNewPlacePopup(evt) {
  evt.preventDefault();
  openPopup(popupAddNewCard);
  validateInputs([inputNameFormAddNewCard, inputlinkFormAddNewCard], selectors);
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

function handleFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileDescription.textContent = inputDescription.value;
  closePopups(evt);
};

function handleFormAddNewCard(evt) {
  evt.preventDefault();

  const cardItemValue = {
    link: inputlinkFormAddNewCard.value,
    name: inputNameFormAddNewCard.value,
    alt: inputNameFormAddNewCard.value,
  };

  const formCard = createCard(cardItemValue);
  cardsList.prepend(formCard);

  formAddNewCard.reset();
  closePopups(evt);
};

export {buttonOpenPopupProfile, buttonOpenPopupAddNewCard, popups, buttonsClosePopups, openProfilePopup, openNewPlacePopup, mouseHandler, closePopups, keyHandler, popupImage, popupImageTitle, popupFullImage, profileName, profileDescription, formProfile, formAddNewCard, handleFormProfile, handleFormAddNewCard };
