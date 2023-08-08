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

  selectorsAndClasses, //для валидации
  config, //для фетч запросов
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

//экземпляр класса информации о пользователе
const userInfo = new UserInfo({
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
});

//экземпляр класса попапа с фотографией
const popupWithImage = new PopupWithImage(popupFullCardImageSelector);

const cardList = new Section( //экземпляр класса секции
  {
    renderer: (data) => {
      const card = new Card( //экземпляр класса карточки
        data,
        userInfo._userId, // из класса информация о пользователе
        cardTemplateSelector,
        {
          handleCardClick: () => handleCardClick(data),
          handleCardDelete: () => handleCardDelete(card, data),
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
};

//функция для заполнения инпутов при открытии формы редактирования профиля
function setProfileFormInputValues() {
  const userData = userInfo.getUserInfo();

  inputUserName.value = userData.name;
  inputDescription.value = userData.about;
};

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
};

//функция открытия попапа картинки
function handleCardClick(data) {
  popupWithImage.openPopup(data);
};

//функция удаления карточки
function handleCardDelete(card, data) {
  api.deleteCard(data._id)
  .then((data) => {
    card.deleteCards(data);
  })
  .catch(checkReject);
};

//экземпляр класса для открытия попапа профиля
const popupFormEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  (inputs) => {
    popupFormEditProfile.runLoading(true);
    api
      .editProfile(inputs)
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

//экземпляр класса для открытия попапа добавления карточки
const popupAddNewCard = new PopupWithForm(
  popupAddNewCardSelector,
  (inputs) => {
  popupAddNewCard.runLoading(true);
  api
    .postNewCard(inputs)
    .then((data) => {
      cardList.addItem(data);
      popupAddNewCard.closePopup();
    })
    .catch(checkReject)
    .finally(() => {
      popupAddNewCard.runLoading(false);
    });
}
);

//экземпляр класса для открытия попапа аватара
const popupFormEditAvatar = new PopupWithForm(
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

function openPopupEditProfile() {
  setProfileFormInputValues();
  popupFormEditProfile.openPopup();
};

function openPopupAddNewCard() {
  popupAddNewCard.openPopup();
};

function openPopupEditAvatar() {
  popupFormEditAvatar.openPopup();
}

buttonOpenPopupEditProfile.addEventListener("click", openPopupEditProfile);
buttonOpenPopupAddNewCard.addEventListener("click", openPopupAddNewCard);
buttonOpenPopupEditAvatar.addEventListener("click", openPopupEditAvatar);

popupWithImage.setEventListeners();
popupFormEditProfile.setEventListeners();
popupAddNewCard.setEventListeners();
popupFormEditAvatar.setEventListeners();
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
