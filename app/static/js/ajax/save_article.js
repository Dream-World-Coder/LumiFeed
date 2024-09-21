function handleSuccess() {
  alert("Article saved successfully!");
}

function handleFailure() {
  alert("Failed to save the article.");
}

function sendArticleToServer(articleTitle, articleUrl) {
  fetch("/add_to_read_later", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article_title: articleTitle, article_url: articleUrl }),
  })
    .then((response) => {
      if (response.ok) {
        handleSuccess();
      } else {
        handleFailure();
      }
    })
    .catch((error) => {
      console.error("Error saving the article:", error);
    });
}

function saveArticleInReadLater() {
  const ReadLaterCollectionBtns = document.querySelectorAll(".read_later_collection");
  const tdContainingTitle = document.querySelectorAll(".td2");
  const aContainingUrl = document.querySelectorAll(".news_urls_a_tag");

  ReadLaterCollectionBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      var articleTitle = tdContainingTitle[index].textContent;
      var articleUrl = aContainingUrl[index].getAttribute("href");
      sendArticleToServer(articleTitle, articleUrl);
    });
  });
}

saveArticleInReadLater();
// need to call each time after fetchnews is called as td s are generated through ajax
