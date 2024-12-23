document.addEventListener("DOMContentLoaded", () => {
  function applyDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("is_darkmode", "true");

    document.documentElement.style.setProperty("--dim-border", "rgba(108,108,108,0.9)");
    document.documentElement.style.setProperty("--dim-bg-clr", "rgba(108,108,108,0.5)");
    document.documentElement.style.setProperty("--dim-clr", "rgba(171, 171, 171, 0.85)");
    document.documentElement.style.setProperty("--res-link-bg-clr", "rgb(221, 221, 221)");
  }

  function removeDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("is_darkmode", "false");

    document.documentElement.style.setProperty("--dim-border", "rgb(202, 202, 202)"); // 172
    document.documentElement.style.setProperty("--dim-bg-clr", "rgb(244, 244, 244)"); // 214
    document.documentElement.style.setProperty("--dim-clr", "rgb(226, 226, 226)"); // 196
    document.documentElement.style.setProperty("--res-link-bg-clr", "rgb(251, 251, 251)"); // 221
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
