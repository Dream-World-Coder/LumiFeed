document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  const news_count_input = document.getElementById("news_count");

  if (window.innerWidth <= 168) {
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


/*
function foo(){
    if (window.innerWidth > 1024) {
        const footer = document.getElementById('footer');

        if (!footer) {
            console.warn('Footer element not found');
            return;
        }

        const root = document.documentElement;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the visible height of the footer
                    const visibleHeight = entry.boundingClientRect.height;
                    root.style.setProperty('--res-h', `${visibleHeight}px`);
                } else {
                    window.requestAnimationFrame(() => {
                        let currentHeight = parseFloat(getComputedStyle(root).getPropertyValue('--res-h')) || 70 * window.innerHeight / 100;
                        let newHeight = currentHeight > (70 * window.innerHeight / 100) ? currentHeight - 1 : (70 * window.innerHeight / 100);
                        root.style.setProperty('--res-h', `${newHeight}px`);
                    });
                }
            });
        }, {
            threshold: 0
        });
        observer.observe(footer);
    }
}
foo();
*/
