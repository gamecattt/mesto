import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('form');
    this._submitButton = this._form.querySelector('.popup-form__btn-submit');
    this.setEventListeners();
  }

  _getInputValues() {
    return Array.from(this._form.elements)
      .filter((el) => el.tagName === 'INPUT')
      .reduce((acc, el) => {
        acc[el.name] = el.value;
        return acc;
      }, {});
  }

  setInputValues(data) {
    Array.from(this._form.elements).forEach((el) => {
      if (data.hasOwnProperty(el.name)) {
        el.value = data[el.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this._submitButton.textContent = initialText;
        });
    });
  }

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
