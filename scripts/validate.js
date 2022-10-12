const enableValidation = function (config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(function (form) {
    setEventListeners(form, config);
  });
};

const setEventListeners = function (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(function (input) {
    input.addEventListener('input', function () {
      validateInput(input, config);
      toggleButtonState(form, inputList, config);
    });
  });
};

const clearValidation = function (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(function (input) {
    document.querySelector(`.${input.id}-error`).textContent = '';
    input.classList.remove(config.inputErrorClass);
  });
  toggleButtonState(form, inputList, config);
};

const toggleButtonState = function (form, inputList, config) {
  const submitBtn = form.querySelector(config.submitButtonSelector);
  const hasInvalidInput = inputList.some(function (input) {
    return !input.validity.valid;
  });
  submitBtn.disabled = hasInvalidInput;
};

const validateInput = function (input, config) {
  const errorEl = document.querySelector(`.${input.id}-error`);
  errorEl.textContent = input.validationMessage;
  if (input.validationMessage) {
    input.classList.add(config.inputErrorClass);
  } else {
    input.classList.remove(config.inputErrorClass);
  }
};
