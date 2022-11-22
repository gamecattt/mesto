import './pages/index.css';

import { PopupWithImage } from './scripts/PopupWithImage.js';
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { initialPosts, validationConfig } from './scripts/constants.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import { Section } from './scripts/Section';

const postsSection = new Section(
  {
    items: initialPosts,
    renderer: (post) => {
      const postElement = createCard(post);
      addPost(postElement);
    },
  },
  '.showcase__list'
);

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

const formValidators = {};
const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
forms.forEach(function (form) {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
  ('');
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
  postsSection.addItem(postElement);
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

postsSection.renderItems();
