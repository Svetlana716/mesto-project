import '../pages/index.css';
import { buttonOpenPopupEditProfile, buttonOpenPopupAddNewCard, popups, buttonsClosePopups, formEditProfile, formAddNewCard, selectors, popupEditProfile, popupAddNewCard, inputUserName, inputDescription, inputNameFormAddNewCard, inputLinkFormAddNewCard, profileName, profileDescription, profileAvatar, popupEditAvatar, buttonOpenPopupEditAvatar, formEditAvatar, inputLinkFormEditAvatar } from './utils.js'
import { mouseHandler, closePopups, openPopup } from './modal.js'
import { validateInputs, enableValidation } from './validate.js'
import { renderNewCard, renderInitialCards } from './card.js'
import { getUserInfo, getInitialCards, editProfile, editAvatar, postNewCard, checkReject } from './api.js'

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
  .catch(checkReject)
}

function setProfileFormInputValues() {
  inputUserName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function openPopupEditProfile(evt) {
  evt.preventDefault();
  setProfileFormInputValues();
  validateInputs([inputUserName, inputDescription], selectors);
  openPopup(popupEditProfile);
};

function openPopupAddNewCard(evt) {
  evt.preventDefault();
  validateInputs([inputNameFormAddNewCard, inputLinkFormAddNewCard], selectors);
  openPopup(popupAddNewCard);
};

function openPopupEditAvatar(evt) {
  evt.preventDefault();
  validateInputs([inputLinkFormEditAvatar], selectors);
  openPopup(popupEditAvatar);
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
    closePopups(evt);
  })
  .catch(checkReject)
  .finally(() => {
    runLoading (false, formEditProfile);
  })
};

function handleFormEditAvatar(evt) {
  evt.preventDefault();
  runLoading (true, formEditAvatar);
  editAvatar({
    avatar: inputLinkFormEditAvatar.value,
  })
  .then((data) => {
    profileAvatar.style.backgroundImage = `url("${data.avatar}")`;
    formEditAvatar.reset();
    closePopups(evt);
  })
  .catch(checkReject)
  .finally(() => {
    runLoading (false, formEditAvatar);
  })

};

function handleFormAddNewCard(evt) {
  evt.preventDefault();
  runLoading (true, formAddNewCard);
  postNewCard({
    name: inputNameFormAddNewCard.value,
    link: inputLinkFormAddNewCard.value,
  })
  .then((data) => {
    renderNewCard(data, userId);
    formAddNewCard.reset();
    closePopups(evt);
  })
  .catch(checkReject)
  .finally(() => {
    runLoading (false, formAddNewCard);
  })
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
