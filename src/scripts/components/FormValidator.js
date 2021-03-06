class FormValidator {
  constructor(settingsObj, formElement) {
    this._formSelector = settingsObj.formSelector;
    this._inputSelector = settingsObj.inputSelector;
    this._submitButtonSelector = settingsObj.submitButtonSelector;
    this._inactiveButtonClass = settingsObj.inactiveButtonClass;
    this._inputErrorClass = settingsObj.inputErrorClass;
    this._errorClassActive = settingsObj.errorClassActive;

    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const _errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    _errorElement.textContent = errorMessage;
    _errorElement.classList.add(this._errorClassActive);
  }

  _hideInputError(inputElement) {
    const _errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    _errorElement.classList.remove(this._errorClassActive);
    _errorElement.textContent = '';
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  blockButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  activateButton() {
    this._buttonElement.removeAttribute('disabled', true);
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.blockButton();
    } else {
      this.activateButton();
    }
  }

  resetError() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.value ? this._isValid(inputElement) : '';

      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}

export default FormValidator;
