class Card {
  constructor({ data, userId, handleCardClick, requestSettingOfLike, requestDeletionOfLike, handleDeleteBtnClick }, cardSelector) {
    this._data = data;
    this._title = data.name;
    this._image = data.link;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._requestSettingOfLike = requestSettingOfLike;
    this._requestDeletionOfLike = requestDeletionOfLike;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.element__like-btn');
    this._likeCounter = this._element.querySelector('.element__like-counter');
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
    this._likeCounter.textContent = this._likes.length;
    this._isLiked();

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

    this._likeBtn.addEventListener('click', () => {
      if (!this._likeBtn.classList.contains('element__like-btn_clicked')) {
        this._requestSettingOfLike(this._id)
        .then((res) => {
          this._likes = res.likes;
          this._putLike(res.likes);
        })
      } else {
        this._requestDeletionOfLike(this._id)
        .then((res) => {
          this._likes = res.likes;
          this._deleteLike(res.likes)
        })
      }
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._data);
    })
  }

  _putLike(data) {
    this._likeBtn.classList.add('element__like-btn_clicked');
    this._likeCounter.textContent = data.length;

  }

  _deleteLike(data) {
    this._likeBtn.classList.remove('element__like-btn_clicked');
    this._likeCounter.textContent = data.length;
  }

  _isLiked() {
    if (this._likes.some(item => item._id === this._userId)) {
      this._likeBtn.classList.add('element__like-btn_clicked');
    }
  }
};

export default Card;
