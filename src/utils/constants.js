//кнопки открытия попапов
export const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-profile-button');
export const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-card-button');
export const buttonOpenPopupEditAvatar = document.querySelector('.profile__edit-avatar-button');
//формы
export const formEditProfile = document.querySelector('.form_type_edit-profile');
export const formAddNewCard = document.querySelector('.form_type_add-new-card');
export const formEditAvatar = document.querySelector('.form_type_edit-avatar');
//инпуты
export const inputUserName = formEditProfile.querySelector('.form__input_el_user-name');
export const inputDescription = formEditProfile.querySelector('.form__input_el_description');

/* export const inputNameFormAddNewCard = formAddNewCard.querySelector('.form__input_el_place-name');
export const inputLinkFormAddNewCard = formAddNewCard.querySelector('.form__input_el_image-URL');
export const inputLinkFormEditAvatar = formEditAvatar.querySelector('.form__input_el_avatar-URL'); */

//селекторы
export const profileNameSelector = '.profile__user-name';
export const profileDescriptionSelector = '.profile__description';
export const profileAvatarSelector = '.profile__avatar';
export const cardsContainerSelector = '.cards__list';
export const cardTemplateSelector = '#card';
export const popupFullCardImageSelector = '.popup_type_full-image';
export const popupEditProfileSelector = '.popup_type_edit-profile';
export const popupAddNewCardSelector = '.popup_type_add-new-card';
export const popupEditAvatarSelector = '.popup_type_edit-avatar';

export const selectorsAndClasses = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '61d49f57-4ce9-4c25-b8be-be0fabbb76d9',
    'Content-Type': 'application/json'
  }
};
