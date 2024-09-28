function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("temporary-message");
  messageElement.textContent = message;
  document.body.appendChild(messageElement);
  setTimeout(() => {
    messageElement.remove();
  }, 3000);
}

function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function show_news_preview() {
  const read = document.getElementById("read");
  const read_here_btns = document.querySelectorAll(".read_here");

  read_here_btns.forEach((readbtn, index) => {
    readbtn.addEventListener("click", () => {
      read.style.display = "flex";
      const newsUrl = readbtn.getAttribute("data-url");

      // let elem = document.querySelector(".collections_container");
      // if (window.innerWidth <= 768 && elem) {
      //   read_in_new_tab();
      // } else {
      showLoader();
      fetch("/read_news_here", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: newsUrl }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          document.getElementById("ajax_h1").textContent = data.heading;
          document.getElementById("ajax_h3").textContent = data.subheading;
          // document.getElementById("ajax_img").setAttribute("src", data.imgUrl);
          let imgTag = `<img id="ajax_img" src="${data.imgUrl}" alt="news article image" itemprop="image"><br>`;
          document.getElementById("ajax_p").innerHTML = imgTag + data.news_data_string;
        })
        .catch((error) => {
          displayMessage(error.message);
        })
        .finally(() => {
          hideLoader();
        });
      // }
    });
  });
}

show_news_preview();
