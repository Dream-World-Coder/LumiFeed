document.addEventListener("DOMContentLoaded", () => {
  let is_bigger = localStorage.getItem("is_bigger") === "1" ? 1 : 0;

  const applyFontSize = () => {
    console.log("Applying font size 1");
    document.documentElement.style.setProperty(
      "--th-font-size",
      is_bigger === 1 ? "2rem" : "1.6rem"
    );
    document.documentElement.style.setProperty(
      "--td-font-size",
      is_bigger === 1 ? "1.3rem" : "1.0rem"
    );
    document.documentElement.style.setProperty(
      "--p",
      is_bigger === 1 ? "20px" : "10px"
    );
    document.documentElement.style.setProperty(
      "--ajax-p-fs",
      is_bigger === 1 ? "1.5rem" : "1.25rem"
    );
  };

  const applyFontSize2 = () => {
    console.log("Applying font size 2");
    document.documentElement.style.setProperty(
      "--th-font-size",
      is_bigger === 1 ? "2.5rem" : "1.6rem"
    );
    document.documentElement.style.setProperty(
      "--td-font-size",
      is_bigger === 1 ? "1.8rem" : "1.0rem"
    );
    document.documentElement.style.setProperty("--p", "20px"); // Seems fixed for both states
    document.documentElement.style.setProperty(
      "--ajax-p-fs",
      is_bigger === 1 ? "1.5rem" : "1.25rem"
    );
  };

  const bigFont = document.querySelector(".bigger-font");
  if (bigFont) {
    bigFont.addEventListener("click", () => {
      is_bigger = is_bigger === 1 ? 0 : 1;
      localStorage.setItem("is_bigger", is_bigger);
      // console.log(`Window dimensions: ${window.innerWidth}x${window.innerHeight}`);
      if (window.innerWidth < 768) {
        applyFontSize();
      } else if (window.innerWidth >= 768 && window.innerWidth <= 1240) {
        applyFontSize2();
      } else {
        applyFontSize();
      }
    });
  }

  // Apply font size on page load based on initial state
  // console.log(`Initial window dimensions: ${window.innerWidth}x${window.innerHeight}`);
  if (window.innerWidth < 768) {
    applyFontSize();
  } else if (window.innerWidth >= 768 && window.innerWidth <= 1240) {
    applyFontSize2();
  } else {
    applyFontSize();
  }
});
