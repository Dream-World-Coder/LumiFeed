function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function fetchNews(event) {
  event.preventDefault();
  showLoader();

  const form = document.getElementById("fetch-news-form");
  const formData = new FormData(form);
  const newsType = formData.get("news_type");
  const newsCount = formData.get("news_count");
  const cityChoice = formData.get("city_choice") || "";
  const url = `/fetchnews?news_type=${newsType}&news_count=${newsCount}&city_choice=${cityChoice}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("news_list", JSON.stringify(data.news_list));
      document.getElementById("news-table").innerHTML = data.news_table;
      show_news_preview();
      saveArticleInReadLater();
      saveArticleInOtherCollections();
    })
    .finally(() => {
      hideLoader();
    });
}

// Attach the event listener to the form
document.getElementById("fetch-news-form").addEventListener("submit", fetchNews);
