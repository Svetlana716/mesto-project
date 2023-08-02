import Popup from "./Popup.js";
//мне кажется сюда можно добавить метод runLoading, сделать его публичным
//как-раз будет менять состояние кнопкт сабмит у this._form
//методу даже не нужно будет передавать аргументы - все возьмет из конструктора
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
  }
  //получаем данные из формы
  //пробовал в консоли браузера это реализовать, нифига не получилось
  //пока так оставим - может заработает:)
  _getInputValues() {
    this.formData = new FormData(this._form);
    return (this.inputs = Object.fromEntries(this.formData.entries()));
  }
  //метод слушателей формы - публичнй
  //добавляем обработчик сабмита
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
    });
  }
  // закрытие попапа
  //еще добавляем сброс инпутов
  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}

////////////////////////////////////////////////////////////////////

// пример создания экземпляяра классса PopupWithForm  в index.js
/*
const popupFormEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  (inputs) => {
    runLoading(true, formEditProfile);
    api
      .editProfile(inputs.name, inputs.about)
      .then((data) => {
        userInfo.setUserInfo(data); //метод класса userInfo
        popupFormEditProfile.close();
      })
      .catch(checkReject)
      .finally(() => {
        runLoading(false, formEditProfile);
      });
  }
);
*/
