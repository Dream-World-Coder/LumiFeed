document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      searchPart: document.getElementById("search").value,
      news_list: JSON.parse(localStorage.getItem("news_list")) || [],
    };

    fetch("/search_in_title", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById("ajax_desktop").innerHTML = data.html;
        findArticle(); // Assuming this function is defined elsewhere
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Some error occurred!");
      });
  });
});
// $(document).ready(function () {
//   $("#search-form").submit((event) => {
//     event.preventDefault();

//     var formData = {
//       searchPart: $("#search").val(),
//       news_list: JSON.parse(localStorage.getItem("news_list")) || [],
//     };

//     $.ajax({
//       url: "/search_in_title",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify(formData),
//       success: function (response) {
//         $("#ajax_desktop").html(response.html);
//         findArticle();
//       },
//       error: function (error) {
//         alert("Some error occurred!");
//       },
//     });
//   });
// });
