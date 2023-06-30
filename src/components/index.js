import { buttonOpenPopupProfile, buttonOpenPopupAddNewCard, popups, buttonsClosePopups, openProfilePopup, openNewPlacePopup, mouseHandler, closePopups } from './modal.js'
import { formProfile, formAddNewCard, handleFormProfile, handleFormAddNewCard, enableValidation } from './validate.js'
import { initialCards, renderCard } from './card.js'

buttonOpenPopupProfile.addEventListener('click', openProfilePopup);
buttonOpenPopupAddNewCard.addEventListener('click', openNewPlacePopup);
formProfile.addEventListener('submit', handleFormProfile);
formAddNewCard.addEventListener('submit', handleFormAddNewCard);

popups.forEach((item) => item.addEventListener('click', mouseHandler));
buttonsClosePopups.forEach((item) => item.addEventListener('click', closePopups));

renderCard(initialCards);
enableValidation();
