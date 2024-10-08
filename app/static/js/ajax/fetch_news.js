function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function fetchNews(event) {
  if (event) event.preventDefault();
  showLoader();

  const form = document.getElementById("fetch-news-form");
  const formData = new FormData(form);
  const newsType = formData.get("news_type");
  const newsCount = formData.get("news_count");
  const name_of_city = formData.get("name_of_city") || "";
  let url = `/fetchnews?news_type=${newsType}&news_count=${newsCount}&name_of_city=${name_of_city}`;

  // Store the last fetched URL in localStorage
  localStorage.setItem("last_url", url);

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("news_list", JSON.stringify(data.news_list));
      document.getElementById("news-table").innerHTML = data.news_table;
      show_news_preview();
      read_in_new_tab();
      saveArticleInReadLater();
      saveArticleInOtherCollections();
    })
    .catch((error) => {
      displayMessage(error.message, "error");
    })
    .finally(() => {
      hideLoader();
    });
}

// Call fetchNews from the last stored URL on page load
window.addEventListener("load", () => {
  const lastUrl = localStorage.getItem("last_url");

  if (lastUrl) {
    // If there is a last URL stored, fetch news from it
    showLoader();

    fetch(lastUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("news_list", JSON.stringify(data.news_list));
        document.getElementById("news-table").innerHTML = data.news_table;
        show_news_preview();
        read_in_new_tab();
        saveArticleInReadLater();
        saveArticleInOtherCollections();
      })
      .catch((error) => {
        displayMessage(error.message, "error");
      })
      .finally(() => {
        hideLoader();
      });
  }
});
