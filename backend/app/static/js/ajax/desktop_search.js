function isAndroidMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check if the device is Android and a mobile device
    if (/android/i.test(userAgent) && /mobile/i.test(userAgent)) {
        return true;
    }
    return false;
}

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchReasults = document.querySelector(".search-reasults");

    if (window.innerWidth <= 768 || isAndroidMobile()) {
        searchReasults.style.display = "none";
    }
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            searchPart: document.getElementById("search").value,
            news_list: JSON.parse(localStorage.getItem("news_list")) || [],
        };

        fetch("/search_in_title", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.html) {
                    searchReasults.style.opacity = "1";
                    document.getElementById("ajax_desktop").innerHTML =
                        data.html;
                    findArticle();
                } else {
                    displayMessage(data.error, "error");
                }
            })
            .catch((error) => {
                displayMessage(error.message, "error");
            });
    });
});

// $(document).ready(function () {
//   $("#search-form").submit((event) => {
//     event.preventDefault();

//     var formData = {
//       searchPart: $("#search").val(),
//       news_list: JSON.parse(localStorage.getItem("news_list")) || [],
//     };

//     $.ajax({
//       url: "/search_in_title",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify(formData),
//       success: function (response) {
//         $("#ajax_desktop").html(response.html);
//         findArticle();
//       },
//       error: function (error) {
//         alert("Some error occurred!");
//       },
//     });
//   });
// });
