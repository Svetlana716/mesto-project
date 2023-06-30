import { profileName, profileDescription, closePopups } from './modal.js'
import { createCard, cardsList } from './card.js'

const formProfile = document.querySelector('.form_type_profile');
const inputUserName = formProfile.querySelector('.form__input_el_user-name');
const inputDescription = formProfile.querySelector('.form__input_el_description');

const formAddNewCard = document.querySelector('.form_type_add-new-card');
const inputNameFormAddNewCard = document.querySelector('.form__input_el_place-name');
const inputlinkFormAddNewCard = document.querySelector('.form__input_el_image-URL');

function showInputError (form, input, errorMessage) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.add('form__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('form__input-error_active');
};

function hideInputError (form, input) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.remove('form__input_type_error');
  formError.classList.remove('form__input-error_active');
  formError.textContent = '';
};

function isValid (form, input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState (inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add('form__submit-button_disabled');
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove('form__submit-button_disabled');
    button.removeAttribute('disabled', true);
  }
};

function setEventListeners (form) {
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  const button = form.querySelector('.form__submit-button');
  toggleButtonState(inputList, button);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputList, button);
    });
  });
};

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(form.querySelectorAll('.form__fieldset'));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    })
  });
};

function handleFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileDescription.textContent = inputDescription.value;
  closePopups(evt);
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

  formAddNewCard.reset();
  closePopups(evt);
};

export {formProfile, formAddNewCard, handleFormProfile, handleFormAddNewCard, enableValidation, inputUserName, inputDescription };
