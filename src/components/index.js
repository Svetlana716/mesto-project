import '../pages/index.css';
import { buttonOpenPopupProfile, buttonOpenPopupAddNewCard, popups, buttonsClosePopups, openProfilePopup, openNewPlacePopup, mouseHandler, closePopups, formProfile, formAddNewCard, handleFormProfile, handleFormAddNewCard } from './modal.js'
import { enableValidation } from './validate.js'
import { initialCards, renderCard } from './card.js'

const selectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

buttonOpenPopupProfile.addEventListener('click', openProfilePopup);
buttonOpenPopupAddNewCard.addEventListener('click', openNewPlacePopup);
formProfile.addEventListener('submit', handleFormProfile);
formAddNewCard.addEventListener('submit', handleFormAddNewCard);

popups.forEach((item) => item.addEventListener('click', mouseHandler));
buttonsClosePopups.forEach((item) => item.addEventListener('click', closePopups));

renderCard(initialCards);
enableValidation(selectors);

export { selectors };
