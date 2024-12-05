function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

function fetchNews(event) {
    if (event) event.preventDefault();
    showLoader();

    var form = document.getElementById("fetch-news-form");
    var formData = new FormData(form);
    var newsType = formData.get("news_type");
    var newsCount = formData.get("news_count");
    var name_of_city = formData.get("name_of_city") || "";
    var url = `/fetchnews?news_type=${newsType}&news_count=${newsCount}&name_of_city=${name_of_city}`;

    // Store the last fetched URL in localStorage
    if (newsCount > 25) {
        var tmp = 25;
        url = `/fetchnews?news_type=${newsType}&news_count=${tmp}&name_of_city=${name_of_city}`;
        localStorage.setItem("last_url", url);
    } else {
        url = `/fetchnews?news_type=${newsType}&news_count=${newsCount}&name_of_city=${name_of_city}`;
        localStorage.setItem("last_url", url);
    }

    url = `/fetchnews?news_type=${newsType}&news_count=${newsCount}&name_of_city=${name_of_city}`;
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
            // print(data.news_table);
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
            var sr = document.querySelector(".search-reasults");
            if (
                window.getComputedStyle(sr).getPropertyValue("opacity") !== "0"
            ) {
                sr.style.opacity = "0";
            }
            // or
            // if (sr) {
            // sr.style.opacity = sr.style.opacity === "0" ? "1" : "0";
            // }
        });
}

/*
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

*/
