import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('form');
    this._submitBtn = this._form.querySelector('.popup-form__btn-submit');
    this._submitBtnDefaultText = this._submitBtn.innerText;
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
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  handleSubmit(isSubmitting) {
    isSubmitting
      ? (this._submitBtn.innerText = 'Сохранение...')
      : (this._submitBtn.innerText = this._submitBtnDefaultText);
  }
}
