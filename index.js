const container = document.querySelector('.container');
const popup = document.querySelector('.popup');
const editButton = container.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const submitButton = popup.querySelector('.form__submit-button');
const addButton = container.querySelector('.profile__add-button');

function openPopup(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

addButton.addEventListener('click', openPopup);

function closePopup(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
};

closeButton.addEventListener('click', closePopup);

const formElement = popup.querySelector('.form');
const inputName = formElement.querySelector('.form__item_el_user-name');
const inputDescription = formElement.querySelector('.form__item_el_description');

function handleFormSubmit(evt) {
evt.preventDefault();

const profileName = document.querySelector('.profile__user-name');
const profileDescription = document.querySelector('.profile__description');

profileName.textContent = inputName.value;
profileDescription.textContent = inputDescription.value;

closePopup(evt)
};

formElement.addEventListener('submit', handleFormSubmit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function(element){
  const cardsList = container.querySelector('.cards__list');
  const templateCard = document.querySelector('#card').content;
  const cardElement = templateCard.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;

  cardsList.append(cardElement);
});
