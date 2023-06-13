const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__user-name');
const profileDescription = document.querySelector('.profile__description');
const inputUserName = document.querySelector('.form__item_el_user-name');
const inputDescription = document.querySelector('.form__item_el_description');

const popupAddNewCard = document.querySelector('.popup_type_add-new-card');
const inputNameFormAddNewCard = document.querySelector('.form__item_el_place-name');
const inputlinkFormAddNewCard = document.querySelector('.form__item_el_image-URL');

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
const buttonsClosePopups = document.querySelectorAll('.popup__close-button');
const formProfile = document.querySelector('.form_type_profile');
const formAddNewCard = document.querySelector('.form_type_add-new-card');
const buttonHeartLikeCard = document.querySelectorAll('.card__like');
const buttonBasketDeleteCard = document.querySelectorAll('.card__delete');
const cardsList = document.querySelector('.cards__list');

const popupFullImage = document.querySelector('.popup_type_full-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openProfilePopup(evt) {
  evt.preventDefault();
  openPopup(popupProfile);
  inputUserName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
};

function openNewPlacePopup(evt) {
  evt.preventDefault();
  openPopup(popupAddNewCard);
};

function closePopups(evt) {
  evt.preventDefault();
  evt.target.closest('.popup').classList.remove('popup_opened');
};

function handleFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileDescription.textContent = inputDescription.value;
  closePopups(evt);
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
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    openPopup(popupFullImage);
    popupImage.src = cardElement.querySelector('.card__image').src;
    popupImage.alt = cardElement.querySelector('.card__image').alt;
    popupImageTitle.textContent = cardElement.querySelector('.card__title').textContent;
  });

  return cardElement;
};

function renderCard(cards) {
  cards.forEach(item => {
    const cardItem = createCard(item);
    cardsList.append(cardItem);
  });
};

function handleFormAddNewCard(evt) {
  evt.preventDefault();

  const cardItemValue = {
    link: inputlinkFormAddNewCard.value,
    name: inputNameFormAddNewCard.value,
    alt: inputNameFormAddNewCard.value,
  };

  const formCard = createCard(cardItemValue);
  cardsList.prepend(formCard);

  closePopups(evt);
  formAddNewCard.reset();
};

buttonOpenPopupProfile.addEventListener('click', openProfilePopup);
buttonOpenPopupAddNewCard.addEventListener('click', openNewPlacePopup);
buttonsClosePopups.forEach((item) => item.addEventListener('click', closePopups));
formProfile.addEventListener('submit', handleFormProfile);
formAddNewCard.addEventListener('submit', handleFormAddNewCard);

renderCard(initialCards);
