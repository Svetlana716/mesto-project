export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    {handleCardClick, handleDeleteCards, handleCardLike}
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
    this._handleCardLike = handleCardLike; //колбэк слушателя добавления и удаления лайка
  }

  _getCard() { // получаем разметку карточки
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  //проверяем есть ли лайки у карточки хоть чьи-то, чтобы поставить число лайков
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

  _addLikeBtnAndCounterState () { //состояние кнопки и счетчика лайка
    if (this._cardLikes.length > 0) {
      this._cardLikesCounter.classList.add("card__like-counter_active");
    }
    if (this._cardLikes.some(like => like._id === this._userId)) {
      this._cardLikeButton.classList.add("card__like-button_active");
      this._isLiked = true;
    }
  }

  // публичные методы
  deleteCards() { // удаление карточки
    this._card.remove();
    this._card = null;
  }

  isCardLiked () { //метод для проверки лайкнута ли карточка
    return this._isLiked;
  }

  likeCard(data) { // метод для функции handleCardLike
    this._isLiked = data.likes.some((like) => {
      return like._id === this._userId;
    });
    this._cardLikesCounter.textContent = data.likes.length;
    if (this._isLiked) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
    this._addLikeCounter(data);
  }

  _setEventListeners() {
    //слушатель кнопки лайка
    this._cardLikeButton.addEventListener("click", () => {
      this._handleCardLike()
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
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;
    this._card.id = this._cardId;
    this._cardLikesCounter.textContent = this._cardLikes.length;
    this._addDeleteIcon();
    this._addLikeBtnAndCounterState ();
    this._setEventListeners();
    return this._card;
  }
};
