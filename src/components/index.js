import '../pages/index.css';
import { buttonOpenPopupProfile, buttonOpenPopupAddNewCard, popups, buttonsClosePopups, formProfile, formAddNewCard, selectors, popupProfile, popupAddNewCard, inputUserName, inputDescription, inputNameFormAddNewCard, inputlinkFormAddNewCard, profileName, profileDescription } from './utils.js'
import { mouseHandler, closePopups, openPopup } from './modal.js'
import { validateInputs, enableValidation } from './validate.js'
import { renderCard, createCard, cardsList } from './card.js'
import { initialCards } from './cards.js'

function setInputValue() {
  inputUserName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
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

buttonOpenPopupProfile.addEventListener('click', openProfilePopup);
buttonOpenPopupAddNewCard.addEventListener('click', openNewPlacePopup);
formProfile.addEventListener('submit', handleFormProfile);
formAddNewCard.addEventListener('submit', handleFormAddNewCard);

popups.forEach((item) => item.addEventListener('click', mouseHandler));
buttonsClosePopups.forEach((item) => item.addEventListener('click', closePopups));

renderCard(initialCards);
enableValidation(selectors);
