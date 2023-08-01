export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    {handleCardClick, handleDeleteCards, handleDeleteLike, handleAddLike}
  ) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._cardLikes = data.likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; //колбэк слушателя клика по карточке
    this._handleDeleteCards = handleDeleteCards; //колбэк слушателя клика урны
    this._handleDeleteLike = handleDeleteLike; //колбэк слушателя удаления лайка
    this._handleAddLike = handleAddLike; //колбэк слушателя добавления лайка
  }

  _getCard() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  //проверяем, есть ли мой лайк на карточке
  _likeCard() {
    this._isLiked = this._cardLikes.some((like) => {
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
  _addLikeCounter() {
    if (this._cardLikes.length > 0) {
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
  deleteCards() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    //слушатель кнопки лайка
    this._cardLikeButton.addEventListener("click", () => {
      if (this._cardLikeButton.classList.contains('card__like-counter_active')) {
        this._handleDeleteLike(this._cardId);
      } else {
        this._handleAddLike(this._cardId);
      }
    });
    //слушатель корзины для удаления карточки
    this._cardDeleteButton.addEventListener("click", () => {
    this._handleDeleteCards(this._cardId)
    });
    // открытие попапа большого изображения
    this._cardImage.addEventListener("click", () => {
    this._handleCardClick(this._cardName, this._cardLink)
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
    this._cardLikesCounter.textContent = this._cardLikes.length;
    this._addDeleteIcon(); //проверяем мы создали карточку или нет для урны
    this._addLikeCounter(); //проверяем стоят ли лайки у карточки для счетчика
    this._likeCard(); // проверяем наш лайк есть или нет для активности лайка
    this._setEventListeners();
    return this._card;
  }
}

///////////////////////////////////////////////////////////////
// создание экземпляяра классса card  в index.js

function createCard (data) {
  const card = new Card(
    data,
    userInfo.userId, // из класса информация о пользователе
    '#card', {
    handleCardClick: data => popupImage.open(data), // метод из класса popupImage
    handleCardDelete: () => {
      card.deleteCards();
      api.deleteCard(data._id);
    },
    handleAddLike: () => api.likeCard(data._id),
    handleDeleteLike: () => api.disLikeCard(data._id)
  });
  return card;
};
