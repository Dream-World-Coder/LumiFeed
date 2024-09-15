document.addEventListener("DOMContentLoaded", () => {
  let is_bigger = localStorage.getItem("is_bigger") === "1" ? 1 : 0;

  // for phone and mac
  const applyFontSize = () => {
    document.documentElement.style.setProperty(
      "--th-font-size",
      is_bigger === 1 ? "1.5rem" : "1rem"
    );
    document.documentElement.style.setProperty(
      "--td-font-size",
      is_bigger === 1 ? "1.25rem" : "1.0rem"
    );
    document.documentElement.style.setProperty(
      "--p",
      is_bigger === 1 ? "10px" : "10px"
    );
    document.documentElement.style.setProperty(
      "--ajax-p-fs",
      is_bigger === 1 ? "1.5rem" : "1rem"
    );
  };

  // for tablet
  const applyFontSize2 = () => {
    document.documentElement.style.setProperty(
      "--th-font-size",
      is_bigger === 1 ? "1.5rem" : "1.25rem"
    );
    document.documentElement.style.setProperty(
      "--td-font-size",
      is_bigger === 1 ? "1.25rem" : "1.0rem"
    );
    document.documentElement.style.setProperty("--p", "10px"); // Seems fixed for both states
    document.documentElement.style.setProperty(
      "--ajax-p-fs",
      is_bigger === 1 ? "1.5rem" : "1rem"
    );
  };

  const bigFont = document.querySelector(".bigger-font");
  if (bigFont) {
    bigFont.addEventListener("click", () => {
      is_bigger = is_bigger === 1 ? 0 : 1;
      localStorage.setItem("is_bigger", is_bigger);
      if (window.innerWidth < 768) {
        applyFontSize();
      } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        applyFontSize2();
      } else {
        applyFontSize();
      }
    });
  }

  if (window.innerWidth < 768) {
    applyFontSize();
  } else if (window.innerWidth >= 768 && window.innerWidth <= 1240) {
    applyFontSize2();
  } else {
    applyFontSize();
  }
});
