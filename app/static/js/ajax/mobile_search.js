document.addEventListener("DOMContentLoaded", function () {
  const phoneSearchForm = document.getElementById("phone-search-form");

  phoneSearchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      searchPart: document.getElementById("phone-search-input").value,
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
        document.getElementById("ajax").innerHTML = data.html;
        findArticle(); // Assuming this function is defined elsewhere
      });
  });
});
// $(document).ready(function () {
//   $("#phone-search-form").submit((event) => {
//     event.preventDefault();

//     var formData = {
//       searchPart: $("#phone-search-input").val(),
//       // this can be the same as {name} attr in the input
//       // or not also, i.e. any name. [search_part]
//       news_list: JSON.parse(localStorage.getItem("news_list")) || [],
//     };

//     $.ajax({
//       url: "/search_in_title",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify(formData),
//       success: function (response) {
//         $("#ajax").html(response.html);
//         findArticle();
//       },
//       error: function (error) {
//         alert("some error occurred!");
//       },
//     });
//   });
// });
