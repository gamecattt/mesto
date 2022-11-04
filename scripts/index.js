import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialPosts } from './initialPosts.js';

const popups = document.querySelectorAll('.popup');

const profileEditBtn = document.querySelector('.profile__btn-edit');
const profilePopup = document.getElementById('profilePopup');
const nickname = document.querySelector('.profile__nickname');
const description = document.querySelector('.profile__description');

const profileForm = document.forms.profileForm;
const nicknameInput = profileForm.elements.nickname;
const descriptionInput = profileForm.elements.description;

const postAddBtn = document.querySelector('.profile__btn-add');
const newPostPopup = document.getElementById('newPostPopup');

const newPostForm = document.forms.newPostForm;
const nameInput = newPostForm.elements.name;
const imageLinkInput = newPostForm.elements['image-link'];

const showcaseList = document.querySelector('.showcase__list');

const validationConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__btn-submit',
  inputErrorClass: 'popup-form__input_type_error',
};

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const newPostFormValidator = new FormValidator(validationConfig, newPostForm);

const keyupHandler = function (event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', keyupHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', keyupHandler);
}

function addPost(postElement) {
  showcaseList.prepend(postElement);
}

profileEditBtn.addEventListener('click', function () {
  nicknameInput.value = nickname.textContent.trim();
  descriptionInput.value = description.textContent.trim();
  openPopup(profilePopup);
  profileFormValidator.clearValidation();
});

profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  nickname.textContent = nicknameInput.value;
  description.textContent = descriptionInput.value;
  closePopup(profilePopup);
});

postAddBtn.addEventListener('click', function () {
  newPostForm.reset();
  openPopup(newPostPopup);
  newPostFormValidator.clearValidation();
});

newPostForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const card = new Card(
    {
      name: nameInput.value,
      link: imageLinkInput.value,
    },
    '#post',
    openPopup
  );
  const postElement = card.generateCard();
  addPost(postElement);
  closePopup(newPostPopup);
});

popups.forEach(function (popup) {
  popup.addEventListener('click', function (event) {
    if (
      event.target.classList.contains('popup') ||
      event.target.classList.contains('popup__btn-close')
    ) {
      closePopup(popup);
    }
  });
});

initialPosts.forEach(function (post) {
  const card = new Card(post, '#post', openPopup);
  const postElement = card.generateCard();
  addPost(postElement);
});

profileFormValidator.enableValidation();
newPostFormValidator.enableValidation();
