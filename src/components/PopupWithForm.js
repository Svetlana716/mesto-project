import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor (popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  _getInputValues () {
    this.formData = new FormData(this._form);
    return this.inputs = Object.fromEntries(this.formData.entries());
  }

  _setEventListeners () {
    super._setEventListeners ();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues ());
    });
  }

  closePopup () {
    super.closePopup ();
    this._form.reset();
  }
};

////////////////////////////////////////////////////////////////////

// пример создания экземпляяра классса PopupWithForm  в index.js

const popupFormEditProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  (inputs) => {
    runLoading (true, formEditProfile);
  api
    .editProfile(inputs.name, inputs.about)
    .then((data) => {
      userInfo.setUserInfo(data); //метод класса userInfo
      popupFormEditProfile.close();
    })
    .catch(checkReject)
    .finally(() => {
      runLoading (false, formEditProfile);
    });
});
