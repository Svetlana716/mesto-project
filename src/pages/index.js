import './index.css';
import {//кнопки открытия попапов
        buttonOpenPopupEditProfile,
        buttonOpenPopupAddNewCard,
        buttonOpenPopupEditAvatar,
        //формы
        formEditProfile,
        formAddNewCard,
        formEditAvatar,
        //инпуты
        inputUserName,
        inputDescription,
        /* inputNameFormAddNewCard,
        inputLinkFormAddNewCard,
        inputLinkFormEditAvatar, */
        //
        selectorsAndClasses,//для валидации
        config,//для фетч запросов
        //selectors
        profileNameSelector,
        profileDescriptionSelector,
        profileAvatarSelector,
        cardsContainerSelector,
        cardTemplateSelector,
        popupFullCardImageSelector,
        popupEditProfileSelector,
        popupAddNewCardSelector,
        popupEditAvatarSelector,
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

//валидация форм
function setValidation (formElement) {
  const formValidator = new FormValidator(selectorsAndClasses, formElement);
  formValidator.enableValidation();
};

const userInfo = new UserInfo({profileNameSelector, profileDescriptionSelector, profileAvatarSelector});

function setProfileFormInputValues() { //функция для заполнения инпутов при открытии формы редактирования профиля
  const userData = userInfo.getUserInfo();

  inputUserName.value = userData.name;
  inputDescription.value = userData.about;
};

const cardList = new Section({
  renderer: (cardItem) => {
    const card = createCard(cardItem);
    const cardElement = card.generate();
    return cardElement;
  }
  },
  cardsContainerSelector);

// рендeр страницы (отрисовка информации о пользователе и карточек)

function renderPage () {
  const profile = api.getUserInfo();  //получение информации о пользователе с сервера
  const cards = api.getInitialCards(); // получение изначальных(дабавленных раннее) карточек с сервера
  Promise.all([profile, cards]) // будет выполнен, когда будут выполнены промисы [profile, cards]
  .then((data) => {
    const [profileData, cardsData] = data;
    userId = profileData._id;
    userInfo.setUserInfo(profileData) // вызов функции setUserInfo см. выше
    cardList.renderItems(cardsData)  //метод экземпляра класса Section
  })
  .catch(checkReject)
};

// попап с фотографией
const popupWithImage = new PopupWithImage(popupFullCardImageSelector);

// функция создания карточки
function createCard (data) {
  const card = new Card(
    data,
    userInfo._userId, // из класса информация о пользователе
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
//это я пытаюсь вынести логику постановки и снятия лайка в отдельную функцию

/* function handleLike()  {
  if (this._cardLikeButton.classList.contains('card__like-counter_active')) {
    this._handleDeleteLike(this._cardId);
  } else {
    this._handleAddLike(this._cardId);
  }
}; */

/////////////////////////////////////////////////////////////////
const popupFormEditProfile = new PopupWithForm( //экземпляр класса для открытия попапа профиля
  popupEditProfileSelector,
  (inputs) => {
    popupFormEditProfile.runLoading (true);
  api
    .editProfile(inputs.inputUserName, inputs.inputDescription)
    .then((data) => {
      userInfo.setUserInfo(data); //метод класса userInfo
      popupFormEditProfile.closePopup();
    })
    .catch(checkReject)
    .finally(() => {
      popupFormEditProfile.runLoading (false);
    });
});

function openPopupEditProfile() {
  setProfileFormInputValues();
  setValidation (formEditProfile);
  popupFormEditProfile.openPopup();
};

buttonOpenPopupEditProfile.addEventListener('click', openPopupEditProfile);
popupFormEditProfile.setEventListeners();
///////////////////////////////////////////////////////////////////////
const popupAddNewCard = new PopupWithForm( //экземпляр класса для открытия попапа добавления карточки
popupAddNewCardSelector,
  (inputs) => {
    popupAddNewCard.runLoading (true);
  api
    .postNewCard(inputs.inputNameFormAddNewCard, inputs.inputLinkFormAddNewCard)
    .then((data) => {
      cardList.addItem(data)
      popupAddNewCard.closePopup();
    })
    .catch(checkReject)
    .finally(() => {
      popupAddNewCard.runLoading (false);
    });
});

function openPopupAddNewCard() {
  setValidation (formAddNewCard);
  popupAddNewCard.openPopup();
};

buttonOpenPopupAddNewCard.addEventListener('click', openPopupAddNewCard);
popupAddNewCard.setEventListeners();

////////////////////////////////////////////////////////////
const popupFormEditAvatar = new PopupWithForm( //экземпляр класса для открытия попапа аватара
  popupEditAvatarSelector,
  (inputs) => {
    popupFormEditAvatar.runLoading (true);
  api
    .editAvatar(inputs.inputLinkFormEditAvatar)
    .then((data) => {
      userInfo.setUserInfo(data); //метод класса userInfo
      popupFormEditAvatar.closePopup();
    })
    .catch(checkReject)
    .finally(() => {
      popupFormEditAvatar.runLoading (false);
    });
});

function openPopupEditAvatar() {
  setValidation (formEditAvatar);
  popupFormEditAvatar.openPopup();
};

buttonOpenPopupEditAvatar.addEventListener('click', openPopupEditAvatar);
popupFormEditAvatar.setEventListeners();
////////////////////////////////////////////////////////////////////////////

/* enableValidation(selectorsAndClasses);*/
renderPage();
