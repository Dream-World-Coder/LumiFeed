function sendArticleToRemoveToServer(article_url, articleLi) {
  const url = "/remove_article";
  const options = {
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
      displayMessage(data.message);
      // Remove the article <li> element from the DOM
      articleLi.remove();
    });
}

function deleteArticle() {
  const deleteBtns = document.querySelectorAll(".delete_article");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();

      // Get the parent <li> of the delete button
      const articleLi = btn.closest("li");
      let article_url = articleLi.getAttribute("data-url");

      // Send the request to remove the article from the server and DOM
      sendArticleToRemoveToServer(article_url, articleLi);
    });
  });
}

deleteArticle();
