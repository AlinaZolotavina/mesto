import '../pages/index.css';

import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { editProfileBtn, editFormElement, nameInput, jobInput, avatar, addCardBtn, addFormElement, editAvatarFormElement, cardListSelector, settingsObj, userDataSelectors, popupConfig } from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit';

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-40/',
  token: 'c4f5357d-335f-4f00-b321-6e024ea9f5d9',
});

let userId;

// render initial cards and add new card
export const createCard = (data) => {
  const card = new Card({ data, userId, handleCardClick, requestSettingOfLike, requestDeletionOfLike, handleDeleteBtnClick}, '#card');
  return card.generateCard();
};

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
cardListSelector
);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(data => {
    const [ userData, initialCards ] = data;
    userId = userData._id;
    userInfoElement.setUserInfo(userData);
    userInfoElement.setUserAvatar(userData);
    cardList.renderItems(initialCards.reverse())
  })
  .catch((err) => console.log(err));

// edit profile
const userInfoElement = new UserInfo(userDataSelectors);

const editProfilePopup = new PopupWithForm({
  popupSelector: popupConfig.editProfilePopup,
  formSubmitCallBack: (data, button) => {
      renderLoading(button, 'Сохранение...');
      api.changeUserData(data)
      .then((res) => {
        userInfoElement.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(button, 'Сохранить'));
  }
})


const renderLoading = (button, text) => button.textContent = text;

editProfilePopup.setEventListeners();

// edit avatar popup
const editAvatarPopup = new PopupWithForm ({
  popupSelector: popupConfig.editAvatarPopup,
  formSubmitCallBack: (data, button) => {
    renderLoading(button, 'Сохранение...');
    api.changeAvatar(data)
    .then((res) => {
      userInfoElement.setUserAvatar(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(button, 'Сохранить'));
  }
})

editAvatarPopup.setEventListeners();

// photo popup
const photoPopup = new PopupWithImage({
  popupSelector: popupConfig.photoPopup
});

photoPopup.setEventListeners();

const handleCardClick = (data) => {
  photoPopup.open(data);
}

const requestSettingOfLike = (data) => {
  return api.setLike(data);
}

const requestDeletionOfLike = (data) => {
  return api.deleteLike(data);
}

const handleDeleteBtnClick = (data) => {
  deleteCardPopup.data = data;
  deleteCardPopup.open(data);
}

const deleteCardPopup = new PopupWithSubmit({
  popupSelector: popupConfig.popupWithSubmit,
  formSubmitCallback: (data, button) => {
    renderLoading(button, 'Удаление...');
    api.deleteCard(data.cardId)
    .then(() => {
      data.card.remove();
      deleteCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(button, 'Да'));
 }
})

deleteCardPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: popupConfig.addCardPopup,
  formSubmitCallBack: (data, button) => {
    renderLoading(button, 'Создание...');
    const item = {
      name: data.name,
      link: data.link
    };
    api.addCard(item)
    .then((res) => {
      cardList.addItem(createCard(res));
    })
    .finally(() => hideLoading(button, 'Создать'))
  }
});

addCardPopup.setEventListeners();

// enable validation
const validateProfileForm = new FormValidator(settingsObj, editFormElement);
const validatePhotoform = new FormValidator(settingsObj, addFormElement);
const validateAvatarForm = new FormValidator(settingsObj, editAvatarFormElement);

validateProfileForm.enableValidation();
validatePhotoform.enableValidation();
validateAvatarForm.enableValidation();

// set event listeners
editProfileBtn.addEventListener('click', () => {
  const data = userInfoElement.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.about;
  validateProfileForm.resetError();
  editProfilePopup.open();
});

addCardBtn.addEventListener('click', () => {
  addCardPopup.open();
  validatePhotoform.blockButton();
});

avatar.addEventListener('click', () => {
  editAvatarPopup.open();
  validateAvatarForm.resetError();
  validateAvatarForm.blockButton();
})

