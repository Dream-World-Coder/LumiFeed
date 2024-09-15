function show_news_preview() {
  // Using event delegation to attach events to dynamically generated content
  console.log(`\n\n\nshow_news_preview() is called.\n\n\n`);

  $(document).on("click", ".read_here", function () {
    const index = $(".read_here").index(this);
    const newsUrl = $(".news_urls_a_tag").eq(index).attr("href");

    $.ajax({
      url: "/read_news_here",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ url: newsUrl }),
      success: function (response) {
        $("#ajax_h1").text(response.heading);
        $("#ajax_h3").text(response.subheading);
        $("#ajax_img").attr("src", response.imgUrl);
        $("#ajax_p").html(response.news_data_string);
      },
      error: function (error) {
        alert("Some error occurred!");
      },
    });
  });
}

show_news_preview();
