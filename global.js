const durationFast = 0.3;
const durationBase = 0.6;
const durationSlow = 0.9;
const easeBase = "power2.inOut";

function smoothScroll() {
  let lenis;
  if (Webflow.env("editor") === undefined) {
    lenis = new Lenis({
      lerp: 0.3,
      wheelMultiplier: 0.7,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false,
    });

    // Create a MutationObserver to watch for the dropdown being added to DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.classList?.contains("iti--container")) {
            // Stop Lenis when dropdown opens
            lenis.stop();

            // Add event listener to document to detect clicks outside dropdown
            const handleClickOutside = (e) => {
              if (!node.contains(e.target)) {
                lenis.start();
                document.removeEventListener("click", handleClickOutside);
              }
            };

            document.addEventListener("click", handleClickOutside);
          }
        });
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  $("[data-lenis-start]").on("click", function () {
    lenis.start();
  });

  $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
  });

  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  lenis.on("scroll", (e) => {
    const menu = document.querySelector(".nav_content");
    if (menu.classList.contains("is-open")) {
      e.preventDefault = false;
    } else {
      e.preventDefault = true;
    }
  });
}

function disableScrolling() {
  document.body.classList.add("no-scroll");
  lenis.stop();
}

function enableScrolling() {
  document.body.classList.remove("no-scroll");
  lenis.start();
}

function mobileMenu() {
  const nav = document.querySelector('[data-menu="nav"]');
  const menu = nav.querySelector(".nav_content");
  const button = nav.querySelector('[data-menu="hamburger"]');
  const overlay = nav.querySelector(".nav_overlay");

  const lineTop = button.children[0];
  const lineMiddle = button.children[1];
  const lineBottom = button.children[2];

  let hamburgerAnim = gsap.timeline({
    paused: true,
    defaults: {
      duration: durationFast,
      ease: easeBase,
    },
  });

  hamburgerAnim
    .to(lineTop, {
      y: "0.5625rem",
      rotate: -45,
    })
    .to(
      lineMiddle,
      {
        x: "1rem",
        opacity: 0,
      },
      "<"
    )
    .fromTo(
      lineBottom,
      {
        y: "0rem",
        rotate: 0,
        width: "62%",
      },
      {
        y: "-0.5625rem",
        rotate: 45,
        width: "80%",
      },
      "<"
    );

  button.addEventListener("click", () => {
    if (!menu.classList.contains("is-open")) {
      menu.style.display = "flex";
      requestAnimationFrame(() => {
        menu.classList.add("is-open");
        hamburgerAnim.play();
        overlay.classList.add("is-open");
        disableScrolling();
      });
    } else {
      menu.classList.remove("is-open");
      hamburgerAnim.reverse();
      overlay.classList.remove("is-open");
      enableScrolling();
      menu.addEventListener(
        "transitionend",
        () => {
          menu.style.display = "none";
        },
        { once: true }
      );
    }
  });
}

function megamenuOpen() {
  const nav = document.querySelector('[data-menu="nav"]');
  const links = nav.querySelectorAll('[data-menu="link"]');

  const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches; // Detect touch devices

  links.forEach((link) => {
    const menu = link.nextElementSibling;
    const arrow = link.querySelector(".nav_link-arrow");

    let menuOpen = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.3,
        ease: easeBase,
      },
    });

    menuOpen.to(menu, {
      opacity: 1,
      y: "0rem",
    });

    link.addEventListener("click", (event) => {
      if (isTouchDevice()) {
        event.preventDefault();

        links.forEach((otherLink) => {
          const otherMenu = otherLink.nextElementSibling;
          const otherArrow = otherLink.querySelector(".nav_link-arrow");

          if (otherMenu !== menu) {
            menuOpen.reverse();
            otherArrow.classList.remove("is-open");
            otherMenu.style.display = "none";
          }
        });

        menuOpen.restart();

        if (menu.style.display === "block") {
          menuOpen.reverse();
          arrow.classList.remove("is-open");
          menu.style.display = "none";
        } else {
          menu.style.display = "block";
          arrow.classList.add("is-open");
          menuOpen.play();
        }
      }
    });

    if (!isTouchDevice()) {
      link.addEventListener("mouseenter", () => {
        menu.style.display = "block";
        arrow.classList.add("is-open");
        menuOpen.play();
      });
      menu.addEventListener("mouseenter", () => {
        menu.style.display = "block";
        arrow.classList.add("is-open");
        menuOpen.play();
      });
      link.addEventListener("mouseleave", () => {
        menuOpen.reverse();
        arrow.classList.remove("is-open");
        menu.style.display = "none";
      });
      menu.addEventListener("mouseleave", () => {
        menuOpen.reverse();
        arrow.classList.remove("is-open");
        menu.style.display = "none";
      });
    }
  });
}

