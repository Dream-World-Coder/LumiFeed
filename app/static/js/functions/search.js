document.addEventListener("DOMContentLoaded", () => {
    const mobile_search = document.querySelector(".mobile-search-btn");
    const findMobile = document.querySelector(".find-mobile");
    const bar = document.querySelector(".horizontal-bar");
    mobile_search.addEventListener("click", () => {
        if (findMobile.classList.contains("active")) {
            findMobile.classList.remove("active");
        } else {
            findMobile.classList.add("active");
        }
    });
    bar.addEventListener("click", () => {
        if (findMobile.classList.contains("active")) {
            findMobile.classList.remove("active");
        }
    });
});
//
