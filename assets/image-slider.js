if (!customElements.get('image-slider-section')) {
  class ImageSliderSection extends HTMLElement {
    constructor() {
      super();

      this.sectionId = this.getAttribute('title');

      // Scoped queries within this custom element instance
      this.sliderImages = this.querySelector(`.slide`);
      this.slideMainBox = this.querySelector(`.slide__main`);
      this.forwardBtn = this.querySelector('.image-slider__forw');
      this.backwardsBtn = this.querySelector('.image-slider__back');
      this.counter = this.querySelector('.image-slider__counter');

      console.log('initialization');

      this.active = 0;

      this.addFocus(this.active);
      this.counter.innerHTML = `${this.active + 1} / ${
        this.sliderImages[0].children.length
      }`;

      this.forwardBtn.addEventListener('click', () => {
        this.active++;
        if (this.active >= this.sliderImages[0].children.length)
          this.active = 0;
        this.addFocus(this.active);
        this.counter.innerHTML = `${this.active + 1} / ${
          this.sliderImages[0].children.length
        }`;
      });

      this.backwardsBtn.addEventListener('click', () => {
        this.active--;
        if (this.active < 0)
          this.active = this.sliderImages[0].children.length - 1;
        this.addFocus(this.active);
        this.counter.innerHTML = `${this.active + 1} / ${
          this.sliderImages[0].children.length
        }`;
      });
    }

    addFocus(activeIndex) {
      // Set the source of the main box to the active image
      this.slideMainBox.src = this.sliderImages[0].children[activeIndex].src;

      // Hide all images first
      Array.from(this.sliderImages[0].children).forEach((child) => {
        child.style.display = 'none';
      });

      // Show the next image in the thumbnails
      this.sliderImages[0].children[activeIndex].style.display = 'block';
    }
  }

  customElements.define('image-slider-section', ImageSliderSection);
}
