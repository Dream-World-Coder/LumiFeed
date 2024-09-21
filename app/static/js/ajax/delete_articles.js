const deleteBtns = document.querySelectorAll(".delete_article");
const articleLis = document.querySelectorAll(".collection_content ul li");
deleteBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    articleLis[index].style.display = "none";
    document.removeChild(articleLis[index]);
    alert("article removed from collection.");
  });
});
