import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector("popup__image");
    this._popupImageTitle = this._popup.querySelector("popup__image-title");
  }

  openPopup(data) {
    super.openPopup();
    this._popupImage.srs = data.link;
    this._popupImage.alt = data.name;
    this._popupImageTitle.textContent = data.name;
  }
};
