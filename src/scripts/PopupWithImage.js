import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.setEventListeners();
  }

  open(link, name) {
    const imgPopupImage = this._popup.querySelector('.popup-img__image');
    const imgPopupCaption = this._popup.querySelector('.popup-img__caption');

    imgPopupImage.src = link;
    imgPopupImage.alt = name;
    imgPopupCaption.textContent = name;
    super.open();
  }
}
