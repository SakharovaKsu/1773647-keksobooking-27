import { setAdPins } from './map.js';
import { debounce } from './utils.js';

const priceHousing = {
  MIN: 10000,
  MAX: 50000,
};
const RERENDER_DELAY = 1000;
const FILTER_ALL = 'any';

/** @type {HTMLFormElement} */
const filterForm = document.querySelector('.map__filters');

/** @type {RadioNodeList} */
const features = filterForm.features;

const getFiltersValue = () => ({
  type: filterForm['housing-type'].value,
  price: filterForm['housing-price'].value,
  rooms: filterForm['housing-rooms'].value,
  guests: filterForm['housing-guests'].value,
});

/**
 * @returns {string[]}
 */
const getCheckedFeatures = () => {
  const result = [];
  for(const feature of features) {
    if(feature.checked) {
      result.push(feature.value);
    }
  }
  return result;
};

/**
 * @param {{offer: {price: Number}}} offer
 * @param {Number} price
 * @return {Boolean}
 */
const isFilteringByPrice = (offer, price) => {
  switch (price) {
    case 'low':
      return offer.price < priceHousing.MIN;
    case 'middle':
      return offer.price < priceHousing.MAX && offer.price > priceHousing.MIN;
    case 'high':
      return offer.price >= priceHousing.MAX;
    default: // any
      return true;
  }
};

/**
 * Проверяет по ключам
 * @param {string | number} value
 * @param {string} filterValue
 * @returns
 */
const isFilteringByValue = (value, filterValue) => filterValue === FILTER_ALL || String(value) === String(filterValue);

const getFilterHandler = (allLocations) => () => {
  const filterValue = getFiltersValue();
  const checkedFeatures = getCheckedFeatures();

  const filteredLocations = allLocations.filter(({offer}) => {
    if(!isFilteringByValue(offer.type, filterValue.type)) {
      return false;
    }

    if(!isFilteringByValue(offer.rooms, filterValue.rooms)) {
      return false;
    }

    if(!isFilteringByValue(offer.guests, filterValue.guests)) {
      return false;
    }

    if(!isFilteringByPrice(offer.price, filterValue.price)) {
      return false;
    }

    if(checkedFeatures.length === 0) {
      return true;
    }

    if(offer.features === undefined) {
      return true;
    }

    return checkedFeatures.every((feature) =>
      offer.features.includes(feature)
    );
  });

  setAdPins(filteredLocations);
};

const blockFilter = () => {
  [filterForm].forEach((form) => {
    form.classList.add('map__filters--disabled');});
};

const initFilter = (allLocations) => {
  setAdPins(allLocations);
  const debouncedInputFilter = debounce(getFilterHandler(allLocations), RERENDER_DELAY);
  filterForm.addEventListener('input', debouncedInputFilter);
  filterForm.addEventListener('reset', debouncedInputFilter);
};

const resetFilters = () => filterForm.reset();

export { initFilter, resetFilters, filterForm, blockFilter};
