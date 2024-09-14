document.addEventListener("DOMContentLoaded", function () {
  const cityNewsRadio = document.getElementById("city_news");
  const CityOption = document.getElementById("c-o");
  const find = document.querySelector(".find");

  document.querySelectorAll('input[name="news_type"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      if (cityNewsRadio.checked) {
        CityOption.classList.add("visible");
        find.classList.add("shrink");
        document.documentElement.style.setProperty(
          "--fetch-news-height",
          "28rem"
        );
      } else {
        CityOption.classList.remove("visible");
        find.classList.remove("shrink");
        document.documentElement.style.setProperty(
          "--fetch-news-height",
          "24rem"
        );
      }
    });
  });
});
