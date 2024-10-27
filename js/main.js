/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const COUNT_PHOTO = 25;
const COUNT_AVATAR = 6;
const COMMENTS_ID = {MIN: 1, MAX: 500};
const COMMENTS = {MIN: 0, MAX: 30};
const LIKES = {MIN: 15, MAX: 200};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула и у неё получилась фотография лучше.',
  'Я поскользнулся и уронил фотоаппарат, и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Это мой лучший кадр!',
  'Прекрасный день на природе!',
  'В каждом кадре частичка души!',
  'Немного счастья!',
  'Мой город!'
];

const USER_NAMES = ['Иван', 'Магомед', 'Дмитрий', 'Константин', 'Екатерина', 'Анна'];

const createComments = () => {
  const comments = [];
  const numberOfComments = getRandomInt(COMMENTS.MIN, COMMENTS.MAX);

  for (let i = 0; i < numberOfComments; i++) {
    comments.push({
      id: getRandomInt(1, COMMENTS_ID.MAX),
      avatar: `img/avatar-${getRandomInt(1, COUNT_AVATAR)}.svg`,
      message: `${pickRandomElement(COMMENT_MESSAGES)} ${Math.random() < 0.5 ? pickRandomElement(COMMENT_MESSAGES) : ''}`.trim(),
      name: pickRandomElement(USER_NAMES),
    });
  }
  return comments;
};


const createPhotoList = () => {
  const photoList = [];

  for (let i = 1; i <= COUNT_PHOTO; i++) {
    photoList.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: pickRandomElement(DESCRIPTIONS),
      likes: getRandomInt(LIKES.MIN, LIKES.MAX),
      comments: createComments(),
    });
  }

  return photoList;
};

const photos = createPhotoList();
console.log(photos);
