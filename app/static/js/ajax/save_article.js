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
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Please login first, to save articles");
      } else if (response.status === 400) {
        throw new Error("Bad request. Please check your input.");
      } else if (response.status === 409) {
        throw new Error("This article is already saved.");
      } else if (response.status === 500) {
        throw new Error("Failed to save article.");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      displayMessage(responseData.message);
    })
    .catch((error) => {
      displayMessage(error.message);
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

// ------------ for saving article in different playlists, add_to_different_collections -----

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
