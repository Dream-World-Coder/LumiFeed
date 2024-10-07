document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  const searchReasults = document.querySelector(".search-reasults");

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
      .then((response) => response.json())
      .then((data) => {
        if (data.html) {
          searchReasults.style.display = "flex";
          document.getElementById("ajax_desktop").innerHTML = data.html;
          findArticle();
        } else {
          displayMessage(data.error);
        }
      })
      .catch((error) => {
        displayMessage(error.message);
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
