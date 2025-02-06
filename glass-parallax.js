function glassParallax() {
    const sections = document.querySelectorAll(".split-overlay_component");
  
    sections.forEach((section) => {
      const img = section.querySelector(".split-overlay_image");
  
      gsap.set(img, { scale: 1.1 });
  
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
  
      tl.fromTo(
        img,
        {
          yPercent: -10,
        },
        {
          yPercent: 10,
        }
      );
    });
  }
  
  glassParallax();  