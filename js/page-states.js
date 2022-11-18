import { filterForm } from './filter.js';

const adForm = document.querySelector('.ad-form');
const DISABLED_CLASSES = ['ad-form--disabled', 'map__filters--disabled'];

/**
 * @param {string} tag
 * @param {HTMLFormElement} form
 * @param {boolean} [isDisable = true]
 */

const disableElementForm = (tag, form, isDisable = true) => {
  const elements = form.querySelectorAll(tag);

  for (const element of elements) {
    element.disabled = isDisable;
  }
};

const switchAdFormState = (isDisable = true) => {
  [adForm, filterForm].forEach((form, index) => {
    form.classList.toggle(DISABLED_CLASSES[index], isDisable);
    disableElementForm('fieldset', form, isDisable);
  });

  disableElementForm('select', filterForm, isDisable);
};

export{ switchAdFormState };
