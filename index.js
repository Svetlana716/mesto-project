const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const submitButton = popup.querySelector('.form__submit-button');

function openPopup(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

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
