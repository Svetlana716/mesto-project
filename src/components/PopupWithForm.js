import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formSubmitButton = this._form.querySelector('.form__submit-button');
    this._formSubmitCallback = formSubmitCallback;
  }
  //получаем данные из формы
  //пробовал в консоли браузера это реализовать, нифига не получилось
  //пока так оставим - может заработает:)
  _getInputValues() {
    this.formData = new FormData(this._form);
    return (this.inputs = Object.fromEntries(this.formData.entries()));
  }

  setEventListeners() {//метод слушателей формы - публичнй
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {//добавляем обработчик сабмита
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
    });
  }

  closePopup() {// закрытие попапа
    super.closePopup();
    this._form.reset();//еще добавляем сброс инпутов
  }

  runLoading (isLoading) {
  this._spinner = this._form.querySelector('.form__spinner');
  if (isLoading) {
    this._formSubmitButton.textContent = this._spinner.textContent;
  } else {
    this._formSubmitButton.textContent = button.value;
  }
}
};
