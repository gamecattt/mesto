import './pages/index.css';

import { PopupWithImage } from './scripts/PopupWithImage.js';
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { initialPosts } from './scripts/initialPosts.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';

const showcaseList = document.querySelector('.showcase__list');
const userInfo = new UserInfo('.profile__nickname', '.profile__description');
const imgPopup = new PopupWithImage('#imagePopup');

const profileEditBtn = document.querySelector('.profile__btn-edit');
const profilePopup = new PopupWithForm('#profilePopup', (data) => {
  userInfo.setUserInfo(data);
});

const postAddBtn = document.querySelector('.profile__btn-add');
const newPostPopup = new PopupWithForm('#newPostPopup', (data) => {
  addPost(createCard(data));
});

const validationConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__btn-submit',
  inputErrorClass: 'popup-form__input_type_error',
};

const formValidators = {};
const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
forms.forEach(function (form) {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
  formValidators[form.getAttribute('name')] = formValidator;
});

function handleCardClick(name, link) {
  imgPopup.open(link, name);
}

function createCard(data) {
  const card = new Card(data, '#post', handleCardClick);
  return card.generateCard();
}

function addPost(postElement) {
  showcaseList.prepend(postElement);
}

profileEditBtn.addEventListener('click', function () {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
  formValidators['profileForm'].clearValidation();
});

postAddBtn.addEventListener('click', function () {
  newPostPopup.open();
  formValidators['newPostForm'].clearValidation();
});

initialPosts.forEach(function (post) {
  const postElement = createCard(post);
  addPost(postElement);
});
