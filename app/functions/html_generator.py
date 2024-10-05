# from app import app
from flask import url_for

# current_user.collections


def generate_search_reasult(matches: list) -> str:
    no_of_matches = f"""
                    <div class="res__num border_res">
                        {len(matches)} Matches found
                    </div>
                    """
    results = ""
    for index, row in enumerate(matches):
        results += f"""
                    <div class="res border_res">
                        <div class="res__title">
                            {matches[index][1]},
                            <br>
                            <span data-href="serial_no_{matches[index][0]}" data-url="{matches[index][2]}" class="res__serial">
                                serial no: {matches[index][0]}
                            </span>
                        </div>
                        <div class="res__link">
                            <span class="find_article">Find Article</span>
                        </div>
                    </div>
                    """
    return no_of_matches + results


def gen_table(data: list) -> str:
    html_table = """
                    <tr class="tr1">
                        <th class="th1">NO</th>
                        <th class="th2">TITLE</th>
                        <th class="th3">READ HERE</th>
                        <th class="th4">LINK</th>
                    </tr>
                """
    for row in data:
        html_table += f"""
                    <tr class="rows">
                        <td class="td1 data_box" id="serial_no_{row[0]}">{row[0]}</td>
                        <td class="td2 data_box">{row[1]}
                            <div class="saving_options f-gap-2">
                                <div class="read_later_collection">
                                    <img src="{url_for('static', filename='icons/save1.svg')}" alt="" srcset="" />
                                </div>
                                <div class="other_collections">
                                    <img src="{url_for('static', filename='icons/save2.svg')}" alt="" srcset="" />
                                </div>
                            </div>
                        </td>
                        <td class="td3 data_box read"><span class="rbtn read_here" data-url="{row[2]}" onclick="show_news_preview()">Read</span></td>
                        <td class="td4 data_box">
                            <a class="news_urls_a_tag" href="{row[2]}" target="_blank" rel="noopener">Link</a>
                        </td>
                    </tr>
                """
    return html_table


def gen_table_india_news(data: list) -> str:
    html_table = """
                    <tr class="tr1">
                        <th class="th1">NO</th>
                        <th class="th2">TITLE</th>
                        <th class="th3">DATE</th>
                        <th class="th4">READ HERE</th>
                        <th class="th5">LINK</th>
                    </tr>
                """
    for row in data:
        html_table += f"""
                    <tr class="rows">
                        <td class="td1 data_box" id="serial_no_{row[0]}">{row[0]}</td>
                        <td class="td2 data_box">{row[1]}
                            <div class="saving_options f-gap-2">
                                <div class="read_later_collection">
                                    <img src="{url_for('static', filename='icons/save1.svg')}" alt="" srcset="" />
                                </div>
                                <div class="other_collections">
                                    <img src="{url_for('static', filename='icons/save2.svg')}" alt="" srcset="" />
                                </div>
                            </div>
                        </td>
                        <td class="td3 data_box">{row[2]}</td>
                        <td class="td4 data_box read">
                            <span class="rbtn read_here" data-url="{row[3]}" onclick="show_news_preview()">Read</span>
                        </td>
                        <td class="td5 data_box">
                            <a class="news_urls_a_tag" href="{row[3]}" target="_blank" rel="noopener">Link</a>
                        </td>
                    </tr>
                """
    return html_table


