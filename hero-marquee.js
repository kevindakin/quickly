function setupHeroMarquee() {
    const list = document.querySelectorAll(".hero-marquee_wrapper");
    if (!list.length) return;
  
    gsap.to(list, {
      x: "-100%",
      duration: 25,
      ease: "none",
      repeat: -1,
      force3D: true,
    });
  }
  
  setupHeroMarquee();  