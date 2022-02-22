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

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.elements__list');
const card = cardTemplate.querySelector('.element');
const cardTitle = card.querySelector('.element__title');
const cardImg = card.querySelector('.element__image');

initialCards.forEach(function (item) {
  cardTitle.textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = 'Фото: ' + item.name;

  const cardElement = card.cloneNode(true);

  cards.append(cardElement);
});

// add new card
const addFormElement = addCardPopup.querySelector('.popup__form');
const imgTitleInput = addCardPopup.querySelector('.popup__input_type_title');
const imgLinkInput = addCardPopup.querySelector('.popup__input_type_link');

function addNewCard (event) {
  event.preventDefault();

  cardTitle.textContent = imgTitleInput.value;
  cardImgLink.src = imgLinkInput.value;

  const cardElement = card.cloneNode(true);

  cards.prepend(cardElement);

  imgTitleInput.value = '';
  imgLinkInput.value = '';

  closePopup(addCardPopup);
};

addFormElement.addEventListener('submit', addNewCard);

// like and delete card, open photo popup
const photoPopup = document.querySelector('.popup_type_photo');
const openedPhoto = photoPopup.querySelector('.popup__image');
const openedPhotoCapture = photoPopup.querySelector('.popup__caption');

cards.onclick = function(event) {
  let pressedElement = event.target;

  if (pressedElement.className === 'element__like-btn') {
    pressedElement.classList.add('element__like-btn_clicked');
  } else if (pressedElement.className === 'element__delete-btn') {
    pressedElement.closest('.element').remove();
  } else if (pressedElement.className === 'element__image') {
    openPopup(photoPopup);
    openedPhoto.src = pressedElement.closest('.element__image').src;
    openedPhoto.alt = pressedElement.nextElementSibling.firstElementChild.textContent;
    openedPhotoCapture.textContent = pressedElement.nextElementSibling.firstElementChild.textContent;
  } else {
    return;
  }
};

// close photo popup
const photoPopupCloseBtn = photoPopup.querySelector('.popup__close-btn');

photoPopupCloseBtn.addEventListener('click', function() {
  closePopup(photoPopup);
});