def make_another_page(heading, subheading, news_content, newsImgUrl, home_url) -> str:
    head = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>LumiFeed</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
            """

    style = """
    <style>
            * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      hr {
        color: black !important;
      }
      body {
        background-color: rgb(255, 255, 255);
        overflow-x: hidden;
      }
      html.invert body {
          background-color: rgb(37, 37, 37);
          color: rgb(128,128,128);
        }
    html.invert .read__page h3 {
        color: rgb(128, 128, 128);
    }
      .read__container {
        position: relative;
        width: 100vw;
        background-color: inherit;
      }

      .read__navigations {
        position: fixed;
        top: 0;
        left: 0;
        height: 5rem;
        width: 100vw;
        background-color: rgb(0, 0, 0);
        border-bottom: 2px solid rgb(0, 0, 0);
        z-index: 99;
        padding-right: 70px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
      }

      .icon {
        width: 2rem;
        height: 2rem;
        z-index: 999;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Red Hat Display", sans-serif, Arial, Helvetica;
        font-size: 1.15rem;
        color: rgb(0, 0, 0);
        background-color: rgb(255, 255, 255);
      }

      .icon0 {
        position: absolute;
        width: 5rem;
        top: calc(50% - 0.75rem);
        left: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: black;
        color: azure;
        font-size: 0.85rem;

        & div {
          background-color: white;
          border-radius: 10px;
        }
      }

      .icon5 {
        width: 4.25rem;
        font-size: 0.8rem;
      }

      .read__page {
        margin-top: 3rem;
        position: relative;
        width: 100vw;
        padding: 20px;
        font-family: Georgia, Times, "Times New Roman", serif;
      }
      .read__page h1 {
        font-size: 2.5rem;
        margin: 2rem 10px 1px 10px;
        border-bottom: 1px solid black;
        padding-bottom: 15px;
      }
      .read__page h3 {
        font-size: 1.5rem;
        color: rgb(107, 107, 107);
        margin-left: 10px;
        margin-right: 10px;
        border-top: 1px solid black;
        padding-top: 10px;
        border-bottom: 1px solid black;
        padding-bottom: 10px;
      }
      html.invert .read__page h1,
      html.invert .read__page h3 {
        border-color: rgb(122, 122, 122);
      }
      .read__page p {
        font-size: 1rem;
        font-family: "Red Hat Display", sans-serif, Arial, Helvetica;
        margin: 20px;
      }
      .read__page img {
        border-radius: 5px;
        width: 100%;
      }
      .ss {
        width: 100vw;
        height: 10vh;
      }
      .invert {
        filter: invert(0);
        /* colors are changed manually, thats better */
      }
      #ajax_p {
        column-count: 3;
        column-gap: 30px;
        text-align: justify;
        column-fill: balance;
        min-height: 1px;
      }

      @media (min-width: 1440px) {
        #ajax_p {
          column-count: 3;
          column-gap: 20px;
        }
      }
      @media (max-width: 768px) {
        .read__navigations {
          gap: 0.25rem;
        }
        .icon {
          width: 1.5rem;
          height: 1.5rem;
          font-size: 0.8rem;
        }
        .icon0 {
          width: 3.5rem;
          top: calc(50% - 0.75rem);
          left: 20px;
          font-size: 0.65rem;
        }
        .icon5 {
          width: 3.5rem;
          font-size: 0.65rem;
        }
        .read__navigations {
          height: 4rem;
          padding-right: 20px;
        }
        .read__page {
          margin-top: 2rem;
        }
        .read__page h1 {
          font-size: 1.25rem;
        }
        .read__page h3 {
          font-size: 0.8rem;
        }
        .read__page p {
          font-size: 0.65rem;
        }
        .read__page img {
          width: min(100%, 350px);
          height: 150px;
        }
        #ajax_p {
          column-count: 3;
          column-gap: 15px;
        }
        .read__page {
          padding: 10px;
        }
      }
      @media (max-width: 600px) {
        #ajax_p {
          column-count: 2;
          column-gap: 10px;
        }
      }
      @media (max-width: 600px) {
        #ajax_p {
          column-count: 1;
          column-gap: 0px;
        }
      }
      </style>
  </head>
    """

    read__navigations = f"""
                        <body>
                            <div class="read__container">
                                <div class="read__navigations">
                                    <div class="icon icon0">
                                        <div>
                                            <img src="{url_for('static', filename='images/favicon.png')}"
                                            alt="" srcset="" width="24px" height="24px" />
                                        </div>
                                        LumiFeed
                                    </div>
                                    <div id="summary" class="icon icon5">Summary</div>
                                    <div class="icon icon1">
                                        <img src="{url_for('static', filename='icons/dm3.svg')}"
                                        alt="" srcset="" width="24px" height="24px" />
                                    </div>
                                    <div class="icon icon2">A+</div>
                                    <div class="icon icon3">A-</div>
                                    <div class="icon icon4">A</div>
                                </div>
                        """

    read__page = f"""
                <div class="read__page">
                        <h1 id="ajax_h1">
                            {heading}
                        </h1>

                        <h3 id="ajax_h3">
                            {subheading}
                        </h3>

                        <p id="ajax_p" class="">
                            {news_content}
                        </p>
                    </div>
                </div>
                <div class="ss"></div>
    """

    scripts_and_all = """
                    <script>
                        document.addEventListener('DOMContentLoaded', () => {
                            // Dark mode
                            const dm = document.querySelector('.icon1');
                            const img = document.getElementById('ajax_img');
                            dm.addEventListener('click', () => {
                                document.documentElement.classList.toggle('invert');
                                img.classList.toggle('invert');
                            });

                            const p = document.getElementById('ajax_p');

                            // Function to get the root font size
                            function getRootFontSize() {
                                const rootFontSize = window.getComputedStyle(document.documentElement).fontSize;
                                return parseFloat(rootFontSize);
                            }

                            // Function to get the current font size in rem
                            function getFontSizeInRem(element) {
                                const fontSizePx = window.getComputedStyle(element).fontSize;
                                const fontSize = parseFloat(fontSizePx);
                                const rootFontSize = getRootFontSize();
                                return fontSize / rootFontSize;
                            }

                            // Increase font size by 0.25rem
                            document.querySelector('.icon2').addEventListener('click', () => {
                                const currentSizeRem = getFontSizeInRem(p);
                                p.style.fontSize = `${currentSizeRem + 0.25}rem`;
                            });

                            // Decrease font size by 0.25rem
                            document.querySelector('.icon3').addEventListener('click', () => {
                                const currentSizeRem = getFontSizeInRem(p);
                                p.style.fontSize = `${currentSizeRem - 0.25}rem`;
                            });

                            // Restore default font size
                            document.querySelector('.icon4').addEventListener('click', () => {
                                // Assuming default font size is 1rem for desktop and 0.8rem for mobile
                                if (window.innerWidth >= 768) {
                                    p.style.fontSize = '1rem';
                                } else {
                                    p.style.fontSize = '0.65rem';
                                }
                            });
                        });
                    </script>

                    <!-- ajax for summary -->
                    <script>
                    document.addEventListener('DOMContentLoaded', () => {
                        const summaryButton = document.getElementById('summary');
                        const ajaxP = document.getElementById('ajax_p');

                        summaryButton.addEventListener('click', () => {
                            var CurrentNewsArticleText = ajaxP.textContent;

                            fetch('/make_summary', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ textToSummarise: CurrentNewsArticleText })
                            })
                            .then(response => response.json())
                            .then(data => {
                                ajaxP.innerHTML = data.summary;
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                        });
                    });
                </script>

            </body>
            </html>
            """

    html_doc = head + style + read__navigations + read__page + scripts_and_all

    return html_doc


def make_collection(collection_name) -> str:
    string = f"""
            <div class="collection_group flexed">
              <div class="collection">
                <div class="collection_name">
                  {collection_name}
                  <span class="delete_collection">
                    <img src="{url_for('static', filename='icons/delete.svg')}" alt="delete this collection" srcset="" />
                  </span>
                </div>
                <div class="collection_content">
                  <ul></ul>
                </div>
              </div>
            </div>
            """

    return string


"""
<li class="read_here" data-url="">
  <span class="delete_article">
    <!-- flash message of deletion -->
    <img src="{{url_for('static', filename='icons/delete.svg')}}" alt="" srcset="" />
  </span>
</li>
"""
