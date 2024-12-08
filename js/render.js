import {createPhotoList, PHOTO_COUNT} from './data.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoContainer = document.querySelector('.pictures');

const generatePhotoElement = ({url, description, likes, comments}) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;

  return photoElement;
};


const photos = createPhotoList(PHOTO_COUNT);
const fragment = document.createDocumentFragment();


photos.forEach((photo) => {
  const miniature = generatePhotoElement(photo);
  fragment.appendChild(miniature);
});

photoContainer.appendChild(fragment);

export {photos, photoContainer};
