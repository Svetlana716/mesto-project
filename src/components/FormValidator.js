export default class FormValidator {
  //selectorsAndClasses - объект настроек
  //form - элемент той формы, которая валидируется
  //inputList, button - используются во многих методах, поэтому чтобы их не определять каждый раз и не передавать в параметрах - вынес их в конструктор
  constructor({ selectorsAndClasses }, form) {
    this._selectorsAndClasses = selectorsAndClasses;
    this._form = form;
    this.inputList = Array.from(
      this._form.querySelectorAll(this._selectorsAndClasses.inputSelector)
    );
    this._button = this._form.querySelector(
      this._selectorsAndClasses.submitButtonSelector
    );
  }
  // показывает элемент ошибки
  //здесь form и selectorsAndClasses поменял на this._form и на this._selectorsAndClasses, и из-за ненадобности удалили их из параметров метода
  _showInputError(input, errorMessage) {
    const formError = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._selectorsAndClasses.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._selectorsAndClasses.errorClass);
  }
  //скрывает элемент ошибки
  //здесь form и selectorsAndClasses поменял на this._form и на this._selectorsAndClasses, и из-за ненадобности удалили их из параметров метода
  _hideInputError(input) {
    const formError = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._selectorsAndClasses.inputErrorClass);
    formError.classList.remove(this._selectorsAndClasses.errorClass);
    formError.textContent = "";
  }
  //проверяет валидность поля и  внутри вызывает приватные методы _showInputError или _hideInputError
  //в параметрах метода _isValid убрал form и selectorsAndClasses, т.к. они ниже не будут использоваться
  _isValid(input) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }
    //в условии указал вместо функций приватные методы this._showInputError и this._hideInputError
    //в аргуметах вызова методов убрал form и selectorsAndClasses (их нет в параметрах - смотри выше),
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }
  // проверяем валидность всего поля ввода
  //убрал параметр inputList, т.к. мы его определили в конструкторе
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // метод условие переключение кнопки сабмит
  //убраз из параметров всё, т.к. они берутся через this из конструктора
  _toggleButtonState() {
    //здесь заменил функцию hasInvalidInput(inputList) на метод _hasInvalidInput
    if (this._hasInvalidInput()) {
      //везде button  и selectorsAndClasses поменял на this._
      this._button.classList.add(this._selectorsAndClasses.inactiveButtonClass);
      this._button.setAttribute("disabled", true);
    } else {
      this._button.classList.remove(
        this._selectorsAndClasses.inactiveButtonClass
      );
      this._button.removeAttribute("disabled", true);
    }
  }
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
  ////убраз из параметров всё лишнее, т.к. они берутся через this из конструктора
  _setEventListeners() {
    this._toggleButtonState();
    this.inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
  //логично, чтобы все слушатели событий были в методе _setEventListeners()
  //тем более в задании указано, что все обработчики устанавливают в приватных методах
  //перенес обработчик в _setEventListeners()
  enableValidation() {
    this._setEventListeners();
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
};
