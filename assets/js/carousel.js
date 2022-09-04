class Carousel {
  constructor(params) {

    const settings = {
      ...{
        containerID: "#carousel",
        slideID: ".slide",
        interval: 2000,
        isPlaying: true,
      },
      ...params,
    };
    this.container = document.querySelector(settings.containerID);
    this.slides = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;

  }
  // _initConfig(objectParams) {
  //   const defaultSettings = {
  //     containerID: '#caorousel',
  //     slideID: '.slide',
  //     interval: 5000,
  //     isPlaying: true,
  //     direction: 'forward'
  //   };
  //   if (typeof objectParams !== undefined) {
  //     defaultSettings.containerID = objectParams.containerID || defaultSettings.containerID;
  //     defaultSettings.direction = objectParams.direction || defaultSettings.direction;
  //     defaultSettings.slideID = objectParams.slideID || defaultSettings.slideID;
  //     defaultSettings.interval = objectParams.interval || defaultSettings.interval;
  //     defaultSettings.isPlaying = objectParams.isPlaying || defaultSettings.isPlaying;
  //   }
  //   return defaultSettings;
  // }
  _initProps() {
    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = "ArrowLeft";
    this.CODE_RIGHT_ARROW = "ArrowRight";
    this.CODE_SPACE = "Space";
    this.FA_PAUSE = '<i class="fas fa-pause"></i>';
    this.FA_PLAY = '<i class="fas fa-play"></i>';
    this.FA_PREV = '<i class="fas fa-backward"></i>'
    this.FA_NEXT = '<i class="fas fa-forward"></i>'


    this.currentSlide = 0;
    this.isPlaying = true;
  }

  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', 'indicator');
      indicator.dataset.slideTo = `${i}`;
      if (i === 0) indicator.classList.add('active');

      indicators.append(indicator);
    }
    this.container.append(indicators);
    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  }


  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<span id="pause-btn" class="control control-pause">
    <span id="fa-pause-icon">${this.FA_PAUSE}</span>
    <span id="fa-play-icon">${this.FA_PLAY}</span>
 </span>`;
    const PREV = `<span id="previous-btn" class="control control-prev">${this.FA_PREV}</i></span>`
    const NEXT = `<span id="next-btn" class="control control-next">${this.FA_NEXT}</span>`
    controls.setAttribute('class', 'controls')
    controls.innerHTML = PREV + PAUSE + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#previous-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
    this.pauseIcon = this.container.querySelector("#fa-pause-icon");
    this.playIcon = this.container.querySelector("#fa-play-icon");

    this.isPlaying ? (this.pauseIcon.style.opacity = 1) : (this.playIcon.style.opacity = 1);
  }


  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));

    document.addEventListener('keydown', this._pressKey.bind(this))
    this.container.addEventListener('mouseenter', this._pause.bind(this))
    this.container.addEventListener('mouseleave', this._play.bind(this))
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
  }

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }


  _pause() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.pauseIcon.style.opacity = 0;
      this.playIcon.style.opacity = 1;
      this.pauseBtn.innerHTML = this.FA_PLAY;
      clearInterval(this.timerID);
    }
  }

  _play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.pauseIcon.style.opacity = 1;
      this.playIcon.style.opacity = 0;
      this.pauseBtn.innerHTML = this.FA_PAUSE;
      this._tick();
    }
  }


  _indicate(e) {
    const target = e.target;
    if (target.classList.contains('indicator')) {
      this._pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  }
  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }
  _tick() {
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }
  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  next() {
    this._pause();
    this._gotoNext();
  }

  prev() {
    this._pause();
    this._gotoPrev();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  }
}
export default Carousel;
