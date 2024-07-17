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

      this.active = 0;

      if (this.sliderImages?.children) {
        this.addFocus(this.active);
        this.counter.innerHTML = `${this.active + 1} / ${
          this.sliderImages.children.length
        }`;
      }

      this.forwardBtn?.addEventListener('click', () => {
        this.active++;
        if (this.active >= this.sliderImages.children.length) {
          this.active = 0;
        }
        this.addFocus(this.active);
        this.counter.innerHTML = `${this.active + 1} / ${
          this.sliderImages.children.length
        }`;
      });

      this.backwardsBtn?.addEventListener('click', () => {
        this.active--;
        if (this.active < 0) {
          this.active = this.sliderImages.children.length;
        }
        this.addFocus(this.active);
        this.counter.innerHTML = `${this.active + 1} / ${
          this.sliderImages.children.length
        }`;
      });
    }

    addFocus(activeIndex) {
      // Set the source of the main box to the active image
      this.slideMainBox.src = this.sliderImages.children[activeIndex].src;

      // Hide all images first
      if (this.sliderImages?.children?.length > 1) {
        Array.from(this.sliderImages.children).forEach((child) => {
          child.style.display = 'none';
        });
      }

      // Show the next image in the thumbnails
      if (this.sliderImages?.children?.length > 1)
        this.sliderImages.children[activeIndex + 1].style.display = 'block';
    }
  }

  customElements.define('image-slider-section', ImageSliderSection);
}
