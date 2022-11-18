/**
@param {number} from Целое положительное число
@param {number} to Целое положительное число, которое больше предыдущего
@returns {number} Случайное число в заданном промежутке включительно
*/
const getRandomInteger = (from, to) => {
  const randomNumber = from + Math.random() * (to + 1 - from);
  return Math.floor(randomNumber);
};

/**
 * Функция для проверки аргументов в другой функции
 * @param {*} first Предпочтительно положительное число
 * @param {*} second Предпочтительно положительное число
 * @return {null | number []} Возвращает `null`, если аргументы не числа или меньше нуля, а так же массив исходных значений по возрастанию
*/
const checkFunctionArguments = (first, second) => {
  if (typeof first !== 'number' || typeof second !== 'number') {
    return null;
  }

  if (first < 0 || second < 0) {
    return null;
  }

  return second < first ? [first, second] : [second, first];
};

/**
 * Возвращает случайное число в заданом диапазоне, проверяет на типы и что число положительное
 * @param {*} a Предпочтительно положительное число
 * @param {*} b Предпочтительно положительное число
 * @param {number} Случайное целое число в заданном промежутке включительно или `Nan`, если аргументы не подходящие
*/
const getRandomIntegerWithChecks = (a, b) => {
  const resultCheck = checkFunctionArguments(a, b);

  /** Проверяем, что число положительное */
  if (resultCheck === null) {
    return NaN;
  }

  /** Поддержка передачи чисел в любом порядке, т.е. если b меньше а, то они меняются местами */
  [a, b] = resultCheck;

  a = Math.ceil(a); // Округление значения в сторону плюс бесконечности
  b = Math.floor(b); // Округлите значение в сторону минус бесконечности

  return getRandomInteger(a, b);
};

/**
 * @param {*} a Предпочительно положительное число
 * @param {*} b Предпочительно положительное число
 * @param {*} [precision=1] Предпочительно положительное число
 * @returns {number} Случайное число с плавающей точкой или `NaN`, если аргументы не подходящие
 */
const getRandomFloat = (a, b, precision = 1) => {
  const resultCheck = checkFunctionArguments(a, b);

  if (resultCheck === null || typeof precision !== 'number' || precision < 0) {
    return NaN;
  }

  if (a < 0 || b < 0 || precision < 0) {
    return NaN;
  }

  [a, b] = resultCheck;

  /**
   * Получаем рандомное число от 0 до 1
   * Умножаем на разницу между переданными числами и прибавляем второе значение
  */
  const result = b + Math.random() * (a - b);

  return +result.toFixed(precision);
};


/**
 * @template Type
 * @param {Type[]} elements
 * @returns {Type} случайный элемент из переданного массива
 */
const getRandomArrayItem = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export { getRandomInteger, checkFunctionArguments, getRandomIntegerWithChecks, getRandomFloat, getRandomArrayItem };
