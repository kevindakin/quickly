function blogTOC() {
    // Only run if viewport width is above 992px
    const mediaQuery = window.matchMedia("(min-width: 992px)");
  
    function handleViewportChange(e) {
      if (e.matches) {
        // Code runs only above 992px
        initTOC();
      } else {
        // Optional: Clean up TOC when below 992px
        const tocWrapper = document.querySelector('[data-toc="wrapper"]');
        const sidebarTOC = document.querySelector(".sidebar_toc-wrap");
  
        if (tocWrapper) tocWrapper.innerHTML = "";
        if (sidebarTOC) sidebarTOC.style.display = "none";
      }
    }
  
    function initTOC() {
      const richText = document.querySelector('[data-toc="rich"]');
      const tocWrapper = document.querySelector('[data-toc="wrapper"]');
      const sidebarTOC = document.querySelector(".sidebar_toc-wrap");
  
      // Function to create TOC link elements
      function createTocLink(headingText, headingId) {
        const link = document.createElement("a");
        link.setAttribute("data-toc", "link");
        link.classList.add("toc_link");
        link.href = `#${headingId}`;
  
        const textDiv = document.createElement("div");
        textDiv.textContent = headingText;
  
        link.appendChild(textDiv);
        return link;
      }
  
      // Function to generate unique IDs for headings
      function generateId(text, index) {
        return `heading-${text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}-${index}`;
      }
  
      // Function to create anchor spacer
      function createAnchorSpacer(id) {
        const spacer = document.createElement("div");
        spacer.className = "anchor-link-spacer";
        spacer.id = id;
        return spacer;
      }
  
      function buildTOC() {
        if (!richText || !tocWrapper) return;
  
        tocWrapper.innerHTML = "";
  
        const headings = richText.querySelectorAll("h1, h2, h3, h4");
  
        // Check if there are any headings
        if (headings.length === 0 && sidebarTOC) {
          sidebarTOC.style.display = "none";
          return;
        }
  
        headings.forEach((heading, index) => {
          // Generate ID
          const headingId = generateId(heading.textContent, index);
  
          // Set heading to position relative if not already set
          heading.style.position = "relative";
  
          // Create spacer and append inside heading
          const spacer = createAnchorSpacer(headingId);
          heading.appendChild(spacer);
  
          // Create and append TOC link
          const tocLink = createTocLink(heading.textContent, headingId);
          tocWrapper.appendChild(tocLink);
        });
  
        // Show the sidebar TOC if we have headings
        if (sidebarTOC) {
          sidebarTOC.style.display = "flex";
        }
      }
  
      buildTOC();
    }
  
    // Initial check
    handleViewportChange(mediaQuery);
  
    // Listen for viewport width changes
    mediaQuery.addListener(handleViewportChange);
  }
  
  blogTOC();  