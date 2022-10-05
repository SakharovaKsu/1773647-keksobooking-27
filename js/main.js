// TODO: Удалить, временные вызовы, чтобы Eslint не жаловался

getRandomIntegerWithChecks(6.555, 90.4);
getRandomFloat(5.66, 9.69);

/**
 * На основе материала {@link https://learn.javascript.ru/task/random-int-min-max| Learn JS}
@param {number} from Целое положительное число
@param {number} to Целое положительное число, которое больше предыдущего
@returns {number} Случайное число в заданном промежутке включительно
*/

function getRandomInteger (from, to) {
  const randomNumber = from + Math.random() * (to + 1 - from);
  return Math.floor(randomNumber);
}

/**
Возвращает случайное число в заданом диапазоне, проверяет на типы и что число положительное
 * @param {*} a Предпочтительно положительное число
 * @param {*} b Предпочтительно положительное число
 * @param {number} Случайное целое число в заданном промежутке включительно или `Nan`, если аргументы не подходящие
*/

function getRandomIntegerWithChecks(a, b) {
  const resultCheck = checkFunctionArguments(a, b);

  // Проверяем, что число положительное
  if (isNaN (resultCheck)) {
    return resultCheck;
  }

  // Поддержка передачи чисел в любом порядке, т.е. если b меньше а, то они меняются местами
  [a, b] = resultCheck;

  a = Math.ceil(a); // Округление значения в сторону плюс бесконечности
  b = Math.floor(b); // Округлите значение в сторону минус бесконечности

  return getRandomInteger(a, b);
}

/**
 * @param {*} a Предпочительно положительное число
 * @param {*} b Предпочительно положительное число
 * @param {*} [precision=1] Предпочительно положительное число
 * @returns {number} Случайное число с плавающей точкой или `NaN`, если аргументы не подходящие
 */

function getRandomFloat(a, b, precision = 1) {
  const resultCheck = checkFunctionArguments(a, b);

  // Проверяем числа на типы
  if (resultCheck === null || typeof precision !== 'number' || precision < 0) {
    return NaN;
  }

  // Проверяем, что число положительное
  if (a < 0 || b < 0 || precision < 0) {
    return NaN;
  }

  // Поддержка передачи чисел в любом порядке, т.е. если b меньше а, то они меняются местами
  [a, b] = resultCheck;

  // Получаем рандомное число от 0 до 1
  // Уножаем на разницу между переданными числами и прибавляем второе значение
  const result = b + Math.random() * (a - b);

  // С помощью метода toFixed любого числа в JavaScript указываем требуемое количество знаков после точки.
  // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число
  return +result.toFixed(precision);
}

/**
Функция для проверки аргументов в другой функции
 * @param {*} first Предпочтительно положительное число
 * @param {*} second Предпочтительно положительное число
 * @return {null | number[]} Возвращает `null`, если аргументы не числа или меньше нуля, а так же массив исходных значений по возрастанию
*/

function checkFunctionArguments(first, second) {
  // Проверяем числа на типы
  if (typeof first !== 'number' || typeof second !== 'number') {
    return null;
  }

  // Проверяем, что число положительное
  if (first < 0 || second < 0) {
    return null;
  }

  // Поддержка передачи чисел в любом порядке, т.е. если b меньше а, то они меняются местами
  return second < first ? [first, second] : [second, first];
}
