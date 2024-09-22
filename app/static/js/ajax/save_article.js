function displayMessage(message) {
  // Create a new div element
  const messageElement = document.createElement("div");

  // Add classes for styling
  messageElement.classList.add("temporary-message");

  // Set the message text
  messageElement.textContent = message;

  // Append the message to the body
  document.body.appendChild(messageElement);

  // Remove the message after 5 seconds
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
        throw new Error("Please login to save articles");
      } else if (response.status === 400) {
        throw new Error("Bad request. Please check your input.");
      } else if (response.status === 409) {
        throw new Error("This article is already saved.");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      if (responseData.error) {
        displayMessage(responseData.error);
      } else {
        displayMessage(responseData.message);
      }
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
saveArticleInReadLater();

// ------------ for saving article in different playlists, add_to_different_collections -----

function saveArticleInOtherCollections() {
  const ReadLaterCollectionBtns = document.querySelectorAll(".other_collections");
  const tdContainingTitle = document.querySelectorAll(".td2");
  const aContainingUrl = document.querySelectorAll(".news_urls_a_tag");

  ReadLaterCollectionBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      var articleTitle = tdContainingTitle[index].textContent;
      var articleUrl = aContainingUrl[index].getAttribute("href");
      // input this later
      var parentCollection = "Liked Articles";
      sendArticleToServer("/add_to_different_collections", articleTitle, articleUrl, parentCollection);
    });
  });
}
saveArticleInOtherCollections();
