export const popups = document.querySelectorAll('.popup');

export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-profile-button');
export const profileName = document.querySelector('.profile__user-name');
export const profileDescription = document.querySelector('.profile__description');

export const formEditProfile = document.querySelector('.form_type_edit-profile');
export const inputUserName = formEditProfile.querySelector('.form__input_el_user-name');
export const inputDescription = formEditProfile.querySelector('.form__input_el_description');

export const popupAddNewCard = document.querySelector('.popup_type_add-new-card');
export const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-card-button');

export const formAddNewCard = document.querySelector('.form_type_add-new-card');
export const inputNameFormAddNewCard = formAddNewCard.querySelector('.form__input_el_place-name');
export const inputLinkFormAddNewCard = formAddNewCard.querySelector('.form__input_el_image-URL');

export const profileAvatar = document.querySelector('.profile__avatar');
export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const buttonOpenPopupEditAvatar = document.querySelector('.profile__edit-avatar-button');

export const formEditAvatar = document.querySelector('.form_type_edit-avatar');
export const inputLinkFormEditAvatar = formEditAvatar.querySelector('.form__input_el_avatar-URL');

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
