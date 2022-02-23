// functions, that open and close popups
const openPopup = function(popupElement) {
  popupElement.classList.add('popup_is-opened');
};

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_is-opened');
};

// edit profile popup: open and close by click
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const editProfilePopupCloseBtn = editProfilePopup.querySelector('.popup__close-btn');

editProfileBtn.addEventListener('click', function() {
  openPopup(editProfilePopup);
});

editProfilePopupCloseBtn.addEventListener('click', function() {
  closePopup(editProfilePopup);
});

// edit profile popup: edit information
const editFormElement = editProfilePopup.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function handleProfileFormSubmit (event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(editProfilePopup);
};

editFormElement.addEventListener('submit', handleProfileFormSubmit);

// add card popup: open and close by click
const addCardPopup = document.querySelector('.popup_type_add-photo');
const addCardBtn = document.querySelector('.profile__add-btn');
const addCardPopupCloseBtn = addCardPopup.querySelector('.popup__close-btn');

addCardBtn.addEventListener('click', function() {
  openPopup(addCardPopup);
});

addCardPopupCloseBtn.addEventListener('click', function() {
  closePopup(addCardPopup);
});

// card : like
const likePhoto = function(likeBtn) {
  likeBtn.classList.toggle('element__like-btn_clicked');
};

// card: delete
const deleteCard = function(deleteBtn) {
  deleteBtn.closest('.element').remove();
};

// render cards
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

const cardTemplate = document.querySelector('#card').content;
const card = cardTemplate.querySelector('.element');
const cardTitle = card.querySelector('.element__title');
const cardImg = card.querySelector('.element__image');
const photoPopup = document.querySelector('.popup_type_photo');
const openedPhoto = photoPopup.querySelector('.popup__image');
const openedPhotoCapture = photoPopup.querySelector('.popup__caption');

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
    openedPhotoCapture.textContent = photo.nextElementSibling.firstElementChild.textContent;
    openPopup(photoPopup);
  });

  return cardElement;
};

const renderCard = function (title, link, container) {
  const cardElement = createCard(title, link);
  container.prepend(cardElement);
};

const cards = document.querySelector('.elements__list');

initialCards.reverse().forEach(function(item) {
  renderCard(item.name, item.link, cards);
});

// add new card
const addFormElement = addCardPopup.querySelector('.popup__form');
const imgTitleInput = addCardPopup.querySelector('.popup__input_type_title');
const imgLinkInput = addCardPopup.querySelector('.popup__input_type_link');

function addNewCard (event) {
  event.preventDefault();

  renderCard(imgTitleInput.value, imgLinkInput.value, cards)

  closePopup(addCardPopup);

  addFormElement.reset();
};

addFormElement.addEventListener('submit', addNewCard);

// photo popup: close by click
const photoPopupCloseBtn = photoPopup.querySelector('.popup__close-btn');

photoPopupCloseBtn.addEventListener('click', function() {
  closePopup(photoPopup);
});
