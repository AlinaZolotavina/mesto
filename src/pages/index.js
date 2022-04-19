import '../pages/index.css';

import initialCards from '../scripts/utils/initialCards.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { editProfileBtn, editFormElement, nameInput, jobInput, addCardBtn, addFormElement, cards, cardListSelector, userDataSelectors, settingsObj } from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';

// edit profile
const userInfoElement = new UserInfo(userDataSelectors);

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', {
  formSubmitCallBack: (data) => {
      if (data.name !== userInfoElement.name) {
        userInfoElement.setUserInfo(data);
      };
      if (data.job !== userInfoElement.job) {
        userInfoElement.setUserInfo(data);
      };
  }
})

// add new card
const addCardPopup = new PopupWithForm('.popup_type_add-photo', {
  formSubmitCallBack: (data) => {

    const cardData = {
      name: data.title,
      link: data.link
    };

    const cardElement = createCard(cardData);
    cards.prepend(cardElement);

    addFormElement.reset();
    validatePhotoform.blockButton();
    addCardPopup.close();
  }
});

export const createCard = (data) => {
  const card = new Card({ data, handleCardClick }, '#card');
  return card.generateCard();
};

const handleCardClick = function(data) {
  const photoPopup = new PopupWithImage('.popup_type_photo');
  photoPopup.open(data);
}

// render initial cards
const initialCardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    initialCardsList.addItem(cardElement);
  }
},
cardListSelector
);

initialCardsList.renderItems();

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
});
