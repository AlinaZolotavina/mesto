class Card {
  constructor({ data, userId, handleCardClick, handleLikeBtnClick, handleDeleteBtnClick }, cardSelector) {
    this._data = data;
    this._title = data.name;
    this._image = data.link;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeBtnClick = handleLikeBtnClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
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
        const data = {
          card: this._element,
          cardId: this._id
        }
        this._handleDeleteBtnClick(data);
      })
    }

    // this._element.querySelector('.element__like-btn').addEventListener('click', () => {
    //   this._handlePhotoLike();
    // });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._data);
    })
  }

  // _handleLikeBtnClick() {
  //   this.__handleLikeClick(this._likeBtn);
  // }

  // _handleDeleteBtnClick() {
  //   this._handleDeleteIconClick(this._data);
  // }

  // _handleCardDelete() {
  //   const data = {
  //     card: this._element,
  //     cardId: this._id
  //   }
  //   this._deleteCard(data);
  // }

};

export default Card;
