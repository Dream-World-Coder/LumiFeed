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



const mobileNav = document.querySelector('.nav-items-for-mobiles');
const originalLis = document.querySelectorAll('.og-li');
const mobileNavMenu = document.querySelector('.ham img:nth-child(1)');
const mobileNavCross = document.querySelector('.ham img:nth-child(2)');
const ham = document.querySelector('.ham');

// Hide all original nav items
function hideOgLi() {
  originalLis.forEach(originalLi => {
    originalLi.style.display = 'none';
  });
}

// Show all original nav items
function showOgLi() {
  originalLis.forEach(originalLi => {
    originalLi.style.display = 'block';
  });
}

// Handle mobile nav functionality (expand/collapse)
function mobileNavFunctionality() {
  ham.addEventListener('click', () => {
    if (mobileNav.classList.contains('expand')) {
      mobileNav.classList.remove('expand');
      mobileNavMenu.style.display = 'block';
      mobileNavCross.style.display = 'none';
    } else {
      mobileNav.classList.add('expand');
      mobileNavMenu.style.display = 'none';
      mobileNavCross.style.display = 'block';
    }
  });
}

// Initial responsive behavior
function initResponsiveBehavior() {
  if (window.innerWidth >= 768) {
    mobileNav.style.display = 'none';
    showOgLi();
    [mobileNavMenu, mobileNavCross].forEach(item => {
      item.style.display = 'none';
    });
  } else {
    mobileNav.style.display = 'flex';
    hideOgLi();
    mobileNavFunctionality();
  }
}

// Use computed style to check visibility of mobile nav
function isMobileNavVisible() {
  return window.getComputedStyle(mobileNav).display !== 'none';
}

// Initialize the responsive behavior when the page loads
initResponsiveBehavior();



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
