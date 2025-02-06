function bentoTabs() {
    const tabComponent = document.querySelector(".bento-tabs_component");
    const tabLinks = tabComponent.querySelectorAll(".tab_link");
    const tabPanes = tabComponent.querySelectorAll(".bento-tabs_pane");
  
    let currentTabIndex = 0;
    let timeoutId = null;
  
    const DURATION = 15000; // 15 seconds in milliseconds
  
    // Function to handle automatic tab changes
    const autoSwitchTab = () => {
      currentTabIndex = (currentTabIndex + 1) % tabPanes.length;
      tabLinks[currentTabIndex].click();
      startTimer();
    };
  
    // Function to start/reset the timer
    const startTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(autoSwitchTab, DURATION);
    };
  
    // Handle manual clicks
    tabLinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        // Only handle real user clicks
        if (e.isTrusted) {
          currentTabIndex = index;
          startTimer();
        }
      });
    });
  
    // Start the initial timer
    startTimer();
  }
  
  bentoTabs();  