import { PopupWithForm } from './PopupWithForm.js';

export class Card {
  constructor(data, templateSelector, handleCardClick, api) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
  }

  _getTemplate() {
    const postTemplate = document.querySelector(this._templateSelector).content;
    return postTemplate.querySelector('.post').cloneNode(true);
  }

  _handleLike() {
    if (!this._likeBtn.classList.contains('post__btn-like_active')) {
      this._api
        .like(this._id)
        .then((data) => {
          this._element.querySelector('.post__total-likes').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .dislike(this._id)
        .then((data) => {
          this._element.querySelector('.post__total-likes').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this._likeBtn.classList.toggle('post__btn-like_active');
  }

  _handleTrash() {
    const confirmPopup = new PopupWithForm('#confirmPopup', () => {
      this._api
        .deletePost(this._id)
        .then(() => {
          this._element.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    confirmPopup.open();
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLike();
    });

    this._trashBtn.addEventListener('click', () => {
      this._handleTrash();
    });

    this._postImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.post__btn-like');
    this._trashBtn = this._element.querySelector('.post__btn-trash');
    this._postImg = this._element.querySelector('.post__img');
    this._setEventListeners();

    const postImgElement = this._element.querySelector('.post__img');
    postImgElement.src = this._link;
    postImgElement.alt = this._name;
    this._element.querySelector('.post__caption').textContent = this._name;
    this._element.querySelector('.post__total-likes').textContent = this._likes.length;

    const isLiked = this._likes.find((like) => like._id === 'bc9f3d96fc937a85c6ec8ae4');
    if (isLiked) {
      this._likeBtn.classList.add('post__btn-like_active');
    }

    if (this._ownerId != 'bc9f3d96fc937a85c6ec8ae4') {
      this._trashBtn.remove();
    }

    return this._element;
  }
}
