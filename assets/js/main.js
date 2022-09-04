import SwipeCarousel from "./swipe-carousel.js";
const carousel = new SwipeCarousel({
  containerID: '#slider',
  // slideID: '.item',
  interval: 3000,
  isPlaying: true,
  // direction:'backward'
});
carousel.init();
