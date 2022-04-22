import '../pages/index.css';

import initialCards from '../scripts/utils/initialCards.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { editProfileBtn, editFormElement, nameInput, jobInput, addCardBtn, addFormElement, cardListSelector, settingsObj, userDataSelectors, popupConfig } from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';

// edit profile
const userInfoElement = new UserInfo(userDataSelectors);

const editProfilePopup = new PopupWithForm({
  popupSelector: popupConfig.editProfilePopup,
  formSubmitCallBack: (data) => {
      userInfoElement.setUserInfo(data);
  }
})

editProfilePopup.setEventListeners();

// photo popup
const photoPopup = new PopupWithImage({
  popupSelector: popupConfig.photoPopup
});

photoPopup.setEventListeners();

const handleCardClick = function(data) {
  photoPopup.open(data);
}

// render initial cards and add new card
export const createCard = (data) => {
  const card = new Card({ data, handleCardClick }, '#card');
  return card.generateCard();
};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
},
cardListSelector
);

cardList.renderItems();

const addNewCard = (data) => {
  cardList.addItem(createCard(data))
}

const addCardPopup = new PopupWithForm({
  popupSelector: popupConfig.addCardPopup,
  formSubmitCallBack: addNewCard
});

addCardPopup.setEventListeners();

// enable validation
const validateProfileForm = new FormValidator(settingsObj, editFormElement);
const validatePhotoform = new FormValidator(settingsObj, addFormElement);

validateProfileForm.enableValidation();
validatePhotoform.enableValidation();

// set event listeners
editProfileBtn.addEventListener('click', () => {
  const data = userInfoElement.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  validateProfileForm.resetError();
  editProfilePopup.open();
});

addCardBtn.addEventListener('click', function() {
  addCardPopup.open();
  validatePhotoform.blockButton();
});
