function findArticle() {
  const resDivs = document.querySelectorAll(".res");
  const NOTatags = document.querySelectorAll(".res__serial");
  resDivs.forEach((res, index) => {
    res.addEventListener("click", (event) => {
      event.preventDefault();
      let a = NOTatags[index];
      let href = a.getAttribute("data-href");
      let target_elem = document.getElementById(href);
      let rect = target_elem.parentElement.getBoundingClientRect();

      window.scrollTo({
        top: window.scrollY + rect.top - 300,
        behavior: "smooth",
      });

      // Highlighting
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
}

findArticle();
