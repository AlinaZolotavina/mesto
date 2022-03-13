const showInputError = function(settingsObj, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsObj.errorClassActive);
};

const hideInputError = function(settingsObj, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObj.inputErrorClass);
  errorElement.classList.remove(settingsObj.errorClassActive);
  errorElement.textContent = '';
};

const isValid = function(settingsObj, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(settingsObj, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(settingsObj, formElement, inputElement);
  };
};

const setEventListeners = function(settingsObj, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settingsObj.inputSelector));
  const buttonElement = formElement.querySelector(settingsObj.submitButtonSelector);

  toggleButtonState(settingsObj, inputList, buttonElement);

  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      isValid(settingsObj, formElement, inputElement);

      toggleButtonState(settingsObj, inputList, buttonElement);
    });
  });
};

const enableValidation = function(settingsObj) {
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector));
  formList.forEach(function(formElement) {
    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
    });

    setEventListeners(settingsObj, formElement);
  });
};

const hasInvalidInput = function(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = function(settingsObj, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settingsObj.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(settingsObj.inactiveButtonClass);
  }
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClassActive: 'form__input-error_active'
});
