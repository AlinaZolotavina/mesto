import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector, formSubmitCallback }) {
    super(popupSelector);
    this._formSubmitCalback = formSubmitCallback;
    this._form = this._popupElement.querySelector('.form');
    this._submit = this._submit.bind(this);
  }

  _submit(evt) {
    evt.preventDefault();
    this._formSubmitCalback(this.data);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit);
  }
}
