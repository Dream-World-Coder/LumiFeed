function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function fetchNews(event) {
  event.preventDefault();
  showLoader();

  const form = document.getElementById("fetch-news-form");
  const formData = new FormData(form);
  const newsType = formData.get("news_type");
  const newsCount = formData.get("news_count");
  const name_of_city = formData.get("name_of_city") || "";
  const url = `/fetchnews?news_type=${newsType}&news_count=${newsCount}&name_of_city=${name_of_city}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("news_list", JSON.stringify(data.news_list));
      document.getElementById("news-table").innerHTML = data.news_table;
      show_news_preview();
      read_in_new_tab();
      saveArticleInReadLater();
      saveArticleInOtherCollections();
    })
    .catch((error) => {
      displayMessage(error.message);
    })
    .finally(() => {
      hideLoader();
    });
}

// New function to populate news from localStorage
function populateNewsFromLocalStorage() {
  const savedNewsList = localStorage.getItem("news_list");
  if (savedNewsList) {
    const newsData = JSON.parse(savedNewsList);
    let htmlTable = "";

    if (newsData.length > 0) {
      // Check if the first item has 3 or 4 elements
      const isIndiaNews = newsData[0].length === 4;

      if (isIndiaNews) {
        // If the rows have 4 elements, use the India news structure
        htmlTable = `
          <tr class="tr1">
            <th class="th1">NO</th>
            <th class="th2">TITLE</th>
            <th class="th3">DATE</th>
            <th class="th4">READ HERE</th>
            <th class="th5">LINK</th>
          </tr>
        `;

        newsData.forEach((row) => {
          htmlTable += `
            <tr class="rows">
              <td class="td1 data_box" id="serial_no_${row[0]}">${row[0]}</td>
              <td class="td2 data_box">${row[1]}
                <div class="saving_options f-gap-2">
                  <div class="read_later_collection">
                    <img src="/static/icons/save1.svg" alt="save1" />
                  </div>
                  <div class="other_collections">
                    <img src="/static/icons/save2.svg" alt="save2" />
                  </div>
                </div>
              </td>
              <td class="td3 data_box">${row[2]}</td>
              <td class="td4 data_box read">
                <span class="rbtn read_here" data-url="${row[3]}" onclick="show_news_preview()">Read</span>
              </td>
              <td class="td5 data_box">
                <a class="news_urls_a_tag" href="${row[3]}" target="_blank" rel="noopener">Link</a>
              </td>
            </tr>
          `;
        });
      } else {
        // If the rows have 4 elements, use the other news structure
        htmlTable = `
          <tr class="tr1">
            <th class="th1">NO</th>
            <th class="th2">TITLE</th>
            <th class="th3">READ HERE</th>
            <th class="th4">LINK</th>
          </tr>
        `;

        newsData.forEach((row) => {
          htmlTable += `
            <tr class="rows">
              <td class="td1 data_box" id="serial_no_${row[0]}">${row[0]}</td>
              <td class="td2 data_box">${row[1]}
                <div class="saving_options f-gap-2">
                  <div class="read_later_collection">
                    <img src="/static/icons/save1.svg" alt="save1" />
                  </div>
                  <div class="other_collections">
                    <img src="/static/icons/save2.svg" alt="save2" />
                  </div>
                </div>
              </td>
              <td class="td3 data_box read">
                <span class="rbtn read_here" data-url="${row[2]}" onclick="show_news_preview()">Read</span>
              </td>
              <td class="td4 data_box">
                <a class="news_urls_a_tag" href="${row[2]}" target="_blank" rel="noopener">Link</a>
              </td>
            </tr>
          `;
        });
      }
    }

    // Insert the generated HTML into the table
    document.getElementById("news-table").innerHTML = htmlTable;

    // Optional: Call other functions if needed
    show_news_preview();
    read_in_new_tab();
    saveArticleInReadLater();
    saveArticleInOtherCollections();
  }
}

// Call populateNewsFromLocalStorage when the page loads
window.addEventListener("load", populateNewsFromLocalStorage);
