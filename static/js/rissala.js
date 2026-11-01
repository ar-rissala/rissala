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
});

