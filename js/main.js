/* eslint-disable no-console */
import './gallery-filter.js';
import './effects.js';
import './base-form.js';
import {loadData} from './api.js';
import {renderMiniaturePictures} from './miniatures.js';

let loadedPhotos = [];

const onSuccess = (data) => {
  loadedPhotos = data.slice();
  renderMiniaturePictures(loadedPhotos);
  const event = new CustomEvent('photosLoaded', { detail: loadedPhotos });
  document.dispatchEvent(event);
};

const onFail = () => {
  const messageAlert = document.createElement('div');
  messageAlert.textContent = 'Ошибка загрузки фотографий';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.position = 'absolute';
  messageAlert.style.padding = '10px 3px';
  messageAlert.style.fontSize = '30px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.style.textAlign = 'center';
  document.body.append(messageAlert);
};

loadData(onSuccess, onFail);
