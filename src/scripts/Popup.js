export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', (event) => {
      this._handleEscClose(event);
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', (event) => {
      this._handleEscClose(event);
    });
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('popup') ||
        event.target.classList.contains('popup__btn-close')
      ) {
        this.close();
      }
    });
  }
}
