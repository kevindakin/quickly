function csGrid() {
  const items = document.querySelectorAll(".cs-grid_item");

  const ctas = [
    { el: document.querySelector('[data-cs-grid="cta-1"]'), position: 2 },
    { el: document.querySelector('[data-cs-grid="cta-2"]'), position: 4 },
    { el: document.querySelector('[data-cs-grid="cta-3"]'), position: 7 },
    { el: document.querySelector('[data-cs-grid="cta-4"]'), position: 9 },
    { el: document.querySelector('[data-cs-grid="cta-5"]'), position: 12 },
  ];

  ctas.forEach(({ el, position }) => {
    if (el && items[position - 1]) {
      items[position - 1].appendChild(el);
    }
  });
}
  
  function cardReveal() {
    const cards = document.querySelectorAll(".customer-story_card");
  
    if (!cards.length) {
      return;
    }
  
    cards.forEach((card) => {
      const block = card.querySelector(".customer-story_color-block");
      const image = card.querySelector(".u-cover-absolute");
  
      gsap.set(block, { height: "100%" });
      gsap.set(image, { scale: 1.2 });
  
      let cardAnim = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 92%",
        },
        defaults: {
          duration: 1.2,
          ease: easeBase,
        },
      });
  
      cardAnim
        .to(block, {
          height: "0%",
          borderRadius: "0 0 50% 50%",
        })
        .to(
          image,
          {
            scale: 1,
          },
          "<0.1"
        );
    });
  }
  
  csGrid();
  cardReveal();  