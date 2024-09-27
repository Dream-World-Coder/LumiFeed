document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  const news_count_input = document.getElementById("news_count");

  if (window.innerWidth <= 768) {
    buttons.forEach((button, index) => {
      button.style.width = "35px";
      button.style.height = "25px";
      button.style.fontSize = "0.65rem";
      button.style.borderRadius = "10px";
    });
    news_count_input.style.fontSize = "0.8rem";
    news_count_input.style.height = "20px";
    news_count_input.style.width = "25px";
  }
});

// Disable infinite scroll
window.addEventListener(
  "scroll",
  function () {
    // Prevent loading more content when scrolling to the bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // Stop any loading action here
      // You can clear any loading indicators if needed
    }
  },
  { passive: true }
);
