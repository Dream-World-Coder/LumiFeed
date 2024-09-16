document.addEventListener("DOMContentLoaded", () => {
  function applyDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("is_darkmode", "true");
    document.documentElement.style.setProperty("--bg1", "aliceblue");
    // -------
    // search
    // -------
    document.documentElement.style.setProperty(
      "--dim-border",
      "rgba(108,108,108,0.9)"
    );
    document.documentElement.style.setProperty(
      "--dim-bg-clr",
      "rgba(108,108,108,0.5)"
    );
    document.documentElement.style.setProperty(
      "--dim-clr",
      "rgba(171, 171, 171, 0.85)"
    );
    document.documentElement.style.setProperty(
      "--res-link-bg-clr",
      "var(--bg1)"
    );
  }

  function removeDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("is_darkmode", "false");
    document.documentElement.style.setProperty("--bg1", "var(--bg1-val)");
    // -------
    // search
    // -------
    document.documentElement.style.setProperty("--dim-border", "var(--c3)"); // border
    document.documentElement.style.setProperty("--dim-bg-clr", "var(--c4)"); // bg
    document.documentElement.style.setProperty("--dim-clr", "var(--c5)");
    document.documentElement.style.setProperty(
      "--res-link-bg-clr",
      "var(--c6)"
    );
  }

  function applyDMlocalStorage() {
    if (localStorage.getItem("is_darkmode") === "true") {
      applyDarkMode();
    } else {
      removeDarkMode();
    }
  }

  const dmbtn = document.querySelector(".dmbtn");
  dmbtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
      removeDarkMode();
    } else {
      applyDarkMode();
    }
  });

  applyDMlocalStorage();
});
