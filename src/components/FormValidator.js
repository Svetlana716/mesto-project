/* export default class FormValidator {
  constructor ({selectorsAndClasses}, form) {
    this._selectorsAndClasses = selectorsAndClasses;
    this._form = form;
  }

  _showInputError (form, input, errorMessage, selectorsAndClasses) {
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.add(selectorsAndClasses.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(selectorsAndClasses.errorClass);
  };

  _hideInputError (form, input, selectorsAndClasses) {
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.remove(selectorsAndClasses.inputErrorClass);
    formError.classList.remove(selectorsAndClasses.errorClass);
    formError.textContent = '';
  };

  _isValid (form, input, selectorsAndClasses) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity('');
    }

    if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage, selectorsAndClasses);
    } else {
      hideInputError(form, input, selectorsAndClasses);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState (inputList, button, selectorsAndClasses) {
    if (hasInvalidInput(inputList)) {
      button.classList.add(selectorsAndClasses.inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(selectorsAndClasses.inactiveButtonClass);
      button.removeAttribute('disabled', true);
    }
  };

  _validateInputs (inputList, selectorsAndClasses) {
    inputList.forEach((input) => {
        const form = input.closest(selectorsAndClasses.formSelector);
        const button = form.querySelector(selectorsAndClasses.submitButtonSelector);
        toggleButtonState(inputList, button, selectorsAndClasses);
    })
  };

  _setEventListeners (form, selectorsAndClasses) {
    const inputList = Array.from(form.querySelectorAll(selectorsAndClasses.inputSelector));
    const button = form.querySelector(selectorsAndClasses.submitButtonSelector);
    toggleButtonState(inputList, button, selectorsAndClasses);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        isValid(form, input, selectorsAndClasses);
        toggleButtonState(inputList, button, selectorsAndClasses);
      });
    });
  };

  enableValidation (selectorsAndClasses) {
    const formList = Array.from(document.querySelectorAll(selectorsAndClasses.formSelector));
    formList.forEach((form) => {
    setEventListeners (form, selectorsAndClasses);
    });
  };
} */

//////////////////////////////////////////////////////////////////////////////////////

function showInputError (form, input, errorMessage, selectorsAndClasses) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.add(selectorsAndClasses.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(selectorsAndClasses.errorClass);
};

function hideInputError (form, input, selectorsAndClasses) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(selectorsAndClasses.inputErrorClass);
  formError.classList.remove(selectorsAndClasses.errorClass);
  formError.textContent = '';
};

function isValid (form, input, selectorsAndClasses) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, selectorsAndClasses);
  } else {
    hideInputError(form, input, selectorsAndClasses);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState (inputList, button, selectorsAndClasses) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(selectorsAndClasses.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(selectorsAndClasses.inactiveButtonClass);
    button.removeAttribute('disabled', true);
  }
};

export function validateInputs (inputList, selectorsAndClasses) {
  inputList.forEach((input) => {
      const form = input.closest(selectorsAndClasses.formSelector);
      const button = form.querySelector(selectorsAndClasses.submitButtonSelector);
      toggleButtonState(inputList, button, selectorsAndClasses);
  })
};

function setEventListeners (form, selectorsAndClasses) {
  const inputList = Array.from(form.querySelectorAll(selectorsAndClasses.inputSelector));
  const button = form.querySelector(selectorsAndClasses.submitButtonSelector);
  toggleButtonState(inputList, button, selectorsAndClasses);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, selectorsAndClasses);
      toggleButtonState(inputList, button, selectorsAndClasses);
    });
  });
};

export function enableValidation (selectorsAndClasses) {
  const formList = Array.from(document.querySelectorAll(selectorsAndClasses.formSelector));
  formList.forEach((form) => {
  setEventListeners (form, selectorsAndClasses);
  });
};


