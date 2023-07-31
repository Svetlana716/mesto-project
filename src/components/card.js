import {
  popupImage,
  popupImageTitle,
  popupFullCardImage,
  config,
} from "../utils/constants.js";
import { openPopup } from "./modal.js";
import { checkReject } from "../utils/utils.js";
import Api from "./Api.js";

const api = new Api(config); // наверное создавать экземпляры класса будем уже в index.js, здесь только прописываем класс, поэтому все импорты наверное надо поудалять, как думаешь?

export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleDeleteCards,
    handleDeleteLike,
    handleAddLike
  ) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._cardLikes = data.likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; //колбэк слушателя клмка по карточ
    this._handleDeleteCards = handleDeleteCards; //колбэк слушателя клика урны
    this._handleDeleteLike = handleDeleteLike; //колбэк слушат удаления лайка
    this._handleAddLike = handleAddLike; //колбэк слушателя добавления лайка
  }
  // не забыть, что в HTML ищем не по селектору класса, а по селектору ID
  //думаю, что при создании экземпляра класса Card аргумент параметра  cardSelector нужно указывать с решеткой
  _getCard() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  //заменил объявление переменной через const на this._card
  /*_getCard () {
    this._card = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
    return this._card;
  }*/

  //проверяем, есть ли мой лайк на карточке
  //в конструкторе объявили this._cardLikes = data.likes; надо заменить?
  _likeCard(data) {
    this._isLiked = data.likes.some((like) => {
      return like._id === this._userId; //добавил return, чтобы вернуло результат
    });
    this._cardLikesCounter.textContent = this._cardLikes.length;
    if (this._isLiked) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }

  //проверяем есть ли лайки у карточки хоть чьи-то, чтобы поставить число лайков
  //в конструкторе объявили this._cardLikes = data.likes; надо заменить?
  _addLikeCounter(data) {
    if (data.likes.length > 0) {
      this._cardLikesCounter.classList.add("card__like-counter_active");
    } else {
      this._cardLikesCounter.classList.remove("card__like-counter_active");
    }
  }
  //проверка моя карточка или нет, отображение урны
  _addDeleteIcon() {
    if (this._ownerId === this._userId) {
      this._cardDeleteButton.classList.add("card__delete-button_active");
    }
  }
  //все ок
  _deleteCards() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    //слушатель кнопки лайка
    this._cardLikeButton.addEventListener("click", () => {
      this._likeCards();
      /* вместо this._likeCards() думаю сделать так:
      так как здесь в зависимоти от состояния лайка можно отправить на сервер два рзных запроса (likeCard либо disLikeCard), то надо прпописать логику с участием двух колбэков слушателя

      if (this._cardLikeButton.classList.contains('card__like-counter_active')) {
        this._handleDeleteLike(this._cardId);
      } else {
        this._handleAddLike(this._cardId);
      }

    });
    //слушатель корзины для удаления карточки
    this._cardDeleteButton.addEventListener("click", () => {
      this._deleteCards();
      /*вместо  this._deleteCards() предлагаю поставить
    this._handleDeleteCards(this._cardId)
    и в конструкторе присвоить ему значение входного параметра конструктора*/
    });
    // открытие попапа большого изображения
    this._cardImage.addEventListener("click", () => {
      this._fullCardImage();
      /*вместо  this._fullCardImage() предлагаю поставить
    this._handleCardClick(this._cardName, this._cardLink)
    и в конструкторе присвоить ему значение входного параметра конструктора,
    он кстати у тебя в параметрах конструктора уже был:)*/
    });
  }

  generate() {
    this._card = this._getCard();
    this._cardImage = this._card.querySelector(".card__image");
    this._cardTitle = this._card.querySelector(".card__title");
    this._cardLikeButton = this._card.querySelector(".card__like-button");
    this._cardDeleteButton = this._card.querySelector(".card__delete-button");
    this._cardLikesCounter = this._card.querySelector(".card__like-counter");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._addDeleteIcon(); //проверяем мы создали карточку или нет для урны
    this._addLikeCounter(); //проверяем стоят ли лайки у карточки для счетчика
    this._likeCard(); // проверяем наш лайк есть или нет для активности лайка
    this.this._cardLikesCounter.textContent = this._cardLikes.length; //двойной this - опечатка???
    this._setEventListeners();
    return this._card;
  }
}
