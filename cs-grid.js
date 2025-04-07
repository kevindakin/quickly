function csGrid() {
  const items = document.querySelectorAll(".cs-grid_item");

  const cta1 = document.querySelector('[data-cs-grid="cta-1"]');
  const cta2 = document.querySelector('[data-cs-grid="cta-2"]');
  const cta3 = document.querySelector('[data-cs-grid="cta-3"]');
  const cta4 = document.querySelector('[data-cs-grid="cta-4"]');
  const cta5 = document.querySelector('[data-cs-grid="cta-5"]');

  function appendStaticComponents() {
    items.forEach((item, index) => {
      if ((index + 1) % 5 === 2 && cta1) {
        item.appendChild(cta1);
      }

      if ((index + 1) % 5 === 4 && cta2) {
        item.appendChild(cta2);
      }

      if ((index + 1) % 6 === 0 && cta3) {
        item.appendChild(cta3);
      }

      if ((index + 1) % 8 === 0 && cta4) {
        item.appendChild(cta4);
      }

      if ((index + 1) % 10 === 0 && cta5) {
        item.appendChild(cta5);
      }
    });
  }

  // Optional: initialize only if any CTA exists
  if (cta1 || cta2 || cta3 || cta4 || cta5) {
    appendStaticComponents();
  }
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