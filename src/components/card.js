import { popupImage, popupImageTitle, popupFullImage } from './modal.js'
import { openPopup, likeCard, deleteCard } from './utils.js'
const cardsList = document.querySelector('.cards__list');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Горы Архыза',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Лес и река в Челябинской области',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Многоквартирные дома в Иваново',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Поле и гора Камчатки',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Ж/д в Холмогорском районе',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Гора и озеро Байкал',
  }
];

function createCard(item) {
  const templateCard = document.querySelector('#card').content;
  const cardElement = templateCard.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.alt;
  cardElement.querySelector('.card__title').textContent = item.name;

  cardElement.querySelector('.card__like').addEventListener('click', likeCard);
  cardElement.querySelector('.card__delete').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    openPopup(popupFullImage);
    popupImage.src = cardElement.querySelector('.card__image').src;
    popupImage.alt = cardElement.querySelector('.card__image').alt;
    popupImageTitle.textContent = cardElement.querySelector('.card__title').textContent;
  });

  return cardElement;
};

function renderCard(cards) {
  cards.forEach((item) => {
    const cardItem = createCard(item);
    cardsList.append(cardItem);
  });
};

export { initialCards, renderCard, createCard, cardsList };
