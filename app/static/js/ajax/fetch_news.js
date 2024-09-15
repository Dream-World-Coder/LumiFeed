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

      show_news_preview();
      read_in_new_tab();
      toggle_news_preview();
    });
  // .catch((error) => console.error("Error fetching news:", error));
}

// $(document).ready(function () {
//   $("#fetch-news-form").submit((event) => {
//     event.preventDefault();

//     var formData = {
//       news_type: $("#news_type").val(),
//       news_count: $("#news_count").val(),
//       city_choice: $("#city_choice").val() || "",
//     };

//     $.ajax({
//       url: "/fetchnews",
//       type: "GET",
//       data: formData, // This will be serialized into query parameters
//       success: function (response) {
//         localStorage.setItem("news_list", JSON.stringify(response.news_list));
//         $("#news-table").html(response.news_table);

//         toggle_news_preview();
//         show_news_preview();
//         read_in_new_tab();
//       },
//       error: function (error) {
//         console.error("Error fetching news:", error);
//         alert("An error occurred while fetching the news!");
//       },
//     });
//   });
// });
