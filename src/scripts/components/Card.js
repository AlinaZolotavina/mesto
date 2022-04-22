class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._data = data;
    this._title = data.title;
    this._image = data.link;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._data);
    })
  }

  _handlePhotoLike() {
    this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_clicked');
  }

  _handleCardDelete() {
    this._element.remove();
  }
};

export default Card;
