import './index.css';
import {buttonOpenPopupEditProfile,
        buttonOpenPopupAddNewCard,
        formEditProfile,
        formAddNewCard,
        selectorsAndClasses,
        popupEditProfile,
        popupAddNewCard,
        inputUserName,
        inputDescription,
        inputNameFormAddNewCard,
        inputLinkFormAddNewCard,
        popupEditAvatar,
        buttonOpenPopupEditAvatar,
        formEditAvatar,
        inputLinkFormEditAvatar,
        config,
        //selectors
        profileNameSelector,
        profileDescriptionSelector,
        profileAvatarSelector,
        cardsContainerSelector,
        cardTemplateSelector,
        popupFullCardImageSelector,
      } from '../utils/constants.js'
import { checkReject } from '../utils/utils.js'

import Api from '../components/Api.js';

import FormValidator from '../components/FormValidator.js';

import Section from '../components/Section.js';

import UserInfo from '../components/UserInfo.js';

import Card from '../components/Card.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

let userId = null;

const api = new Api(config);

const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector, profileAvatarSelector);

function setProfileFormInputValues() { //функция для заполнения инпутов при открытии формы редактирования профиля
  const userData = userInfo.getUserInfo();

  inputUserName.value = userData.name;
  inputDescription.value = userData.about;
};

function setUserInfo (data) { // добавляет новые данные пользователя на страницу
  const userData = userInfo.setUserInfo(data); //метод экземпляра класса UserInfo для обновления информации о профиле

  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url("${userData.avatar}")`;
};

const cardList = new Section({
  initialArray: cardsData,
  renderer: (cardItem) => {
    const card = createCard(cardItem);
    const cardElement = card.generate();
    return cardElement;
  },
  cardsContainerSelector
});

// рендер страницы (отрисовка информации о пользователе и карточек)

function renderPage () {
  const profile = api.getUserInfo();  //получение информации о пользователе с сервера
  const cards = api.getInitialCards(); // получение изначальных(дабавленных раннее) карточек с сервера
  Promise.all([profile, cards]) // будет выполнен, когда будут выполнены промисы [profile, cards]
  .then((data) => {
    const [profileData, cardsData] = data;
    setUserInfo(profileData); // вызов функции setUserInfo см. выше
    cardList.renderItems(cardsData);  //метод экземпляра класса Section
  })
  .catch(checkReject)
};

// попап с фотографией
const popupWithImage = new PopupWithImage(popupFullCardImageSelector);

function createCard (data) {
  const card = new Card(
    data,
    userInfo.userId, // из класса информация о пользователе
    cardTemplateSelector, {
    handleCardClick: data => popupWithImage.openPopup(data.name, data.link), // метод из класса PopupWithImage
    handleCardDelete: () => {
      card.deleteCards();
      api.deleteCard(data._id);
    },
    handleAddLike: () => api.likeCard(data._id),
    handleDeleteLike: () => api.disLikeCard(data._id)
  });
  return card;
};

const popupFormEditProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  (inputs) => {
    runLoading (true, formEditProfile);
  api
    .editProfile(inputs.inputUserName, inputs.inputDescription)
    .then((data) => {
      userInfo.setUserInfo(data); //метод класса userInfo
      popupFormEditProfile.close();
    })
    .catch(checkReject)
    .finally(() => {
      runLoading (false, formEditProfile);
    });
});

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

enableValidation(selectorsAndClasses);
renderPage();
