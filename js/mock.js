import { getRandomInteger, getRandomFloat, getRandomArrayItem } from './random.js';
import { formatNumber } from './utils.js';

const AMOUNT_OF_ADS = 10;

/**
 * @typedef {'palace'| 'flat'| 'house'| 'bungalow'| 'hotel'} HousingType
 * @typedef {'wifi' | 'dishwasher' | 'parking' | 'washer' | 'elevator' | 'conditioner'} Feature
 */
const TITLES = [
  'Квартира свободной планировки 174,1 м²',
  'Огромный пентхаус',
  'Апартаменты от застройщика в ЖК Voxhall',
  'Апартаменты-студия 26,9 м²',
  'Дом под ключ с бассейн и хамамом'
];

/** @type {HousingType[]} */
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

/**
 * Случайное количество, значения не повторяются
 * @returns {Feature[]}
 */
const mockFeatures = () => {

  /** @constant @type {Feature} */
  const remainFeatures = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];

  const length = getRandomInteger(0, remainFeatures.length);

  return Array.from({length}, () => {
    const randomIndex = getRandomInteger(0, remainFeatures.length - 1);
    const feature = remainFeatures[randomIndex];
    remainFeatures.splice(randomIndex, 1);

    return feature;
  });
};

const DESCRIPTIONS = [
  'Двухкомнатная квартира в кирпичном кооперативном доме с огороженной территорией.',
  'Квартира после дизайнерского ремонта с использованием дорогостоящих материалов. Планировка узаконена.',
  'Функциональная планировка: кухня-гостиная, изолированная спальня, 1 раздельный СУ с ванной, лоджия.',
  'Есть все необходимое из мебели и бытовой техники.',
  'Светлая, уютная квартира, окна на 3 стороны!'
];

/** @returns одно из заготовленных значений */
const mockPhoto = () => {
  const URLS = ['duonguyen-8LrGtIxxa4w', 'brandon-hoogenboom-SNxQGWxZQi0', 'claire-rendall-b6kAwr1i0Iw'];

  return `https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/${getRandomArrayItem(URLS)}.jpg`;
};

export const mockAd = (_, index) => {

  const randomLat = getRandomFloat(35.65, 35.7, 5);
  const randomLng = getRandomFloat(139.7, 139.8, 5);

  return {
    author: {
      avatar: `img/avatars/user${formatNumber((index + 1))}.png`
    },
    offer: {
      title: getRandomArrayItem(TITLES),
      address: `${randomLat}, ${randomLng}`,
      price: getRandomInteger(500, 9000),
      type: getRandomArrayItem(TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 15),
      checkin: `${getRandomInteger(12, 14)}:00`,
      checkout: `${getRandomInteger(12, 14)}:00`,
      description: getRandomArrayItem(DESCRIPTIONS),
      photos: Array.from({length:getRandomInteger(0, 10)}, mockPhoto),
      features: mockFeatures()
    },
    location:{
      lat: randomLat,
      lng: randomLng
    },
  };
};

export const adMocks = Array.from({length: AMOUNT_OF_ADS}, mockAd);
