function ntAJAX() {
  $(document).on("click", "#open-in-new-tab", function () {
    const newTabBtn = $("#open-in-new-tab");

    newTabBtn.on("click", function () {
      const heading = $("#ajax_h1").text();
      const subheading = $("#ajax_h3").text();
      const news_content = $("#ajax_p").html();
      const newsImgUrl = $("#ajax_img").attr("src");

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/read_news_in_new_tab";
      form.target = "_blank";

      const inputHeading = document.createElement("input");
      inputHeading.type = "hidden";
      inputHeading.name = "heading";
      inputHeading.value = heading;
      form.appendChild(inputHeading);

      const inputSubheading = document.createElement("input");
      inputSubheading.type = "hidden";
      inputSubheading.name = "subheading";
      inputSubheading.value = subheading;
      form.appendChild(inputSubheading);

      const inputNewsContent = document.createElement("input");
      inputNewsContent.type = "hidden";
      inputNewsContent.name = "news_content";
      inputNewsContent.value = news_content;
      form.appendChild(inputNewsContent);

      const inputNewsImgUrl = document.createElement("input");
      inputNewsImgUrl.type = "hidden";
      inputNewsImgUrl.name = "newsImgUrl";
      inputNewsImgUrl.value = newsImgUrl;
      form.appendChild(inputNewsImgUrl);

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    });
  });
}
ntAJAX();
