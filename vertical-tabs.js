function setMaxTextHeight(component) {
    const textWraps = component.querySelectorAll(".vertical-tabs_text-wrap");
    let maxHeight = 0;
  
    // Check height of all text wraps
    textWraps.forEach((wrap) => {
      const originalStyles = {
        visibility: wrap.style.visibility,
        height: wrap.style.height,
        position: wrap.style.position,
      };
  
      wrap.style.visibility = "visible";
      wrap.style.height = "auto";
      wrap.style.position = "absolute";
  
      const height = wrap.offsetHeight;
      maxHeight = Math.max(maxHeight, height);
  
      // Restore original styles
      wrap.style.visibility = originalStyles.visibility;
      wrap.style.height = originalStyles.height;
      wrap.style.position = originalStyles.position;
    });
  
    // Store max height on component
    component.dataset.maxHeight = maxHeight;
  
    // Set initial heights to 0
    textWraps.forEach((wrap) => {
      if (!wrap.closest(".w--current")) {
        gsap.set(wrap, { height: 0 });
      }
    });
  
    return maxHeight;
  }
  
  function verticalTabs() {
    const tabs = document.querySelectorAll(".vertical-tabs_tab");
    const progressBars = document.querySelectorAll(".vertical-tabs_progress");
    let currentIndex = 0;
    let autoPlayInterval;
    let progressTween;
  
    const timer = 7;
  
    // Progress Bar
    function progressAnim(index) {
      if (progressTween) progressTween.kill();
      gsap.set(progressBars, { width: "0%" });
      progressTween = gsap.to(progressBars[index], {
        width: "100%",
        duration: timer,
        ease: "none",
      });
    }
  
    // Text Height Animation
    function animateTextHeight(component) {
      const maxHeight = component.dataset.maxHeight;
      const textWraps = component.querySelectorAll(".vertical-tabs_text-wrap");
  
      textWraps.forEach((wrap) => {
        if (wrap.closest(".w--current")) {
          gsap.to(wrap, {
            height: maxHeight,
            duration: 0.4,
            ease: "power2.inOut",
          });
        } else {
          gsap.to(wrap, {
            height: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
        }
      });
    }
  
    // Image Animation
    function animateImage(index) {
      const component = tabs[index].closest(".vertical-tabs_component");
      if (!component) return;
  
      const panes = component.querySelector(".vertical-tabs_panes");
      const activePane = panes.querySelector(".vertical-tabs_pane.w--tab-active");
      const img = activePane?.querySelector(".u-cover-absolute");
  
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            duration: durationSlow,
            ease: "power3.out",
          }
        );
      }
    }
  
    // Tab Change
    function changeTab(index) {
      tabs[index].click();
      progressAnim(index);
  
      const component = tabs[index].closest(".vertical-tabs_component");
  
      // Small delay to ensure Webflow has updated classes
      setTimeout(() => {
        animateImage(index);
        animateTextHeight(component);
      }, 50);
  
      currentIndex = index;
    }
  
    function nextTab() {
      const nextIndex = (currentIndex + 1) % tabs.length;
      changeTab(nextIndex);
    }
  
    function startAutoPlay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(nextTab, timer * 1000);
    }
  
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", (e) => {
        if (!e.isTrusted && !e.programmatic) return;
  
        currentIndex = index;
        progressAnim(index);
  
        const component = tab.closest(".vertical-tabs_component");
  
        setTimeout(() => {
          animateImage(index);
          animateTextHeight(component);
        }, 50);
  
        startAutoPlay();
      });
    });
  
    // Init
    const component = tabs[0].closest(".vertical-tabs_component");
    setMaxTextHeight(component);
    changeTab(0);
    startAutoPlay();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const tabComponents = document.querySelectorAll(".vertical-tabs_component");
    tabComponents.forEach(verticalTabs);
  });  