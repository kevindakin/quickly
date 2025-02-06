function testimonialCarousel() {
    const wrapper = document.querySelector(".quote-carousel_component.swiper");
  
    let swiper = new Swiper(wrapper, {
      slidesPerView: "auto",
      speed: 300,
      watchOverflow: true,
      grabCursor: true,
      navigation: {
        nextEl: ".quote-carousel_arrow.swiper-next",
        prevEl: ".quote-carousel_arrow.swiper-prev",
      },
    });
  }
  
  testimonialCarousel();  