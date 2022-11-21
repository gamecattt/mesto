export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      this.close(popup);
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('popup') ||
        event.target.classList.contains('popup__btn-close')
      ) {
        this.close(this._popup);
      }
    });
  }
}
