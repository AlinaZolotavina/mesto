export const popupElements = Array.from(document.querySelectorAll('.popup'));

export const editProfilePopup = document.querySelector('.popup_type_edit-profile');
export const editProfileBtn = document.querySelector('.profile__edit-btn');
export const editFormElement = editProfilePopup.querySelector('.form');
export const nameInput = editFormElement.querySelector('.form__input_type_name');
export const jobInput = editFormElement.querySelector('.form__input_type_job');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const addCardPopup = document.querySelector('.popup_type_add-photo');
export const addCardBtn = document.querySelector('.profile__add-btn');
export const addFormElement = addCardPopup.querySelector('.form');
export const imgTitleInput = addCardPopup.querySelector('.form__input_type_title');
export const imgLinkInput = addCardPopup.querySelector('.form__input_type_link');
export const cards = document.querySelector('.elements__list');
export const cardListSelector = '.elements__list';

export const photoPopup = document.querySelector('.popup_type_photo');
export const openedPhoto = photoPopup.querySelector('.popup__image');
export const openedPhotoCapture = photoPopup.querySelector('.popup__caption');

export  const settingsObj = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClassActive: 'form__input-error_active'
}

export const userDataSelectors = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
};
