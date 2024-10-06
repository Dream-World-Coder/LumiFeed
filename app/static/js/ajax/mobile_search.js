function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("temporary-message");
  messageElement.textContent = message;
  document.body.appendChild(messageElement);
  setTimeout(() => {
    messageElement.remove();
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  const phoneSearchForm = document.getElementById("phone-search-form");

  phoneSearchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      searchPart: document.getElementById("phone-search-input").value,
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
          document.getElementById("ajax").innerHTML = data.html;
          findArticle();
        } else {
          displayMessage(data.error);
        }
      })
      .catch((error) => {
        displayMessage(error.message);
      });
  });
});
