import { popupImage, popupImageTitle, popupFullImage } from './utils.js'
import { openPopup } from './modal.js'
import { likeCard, disLikeCard, deleteCard } from './api.js'

export const cardsList = document.querySelector('.cards__list');

function isUserLiked (likeIcon, data, userId) {
  const isLiked = data.likes.some((user) => {
    user._id === userId;
  });
  if (isLiked) {
    likeIcon.classList.add('card__like-button_active')
  }
};

function countLikes (dataId, likesNumber) {
  const cardElement = document.querySelector(`[data-id="${dataId}"]`);
  const likeCounter = cardElement.querySelector('.card__like-counter')
  likeCounter.textContent = likesNumber;
}

function addLikeCounter(cardElementProvided, data) {
  let cardElement = document.querySelector(`[data-id="${data._id}"]`);
  if (!cardElement) {
      cardElement = cardElementProvided;
  }
  const likeCounter = cardElement.querySelector('.card__like-counter');
  if (data.likes.length > 0) {
    likeCounter.classList.add('card__like-counter_active');
    likeCounter.textContent = data.likes.length;
  } else {
    likeCounter.classList.remove('card__like-counter_active');
  }
}

function handleLike(data) {
  countLikes(data._id, data.likes.length);
  addLikeCounter(null, data);
}

function setCardId (evt) {
  const targetCard = evt.target.closest('.card');
  return targetCard.dataset.id;
}

function likeCards(evt) {
  if (evt.target.classList.contains('card__like-button_active')) {
    const cardId = setCardId(evt);
    evt.target.classList.toggle('card__like-button_active');
    return disLikeCard(cardId)
    .then((data) => {
      handleLike(data);
    })
  }
  if (!evt.target.classList.contains('card__like-button_active')) {
    const cardId = setCardId(evt);
    evt.target.classList.toggle('card__like-button_active');
    return likeCard(cardId)
    .then((data) => {
      handleLike(data);
    })
  }
};

function addDeleteIcon (deleteIcon, data, userId) {
  if (data.owner._id === userId) {
    deleteIcon.classList.add('card__delete_active')
  }
};

function deleteCards(evt) {
  const targetCard = evt.target.closest('.card');
  const cardId = setCardId(evt);
  deleteCard(cardId)
  .then(() => {
    targetCard.remove();
  })
};

function fullImage (evt) {
  const targetCard = evt.target.closest('.card');
  const targetCardImage = targetCard.querySelector('.card__image');
  const targetCardTitle = targetCard.querySelector('.card__title');

  openPopup(popupFullImage);
  popupImage.src = targetCardImage.src;
  popupImage.alt = targetCardImage.alt;
  popupImageTitle.textContent = targetCardTitle.textContent;
};

export function createCard(data, userId) {
  /* debugger; */
  const templateCard = document.querySelector('#card').content;
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const cardDeleteBtn = cardElement.querySelector('.card__delete');

  cardElement.setAttribute('data-id', data._id);

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  addDeleteIcon (cardDeleteBtn, data, userId);
  isUserLiked(cardLikeBtn, data, userId)
  addLikeCounter(cardElement, data);

  cardLikeBtn.addEventListener('click', likeCards);
  cardDeleteBtn.addEventListener('click', deleteCards);
  cardImage.addEventListener('click', fullImage);
  return cardElement;
};

export function renderNewCard(data, userId) {
    const card = createCard (data, userId);
    cardsList.prepend(card);
};

export function renderInitialCards(cardsData, userId) {
  cardsData.forEach((data => {
    const card = createCard(data, userId);
    cardsList.append(card);
  }))
};
