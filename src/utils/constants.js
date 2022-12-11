import post1Image from '../images/item_1.jpg';
import post2Image from '../images/item_2.jpg';
import post3Image from '../images/item_3.jpg';
import post4Image from '../images/item_4.jpg';
import post5Image from '../images/item_5.jpg';
import post6Image from '../images/item_6.jpg';

export const initialPosts = [
  {
    name: 'Великий Устюг',
    link: post1Image,
  },
  {
    name: 'Александровск-Сахалинский',
    link: post2Image,
  },
  {
    name: 'Мурманск',
    link: post3Image,
  },
  {
    name: 'Белгород',
    link: post4Image,
  },
  {
    name: 'Миасс',
    link: post5Image,
  },
  {
    name: 'Выборг',
    link: post6Image,
  },
];

export const validationConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__btn-submit',
  inputErrorClass: 'popup-form__input_type_error',
};
