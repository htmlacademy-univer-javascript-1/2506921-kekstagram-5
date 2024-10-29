/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */


/*
// функция проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

console.log(checkStringLength('проверяемая строка', 20)); // true
console.log(checkStringLength('проверяемая строка', 18)); // true
console.log(checkStringLength('проверяемая строка', 10)); // false


// функция проверки палиндрома
function isPalindrome(string) {
  // убрать пробел и сделать нижний регистр
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  // инвертирация строки и сравнение
  const reversedString = normalizedString.split('').reverse().join('');
  return normalizedString === reversedString;
}

console.log(isPalindrome('топот')); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс')); // false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true
*/


function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function isMeetingWithinWorkHours(startWork, endWork, meetingStart, meetingDuration) {
  const startWorkMinutes = parseTime(startWork);
  const endWorkMinutes = parseTime(endWork);
  const meetingStartMinutes = parseTime(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= startWorkMinutes && meetingEndMinutes <= endWorkMinutes;
}

// Примеры вызова функции
console.log(isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120)); // true
console.log(isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingWithinWorkHours('14:00', '17:30', '08:0', 90));  // false
console.log(isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900)); // false
