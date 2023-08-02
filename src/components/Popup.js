export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    //добавил кнопку закрытия попапа - она нам пригодится в слушателе
    this._popupCloseButton = this._popup.querySelector(".popup__close-button");
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    // вешаем слушателя ESC на весь документ при открытии попапа
    //// жёстко привязываем контекст при передаче функции
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    // снимаем слушателя ESC на весь документ при закрытии попапа
    //// жёстко привязываем контекст при передаче функции
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }
  //метод закрытия по ESC
  //тут вроде все норм
  //думаю, что этот метод надо передавать как колбэк слушателям, которые мы будем вешать при открытии попапа и снимать при закрытии
  //и чтобы не терять контекс наверное надо жестко привязать через bind
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }
  //по заданию логика закрытие по оверлею должна быть реализована в setEventListeners, поэтому этот приватный метод убираю
  /*_handleOverlayClose(evt) {
    if (evt.currentTarget === evt.target) {
      this.closePopup();
    }
  }*/
  // по заданию метод setEventListeners публичный и он один, поэтому _removeEventListeners() наверное лишний, я его пока закоменчу
  setEventListeners() {
    //по заданию метод setEventListeners добавляет слушатель клика иконке закрытия попапа
    this._popupCloseButton.addEventListener("click", () => {
      this.closePopup();
    });
    //по заданию в этом методе нужно реализовать закрытия попапа по оверлею
    //и здесь тогда пропишем слушатель с твоей логикой, которую ты выносила в _handleOverlayClose(evt)
    //у меня совсем другая логика - попробуем твою, если что-то пойдет не так, попробуем моим способом
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.currentTarget === evt.target) {
        this.closePopup();
      }
    });
  }
}
