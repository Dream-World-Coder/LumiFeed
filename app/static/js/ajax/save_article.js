function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("temporary-message");
  messageElement.textContent = message;
  document.body.appendChild(messageElement);
  setTimeout(() => {
    messageElement.remove();
  }, 3000);
}

function sendArticleToServer(req_url, articleTitle, articleUrl, parentCollection) {
  const url = req_url;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article_title: articleTitle, article_url: articleUrl, parent_collection: parentCollection }),
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.success) {
        displayMessage(responseData.success);
      } else {
        displayMessage(responseData.error);
      }
    })
    .catch((error) => {
      displayMessage(error);
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
      sendArticleToServer("/add_to_read_later", articleTitle, articleUrl, "Read Later");
    });
  });
}

// ------------ for saving article in different playlists, add_to_different_collections ----- //

function saveArticleInOtherCollections() {
  const ReadLaterCollectionBtns = document.querySelectorAll(".other_collections");
  const tdContainingTitle = document.querySelectorAll(".td2");
  const aContainingUrl = document.querySelectorAll(".news_urls_a_tag");

  ReadLaterCollectionBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      var articleTitle = tdContainingTitle[index].textContent;
      var articleUrl = aContainingUrl[index].getAttribute("href");
      // options : current_user.collections except "Read Later"
      // current.user.collections :- set them in localhost in /new_collection route
      // now make the input options dropdown
      var parentCollection = "Liked Articles";
      sendArticleToServer("/add_to_different_collections", articleTitle, articleUrl, parentCollection);
    });
  });
}

saveArticleInReadLater();
saveArticleInOtherCollections();
