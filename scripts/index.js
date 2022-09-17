const editBtn = document.querySelector('.profile__btn-edit');
const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__btn-close');
const nickname = document.querySelector('.profile__nickname');
const description = document.querySelector('.profile__description');
const form = document.forms.profileForm;
const nicknameInput = form.elements.nickname;
const descriptionInput = form.elements.description;

editBtn.addEventListener('click', editBtnClickHandler);
closeBtn.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);

function editBtnClickHandler() {
  openPopup();
  nicknameInput.value = nickname.textContent.trim();
  descriptionInput.value = description.textContent.trim();
}

function formSubmitHandler(event) {
  event.preventDefault();
  nickname.textContent = nicknameInput.value;
  description.textContent = descriptionInput.value;
  closePopup();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');
}
