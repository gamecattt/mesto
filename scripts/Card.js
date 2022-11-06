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

  _setEventListeners() {
    const likeBtn = this._element.querySelector('.post__btn-like');
    const trashBtn = this._element.querySelector('.post__btn-trash');
    const postImg = this._element.querySelector('.post__img');

    likeBtn.addEventListener('click', () => {
      likeBtn.classList.toggle('post__btn-like_active');
    });

    trashBtn.addEventListener('click', () => {
      trashBtn.parentElement.remove();
    });

    postImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const postImgElement = this._element.querySelector('.post__img');
    postImgElement.src = this._link;
    postImgElement.alt = this._name;
    this._element.querySelector('.post__caption').textContent = this._name;

    return this._element;
  }
}
