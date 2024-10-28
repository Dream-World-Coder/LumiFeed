function read_in_new_tab() {
  const newTabBtn = document.getElementById("open-in-new-tab");

  newTabBtn.addEventListener("click", function () {
    const h1 = document.getElementById("ajax_h1");
    const h3 = document.getElementById("ajax_h3");
    const p = document.getElementById("ajax_p");
    const img = document.getElementById("ajax_img");

    const heading = h1.textContent;
    const subheading = h3.textContent;
    const news_content = p.innerHTML;
    const newsImgUrl = img.getAttribute("src");

    const form = document.createElement("form");
    form.method = "POST";
    form.action = `/article/${heading}`;
    form.target = "_blank";

    const formData = {
      heading: heading,
      subheading: subheading,
      news_content: news_content,
      newsImgUrl: newsImgUrl,
    };

    for (const [key, value] of Object.entries(formData)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  });
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", read_in_new_tab);
