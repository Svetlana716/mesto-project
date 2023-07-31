/* export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  openPopup () {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  closePopup () {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleOverlayClose (evt) {
    if (evt.currentTarget === evt.target) {
      this.closePopup();
    }
  }

  setEventListeners () {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClose);
  };
}; */
