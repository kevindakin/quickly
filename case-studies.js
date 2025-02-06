function caseStudies() {
    const swiperDelay = 10000;
    let isFirstLoop = true;
  
    const swiperContent = new Swiper(".case-studies_wrapper.swiper", {
      loop: true,
      speed: 600,
      allowTouchMove: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: swiperDelay,
        disableOnInteraction: false,
      },
    });
  
    const swiperStats = new Swiper(".case-studies_stats.swiper", {
      loop: true,
      speed: 600,
      allowTouchMove: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: swiperDelay,
        disableOnInteraction: false,
      },
    });
  
    const paginationItems = document.querySelectorAll(".pagination_item");
  
    // Set initial transition for first item
    function updatePagination(index) {
      paginationItems.forEach((item, i) => {
        const circle = item.querySelector(".pagination_border-circle");
  
        // If the item is not active, reset the stroke
        if (i !== index) {
          circle.style.transition = "none";
          circle.style.strokeDashoffset = "283";
        }
  
        // First loop conditional logic
        if (i === index) {
          if (isFirstLoop) {
            circle.style.transition = "stroke-dashoffset 10s linear";
          } else {
            circle.style.transition = "stroke-dashoffset 10.6s linear";
          }
          circle.style.strokeDashoffset = "0";
        }
  
        item.classList.toggle("is-active", i === index);
      });
    }
  
    // Change swiper index when pagination item is clicked
    paginationItems.forEach((item) => {
      item.addEventListener("click", () => {
        const index = Array.from(paginationItems).indexOf(item);
  
        swiperContent.slideToLoop(index);
        swiperStats.slideToLoop(index);
  
        swiperContent.autoplay.stop();
        swiperStats.autoplay.stop();
        swiperContent.autoplay.start();
        swiperStats.autoplay.start();
  
        updatePagination(index);
      });
    });
  
    // Sync swipers when they change slides
    swiperContent.on("slideChange", () => {
      const realIndex = swiperContent.realIndex;
  
      // If first loop, reset flag after
      if (isFirstLoop && realIndex === 0) {
        isFirstLoop = false;
      }
  
      updatePagination(realIndex);
    });
  
    swiperStats.on("slideChange", () => {
      const realIndex = swiperStats.realIndex;
      updatePagination(realIndex);
    });
  
    updatePagination(0);
  }
  
  caseStudies();  