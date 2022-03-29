import initialCards from './initialCards.js';
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

// functions
export const openPopup = function(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
};

const openEditProfilePopup = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  validateProfileForm.resetError();
  openPopup(editProfilePopup);
}

const openAddCardPopup = function() {
  addFormElement.reset();
  validatePhotoform.resetError();
  openPopup(addCardPopup);
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
};

const changeProfileInfo = function() {
  if (nameInput.value !== profileName.textContent) {
    profileName.textContent = nameInput.value;
  }
  if (jobInput.value !== profileJob.textContent) {
    profileJob.textContent = jobInput.value;
  }
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  changeProfileInfo();
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
  validatePhotoform.blockButton();
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
  const cardElement = createCard(item);
  cards.prepend(cardElement);
});

// enable validation
const validateProfileForm = new FormValidator(settingsObj, editFormElement);
const validatePhotoform = new FormValidator(settingsObj, addFormElement);

validateProfileForm.enableValidation();
validatePhotoform.enableValidation();

// set event listeners
editProfileBtn.addEventListener('click', function() {
  openEditProfilePopup();
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
  openAddCardPopup();
});

addFormElement.addEventListener('submit', addNewCard);
