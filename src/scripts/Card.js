export class Card {
  constructor(data, templateSelector, handleCardClick, api, userId, openConfirm) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._userId = userId;
    this._openConfirm = openConfirm;
  }

  _getTemplate() {
    const postTemplate = document.querySelector(this._templateSelector).content;
    return postTemplate.querySelector('.post').cloneNode(true);
  }

  _handleLike() {
    this._api
      .toggleLike(this._id, this._likeBtn.classList.contains('post__btn-like_active'))
      .then((data) => {
        this._totalLikes.textContent = data.likes.length;
        this._likeBtn.classList.toggle('post__btn-like_active');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLike();
    });

    this._trashBtn.addEventListener('click', () => {
      this._openConfirm(this._id, this._element);
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
    this._totalLikes = this._element.querySelector('.post__total-likes');
    this._setEventListeners();

    const postImgElement = this._element.querySelector('.post__img');
    postImgElement.src = this._link;
    postImgElement.alt = this._name;
    this._element.querySelector('.post__caption').textContent = this._name;
    this._element.querySelector('.post__total-likes').textContent = this._likes.length;

    const isLiked = this._likes.find((like) => like._id === this._userId);
    if (isLiked) {
      this._likeBtn.classList.add('post__btn-like_active');
    }

    if (this._ownerId != this._userId) {
      this._trashBtn.remove();
    }

    return this._element;
  }
}
