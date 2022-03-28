import {photoPopup, openedPhoto, openedPhotoCapture} from './index.js';
import {openPopup} from './index.js';

class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = 'Фото ' + this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-btn').addEventListener('click', () => {
      this._handlePhotoLike();
    });

    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._handleCardDelete();
    })

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handlePhotoPopupOpen();
    })
  }

  _handlePhotoLike() {
    this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_clicked');
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _handlePhotoPopupOpen() {
    openedPhoto.src = this._image;
    openedPhoto.alt = 'Фото ' + this._title;
    openedPhotoCapture.textContent = this._title;
    openPopup(photoPopup);
  }
};

export default Card;
