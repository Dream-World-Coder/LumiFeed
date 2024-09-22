function sendArticleToRemoveToServer(article_url) {
  url = "/remove_article";
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article_url: article_url }),
  };
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      document.removeChild(articleLis[index]);
      alert(data.message);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function deleteArticle() {
  const deleteBtns = document.querySelectorAll(".delete_article");
  const articleLis = document.querySelectorAll(".collection_content ul li");
  deleteBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      let url = articleLis[index].getAttribute("data-url");
      sendArticleToRemoveToServer(url);
    });
  });
}

deleteArticle();
