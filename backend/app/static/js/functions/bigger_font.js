document.addEventListener("DOMContentLoaded", () => {
  let is_bigger = localStorage.getItem("is_bigger") === "1" ? 1 : 0;

  const fontSizeLaptop = () => {
    document.documentElement.style.setProperty("--th-font-size", is_bigger === 1 ? "1.5rem" : "1rem");
    document.documentElement.style.setProperty("--td-font-size", is_bigger === 1 ? "1.25rem" : "1.0rem");
    document.documentElement.style.setProperty("--ajax-p-fs", is_bigger === 1 ? "1.5rem" : "1rem");
  };

  const fontSizeMobile = () => {
    document.documentElement.style.setProperty("--th-font-size", is_bigger === 1 ? "1.25rem" : "1rem");
    document.documentElement.style.setProperty("--td-font-size", is_bigger === 1 ? "1rem" : "0.8rem");
    document.documentElement.style.setProperty("--ajax-p-fs", is_bigger === 1 ? "1.25rem" : "1rem");
  };

  const fontSizeTablet = () => {
    document.documentElement.style.setProperty("--th-font-size", is_bigger === 1 ? "1.5rem" : "1.25rem");
    document.documentElement.style.setProperty("--td-font-size", is_bigger === 1 ? "1.25rem" : "1.0rem");
    document.documentElement.style.setProperty("--ajax-p-fs", is_bigger === 1 ? "1.5rem" : "1rem");
  };

  const bigFont = document.querySelector(".bigger-font-btn");
  if (bigFont) {
    bigFont.addEventListener("click", () => {
      is_bigger = is_bigger === 1 ? 0 : 1;
      localStorage.setItem("is_bigger", is_bigger);
      if (window.innerWidth < 768) {
        fontSizeMobile();
      } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        fontSizeTablet();
      } else {
        fontSizeLaptop();
      }
    });
  }

  if (window.innerWidth < 768) {
    fontSizeMobile();
  } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
    fontSizeTablet();
  } else {
    fontSizeLaptop();
  }
});
