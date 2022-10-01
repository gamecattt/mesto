// Popups
const popups = document.querySelectorAll('.popup');

popups.forEach(function (popup) {
  const closeBtn = popup.querySelector('.popup__btn-close');
  closeBtn.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
  });
});

// Profile

const profileEditBtn = document.querySelector('.profile__btn-edit');
const profilePopup = document.getElementById('profilePopup');
const nickname = document.querySelector('.profile__nickname');
const description = document.querySelector('.profile__description');

const profileForm = document.forms.profileForm;
const nicknameInput = profileForm.elements.nickname;
const descriptionInput = profileForm.elements.description;

profileEditBtn.addEventListener('click', function () {
  profilePopup.classList.add('popup_opened');
  nicknameInput.value = nickname.textContent.trim();
  descriptionInput.value = description.textContent.trim();
});

profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  nickname.textContent = nicknameInput.value;
  description.textContent = descriptionInput.value;
  profilePopup.classList.remove('popup_opened');
});

// New post

const addPostBtn = document.querySelector('.profile__btn-add');
const newPostPopup = document.getElementById('newPostPopup');

addPostBtn.addEventListener('click', function () {
  newPostPopup.classList.add('popup_opened');
});

// Initial Posts

const initialPosts = [
  {
    name: 'Великий Устюг',
    link: './images/item_1.jpg',
    alt: 'Резиденция Деда Мороза',
  },
  {
    name: 'Александровск-Сахалинский',
    link: './images/item_2.jpg',
    alt: 'Скалы Три брата',
  },
  {
    name: 'Мурманск',
    link: './images/item_3.jpg',
    alt: 'Мемориал - Защитникам Советского Заполярья',
  },
  {
    name: 'Белгород',
    link: './images/item_4.jpg',
    alt: 'Белгородский университет',
  },
  {
    name: 'Миасс',
    link: './images/item_5.jpg',
    alt: 'Гора Керосинка',
  },
  {
    name: 'Выборг',
    link: './images/item_6.jpg',
    alt: 'Старый город',
  },
];

const postTemplate = document.querySelector('#post').content;
const showcaseList = document.querySelector('.showcase__list');

initialPosts.forEach(function (post) {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postImgElement = postElement.querySelector('.post__img');

  postImgElement.src = post.link;
  postImgElement.alt = post.alt;
  postElement.querySelector('.post__caption').textContent = post.name;

  showcaseList.append(postElement);
});
