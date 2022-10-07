const popups = document.querySelectorAll('.popup');

const profileEditBtn = document.querySelector('.profile__btn-edit');
const profilePopup = document.getElementById('profilePopup');
const nickname = document.querySelector('.profile__nickname');
const description = document.querySelector('.profile__description');

const profileForm = document.forms.profileForm;
const nicknameInput = profileForm.elements.nickname;
const descriptionInput = profileForm.elements.description;

const addPostBtn = document.querySelector('.profile__btn-add');
const newPostPopup = document.getElementById('newPostPopup');

const newPostForm = document.forms.newPostForm;
const nameInput = newPostForm.elements.name;
const imageLinkInput = newPostForm.elements['image-link'];

const postTemplate = document.querySelector('#post').content;
const showcaseList = document.querySelector('.showcase__list');

const imgPopup = document.getElementById('imagePopup');
const imgPopupImage = imgPopup.querySelector('.popup-img__image');
const imgPopupCaption = imgPopup.querySelector('.popup-img__caption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function createPost(name, link) {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postImgElement = postElement.querySelector('.post__img');
  const likeBtn = postElement.querySelector('.post__btn-like');
  const trashBtn = postElement.querySelector('.post__btn-trash');
  const postImg = postElement.querySelector('.post__img');

  postImgElement.src = link;
  postImgElement.alt = name;
  postElement.querySelector('.post__caption').textContent = name;

  likeBtn.addEventListener('click', function () {
    likeBtn.classList.toggle('post__btn-like_active');
  });

  trashBtn.addEventListener('click', function () {
    trashBtn.parentElement.remove();
  });

  postImg.addEventListener('click', function () {
    imgPopupImage.src = postImg.src;
    imgPopupImage.alt = postImg.alt;
    imgPopupCaption.textContent = postImg.alt;
    openPopup(imgPopup);
  });

  return postElement;
}

function addPost(postElement) {
  showcaseList.prepend(postElement);
}

profileEditBtn.addEventListener('click', function () {
  nicknameInput.value = nickname.textContent.trim();
  descriptionInput.value = description.textContent.trim();
  openPopup(profilePopup);
});

profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  nickname.textContent = nicknameInput.value;
  description.textContent = descriptionInput.value;
  closePopup(profilePopup);
});

addPostBtn.addEventListener('click', function () {
  newPostForm.reset();
  openPopup(newPostPopup);
});

newPostForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const postElement = createPost(nameInput.value, imageLinkInput.value);
  addPost(postElement);
  closePopup(newPostPopup);
});

popups.forEach(function (popup) {
  const closeBtn = popup.querySelector('.popup__btn-close');
  closeBtn.addEventListener('click', function () {
    closePopup(popup);
  });
});

initialPosts.forEach(function (post) {
  const postElement = createPost(post.name, post.link);
  addPost(postElement);
});
