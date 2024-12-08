const closeButton = document.querySelector('#picture-cancel');
const fullPicture = document.querySelector('.big-picture');

const closeFullPicture = () => {
  fullPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const closeOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    closeFullPicture();
  }
};

document.addEventListener('keydown', closeOnEsc);
closeButton.addEventListener('click', closeFullPicture);
export {closeOnEsc};
