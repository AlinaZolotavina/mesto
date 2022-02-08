const profileEditBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');

// open popup
const openPopup = function() {
    popup.classList.add('popup_is-opened');
};

profileEditBtn.addEventListener('click', openPopup);

// close popup
const closePopup = function() {
    popup.classList.remove('popup_is-opened');
};

popupCloseBtn.addEventListener('click', closePopup);

// activate like-btn 
for (let likeBtn of  document.querySelectorAll('.element__like-btn')) {
    likeBtn.addEventListener('click', function() {
        likeBtn.classList.add('element__like-btn_clicked');
    });
};

// edit profile information
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function formSubmitHandler (event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);