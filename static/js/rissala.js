// Rissala Progressive Enhancement Utilities
document.addEventListener("DOMContentLoaded", function () {
  // Reading Progress Sync on Book Reader
  const readerContainer = document.querySelector("[data-book-sync-url]");
  if (readerContainer) {
    const syncUrl = readerContainer.getAttribute("data-book-sync-url");
    const csrfToken = readerContainer.getAttribute("data-csrf-token");
    const chapterId = readerContainer.getAttribute("data-chapter-id");
    const percentage = readerContainer.getAttribute("data-percentage");

    if (syncUrl && csrfToken && chapterId) {
      fetch(syncUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          chapter_id: parseInt(chapterId, 10),
          percentage: parseFloat(percentage || "15"),
          preferred_format: "WEB",
        }),
      }).catch(function () {});
    }
  }

  // Mobile / Tablet Burger Menu Robust Fallback & Accessibility
  const mobileToggleBtn = document.querySelector("[data-mobile-toggle]");
  const mobileNavPanel = document.getElementById("mobile-nav-panel");

  if (mobileToggleBtn && mobileNavPanel) {
    // Ensure any click on the mobile toggle button toggles smoothly
    mobileToggleBtn.addEventListener("click", function (e) {
      // If Alpine.js is not loaded yet or failed
      if (!window.Alpine) {
        e.preventDefault();
        const isOpen = !mobileNavPanel.classList.contains("hidden") && mobileNavPanel.style.display !== "none";
        if (isOpen) {
          mobileNavPanel.style.display = "none";
          document.body.classList.remove("overflow-hidden");
          mobileToggleBtn.setAttribute("aria-expanded", "false");
        } else {
          mobileNavPanel.removeAttribute("hidden");
          mobileNavPanel.classList.remove("hidden");
          mobileNavPanel.style.display = "block";
          document.body.classList.add("overflow-hidden");
          mobileToggleBtn.setAttribute("aria-expanded", "true");
        }
      }
    });

    // Auto-close when clicking any link inside the mobile nav drawer
    mobileNavPanel.addEventListener("click", function (e) {
      const link = e.target.closest("a");
      if (link && !window.Alpine) {
        mobileNavPanel.style.display = "none";
        document.body.classList.remove("overflow-hidden");
        mobileToggleBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !window.Alpine && mobileNavPanel.style.display === "block") {
        mobileNavPanel.style.display = "none";
        document.body.classList.remove("overflow-hidden");
        mobileToggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
});

