$(document).ready(function () {
  $("#search-form").submit((event) => {
    event.preventDefault();

    var formData = {
      searchPart: $("#search").val(),
      news_list: JSON.parse(localStorage.getItem("news_list")) || [],
    };

    $.ajax({
      url: "/search_in_title",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        $("#ajax_desktop").html(response.html);

        toggle_news_preview();
        find_article();
      },
      error: function (error) {
        alert("Some error occurred!");
      },
    });
  });
});
