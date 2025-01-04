import { determineCommentEnding } from './util.js';

const COMMENTS_STEP = 5;

const elements = {
  closeButton: document.querySelector('#picture-cancel'),
  bigPicture: document.querySelector('.big-picture'),
  bigPictureImg: document.querySelector('.big-picture__img img'),
  likesCount: document.querySelector('.likes-count'),
  commentsCount: document.querySelector('.comments-count'),
  commentsLoader: document.querySelector('.comments-loader'),
  socialCommentsList: document.querySelector('.social__comments'),
  socialCaption: document.querySelector('.social__caption'),
  commentCountBlock: document.querySelector('.social__comment-count'),
};

let commentsToRender = [];
let shownCommentsCount = 0;

function closeImagePreview() {
  elements.bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscPress);
  commentsToRender = [];
  shownCommentsCount = 0;
}

function handleEscPress(event) {
  if (event.key === 'Escape') {
    closeImagePreview();
  }
}

elements.closeButton.addEventListener('click', closeImagePreview);
elements.commentsLoader.addEventListener('click', updateCommentList);
export { showImagePreview };