function navScroll() {
  const nav = document.querySelector(".nav_component");
  const wrapper = nav.querySelector(".nav_layout");
  const button = nav.querySelector(".nav_btn");
  const hamburger = nav.querySelector(".nav_hamburger");
  const hero = document.querySelector('[data-element="hero"]');

  let navAnim = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top+=100 top",
      onEnter: () => {
        nav.classList.add("is-scrolled");
        wrapper.classList.add("is-scrolled");
        button.classList.add("is-scrolled");
        hamburger.classList.add("is-scrolled");
      },
      onLeaveBack: () => {
        nav.classList.remove("is-scrolled");
        wrapper.classList.remove("is-scrolled");
        button.classList.remove("is-scrolled");
        hamburger.classList.remove("is-scrolled");
      },
    },
  });
}

function accordion() {
  const accordionLists = document.querySelectorAll(".accordion-list_component");

  if (!accordionLists) {
    return;
  }

  accordionLists.forEach((list) => {
    const accordionItems = gsap.utils.toArray(".accordion_component");

    accordionItems.forEach((item) => {
      const content = item.querySelector(".accordion_content");
      const icon = item.querySelector(".accordion_icon");

      gsap.set(content, { height: 0, display: "none" });
      item.classList.remove("is-open");
      gsap.set(icon, { rotate: 0 });
    });

    const firstItem = accordionItems[0];
    const firstContent = firstItem.querySelector(".accordion_content");
    const firstIcon = firstItem.querySelector(".accordion_icon");

    gsap.set(firstContent, { height: "auto", display: "block" });
    firstItem.classList.add("is-open");
    gsap.set(firstIcon, { rotation: 135 });

    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion_title-row");
      const content = item.querySelector(".accordion_content");
      const icon = item.querySelector(".accordion_icon");

      header.addEventListener("click", () => {
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            const otherContent = otherItem.querySelector(".accordion_content");
            const otherIcon = otherItem.querySelector(".accordion_icon");

            if (otherItem.classList.contains("is-open")) {
              gsap.to(otherContent, {
                height: 0,
                duration: 0.4,
                ease: easeBase,
                onComplete: () => {
                  otherItem.classList.remove("is-open");
                  gsap.set(otherContent, { display: "none" });
                },
              });

              gsap.to(otherIcon, {
                rotate: 0,
                duration: 0.4,
                ease: easeBase,
              });
            }
          }
        });

        if (!item.classList.contains("is-open")) {
          gsap.set(content, { display: "block" });
          gsap.to(content, {
            height: "auto",
            duration: 0.4,
            ease: easeBase,
            onComplete: () => item.classList.add("is-open"),
          });

          gsap.to(icon, {
            rotate: 135,
            duration: 0.4,
            ease: easeBase,
          });
        } else {
          gsap.to(content, {
            height: 0,
            duration: 0.4,
            ease: easeBase,
            onComplete: () => {
              item.classList.remove("is-open");
              gsap.set(content, { display: "none" });
            },
          });

          gsap.to(icon, {
            rotate: 0,
            duration: 0.4,
            ease: easeBase,
          });
        }
      });
    });
  });
}

function copyright() {
  const copyrightDate = document.querySelector(
    '[data-element="copyright-date"]'
  );

  if (copyrightDate) {
    const currentYear = new Date().getFullYear();
    copyrightDate.textContent = currentYear;
  }
}

