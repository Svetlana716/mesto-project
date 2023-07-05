export const popups = document.querySelectorAll('.popup');

export const popupProfile = document.querySelector('.popup_type_profile');
export const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__user-name');
export const profileDescription = document.querySelector('.profile__description');

export const formProfile = document.querySelector('.form_type_profile');
export const inputUserName = formProfile.querySelector('.form__input_el_user-name');
export const inputDescription = formProfile.querySelector('.form__input_el_description');

export const popupAddNewCard = document.querySelector('.popup_type_add-new-card');
export const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');

export const formAddNewCard = document.querySelector('.form_type_add-new-card');
export const inputNameFormAddNewCard = formAddNewCard.querySelector('.form__input_el_place-name');
export const inputlinkFormAddNewCard = formAddNewCard.querySelector('.form__input_el_image-URL');

export const popupFullImage = document.querySelector('.popup_type_full-image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageTitle = document.querySelector('.popup__image-title');

export const buttonsClosePopups = document.querySelectorAll('.popup__close-button');

export const selectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};
