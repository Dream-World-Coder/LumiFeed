// its no use, AJAX linked

document.addEventListener("DOMContentLoaded", () => {
  const find_article_btns = document.querySelectorAll(".res__link");
  const NOTatags = document.querySelectorAll(".res__serial");

  NOTatags.forEach((a) => {
    a.addEventListener("click", () => {
      let href = a.getAttribute("data-href");
      let id = href;
      let target_elem = document.getElementById(id);
      let t2 = target_elem.parentElement;
      let rect = t2.getBoundingClientRect();

      window.scrollTo({
        top: window.scrollY + rect.top - 100,
        behavior: "smooth",
      });

      var target = target_elem.parentElement;
      var classToAdd = "active_highlight";
      if (document.body.classList.contains("dark-mode")) {
        classToAdd = "active_highlight_dark";
      }
      target.classList.add(classToAdd);
      setTimeout(() => {
        target.classList.remove(classToAdd);
      }, 1500);
    });
  });
});
