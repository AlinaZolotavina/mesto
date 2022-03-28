import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupElements = Array.from(document.querySelectorAll('.popup'));

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const editFormElement = editProfilePopup.querySelector('.form');
const nameInput = editFormElement.querySelector('.form__input_type_name');
const jobInput = editFormElement.querySelector('.form__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const addCardPopup = document.querySelector('.popup_type_add-photo');
const addCardBtn = document.querySelector('.profile__add-btn');
const addFormElement = addCardPopup.querySelector('.form');
const imgTitleInput = addCardPopup.querySelector('.form__input_type_title');
const imgLinkInput = addCardPopup.querySelector('.form__input_type_link');
const cards = document.querySelector('.elements__list');
const addCardPopupSaveBtn = addFormElement.querySelector('.form__save-btn');

export const photoPopup = document.querySelector('.popup_type_photo');
export const openedPhoto = photoPopup.querySelector('.popup__image');
export const openedPhotoCapture = photoPopup.querySelector('.popup__caption');

const settingsObj = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClassActive: 'form__input-error_active'
}

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

// functions
export const openPopup = function(popupElement) {
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

const createCard = function(data) {
  const card = new Card(data, '#card');
  return card.generateCard();
};

function addNewCard (evt) {
  evt.preventDefault();

  const data = {};
  data.name = imgTitleInput.value;
  data.link = imgLinkInput.value;

  const cardElement = createCard(data);
  cards.prepend(cardElement);

  addFormElement.reset();

  addCardPopupSaveBtn.setAttribute('disabled', true);
  addCardPopupSaveBtn.classList.add('form__save-btn_inactive');

  closePopup(addCardPopup);
};

const closeByEscape = function(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

// render initial cards
initialCards.reverse().forEach((item) => {
  const card = new Card(item, '#card');
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
});

// enable validation
const validateProfileForm = new FormValidator(settingsObj, editFormElement);
const validatePhotoform = new FormValidator(settingsObj, addFormElement);

validateProfileForm.enableValidation();
validatePhotoform.enableValidation();

// set event listeners
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
