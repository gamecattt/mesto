export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  }

  enableValidation() {
    const forms = document.querySelectorAll(this._config.formSelector);
    forms.forEach(() => {
      this._setEventListeners(this._form, this._config);
    });
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
    const errorEl = document.querySelector(`.${input.id}-error`);
    errorEl.textContent = input.validationMessage;
    if (input.validationMessage) {
      input.classList.add(this._config.inputErrorClass);
    } else {
      input.classList.remove(this._config.inputErrorClass);
    }
  }

  _toggleButtonState() {
    const submitBtn = this._form.querySelector(this._config.submitButtonSelector);
    submitBtn.disabled = this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  clearValidation() {
    this._inputList.forEach((input) => {
      document.querySelector(`.${input.id}-error`).textContent = '';
      input.classList.remove(this._config.inputErrorClass);
    });
    this._toggleButtonState();
  }
}
