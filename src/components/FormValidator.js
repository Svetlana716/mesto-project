export default class FormValidator {
  constructor(
    { selectorsAndClasses }, //selectorsAndClasses - объект настроек
    form
  ) {
    //form - элемент той формы, которая валидируется
    this._selectorsAndClasses = selectorsAndClasses;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._selectorsAndClasses.inputSelector)
    );
    this._button = this._form.querySelector(
      this._selectorsAndClasses.submitButtonSelector
    );
  }

  _showInputError(input, errorMessage) {
    // показывает элемент ошибки
    const formError = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._selectorsAndClasses.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._selectorsAndClasses.errorClass);
  }

  _hideInputError(input) {
    //скрывает элемент ошибки
    const formError = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._selectorsAndClasses.inputErrorClass);
    formError.classList.remove(this._selectorsAndClasses.errorClass);
    formError.textContent = "";
  }

  _isValid(input) {
    //проверяет валидность поля и  внутри вызывает приватные методы _showInputError или _hideInputError
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }

    if (!input.validity.valid) {
      //в условии указал вместо функций приватные методы this._showInputError и this._hideInputError
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    // проверяем валидность всех полей ввода формы
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    // метод условие переключение кнопки сабмит
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._selectorsAndClasses.inactiveButtonClass);
      this._button.setAttribute("disabled", true);
    } else {
      this._button.classList.remove(
        this._selectorsAndClasses.inactiveButtonClass
      );
      this._button.removeAttribute("disabled", true);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
//пока убрал - кажется без этого будет работать
//смысл нам создавать массив форм, перебирать все формы, чтобы на все эти формы потом повесить слушатели
//нам уже по условию дана будет форма для валидации
//потом когда будем создавать экземпляры класса ( 3 шт) будет указывать конретную форму, которую надо валидировать. В результате получим объекты и кним применим enableValidation(). Я так думаю:)
/*const formList = Array.from(
      document.querySelectorAll(selectorsAndClasses.formSelector)
    );
    formList.forEach((form) => {
      setEventListeners(form, selectorsAndClasses);
    });*/

// не понял для чего этот метод (не увидел где мы его вызываем)
//в принципе он дублирует то, что мы делаем в _setEventListeners.
//в моем проекте его не было и все работало
//временно отключил
/*_validateInputs(inputList, selectorsAndClasses) {
    inputList.forEach((input) => {
      const form = input.closest(selectorsAndClasses.formSelector);
      const button = form.querySelector(
        selectorsAndClasses.submitButtonSelector
      );
      toggleButtonState(inputList, button, selectorsAndClasses);
    });
  }*/
