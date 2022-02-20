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
const card = cardTemplate.querySelector('.element');
const cardTitle = card.querySelector('.element__title');
const cardImgLink = card.querySelector('.element__image');

initialCards.forEach(function (item) {
  cardTitle.textContent = item.name;
  cardImgLink.src = item.link;

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


// like and delete card
cards.onclick = function(event) {
  let pressedBtn = event.target;

  if (pressedBtn.className === 'element__like-btn') {
    pressedBtn.classList.add('element__like-btn_clicked');
  } else if (pressedBtn.className === 'element__delete-btn') {
    pressedBtn.closest('.element').remove();
  } else {
    return;
  }
};


