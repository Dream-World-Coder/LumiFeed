function toggle_news_preview() {
  document.addEventListener("DOMContentLoaded", () => {
    const read = document.getElementById("read");
    const closeBtn = document.getElementById("close-preview");
    const openInNewTabBtn = document.getElementById("open-in-new-tab");

    //const readbtns = document.querySelectorAll('.rbtn');
    const read_here_btns = document.querySelectorAll(".read_here");

    read_here_btns.forEach((readbtn) => {
      readbtn.addEventListener("click", () => {
        read.style.display = "flex";
      });
    });
    closeBtn.addEventListener("click", () => {
      read.style.display = "none";
    });

    openInNewTabBtn.addEventListener("click", () => {
      read.style.display = "none";
    });
  });
}
toggle_news_preview();
