function showInputError (form, input, errorMessage, selectors) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.add(selectors.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(selectors.errorClass);
};

function hideInputError (form, input, selectors) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(selectors.inputErrorClass);
  formError.classList.remove(selectors.errorClass);
  formError.textContent = '';
};

function isValid (form, input, selectors) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, selectors);
  } else {
    hideInputError(form, input, selectors);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState (inputList, button, selectors) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(selectors.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(selectors.inactiveButtonClass);
    button.removeAttribute('disabled', true);
  }
};

export function validateInputs (inputList, selectors) {
  inputList.forEach((input) => {
      const form = input.closest(selectors.formSelector);
      const button = form.querySelector(selectors.submitButtonSelector);
      toggleButtonState(inputList, button, selectors);
  })
};

function setEventListeners (form, selectors) {
  const inputList = Array.from(form.querySelectorAll(selectors.inputSelector));
  const button = form.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, button, selectors);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, selectors);
      toggleButtonState(inputList, button, selectors);
    });
  });
};

export function enableValidation (selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((form) => {
  setEventListeners (form, selectors);
  });
};

