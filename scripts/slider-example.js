import Slider from './slider.js';
const selectors = {
  wrapperSelector: '.container-with-slider',
  sliderSelector: '.slider',
  sliderTrackSelector: '.slider__list',
  sliderItemSelector: '.slider__item',
  sliderLeftButtonSelector: '.slider__arrow_type_prev',
  sliderRightButtonSelector: '.slider__arrow_type_next'
};

const slider = new Slider(selectors);

slider.init();
