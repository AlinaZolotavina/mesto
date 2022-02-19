// open popup function
const openPopup = function(popupElement) {
  popupElement.classList.add('popup_is-opened');
};

// close popup function
const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_is-opened');
};

// define profile editing popup's elements
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const editProfilePopupCloseBtn = editProfilePopup.querySelector('.popup__close-btn');

// open profile editing popup
editProfileBtn.addEventListener('click', function() {
  openPopup(editProfilePopup);
});

// close profile editing popup
editProfilePopupCloseBtn.addEventListener('click', function() {
  closePopup(editProfilePopup);
});

// edit profile information
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

// define card adding popup's elements
const addCardPopup = document.querySelector('.popup_type_add-photo');
const addCardBtn = document.querySelector('.profile__add-btn');
const addCardPopupCloseBtn = addCardPopup.querySelector('.popup__close-btn');

// open card adding popup
addCardBtn.addEventListener('click', function() {
  openPopup(addCardPopup);
});

// close card adding popup
addCardPopupCloseBtn.addEventListener('click', function() {
  closePopup(addCardPopup);
});

// initial cards
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
const cards = document.querySelector('.elements__list');

initialCards.forEach(function (item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__image').src = item.link;

  cards.prepend(cardElement);
});

// activate like-btn
for (let likeBtn of  document.querySelectorAll('.element__like-btn')) {
  likeBtn.addEventListener('click', function() {
      likeBtn.classList.add('element__like-btn_clicked');
  });
};
