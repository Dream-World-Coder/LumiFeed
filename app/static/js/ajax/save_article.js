function displayMessage(message) {
  alert(message);
}

function sendArticleToServer(articleTitle, articleUrl) {
  const url = "/add_to_read_later";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article_title: articleTitle, article_url: articleUrl }),
  };

  fetch(url, options)
    .then((response) => {
      if (response.status === 401) {
        displayMessage("Please login to save articles");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        return response.json();
      }
    })
    .then((responseData) => {
      if (responseData.error) {
        displayMessage(responseData.error);
      } else {
        displayMessage(responseData.message);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
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
      //   console.log(articleTitle, articleUrl); // working
      sendArticleToServer(articleTitle, articleUrl);
    });
  });
}

saveArticleInReadLater();
