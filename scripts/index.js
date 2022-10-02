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
  nicknameInput.value = nickname.textContent.trim();
  descriptionInput.value = description.textContent.trim();
  profilePopup.classList.add('popup_opened');
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

const newPostForm = document.forms.newPostForm;
const nameInput = newPostForm.elements.name;
const imageLinkInput = newPostForm.elements['image-link'];

addPostBtn.addEventListener('click', function () {
  newPostPopup.classList.add('popup_opened');
});

newPostForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addPost(nameInput.value, imageLinkInput.value);
  newPostPopup.classList.remove('popup_opened');
});

// Initial Posts

const initialPosts = [
  {
    name: 'Великий Устюг',
    link: './images/item_1.jpg',
  },
  {
    name: 'Александровск-Сахалинский',
    link: './images/item_2.jpg',
  },
  {
    name: 'Мурманск',
    link: './images/item_3.jpg',
  },
  {
    name: 'Белгород',
    link: './images/item_4.jpg',
  },
  {
    name: 'Миасс',
    link: './images/item_5.jpg',
  },
  {
    name: 'Выборг',
    link: './images/item_6.jpg',
  },
];

const postTemplate = document.querySelector('#post').content;
const showcaseList = document.querySelector('.showcase__list');

initialPosts.forEach(function (post) {
  addPost(post.name, post.link);
});

function addPost(name, link) {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postImgElement = postElement.querySelector('.post__img');

  postImgElement.src = link;
  postImgElement.alt = name;
  postElement.querySelector('.post__caption').textContent = name;

  showcaseList.prepend(postElement);
}

// Post Actions
const imgPopup = document.getElementById('imagePopup');
const imgPopupImage = imgPopup.querySelector('.popup-img__image');
const imgPopupCaption = imgPopup.querySelector('.popup-img__caption');

showcaseList.addEventListener('click', function (event) {
  if (event.target.matches('.post__btn-like')) {
    event.target.classList.toggle('post__btn-like_active');
  }

  if (event.target.matches('.post__btn-trash')) {
    event.target.parentElement.remove();
  }

  if (event.target.matches('.post__img')) {
    imgPopupImage.src = event.target.src;
    imgPopupImage.alt = event.target.alt;
    imgPopupCaption.textContent = event.target.alt;
    imgPopup.classList.add('popup_opened');
  }
});
