// Integrations Marquee Logo Animations

function integrationsLogo() {
    const wrapper = document.querySelector(".integrations_component");
    const logo = wrapper.querySelector(".integrations_hero-logo-wrap");
  
    let tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: {
        duration: 2,
        ease: easeBase,
      },
    });
  
    tl.fromTo(
      logo,
      {
        boxShadow: "0 0 20px 1px hsla(344.3349753694581, 100.00%, 60.20%, 0.40)",
      },
      {
        boxShadow: "0 0 20px 1px hsla(344.3349753694581, 100.00%, 60.20%, 0.80)",
      }
    );
  }
  
  function setupIntegrationsMarquee() {
    const list = document.querySelectorAll(".integrations_wrapper");
    if (!list.length) {
      return;
    }
  
    gsap.to(list, {
      x: "-100%",
      duration: 25,
      ease: "none",
      repeat: -1,
    });
  }
  
  integrationsLogo();
  setupIntegrationsMarquee();  