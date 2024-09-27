const categoryTitle = document.querySelector(".category-title");
// const dropdownBtn = document.querySelector(".dropdown");
const options = document.querySelector(".options");
const CityOption = document.querySelector(".city-name-options");
const plus = document.querySelector(".d-img-1");
const minus = document.querySelector(".d-img-2");

categoryTitle.addEventListener("click", () => {
  if (options.style.display === "none") {
    options.style.display = "flex";
    plus.style.display = "none";
    minus.style.display = "flex";
    if (window.innerWidth < 768) {
      document.documentElement.style.setProperty("--fetch-news-height", "12rem");
    } else {
      document.documentElement.style.setProperty("--fetch-news-height", "22rem");
    }
  } else if (CityOption.style.display === "flex") {
    CityOption.style.display = "none";
    options.style.display = "none";
    plus.style.display = "flex";
    minus.style.display = "none";
    document.documentElement.style.setProperty("--fetch-news-height", "auto");
  } else {
    options.style.display = "none";
    plus.style.display = "flex";
    minus.style.display = "none";
    document.documentElement.style.setProperty("--fetch-news-height", "auto");
  }
});
