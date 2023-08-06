//поверка....

import "./index.css";
import {
  //кнопки открытия попапов
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
  selectorsAndClasses, //для валидации
  config, //для фетч запросов
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
} from "../utils/constants.js";

import { checkReject } from "../utils/utils.js";

import Api from "../components/Api.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import UserInfo from "../components/UserInfo.js";

import Card from "../components/Card.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

let userId = null;

const api = new Api(config);
/*
//валидация форм
function setValidation (formElement) {
  const formValidator = new FormValidator(selectorsAndClasses, formElement);
  formValidator.enableValidation();
};*/

//информация о пользователе
const userInfo = new UserInfo({
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
});

// попап с фотографией
const popupWithImage = new PopupWithImage(popupFullCardImageSelector);

function setProfileFormInputValues() {
  //функция для заполнения инпутов при открытии формы редактирования профиля
  const userData = userInfo.getUserInfo();

  inputUserName.value = userData.name;
  inputDescription.value = userData.about;
}

const cardList = new Section(
  {
    renderer: (data) => {
      const card = new Card(
        data,
        userInfo._userId, // из класса информация о пользователе
        cardTemplateSelector,
        {
          handleCardClick: (data) =>
            popupWithImage.openPopup(data.name, data.link), // метод из класса PopupWithImage
          handleCardDelete: () => {
            card.deleteCards();
            api.deleteCard(data._id);
          },
          handleCardLike: () => handleCardLike(card, data),
        }
      );
      const cardElement = card.generate();
      return cardElement;
    },
  },
  cardsContainerSelector
);

// рендeр страницы (отрисовка информации о пользователе и карточек)

function renderPage() {
  const profile = api.getUserInfo(); //получение информации о пользователе с сервера
  const cards = api.getInitialCards(); // получение изначальных(дабавленных раннее) карточек с сервера
  Promise.all([profile, cards]) // будет выполнен, когда будут выполнены промисы [profile, cards]
    .then((data) => {
      const [profileData, cardsData] = data;
      userId = profileData._id;
      userInfo.setUserInfo(profileData); // вызов функции setUserInfo см. выше
      cardList.renderItems(cardsData); //метод экземпляра класса Section
    })
    .catch(checkReject);
}

//функция лайка карточки
function handleCardLike(card, data) {
  const promise = card.isCardLiked()
    ? api.disLikeCard(data._id)
    : api.likeCard(data._id);
  promise
    .then((data) => {
      card.likeCard(data);
    })
    .catch(checkReject);
}

/////////////////////////////////////////////////////////////////
const popupFormEditProfile = new PopupWithForm( //экземпляр класса для открытия попапа профиля
  popupEditProfileSelector,
  (inputs) => {
    popupFormEditProfile.runLoading(true);
    api
      .editProfile(inputs.inputUserName, inputs.inputDescription)
      .then((data) => {
        userInfo.setUserInfo(data); //метод класса userInfo
        popupFormEditProfile.closePopup();
      })
      .catch(checkReject)
      .finally(() => {
        popupFormEditProfile.runLoading(false);
      });
  }
);

function openPopupEditProfile() {
  setProfileFormInputValues();
  //setValidation (formEditProfile);
  popupFormEditProfile.openPopup();
}

buttonOpenPopupEditProfile.addEventListener("click", openPopupEditProfile);
popupFormEditProfile.setEventListeners();
///////////////////////////////////////////////////////////////////////
const popupAddNewCard = new PopupWithForm(popupAddNewCardSelector, (inputs) => {
  //экземпляр класса для открытия попапа добавления карточки
  popupAddNewCard.runLoading(true);
  api
    .postNewCard(inputs.inputNameFormAddNewCard, inputs.inputLinkFormAddNewCard)
    .then((data) => {
      cardList.addItem(data);
      popupAddNewCard.closePopup();
    })
    .catch(checkReject)
    .finally(() => {
      popupAddNewCard.runLoading(false);
    });
});

function openPopupAddNewCard() {
  //setValidation (formAddNewCard);
  popupAddNewCard.openPopup();
}

buttonOpenPopupAddNewCard.addEventListener("click", openPopupAddNewCard);
popupAddNewCard.setEventListeners();

/////////////////////ГОТОВО///////////////////////
const popupFormEditAvatar = new PopupWithForm( //экземпляр класса для открытия попапа аватара
  popupEditAvatarSelector,
  (inputs) => {
    popupFormEditAvatar.runLoading(true);
    api
      .editAvatar(inputs)
      .then((data) => {
        userInfo.setUserInfo(data); //метод класса userInfo
        popupFormEditAvatar.closePopup();
      })
      .catch(checkReject)
      .finally(() => {
        popupFormEditAvatar.runLoading(false);
      });
  }
);

function openPopupEditAvatar() {
  //setValidation (formEditAvatar);
  popupFormEditAvatar.openPopup();
}

buttonOpenPopupEditAvatar.addEventListener("click", openPopupEditAvatar);
popupFormEditAvatar.setEventListeners();
////////////////////////////////////////////////////////////////////////////

//_______________________________валидация форм_______________________

const formEditProfileValidator = new FormValidator(
  { selectorsAndClasses },
  formEditProfile
);

const formEditAvatarValidator = new FormValidator(
  { selectorsAndClasses },
  formEditAvatar
);

const formAddNewCardValidator = new FormValidator(
  { selectorsAndClasses },
  formAddNewCard
);
formAddNewCardValidator.enableValidation();
formEditProfileValidator.enableValidation();
formEditAvatarValidator.enableValidation();
renderPage();
