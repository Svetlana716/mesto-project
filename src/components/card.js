import { popupImage, popupImageTitle, popupFullImage } from './utils.js'
import { openPopup } from './modal.js'

export const cardsList = document.querySelector('.cards__list');

function likeCard(evt) {
  evt.target.classList.toggle('card__like_active');
};

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

export function createCard(item) {
  const templateCard = document.querySelector('#card').content;
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = item.link;
  cardImage.alt = item.alt;
  cardElement.querySelector('.card__title').textContent = item.name;

  cardElement.querySelector('.card__like').addEventListener('click', likeCard);
  cardElement.querySelector('.card__delete').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
    openPopup(popupFullImage);
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupImageTitle.textContent = cardElement.querySelector('.card__title').textContent;
  });

  return cardElement;
};

export function renderCard(cards) {
  cards.forEach((item) => {
    const cardItem = createCard(item);
    cardsList.append(cardItem);
  });
};

