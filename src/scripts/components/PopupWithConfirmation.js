import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, formSubmitCallback }) {
    super(popupSelector);
    this._formSubmitCalback = formSubmitCallback;
    this._formSubmitCalback = this._formSubmitCalback.bind(this._submitBtn);
    this._form = this._popupElement.querySelector('.form');
    this._submitBtn = this._form.querySelector('.button_type_submit');
    this._submit = this._submit.bind(this);
  }

  _submit(evt) {
    evt.preventDefault();
    this._formSubmitCalback(this.data, this._submitBtn);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit);
  }
}
