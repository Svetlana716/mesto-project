import { popupImage, popupImageTitle, popupFullCardImage, config } from '../utils/constants.js'
import { openPopup } from './modal.js'
import { checkReject } from '../utils/utils.js'
import  Api  from './Api.js'

const api = new Api(config);

export default class Card {
  constructor (data, userId, cardSelector) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._cardLikes = data.likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
  }

  _getCard () {
    const cardElement = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _likeCard (data) {
    this._isLiked = data.likes.some((like) => {
      like._id === this._userId;
    });

    if (this._isLiked) {
      this._cardLikeButton.classList.add('card__like-button_active');
    } else {
      this._cardLikeButton.classList.remove('card__like-button_active');
    }

  };

  _addLikeCounter(data) {
    if (data.likes.length > 0) {
      this._cardLikesCounter.classList.add('card__like-counter_active');
    } else {
      this._cardLikesCounter.classList.remove('card__like-counter_active');
    }
  }

  _handleLike(data) {
    countLikes(data._id, data.likes.length);
    addLikeCounter(null, data);
  }

  _setCardId (evt) {
    const targetCard = evt.target.closest('.card');
    return targetCard.dataset.id;
  };

  _likeCards(evt) {
    if (evt.target.classList.contains('card__like-button_active')) {
      const cardId = setCardId(evt);
      evt.target.classList.remove('card__like-button_active');
      return api.disLikeCard(cardId)
      .then((data) => {
        handleLike(data);
      })
      .catch(checkReject)
    }
    if (!evt.target.classList.contains('card__like-button_active')) {
      const cardId = setCardId(evt);
      evt.target.classList.add('card__like-button_active');
      return api.likeCard(cardId)
      .then((data) => {
        handleLike(data);
      })
      .catch(checkReject)
    }
  }

  _addDeleteIcon (deleteIcon, data, userId) {
    if (data.owner._id === userId) {
      deleteIcon.classList.add('card__delete-button_active')
    }
  };

  _deleteCards(evt) {
    const targetCard = evt.target.closest('.card');
    const cardId = setCardId(evt);
    api.deleteCard(cardId)
    .then(() => {
      targetCard.remove();
    })
    .catch(checkReject)
  };

  _fullCardImage (evt) {
    const targetCard = evt.target.closest('.card');
    const targetCardImage = targetCard.querySelector('.card__image');
    const targetCardTitle = targetCard.querySelector('.card__title');

    openPopup(popupFullCardImage);
    popupImage.src = targetCardImage.src;
    popupImage.alt = targetCardImage.alt;
    popupImageTitle.textContent = targetCardTitle.textContent;
  }

  _setEventListeners () {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._likeCards();
    });
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteCards();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._fullCardImage();
    });
  }

  generate () {
    this._card = this._getCard();
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardLikeButton = this._card.querySelector('.card__like-button');
    this._cardDeleteButton = this._card.querySelector('.card__delete-button');
    this._cardLikesCounter = this._card.querySelector('.card__like-counter');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this.this._cardLikesCounter.textContent = this._cardLikes.length;
    this._setEventListeners();
    return this._card;
  }
};
