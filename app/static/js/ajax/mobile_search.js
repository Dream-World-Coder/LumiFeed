$(document).ready(function () {
  $("#phone-search-form").submit((event) => {
    event.preventDefault();

    var formData = {
      searchPart: $("#phone-search-input").val(),
      // this can be the same as {name} attr in the input
      // or not also, i.e. any name. [search_part]
      news_list: JSON.parse(localStorage.getItem("news_list")) || [],
    };

    $.ajax({
      url: "/search_in_title",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        $("#ajax").html(response.html);
        read_js_function();
        attachClickHandlers();
        rhAJAX();
      },
      error: function (error) {
        alert("some error occurred!");
      },
    });
  });
});
