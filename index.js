const container = document.querySelector('.container');
const popup = document.querySelector('.popup');
const popupBg = document.querySelectorAll('.popup__bg');
const editButton = container.querySelector('.profile__edit-button');
const addButton = container.querySelector('.profile__add-button');

function openProfilePopup(evt) {
  const popupProfile = document.querySelector('.popup_type_profile');
  popupProfile.classList.add('popup_opened');
  popupBg[0].classList.add('popup__bg_opened');
  evt.preventDefault();
}

editButton.addEventListener('click', openProfilePopup);

function openNewPlacePopup(evt) {
  const popupNewPlace = document.querySelector('.popup_type_new-place');
  popupNewPlace.classList.add('popup_opened');
  popupBg[1].classList.add('popup__bg_opened');
  evt.preventDefault();
}

addButton.addEventListener('click', openNewPlacePopup);

////////////////////////////////////////////////////////////////
const closeButton = document.querySelectorAll('.popup__close-button');

function closePopup(evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.popup').classList.remove('popup_opened');
  eventTarget.closest('.popup__bg').classList.remove('popup__bg_opened');
  evt.preventDefault();
};

closeButton.forEach((item) => item.addEventListener('click', closePopup));

/////////////////////////////////////////////////////////////////////////////////////////////////


const formElement = document.querySelectorAll('.form');

function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileName = document.querySelector('.profile__user-name');
  const profileDescription = document.querySelector('.profile__description');
  const inputUserName = formElement.querySelector('.form__item_el_user-name');
  const inputDescription = formElement.querySelector('.form__item_el_description');
  profileName.textContent = inputUserName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(evt);
};

formElement[0].addEventListener('submit', handleFormSubmit);

////////////////////////////////////////////////////////////////////////////////////////////////////////


function createCard(evt) {
  evt.preventDefault();
  const inputPlaceName = document.querySelector('.form__item_el_place-name');
  const inputImage = document.querySelector('.form__item_el_image-URL');

  const cardsList = container.querySelector('.cards__list');
  const templateCard = document.querySelector('#card').content;
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = inputImage.value;
  cardElement.querySelector('.card__title').textContent = inputPlaceName.value;

  cardsList.prepend(cardElement);
  closePopup(evt);

  const likeButton = container.querySelectorAll('.card__like');

  function likeCard (evt) {
    evt.target.classList.toggle('card__like_active');
  }

  likeButton.forEach((item) => item.addEventListener("click", likeCard));

  const deleteButton = container.querySelectorAll('.card__delete');

  function deleteCard (evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
  }

  deleteButton.forEach((item) => item.addEventListener("click", deleteCard));
}

formElement[1].addEventListener('submit', createCard);
////////////////////////////////////////////////////////////////

const likeButton = container.querySelectorAll('.card__like');

function likeCard (evt) {
  evt.target.classList.toggle('card__like_active');
}

likeButton.forEach((item) => item.addEventListener("click", likeCard));

//////////////////////////////////////////////////////////////////////////

const deleteButton = container.querySelectorAll('.card__delete');


function deleteCard (evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.card').remove();
}

deleteButton.forEach((item) => item.addEventListener("click", deleteCard));

//////////////////////////////////////////////////////////////////////


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
