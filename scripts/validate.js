function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(function (form) {
    const inputList = form.querySelectorAll(config.inputSelector);
    inputList.forEach(function (input) {
      input.addEventListener('input', function () {
        enableValidation.validateInput(input);
        enableValidation.validateForm(form);
      });
    });
  });

  enableValidation.validateForm = function (form) {
    let isValid = true;
    const submitBtn = form.querySelector(config.submitButtonSelector);
    const inputList = form.querySelectorAll(config.inputSelector);
    inputList.forEach(function (input) {
      if (!input.validity.valid) {
        isValid = false;
      }
    });
    submitBtn.disabled = !isValid;
  };

  enableValidation.validateInput = function (input) {
    const errorEl = document.querySelector(`.${input.id}-error`);
    errorEl.textContent = input.validationMessage;
    if (input.validationMessage) {
      input.classList.add(config.inputErrorClass);
    } else {
      input.classList.remove(config.inputErrorClass);
    }
  };

  enableValidation.reset = function (form) {
    const inputList = form.querySelectorAll(config.inputSelector);
    inputList.forEach(function (input) {
      const errorEl = document.querySelector(`.${input.id}-error`);
      errorEl.textContent = '';
      input.classList.remove(config.inputErrorClass);
    });
  };
}
