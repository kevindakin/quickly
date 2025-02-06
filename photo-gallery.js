function galleryAnim() {
    const wrapper = document.querySelector(".gallery_component");
    const items = wrapper.querySelectorAll(".gallery_item");
  
    if (!items.length) {
      return;
    }
  
    gsap.set(items, { filter: "blur(8px)", opacity: 0 });
  
    let fade = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 92%",
      },
      defaults: {
        duration: durationSlow,
        ease: easeBase,
      },
    });
  
    fade.to(items, {
      filter: "blur(0px)",
      opacity: 1,
      stagger: {
        each: 0.05,
        from: "random",
      },
    });
  }
  
  galleryAnim();  