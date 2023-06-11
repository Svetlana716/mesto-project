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

const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const inputs = document.querySelectorAll('.form__item');
const formElements = document.querySelectorAll('.form');
const likeButtons = document.querySelectorAll('.card__like');
const deleteButtons = document.querySelectorAll('.card__delete');
const cardsList = document.querySelector('.cards__list');
const images = document.querySelectorAll('.card__image');
const popupImg = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openProfilePopup(evt) {
  evt.preventDefault();
  openPopup(popups[0]);
};

function openNewPlacePopup(evt) {
  evt.preventDefault();
  openPopup(popups[1]);
};

function closePopup(evt) {
  evt.preventDefault();
  evt.target.closest('.popup').classList.remove('popup_opened');
};

function clearInputFields(inputs) {
  inputs.forEach(function (item) {
    item.value = '';
  });
};

function handleFormEdit(evt) {
  evt.preventDefault();
  const profileName = document.querySelector('.profile__user-name');
  const profileDescription = document.querySelector('.profile__description');
  const inputUserName = document.querySelector('.form__item_el_user-name');
  const inputDescription = document.querySelector('.form__item_el_description');
  profileName.textContent = inputUserName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(evt);
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like_active');
};

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

function createCard(item) {
  const templateCard = document.querySelector('#card').content;
  const cardElement = templateCard.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.alt;
  cardElement.querySelector('.card__title').textContent = item.name;

  cardElement.querySelector('.card__like').addEventListener('click', likeCard);
  cardElement.querySelector('.card__delete').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', increaseCard);

  return cardElement;
};

function renderCard(cards) {
  cards.forEach(item => {
    const cardItem = createCard(item);
    cardsList.append(cardItem);
  });
};

function handleFormAdd(evt) {
  evt.preventDefault();

  const placeName = document.querySelector('.form__item_el_place-name');
  const image = document.querySelector('.form__item_el_image-URL');

  const cardItemValue = {
    link: image.value,
    name: placeName.value,
    alt: placeName.value,
  };

  const formCard = createCard(cardItemValue);
  cardsList.prepend(formCard);

  closePopup(evt);
  clearInputFields(inputs);
};

function increaseCard(evt) {
  const card = evt.target.closest('.card');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  openPopup(popups[2]);
  popupImg.src = cardImage.src;
  popupImg.alt = cardImage.alt;
  popupTitle.textContent = cardTitle.textContent;
};

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openNewPlacePopup);
closeButtons.forEach((item) => item.addEventListener('click', closePopup));
formElements[0].addEventListener('submit', handleFormEdit);
likeButtons.forEach((item) => item.addEventListener("click", likeCard));
deleteButtons.forEach((item) => item.addEventListener("click", deleteCard));
formElements[1].addEventListener('submit', handleFormAdd);
images.forEach((item) => item.addEventListener("click", increaseCard));

renderCard(initialCards);
