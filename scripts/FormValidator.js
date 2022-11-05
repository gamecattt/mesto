export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitBtn = this._form.querySelector(this._config.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners(this._form, this._config);
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._toggleButtonState();
      });
    });
  }

  _validateInput(input) {
    const errorEl = this._form.querySelector(`.${input.id}-error`);
    errorEl.textContent = input.validationMessage;
    if (input.validationMessage) {
      input.classList.add(this._config.inputErrorClass);
    } else {
      input.classList.remove(this._config.inputErrorClass);
    }
  }

  _toggleButtonState() {
    this._submitBtn.disabled = this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  clearValidation() {
    this._inputList.forEach((input) => {
      this._form.querySelector(`.${input.id}-error`).textContent = '';
      input.classList.remove(this._config.inputErrorClass);
    });
    this._toggleButtonState();
  }
}
