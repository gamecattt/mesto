export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const postTemplate = document.querySelector(this._templateSelector).content;
    return postTemplate.querySelector('.post').cloneNode(true);
  }

  _handleLike() {
    this._likeBtn.classList.toggle('post__btn-like_active');
  }

  _handleTrash() {
    this._element.remove();
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

    return this._element;
  }
}
