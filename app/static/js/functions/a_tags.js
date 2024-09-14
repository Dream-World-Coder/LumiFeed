// changed a to span

document.addEventListener("DOMContentLoaded", () => {
  const NOTatags = document.querySelectorAll(".res");
  // const topPosition_of_searchDiv = parseInt(window.getComputedStyle(document.getElementById('queryy')).top, 10);

  NOTatags.forEach((a) => {
    a.addEventListener("click", () => {
      // event.preventDefault();
      // let href = a.href;
      let href = a.getAttribute("data-href");
      // let id = href.split('#')[1];
      let id = href;
      let target_elem = document.getElementById(id);
      let t2 = target_elem.parentElement;
      let rect = t2.getBoundingClientRect();

      window.scrollTo({
        top: window.scrollY + rect.top - 100,
        behavior: "smooth",
      });

      // highlighting
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
