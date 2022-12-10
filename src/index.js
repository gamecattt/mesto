import './pages/index.css';

import { PopupWithImage } from './scripts/PopupWithImage.js';
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { validationConfig } from './scripts/constants.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import { Section } from './scripts/Section.js';
import { Api } from './scripts/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'ed4e911e-6353-4900-9ec4-20f0fd0a915f',
    'Content-Type': 'application/json',
  },
});

const postsSection = new Section(
  {
    items: [],
    renderer: (post) => {
      const postElement = createCard(post);
      addPost(postElement);
    },
  },
  '.showcase__list'
);

api
  .getInitialCards()
  .then((cards) => {
    cards.reverse().forEach((card) => {
      addPost(createCard(card));
    });
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo(
  '.profile__nickname',
  '.profile__description',
  '.profile__avatar-img'
);
const imgPopup = new PopupWithImage('#imagePopup');

api
  .getProfile()
  .then((profile) => {
    userInfo.setUserInfo(profile);
  })
  .catch((err) => {
    console.log(err);
  });

const profileEditBtn = document.querySelector('.profile__btn-edit');
const profilePopup = new PopupWithForm('#profilePopup', (data) => {
  profilePopup.handleSubmit(true);
  api
    .updateProfile(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.handleSubmit(false);
    });
});

const postAddBtn = document.querySelector('.profile__btn-add');
const newPostPopup = new PopupWithForm('#newPostPopup', (data) => {
  newPostPopup.handleSubmit(true);
  api
    .createPost(data)
    .then((data) => {
      addPost(createCard(data));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newPostPopup.handleSubmit(false);
    });
});

const avatarEditBtn = document.querySelector('.profile__avatar-edit');
const avatarPopup = new PopupWithForm('#avatarPopup', (data) => {
  avatarPopup.handleSubmit(true);
  api
    .avatarEdit(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.handleSubmit(false);
    });
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
  const card = new Card(data, '#post', handleCardClick, api);
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

avatarEditBtn.addEventListener('click', function () {
  avatarPopup.open();
  formValidators['avatarForm'].clearValidation();
});

postsSection.renderItems();
