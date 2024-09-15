function fetchNews(event) {
  event.preventDefault();

  const form = document.getElementById("fetch-news-form");
  const formData = new FormData(form);

  const newsType = formData.get("news_type");
  const newsCount = formData.get("news_count");
  const cityChoice = formData.get("city_choice") || "";

  const url = `/fetchnews?news_type=${newsType}&news_count=${newsCount}&city_choice=${cityChoice}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("news_list", JSON.stringify(data.news_list));
      document.getElementById("news-table").innerHTML = data.news_table;
    });
  // .catch((error) => console.error("Error fetching news:", error));
}

read_in_new_tab();