function heroLoader() {
    const loaderPrimary = document.querySelector(".loader_block-primary");
    const loaderSecondary = document.querySelector(".loader_block-secondary");
    const splitElement = document.querySelector('[data-load="split"] h1');
    const fadeElements = document.querySelectorAll('[data-load="fade-in"]');
    const tagElements = document.querySelectorAll('[data-load="supplier-tag"]');
  
    function customSplitText(element) {
      if (!element) return [];
  
      function wrapWordsInNode(node) {
        if (node.nodeType === 3) {
          // Text node
          const words = node.textContent.split(/\s+/);
          const fragment = document.createDocumentFragment();
  
          words.forEach((word, i) => {
            if (word.length > 0) {
              const span = document.createElement("span");
              span.className = "split-word";
              span.textContent = word;
              fragment.appendChild(span);
  
              // Add space after word
              fragment.appendChild(document.createTextNode(" "));
            }
          });
  
          node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === 1) {
          // Element node
          const isEm = node.tagName.toLowerCase() === "em";
          if (isEm) {
            // Handle em content
            const words = node.textContent.split(/\s+/);
            const fragment = document.createDocumentFragment();
  
            words.forEach((word, i) => {
              if (word.length > 0) {
                const span = document.createElement("span");
                span.className = "split-word";
                const em = document.createElement("em");
                em.textContent = word;
                span.appendChild(em);
                fragment.appendChild(span);
                // Add space after every word, including the last one
                fragment.appendChild(document.createTextNode(" "));
              }
            });
  
            node.parentNode.replaceChild(fragment, node);
          } else {
            // Recursively handle other elements
            Array.from(node.childNodes).forEach((child) =>
              wrapWordsInNode(child)
            );
          }
        }
      }
  
      // Clone the element and work with the clone
      const workingElement = element.cloneNode(true);
      wrapWordsInNode(workingElement);
  
      // Replace original element's content
      element.innerHTML = workingElement.innerHTML;
  
      // Handle line wrapping
      const wordElements = element.querySelectorAll(".split-word");
      let currentLine = [];
      let currentLineTop = wordElements[0]?.getBoundingClientRect().top;
      let lines = [];
  
      wordElements.forEach((word) => {
        const rect = word.getBoundingClientRect();
  
        if (rect.top !== currentLineTop && currentLine.length > 0) {
          const lineWrapper = document.createElement("span");
          lineWrapper.className = "split-line";
          currentLine[0].parentNode.insertBefore(lineWrapper, currentLine[0]);
  
          currentLine.forEach((word) => {
            lineWrapper.appendChild(word.cloneNode(true));
            if (word.nextSibling) {
              lineWrapper.appendChild(document.createTextNode(" "));
            }
          });
  
          currentLine.forEach((word) => word.remove());
          lines.push(lineWrapper);
  
          currentLine = [word];
          currentLineTop = rect.top;
        } else {
          currentLine.push(word);
        }
      });
  
      if (currentLine.length > 0) {
        const lineWrapper = document.createElement("span");
        lineWrapper.className = "split-line";
        currentLine[0].parentNode.insertBefore(lineWrapper, currentLine[0]);
  
        currentLine.forEach((word) => {
          lineWrapper.appendChild(word.cloneNode(true));
          if (word.nextSibling) {
            lineWrapper.appendChild(document.createTextNode(" "));
          }
        });
  
        currentLine.forEach((word) => word.remove());
        lines.push(lineWrapper);
      }
  
      return {
        words: element.querySelectorAll(".split-word"),
        lines: lines,
      };
    }
  
    let heroLoad = gsap.timeline({
      defaults: {
        duration: 1.2,
        ease: "power4.inOut",
      },
    });
  
    let splitText = null;
    if (splitElement) {
      splitText = customSplitText(splitElement);
      gsap.set(splitText.words, { y: "100%" });
    }
  
    if (loaderPrimary) {
      heroLoad.to(loaderPrimary, {
        height: "0%",
        borderRadius: "0 0 40% 40%",
      });
    }
  
    if (loaderSecondary) {
      heroLoad.to(
        loaderSecondary,
        {
          height: "0%",
          borderRadius: "0 0 50% 50%",
        },
        "<0.1"
      );
    }
  
    if (splitText && splitText.words.length > 0) {
      heroLoad.to(
        splitText.words,
        {
          y: "0%",
          stagger: 0.12,
        },
        "<0.2"
      );
    }
  
    if (fadeElements.length > 0) {
      heroLoad.to(
        fadeElements,
        {
          opacity: 1,
          stagger: 0.2,
        },
        "<0.3"
      );
    }
  
    if (tagElements.length > 0) {
      heroLoad.to(
        tagElements,
        {
          y: "0em",
          opacity: 1,
          stagger: 0.2,
        },
        "<"
      );
    }
  }
  
