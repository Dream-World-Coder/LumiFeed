$(document).ready(function () {
  $("#search-form").submit((event) => {
    event.preventDefault();

    // Get search part from the form input
    var formData = {
      searchPart: $("#search").val(),
      // Retrieve the news_list from localStorage
      news_list: JSON.parse(localStorage.getItem("news_list")) || [],
    };

    // AJAX request to search the news
    $.ajax({
      url: "/search_in_title",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        // Populate the search results into the #ajax_desktop element
        $("#ajax_desktop").html(response.html);

        // Optionally call custom functions like:
        read_js_function();
        attachClickHandlers();
        rhAJAX();
      },
      error: function (error) {
        alert("Some error occurred!");
      },
    });
  });
});
