import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitCallBack }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._formSubmitCallBack = formSubmitCallBack;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._formSubmitCallBack(inputValues);
    this.close();
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._handleFormSubmit);
  }
}
