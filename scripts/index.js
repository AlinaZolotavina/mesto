// global variables
const popupElements = Array.from(document.querySelectorAll('.popup'));

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const editProfilePopupCloseBtn = editProfilePopup.querySelector('.popup__close-btn');
const editFormElement = editProfilePopup.querySelector('.form');
const nameInput = editFormElement.querySelector('.form__input_type_name');
const jobInput = editFormElement.querySelector('.form__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const addCardPopup = document.querySelector('.popup_type_add-photo');
const addCardBtn = document.querySelector('.profile__add-btn');
const addCardPopupCloseBtn = addCardPopup.querySelector('.popup__close-btn');
const cardTemplate = document.querySelector('#card').content;
const card = cardTemplate.querySelector('.element');
const cardTitle = card.querySelector('.element__title');
const cardImg = card.querySelector('.element__image');
const addFormElement = addCardPopup.querySelector('.form');
const imgTitleInput = addCardPopup.querySelector('.form__input_type_title');
const imgLinkInput = addCardPopup.querySelector('.form__input_type_link');
const cards = document.querySelector('.elements__list');
const addCardPopupSaveBtn = addFormElement.querySelector('.form__save-btn');

const photoPopup = document.querySelector('.popup_type_photo');
const openedPhoto = photoPopup.querySelector('.popup__image');
const openedPhotoCapture = photoPopup.querySelector('.popup__caption');
const photoPopupCloseBtn = photoPopup.querySelector('.popup__close-btn');

// functions
const openPopup = function(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
};

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editProfilePopup);
};

const likePhoto = function(likeBtn) {
  likeBtn.classList.toggle('element__like-btn_clicked');
};

const deleteCard = function(deleteBtn) {
  deleteBtn.closest('.element').remove();
};

function addNewCard (evt) {
  evt.preventDefault();

  renderCard(imgTitleInput.value, imgLinkInput.value, cards)

  closePopup(addCardPopup);

  addFormElement.reset();

  addCardPopupSaveBtn.setAttribute('disabled', true);
  addCardPopupSaveBtn.classList.add('form__save-btn_inactive');
};

const createCard = function(title, link) {
  cardTitle.textContent = title;
  cardImg.src = link;
  cardImg.alt = 'Фото: ' + title;

  const cardElement = card.cloneNode(true);

  const likeBtn = cardElement.querySelector('.element__like-btn');
  likeBtn.addEventListener('click', function() {
    likePhoto(likeBtn);
  });

  const deleteBtn = cardElement.querySelector('.element__delete-btn');
  deleteBtn.addEventListener('click', function() {
    deleteCard(deleteBtn)
  });

  const photo = cardElement.querySelector('.element__image');
  photo.addEventListener('click', function() {
    openedPhoto.src = photo.src;
    openedPhoto.alt = photo.alt;
    openedPhotoCapture.textContent = title;
    openPopup(photoPopup);
  });

  return cardElement;
};

const renderCard = function (title, link, container) {
  const cardElement = createCard(title, link);
  container.prepend(cardElement);
};

const closeByEscape = function(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

// event listeners
editProfileBtn.addEventListener('click', function() {
  openPopup(editProfilePopup);
});

popupElements.forEach(function(popupElement) {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popupElement);
    } else if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popupElement);
    };
  });
});

editFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardBtn.addEventListener('click', function() {
  openPopup(addCardPopup);
});

addFormElement.addEventListener('submit', addNewCard);

// render initial cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.reverse().forEach(function(item) {
  renderCard(item.name, item.link, cards);
});
