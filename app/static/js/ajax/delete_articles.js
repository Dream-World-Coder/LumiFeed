function sendArticleToRemoveToServer(article_url, article_parent_collection, matchingLiElements) {
  const url = "/remove_article";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article_url: article_url, article_parent_collection: article_parent_collection }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        displayMessage(data.message, "success");
        matchingLiElements.forEach((li) => {
          li.remove();
        });
      } else {
        displayMessage(data.error, "error");
      }
    })
    .catch((error) => {
      displayMessage(error.message, "error");
    });
}

function deleteArticle() {
  const deleteBtns = document.querySelectorAll(".delete_article");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation(); // not clicking the parent under it

      // Get the parent <li> of the delete button
      const articleLi = btn.closest("li");
      let article_url = articleLi.getAttribute("data-url");
      let article_parent_collection = articleLi.getAttribute("data-collection");
      let matchingLiElements = document.querySelectorAll(`li[data-url="${article_url}"][data-collection="${article_parent_collection}"]`);
      // Send the request to remove the article from the server and DOM
      sendArticleToRemoveToServer(article_url, article_parent_collection, matchingLiElements);
    });
  });
}

deleteArticle();
