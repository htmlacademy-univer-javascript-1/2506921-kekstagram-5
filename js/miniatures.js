import {photos, photoContainer} from './render.js';

const fullPicture = document.querySelector('.big-picture');
const closeButton = fullPicture.querySelector('.big-picture__cancel');

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  fullPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
}

function openBigPicture(photo) {
  fullPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscPress);

  fullPicture.querySelector('.big-picture__img img').src = photo.url;
  fullPicture.querySelector('.big-picture__img img').alt = photo.description;
  fullPicture.querySelector('.likes-count').textContent = photo.likes;
  fullPicture.querySelector('.comments-count').textContent = photo.comments.length;
  fullPicture.querySelector('.social__caption').textContent = photo.description;

  const commentsList = fullPicture.querySelector('.social__comments');
  commentsList.innerHTML = '';

  photo.comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsList.appendChild(commentElement);
  });

  fullPicture.querySelector('.social__comment-count').classList.add('hidden');
  fullPicture.querySelector('.comments-loader').classList.add('hidden');
}

function createCommentElement(comment) {
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;

  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  commentElement.appendChild(commentAvatar);
  commentElement.appendChild(commentText);
  return commentElement;
}

photoContainer.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture');
  if (target) {
    const photoIndex = [...photoContainer.querySelectorAll('.picture')].indexOf(target);
    const photoData = photos[photoIndex];
    openBigPicture(photoData);
  }
});

closeButton.addEventListener('click', closeBigPicture);