const style = document.createElement("style");
style.textContent = `
.split-line {
    display: block;
    overflow: hidden;
}

.split-word {
    display: inline-block;
    position: relative;
}
`;
document.head.appendChild(style);  

//
// GLOBAL SCROLL ANIMATIONS
//

function imageReveal() {
    const wrappers = document.querySelectorAll('[data-gsap="image-reveal"]');

    if (!wrappers.length) {
        return;
    }

    wrappers.forEach((wrapper) => {
        const img = wrapper.querySelector(".u-cover-absolute");

        gsap.set(img, { scale: 1.5 });

        const imageAnim = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
        },
        defaults: {
            duration: 1.2,
            ease: easeBase,
        },
        });

        imageAnim.to(img, {
        scale: 1,
        });
    });
}

function logoReveal() {
    const wrappers = document.querySelectorAll(".cs-card_image-wrap");

    if (!wrappers.length) {
        return;
    }

    wrappers.forEach((wrapper) => {
        const img = wrapper.querySelector(".cs-card_logo");

        gsap.set(img, { scale: 1.3 });

        const imageAnim = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            toggleActions: "play none none reverse",
        },
        defaults: {
            duration: 1.2,
            ease: easeBase,
        },
        });

        imageAnim.to(img, {
        scale: 1,
        });
    });
}

function scaleOut() {
    const items = document.querySelectorAll('[data-gsap="scale-out"]');

    if (!items.length) {
        return;
    }

    items.forEach((item) => {
        gsap.set(item, { scale: 1.3 });

        const scaleAnim = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            start: "top bottom",
            toggleActions: "play none none reverse",
        },
        defaults: {
            duration: 1.2,
            ease: easeBase,
        },
        });

        scaleAnim.to(item, {
        scale: 1,
        });
    });
}

function fadeUp() {
    const fadeEls = document.querySelectorAll('[data-gsap="fade-up"]');

    if (!fadeEls.length) {
        return;
    }

    fadeEls.forEach((el) => {
        gsap.set(el, { opacity: 0, y: "6rem" });

        let fadeUp = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
        },
        defaults: {
            duration: durationSlow,
            ease: easeBase,
        },
        });

        fadeUp.to(el, {
        opacity: 1,
        y: "0rem",
        });
    });
}

function fadeLeft() {
    const fadeEls = document.querySelectorAll('[data-gsap="fade-left"]');

    if (!fadeEls.length) {
        return;
    }

    fadeEls.forEach((el) => {
        gsap.set(el, { opacity: 0, x: "3rem" });

        let fadeUp = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
        },
        defaults: {
            duration: durationSlow,
            ease: easeBase,
        },
        });

        fadeUp.to(el, {
        opacity: 1,
        x: "0rem",
        });
    });
}

function fadeIn() {
    const fadeItems = document.querySelectorAll('[data-gsap="fade-in"]');

    if (!fadeItems.length) {
        return;
    }

    fadeItems.forEach((fadeItem) => {
        gsap.set(fadeItem, { opacity: 0 });

        let fadeIn = gsap.timeline({
        scrollTrigger: {
            trigger: fadeItem,
            start: "top 92%",
            toggleActions: "play none none none",
        },
        defaults: {
            duration: durationSlow,
            ease: easeBase,
        },
        });

        fadeIn.to(fadeItem, {
        opacity: 1,
        });
    });
}

function borderFade() {
    const borders = document.querySelectorAll('[data-gsap="borders"]');

    if (!borders.length) {
        return;
    }

    gsap.set(borders, { borderColor: "rgba(217, 217, 217, 0)" });

    borders.forEach((border) => {
        let fadeIn = gsap.timeline({
        scrollTrigger: {
            trigger: border,
            start: "top bottom",
            toggleActions: "play none none none",
        },
        defaults: {
            duration: 1.6,
            ease: easeBase,
        },
        });

        fadeIn.to(border, {
        borderColor: "rgba(217, 217, 217, 1)",
        });
    });
}

