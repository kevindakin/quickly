function featuredSlider() {
    const wrapper = document.querySelector(".featured-blog_wrap.swiper");
  
    let swiper = new Swiper(wrapper, {
      slidesPerView: 1,
      speed: 200,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      watchOverflow: true,
      pagination: {
        el: ".featured-blog_pagination.swiper-pagination",
        clickable: true,
      },
    });
  }
  
  featuredSlider();  