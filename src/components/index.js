import '../pages/index.css';
import { buttonOpenPopupEditProfile, buttonOpenPopupAddNewCard, popups, buttonsClosePopups, formEditProfile, formAddNewCard, selectors, popupEditProfile, popupAddNewCard, inputUserName, inputDescription, inputNameFormAddNewCard, inputlinkFormAddNewCard, profileName, profileDescription, profileAvatar, popupEditAvatar, buttonOpenPopupEditAvatar, formEditAvatar, inputlinkFormEditAvatar } from './utils.js'
import { mouseHandler, closePopups, openPopup } from './modal.js'
import { validateInputs, enableValidation } from './validate.js'
import { renderNewCard, renderInitialCards } from './card.js'
import { getUserInfo, getInitialCards, editProfile, editAvatar, postNewCard } from './api.js'

let userId = null;

function showUserInfo (data) {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.style.backgroundImage = `url("${data.avatar}")`;
};

function renderPage () {
  const profile = getUserInfo();
  const cards = getInitialCards();
  Promise.all([profile, cards])
  .then((data) => {
    const [profileData, cardsData] = data;
    userId = profileData._id;
    showUserInfo(profileData);
    renderInitialCards(cardsData, userId);
  })
}

function setInputValue() {
  inputUserName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function openPopupEditProfile(evt) {
  evt.preventDefault();
  openPopup(popupEditProfile);
  setInputValue();
  validateInputs([inputUserName, inputDescription], selectors);
};

function openPopupAddNewCard(evt) {
  evt.preventDefault();
  openPopup(popupAddNewCard);
  validateInputs([inputNameFormAddNewCard, inputlinkFormAddNewCard], selectors);
};

function openPopupEditAvatar(evt) {
  evt.preventDefault();
  openPopup(popupEditAvatar);
  validateInputs([inputlinkFormEditAvatar], selectors);
}

function runLoading (isLoading, form) {
  const button = form.querySelector('.form__submit-button');
  const spinner = form.querySelector('.form__spinner');
  if (isLoading) {
    button.textContent = spinner.textContent;
  } else {
    button.textContent = button.value;
  }
};

function handleFormEditProfile(evt) {
  evt.preventDefault();
  runLoading (true, formEditProfile);
  editProfile({
    name: inputUserName.value,
    about: inputDescription.value,
  })
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  .finally(() => {
    runLoading (false, formEditProfile);
  })
  closePopups(evt);
};

function handleFormEditAvatar(evt) {
  evt.preventDefault();
  runLoading (true, formEditAvatar);
  editAvatar({
    avatar: inputlinkFormEditAvatar.value,
  })
  .then((data) => {
    profileAvatar.style.backgroundImage = `url("${data.avatar}")`;
  })
  .finally(() => {
    runLoading (false, formEditAvatar);
  })
  formEditAvatar.reset();
  closePopups(evt);
};

function handleFormAddNewCard(evt) {
  evt.preventDefault();
  runLoading (true, formAddNewCard);
  postNewCard({
    name: inputNameFormAddNewCard.value,
    link: inputlinkFormAddNewCard.value,
  })
  .then((data) => {
    renderNewCard(data, userId);
  })
  .finally(() => {
    runLoading (false, formAddNewCard);
  })
  formAddNewCard.reset();
  closePopups(evt);
};

buttonOpenPopupEditProfile.addEventListener('click', openPopupEditProfile);
buttonOpenPopupAddNewCard.addEventListener('click', openPopupAddNewCard);
buttonOpenPopupEditAvatar.addEventListener('click', openPopupEditAvatar);

formEditProfile.addEventListener('submit', handleFormEditProfile);
formAddNewCard.addEventListener('submit', handleFormAddNewCard);
formEditAvatar.addEventListener('submit', handleFormEditAvatar);

popups.forEach((item) => item.addEventListener('mousedown', mouseHandler));
buttonsClosePopups.forEach((item) => item.addEventListener('click', closePopups));

enableValidation(selectors);
renderPage();
