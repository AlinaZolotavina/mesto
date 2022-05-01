class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
    this._data = data;
    this._title = data.title;
    this._image = data.link;
    // this._userId = data._id;
    // this._cardOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.element__like-btn');
    this._deleteBtn = this._element.querySelector('.element__delete-btn');
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = 'Фото ' + this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  }

  _setEventListeners() {
    if(this._userId === this._cardOwnerId) {
      this._deleteBtn.classList.add('element__delete-btn_active');
      this._deleteBtn.addEventListener('click', () => {
        this._handleCardDelete();
      })
    }

    this._element.querySelector('.element__like-btn').addEventListener('click', () => {
      this._handlePhotoLike();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._data);
    })
  }

  _handlePhotoLike() {
    this.__handleLikeClick(this._likeBtn);
  }

  _handleCardDelete() {

    this._handleDeleteIconClick(this._element);
  }
};

export default Card;