function ctaRow() {
    const cta = document.querySelector(".section_cta-row");

    if (!cta) {
        return;
    }

    const ctaBg = cta.querySelector(".cta-row_background");
    const borders = cta.querySelectorAll('[data-gsap="border"]');

    let radiusStart = "6rem";
    const radiusEnd = "0rem";

    if (window.matchMedia("(max-width: 767px)").matches) {
        radiusStart = "2rem";
    } else if (
        window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches
    ) {
        radiusStart = "4rem";
    }

    gsap.set(borders, { borderColor: "rgba(255, 255, 255, 0)" });
    gsap.set(ctaBg, { borderRadius: `${radiusEnd} ${radiusEnd} 0 0` });

    let fadeIn = gsap.timeline({
        scrollTrigger: {
        trigger: cta,
        start: "top bottom",
        toggleActions: "play none none none",
        },
        defaults: {
        duration: 1.6,
        ease: easeBase,
        },
    });

    fadeIn
        .to(ctaBg, {
        borderRadius: `${radiusStart} ${radiusStart} 0 0`,
        })
        .to(
        borders,
        {
            borderColor: "rgba(255, 255, 255, 0.3)",
        },
        "<0.2"
        );
}

function splitText() {
    const headings = document.querySelectorAll('[data-gsap="split-text"] > *');

    if (!headings.length) {
        return;
    }

    headings.forEach((heading) => {
        const headlineSplit = new SplitType(heading, {
        types: "lines, chars",
        tagName: "span",
        });

        const splitText = heading.querySelectorAll(".char");

        gsap.set(splitText, { y: "100%" });

        let splitAnim = gsap.timeline({
        scrollTrigger: {
            trigger: heading,
            start: "top 92%",
            toggleActions: "play none none reverse",
        },
        defaults: {
            duration: durationSlow,
            ease: easeBase,
        },
        });

        splitAnim.to(splitText, {
        y: "0%",
        stagger: 0.1,
        });
    });
}

function splitWords() {
    const headings = document.querySelectorAll('[data-gsap="split-words"] > *');

    if (!headings.length) {
        return;
    }

    headings.forEach((heading) => {
        const headlineSplit = new SplitType(heading, {
        types: "lines, words",
        tagName: "span",
        });

        const splitText = heading.querySelectorAll(".word");

        gsap.set(splitText, { y: "100%" });

        let splitAnim = gsap.timeline({
        scrollTrigger: {
            trigger: heading,
            start: "top 92%",
            toggleActions: "play none none reverse",
        },
        defaults: {
            duration: durationSlow,
            ease: easeBase,
        },
        });

        splitAnim.to(splitText, {
        y: "0%",
        stagger: 0.1,
        });
    });
}

function splitLines() {
    const headings = document.querySelectorAll('[data-gsap="split-lines"] > *');

    if (!headings.length) {
        return;
    }

    headings.forEach((heading) => {
        const headlineSplit = new SplitType(heading, {
        types: "lines, words",
        tagName: "span",
        });

        const splitText = heading.querySelectorAll(".word");

        gsap.set(splitText, { y: "100%" });

        let splitAnim = gsap.timeline({
        scrollTrigger: {
            trigger: heading,
            start: "top 92%",
            toggleActions: "play none none reverse",
        },
        defaults: {
            duration: durationSlow,
            ease: easeBase,
        },
        });

        splitAnim.to(splitText, {
        y: "0%",
        stagger: 0.01,
        });
    });
}

//
// FUNCTION INITS
//

document.addEventListener("DOMContentLoaded", () => {
  heroLoader();
  smoothScroll();
  mobileMenu();
  megamenuOpen();
  navScroll();
  accordion();
  copyright();
  imageReveal();
  logoReveal();
  scaleOut();
  fadeUp();
  fadeLeft();
  fadeIn();
  borderFade();
  ctaRow();
  splitText();
  splitWords();
  splitLines();
});