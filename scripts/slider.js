// https://habr.com/ru/post/501258/
// UPD: все идеально работало до тех пор, пока я не решил сделать из этого класс. Удачи.
export default class Slider {
  constructor(selectors) {
    this._sliderWrapper = document.querySelector(selectors.wrapperSelector);
    this._slider = this._sliderWrapper.querySelector(selectors.sliderSelector);
    this._sliderTrack = this._slider.querySelector(selectors.sliderTrackSelector);
    this._slides = this._slider.querySelectorAll(selectors.sliderItemSelector);
    this._prev = this._sliderWrapper.querySelector(selectors.sliderLeftButtonSelector);
    this._next = this._sliderWrapper.querySelector(selectors.sliderRightButtonSelector);
    this._slideWidth = this._slides[0].offsetWidth;
    this._slideIndex = 0;
    this._posInit = 0;
    this._posX1 = 0;
    this._posX2 = 0;
    this._posFinal = 0;
    this._isSwipe = false;
    this._isScroll = false;
    this._allowSwipe = true;
    this._transition = true;
    this._nextTrf = 0;
    this._prevTrf = 0;
    this._lastTrf = (this._slides.length - 1) * this._slideWidth;
    this._posThreshold = this._slides[0].offsetWidth * 0.35;
    this._trfRegExp = /([-0-9.]+(?=px))/;
  }

  _slide() {
    if (this._transition) {
      this._sliderTrack.style.transition = 'transform .5s';
    }
    this._sliderTrack.style.transform = `translate3d(-${this._slideIndex * this._slideWidth}px, 0px, 0px)`;

    this._slideIndex === 0 ? this._prev.setAttribute('disabled', true) : this._prev.removeAttribute('disabled');
    this._slideIndex === (this._slides.length - 1) ? this._next.setAttribute('disabled', true) : this._next.removeAttribute('disabled');
  };

  _swipeStart(evt) {
    evt = (evt.touches ? evt.touches[0] : evt);

    if (this._allowSwipe) {

      this._transition = true;

      this._nextTrf = (this._slideIndex + 1) * -this._slideWidth;
      this._prevTrf = (this._slideIndex - 1) * -this._slideWidth;

      this._posInit = this._posX1 = evt.clientX;
      this.posY1 = evt.clientY;

      this._sliderTrack.style.transition = '';

      document.addEventListener('touchmove', (evt) => {
        this._swipeAction(evt);
      });
      document.addEventListener('mousemove', (evt) => {
        this._swipeAction(evt);
      });
      document.addEventListener('touchend', () => {
        this._swipeEnd();
      });
      document.addEventListener('mouseup', () => {
        this._swipeEnd();
      });

      this._slider.classList.remove('grab');
      this._slider.classList.add('grabbing');
    }
  };

  _swipeAction(evt) {
    evt = (evt.touches ? evt.touches[0] : evt);
    this._style = this._sliderTrack.style.transform;
    this._transform = +this._style.match(this._trfRegExp)[0];

    this._posX2 = this._posX1 - evt.clientX;
    this._posX1 = evt.clientX;

    this.posY2 = this.posY1 - evt.clientY;
    this.posY1 = evt.clientY;

    // определение действия свайп или скролл
    if (!this._isSwipe && !this._isScroll) {
      this.posY = Math.abs(this.posY2);
      if (this.posY > 7 || this._posX2 === 0) {
        this._isScroll = true;
        this._allowSwipe = false;
      } else if (this.posY < 7) {
        this._isSwipe = true;
      }
    }

    if (this._isSwipe) {
      // запрет ухода влево на первом слайде
      if (this._slideIndex === 0) {
        if (this._posInit < this._posX1) {
          this._setTransform(this._transform, 0);
          return;
        } else {
          this._allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (this._slideIndex === this._slides.length - 1) {
        if (this._posInit > this._posX1) {
          this._setTransform(this._transform, this._lastTrf);
          return;
        } else {
          this._allowSwipe = true;
        }
      }

      // запрет протаскивания дальше одного слайда
      if (this._posInit > this._posX1 && this._transform < this._nextTrf || this._posInit < this._posX1 && this._transform > this._prevTrf) {
        this._reachEdge();
        return;
      }

      // двигаем слайд
      this._sliderTrack.style.transform = `translate3d(${this._transform - this._posX2}px, 0px, 0px)`;
    }
  };

  _swipeEnd() {
    this._posFinal = this._posInit - this._posX1;

    this._isScroll = false;
    this._isSwipe = false;

    document.removeEventListener('touchmove', this._swipeAction);
    document.removeEventListener('mousemove', this._swipeAction);
    document.removeEventListener('touchend', this._swipeEnd);
    document.removeEventListener('mouseup', this._swipeEnd);

    this._slider.classList.add('grab');
    this._slider.classList.remove('grabbing');

    if (this._allowSwipe) {
      if (Math.abs(this._posFinal) > this._posThreshold) {
        if (this._posInit < this._posX1) {
          this._slideIndex--;
        } else if (this._posInit > this._posX1) {
          this._slideIndex++;
        }
      }

      if (this._posInit !== this._posX1) {
        this._allowSwipe = false;
        this._slide();
      } else {
        this._allowSwipe = true;
      }

    } else {
      this._allowSwipe = true;
    }
  };

  _setTransform(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        this._sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    this._allowSwipe = false;
  };

  _reachEdge() {
    this._transition = false;
    this._swipeEnd();
    this._allowSwipe = true;
  };

  init() {
    this._sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
    this._slider.classList.add('grab');

    this._sliderTrack.addEventListener('transitionend', () => this._allowSwipe = true);

    this._slider.addEventListener('touchstart', (evt) => {
      this._swipeStart(evt);
    });

    this._slider.addEventListener('mousedown', (evt) => {
      this._swipeStart(evt);
    });

    this._prev.addEventListener('click', () => {
      this._slideIndex--;
      this._slide();
    });
    this._next.addEventListener('click', () => {
      this._slideIndex++;
      this._slide();
    });
  }
}
