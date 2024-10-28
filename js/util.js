/* eslint-disable no-unused-vars */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandomElement = (array) => array[getRandomInt(0, array.length - 1)];
