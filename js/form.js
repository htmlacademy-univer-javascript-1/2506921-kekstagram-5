const Config = {
  MAX_TAGS: 5,
  TAGS_REGEX: /^#[A-Za-z0-9а-яё]{1,19}$/i,
};

const Messages = {
  DUPLICATE_TAGS: 'Теги должны быть уникальными',
  TOO_MANY_TAGS: `Допускается не более ${Config.MAX_TAGS} тегов`,
  INVALID_TAG: 'Неправильный формат тега',
};


const SCALE_CFG = {
  DEFAULT_VALUE: 100,
  INCREMENT: 25,
  MAX_VALUE: 100,
  MIN_VALUE: 25,
};

const PICTURE_EFFECTS = {
  none: { filter: '', min: 0, max: 100, step: 1, unit: '', hiddenSlider: true },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
};


const Elements = {
  body: document.body,
  form: document.querySelector('.img-upload__form'),
  overlay: document.querySelector('.img-upload__form .img-upload__overlay'),
  cancelButton: document.querySelector('.img-upload__form .img-upload__cancel'),
  fileField: document.querySelector('.img-upload__form .img-upload__input'),
  hashtagField: document.querySelector('.img-upload__form .text__hashtags'),
  previewImage: document.querySelector('.img-upload__preview img'),

  effectButtons: document.querySelectorAll('.effects__radio'),
  effectSlider: document.querySelector('.effect-level__slider'),
  effectSliderContainer: document.querySelector('.img-upload__effect-level'),
  scaleControlSmaller: document.querySelector('.scale__control--smaller'),
  scaleControlBigger: document.querySelector('.scale__control--bigger'),
  scaleControlValue: document.querySelector('.scale__control--value'),
  effectLevelValue: document.querySelector('.effect-level__value'),
};


const splitCleanTags = (inputString) => inputString.trim().split(/\s+/).filter(Boolean);


const checkTags = (tags) => {
  const uniqueTags = new Set(tags.map((tag) => tag.toLowerCase()));
  return {
    hasValidCount: tags.length <= Config.MAX_TAGS,
    isUnique: uniqueTags.size === tags.length,
    matchesPattern: tags.every((tag) => Config.TAGS_REGEX.test(tag)),
  };
};

const validateTags = (inputValue) => {
  const tagsArray = splitCleanTags(inputValue);
  const { hasValidCount, isUnique, matchesPattern } = checkTags(tagsArray);
  return hasValidCount && isUnique && matchesPattern;
};

const formValidate = new Pristine(Elements.form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error-message',
});


formValidate.addValidator(Elements.hashtagField, validateTags, Messages.INVALID_TAG);
formValidate.addValidator(Elements.hashtagField, (value) => splitCleanTags(value).length <= Config.MAX_TAGS, Messages.TOO_MANY_TAGS, 3, true);
formValidate.addValidator(Elements.hashtagField, (value) => {
  const tags = splitCleanTags(value);
  const uniqueTags = new Set(tags.map((tag) => tag.toLowerCase()));
  return uniqueTags.size === tags.length;
}, Messages.DUPLICATE_TAGS, 2, true);


let activeEffect = 'none';

const updateEffectSlider = (effect) => {
  const {min, max, step, hiddenSlider} = PICTURE_EFFECTS[effect];
  Elements.effectSlider.noUiSlider.updateOptions({ range: { min, max }, start: max, step });
  Elements.effectSliderContainer.classList.toggle('hidden', hiddenSlider || effect === 'none');

};

const updateImageScale = (value) => {
  const scale = Math.min(Math.max(value, SCALE_CFG.MIN_VALUE), SCALE_CFG.MAX_VALUE);
  Elements.scaleControlValue.value = `${scale}%`;
  Elements.previewImage.style.transform = `scale(${scale / 100})`;
};

const applyImageEffect = (effect, value) => {
  const {filter, unit} = PICTURE_EFFECTS[effect];
  Elements.previewImage.style.filter = filter ? `${filter}(${value}${unit})` : '';
  Elements.effectLevelValue.value = value;
};


const resetImageSettings = () => {
  updateImageScale(SCALE_CFG.DEFAULT_VALUE);
  activeEffect = 'none';
  updateEffectSlider(activeEffect);
  Elements.previewImage.style.filter = '';
  Elements.effectSliderContainer.classList.add('hidden');
};

const updateScale = (increment) => {
  const currentValue = parseInt(Elements.scaleControlValue.value, 10);
  updateImageScale(currentValue + increment);
};

Elements.scaleControlSmaller.addEventListener('click', () => updateScale(-SCALE_CFG.INCREMENT));
Elements.scaleControlBigger.addEventListener('click', () => updateScale(SCALE_CFG.INCREMENT));

Elements.effectButtons.forEach((button) => {
  button.addEventListener('change', (evt) => {
    activeEffect = evt.target.value;
    updateEffectSlider(activeEffect);
    applyImageEffect(activeEffect, PICTURE_EFFECTS[activeEffect].max);
  });
});

noUiSlider.create(Elements.effectSlider, {
  range: { min: PICTURE_EFFECTS.none.min, max: PICTURE_EFFECTS.none.max },
  start: PICTURE_EFFECTS.none.max,
  step: PICTURE_EFFECTS.none.step,
  connect: 'lower',
});

Elements.effectSlider.noUiSlider.on('update', (values) => {
  applyImageEffect(activeEffect, values[0]);
});


function onDocumentKeydown(evt) {
  const isTextFieldFocused = document.activeElement.matches('.text__hashtags, .text__description');
  if (evt.key === 'Escape' && !isTextFieldFocused) {
    evt.preventDefault();
    closeModal();
  }
}


function closeModal() {
  Elements.form.reset();
  formValidate.reset();
  resetImageSettings();
  changeModalVisibility(false);
}

function changeModalVisibility(isVisible) {
  Elements.overlay.classList.toggle('hidden', !isVisible);
  Elements.body.classList.toggle('modal-open', isVisible);

  if (isVisible) {
    document.addEventListener('keydown', onDocumentKeydown);
  } else {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

Elements.fileField.addEventListener('change', () => {
  changeModalVisibility(true);
});

Elements.cancelButton.addEventListener('click', closeModal);


Elements.form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formValidate.validate()) {
    Elements.form.submit();
  }
});

updateEffectSlider('none');
