function formModals() {
    // Select all elements
    const modalTriggers = document.querySelectorAll("[data-modal-open]");
    const modals = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll("[data-modal-close]");
  
    if (!modals) {
      return;
    }
  
    // Store the element that had focus before modal opened
    let lastFocusedElement;
  
    // Handle opening modals
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const modalId = trigger.getAttribute("data-modal-open");
        const targetModal = document.querySelector(`[data-modal="${modalId}"]`);
  
        if (targetModal) {
          // Store last focused element for returning focus later
          lastFocusedElement = document.activeElement;
  
          // Show modal
          targetModal.style.display = "flex";
          setTimeout(() => {
            targetModal.style.opacity = "1";
          }, 10);
  
          // Accessibility enhancements
          targetModal.setAttribute("aria-hidden", "false");
          disableScrolling();
  
          // Focus management
          const focusableElements = targetModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length) {
            focusableElements[0].focus();
          }
  
          // Trap focus within modal
          targetModal.addEventListener("keydown", trapFocus);
        }
      });
    });
  
    // Handle closing modals
    const closeModal = (modal) => {
      modal.style.opacity = "0";
      setTimeout(() => {
        modal.style.display = "none";
      }, 300); // Match your transition duration
  
      // Accessibility cleanup
      modal.setAttribute("aria-hidden", "true");
      enableScrolling();
  
      // Return focus to trigger
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
  
      // Remove focus trap
      modal.removeEventListener("keydown", trapFocus);
    };
  
    // Close buttons
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest("[data-modal]");
        if (modal) closeModal(modal);
      });
    });
  
    // Close on background click
    modals.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });
  
    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const openModal = document.querySelector(
          '[data-modal][style*="display: flex"]'
        );
        if (openModal) closeModal(openModal);
      }
    });
  
    // Focus trap function
    function trapFocus(e) {
      const modal = e.currentTarget;
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];
  
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  }
  
  formModals();  