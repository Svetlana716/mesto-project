import './index.css';
import {buttonOpenPopupEditProfile,
        buttonOpenPopupAddNewCard,
        popups,
        buttonsClosePopups,
        formEditProfile,
        formAddNewCard,
        selectorsAndClasses,
        popupEditProfile,
        popupAddNewCard,
        inputUserName,
        inputDescription,
        inputNameFormAddNewCard,
        inputLinkFormAddNewCard,
        profileName,
        profileDescription,
        profileAvatar,
        popupEditAvatar,
        buttonOpenPopupEditAvatar,
        formEditAvatar,
        inputLinkFormEditAvatar,
        config } from '../utils/constants.js'
import { mouseHandler, closePopups, openPopup } from '../components/modal.js'
import { validateInputs, enableValidation } from '../components/FormValidator.js'
import { renderNewCard, renderInitialCards } from '../components/Section.js'
import { checkReject } from '../utils/utils.js'
import  Api from '../components/Api.js'

const api = new Api(config);
let userId = null;

function showUserInfo (data) {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.style.backgroundImage = `url("${data.avatar}")`;
};

function renderPage () {
  const profile = api.getUserInfo();
  const cards = api.getInitialCards();
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
  validateInputs([inputUserName, inputDescription], selectorsAndClasses);
  openPopup(popupEditProfile);
};

function openPopupAddNewCard(evt) {
  evt.preventDefault();
  validateInputs([inputNameFormAddNewCard, inputLinkFormAddNewCard], selectorsAndClasses);
  openPopup(popupAddNewCard);
};

function openPopupEditAvatar(evt) {
  evt.preventDefault();
  validateInputs([inputLinkFormEditAvatar], selectorsAndClasses);
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
  api.editProfile({
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
  api.editAvatar({
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
  api.postNewCard({
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

enableValidation(selectorsAndClasses);
renderPage();
