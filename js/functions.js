/* eslint-disable no-console */

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
