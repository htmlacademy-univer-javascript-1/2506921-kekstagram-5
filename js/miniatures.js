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
  fullPicture.querySelector('.social__caption').textContent = photo.description;

  const commentsList = fullPicture.querySelector('.social__comments');
  commentsList.innerHTML = '';

  const commentsCountElement = fullPicture.querySelector('.social__comment-count');
  const commentsLoader = fullPicture.querySelector('.comments-loader');

  let showComments = 0;

  function renderComments() {
    const commentsToShow = photo.comments.slice(showComments, showComments + 5);

    commentsToShow.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      commentsList.appendChild(commentElement);
    });

    showComments += commentsToShow.length;
    commentsCountElement.textContent = `${showComments} из ${photo.comments.length} комментариев`;

    if (showComments >= photo.comments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  }

  renderComments();

  if (photo.comments.length > 5) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }

  commentsLoader.addEventListener('click', () => {
    renderComments();
  });

  commentsCountElement.classList.remove('hidden');
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
