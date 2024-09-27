document.addEventListener("DOMContentLoaded", function () {
  const cityNewsRadio = document.getElementById("city_news");
  const CityOption = document.querySelector(".city-name-options");

  document.querySelectorAll('input[name="news_type"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      if (cityNewsRadio.checked) {
        CityOption.style.display = "flex";
        if (window.innerWidth < 768) {
          document.documentElement.style.setProperty("--fetch-news-height", "16rem");
        } else {
          document.documentElement.style.setProperty("--fetch-news-height", "26rem");
        }
      } else {
        CityOption.style.display = "none";
        if (window.innerWidth < 768) {
          document.documentElement.style.setProperty("--fetch-news-height", "12rem");
        } else {
          document.documentElement.style.setProperty("--fetch-news-height", "22rem");
        }
      }
    });
  });
});
