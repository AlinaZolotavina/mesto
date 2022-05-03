import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitCallBack }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._submitBtn = this._form.querySelector('.button_type_submit');
    this._formSubmitCallBack = formSubmitCallBack;
    this._formSubmitCallBack = this._formSubmitCallBack.bind(this._submitBtn);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._formSubmitCallBack(inputValues, this._submitBtn);
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
