function bentoMarquee() {
    const rows = document.querySelectorAll(".bento-card_integrations-row");
    if (!rows.length) return;
  
    gsap.killTweensOf(".bento-card_integrations-list");
  
    rows.forEach((row, index) => {
      const lists = row.querySelectorAll(".bento-card_integrations-list");
  
      gsap.fromTo(
        lists,
        {
          xPercent: index % 2 === 0 ? 50 : -50,
        },
        {
          xPercent: index % 2 === 0 ? -50 : 50,
          duration: 30,
          ease: "none",
          repeat: -1,
          immediateRender: true,
        }
      );
    });
  }
  
  bentoMarquee();  