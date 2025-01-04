/* eslint-disable no-console */
import './render.js';
import './miniatures.js';
import './full-picture.js';
import './form.js';
import { generatePhotoElement } from './render.js';
import {loadData} from './api.js';

let loadedPhotos = [];

const onSuccess = (data) => {
  loadedPhotos = data.slice();
  generatePhotoElement(loadedPhotos);
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
