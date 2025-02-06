function csGrid() {
    // Select all grid items
    const items = document.querySelectorAll(".cs-grid_item");
  
    // Get CTA elements
    const cta1 = document.querySelector('[data-cs-grid="cta-1"]');
    const cta2 = document.querySelector('[data-cs-grid="cta-2"]');
  
    // Function to append static components
    function appendStaticComponents() {
      items.forEach((item, index) => {
        // Using modulo to identify items in each set of 5
        const position = (index + 1) % 5;
  
        if (position === 2 && cta1) {
          // cta1.style.display = "flex";
          item.appendChild(cta1);
        }
  
        if (position === 4 && cta2) {
          // cta2.style.display = "flex";
          item.appendChild(cta2);
        }
      });
    }
  
    // Initialize if CTAs exist
    if (cta1 || cta2) {
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