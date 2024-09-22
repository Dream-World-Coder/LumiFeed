function show_news_preview() {
  const read = document.getElementById("read");
  const read_here_btns = document.querySelectorAll(".read_here");

  read_here_btns.forEach((readbtn, index) => {
    readbtn.addEventListener("click", () => {
      read.style.display = "flex";
      const newsUrl = document.querySelectorAll(".news_urls_a_tag")[index].getAttribute("href");

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
          document.getElementById("ajax_img").setAttribute("src", data.imgUrl);
          document.getElementById("ajax_p").innerHTML = data.news_data_string;
        });
    });
  });
}

show_news_preview();
