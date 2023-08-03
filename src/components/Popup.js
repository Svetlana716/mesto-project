export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');//кнопкa закрытия попапа - она нам пригодится в слушателе
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose.bind(this));// вешаем слушателя ESC на весь документ при открытии попапа
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose.bind(this));// снимаем слушателя ESC на весь документ при закрытии попапа
  }

  _handleEscClose(evt) {//метод закрытия по ESC
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {//добавляет слушатель клика иконке закрытия попапа
      this.closePopup();
    });
    this._popup.addEventListener("mousedown", (evt) => {//закрытиe попапа по оверлею
      if (evt.currentTarget === evt.target) {
        this.closePopup();
      }
    });
  }
}
