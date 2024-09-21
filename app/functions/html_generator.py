# from app import app
from flask import url_for


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
                    <tr class="tr1 rows">
                        <th class="th1">NO</th>
                        <th class="th2">NEWS TITLE</th>
                        <th class="th3">READ HERE</th>
                        <th class="th4">DIRECT LINK</th>
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
                        <td class="td3 data_box read"><span class="rbtn read_here" onclick="show_news_preview()">Read</span></td>
                        <td class="td4 data_box">
                            <a class="news_urls_a_tag" href="{row[2]}" target="_blank" rel="noopener">Link</a>
                        </td>
                    </tr>
                """
    return html_table


def gen_table_india_news(data: list) -> str:
    html_table = """
                    <tr class="tr1 rows">
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
                        <td class="td4 data_box read"><span class="rbtn read_here" onclick="show_news_preview()">Read</span></td>
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
    <title>Ad Free News</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
    """

    style = """
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
            background-color: rgb(237, 237, 237);
            overflow-x: hidden;
        }
        html.invert body{
            background-color: rgb(37, 37, 37);
            color: aliceblue;
        }
        html.invert .read__page h3{
            color: rgb(180,180,180);
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
            background-color: rgb(102, 102, 102);
            border-bottom: 2px solid rgb(102, 102, 102);
            z-index: 99;
            padding-right: 70px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 0.5rem;
        }
        .icon{
            width: 2rem;
            height: 2rem;
            z-index: 999;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Haettenschweiler, 'Arial Narrow Bold', sans-serif;
            font-size: 1.15rem;
            color: rgb(0, 0, 0);
            background-color: rgb(195,195,195);
        }

        .iconH{
            width: 4.25rem;
            position: absolute;
            top: 24px;
            left: 70px;
            font-size: 1rem;
            font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        }
        .iconH a{
            position: relative;
            width: 100%;
            height: 100%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }

        /* summary */
        .icon5{
            width: 4.25rem;
            font-size: 0.8rem;
        }
        .read__page {
            margin-top: 3rem;
            position: relative;
            width: 100vw;
            padding: 70px;
            font-family: Georgia, Times, 'Times New Roman', serif;
        }
        .read__page h1 {
            font-size: 2.5rem;
        }
        .read__page h3 {
            font-size: 1.5rem;
            color: rgb(107,107,107);
        }
        .read__page p {
            font-size: 1rem;
            font-family: "Red Hat Display", sans-serif, Arial, Helvetica;
        }
        .read__page img{
            border: 1px solid rgb(102, 102, 102);
            width: min(100%, 500px);
            height: 300px;
            border-radius: 10px;
        }
        .ss{
            width: 100vw;
            height: 40vh;
        }
        .invert{
            filter: invert(0);
            /* colors are changed manually, thats better */
        }
        @media (max-width: 768px) {
            .read__navigations{
                gap: 0.25rem;
            }
            .icon{
                width: 1.5rem;
                height: 1.5rem;
                font-size: 0.8rem;
            }
            .iconH{
                width: 3.5rem;
                top: 16px;
                left: 20px;
            }
            .icon5{
                width: 3.5rem;
                font-size: 0.65rem;
            }
            .read__navigations{
                height: 4rem;
                padding-right: 20px;
            }
            .read__page{
                margin-top: 5rem;
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
            .read__page img{
                width: min(100%, 350px);
                height: 150px;
            }
            .read__page{
                padding: 20px;
            }
        }
    </style>
</head> 
    """

    dm_icon_url = "{{url_for('static', filename='icons/dm3.svg')}}"

    read__navigations = f"""
    <body>
    <div class="read__container">
        <div class="read__navigations">
            <div id="summary" class="icon icon5">
                Summary
            </div>
            <div class="icon icon1">
                <img src="static/icons/dm3.svg" alt="" srcset=""
                width="24px" height="24px">
            </div>
            <div class="icon icon2">A+</div>
            <div class="icon icon3">A-</div>
            <div class="icon icon4">A</div>
            <!-- Home button -->
            <div class="icon iconH">
                <a href="{home_url}">
                    <svg 
                        fill="#000000" 
                        version="1.1" 
                        id="Capa_1" 
                        xmlns="http://www.w3.org/2000/svg" 
                        xmlns:xlink="http://www.w3.org/1999/xlink" 
                        width="24px" 
                        height="24px"
                        viewBox="0 0 49.983 49.983" 
                        xml:space="preserve">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <g> 
                                <path d="M48.688,17.238L28.46,5.636c-1.916-1.099-5.022-1.099-6.938,0L1.295,17.238c-1.916,1.1-1.679,1.99,0.53,1.99h3.384 c-0.031,0.287-0.05,0.578-0.05,0.873v17.07c0,4.418,3.582,8,8,8h2.327v-6.569c0-2.209,1.791-4,4-4h11.012c2.209,0,4,1.791,3.999,4 v6.569h2.328c4.419,0,8-3.581,8-8v-17.07c0-0.295-0.019-0.586-0.05-0.873h3.383C50.367,19.229,50.604,18.338,48.688,17.238z M24.992,27.549c-1.995,0-3.613-1.618-3.613-3.613s1.618-3.612,3.613-3.612c1.995,0,3.613,1.617,3.613,3.612 S26.987,27.549,24.992,27.549z">
                                </path>
                            </g> 
                        </g>
                    </svg>
                </a>
            </div>
        </div>
    """

    read__page = f"""
    <div class="read__page">
            <h1 id="ajax_h1">
                {heading}
            </h1>
            <br>
            <h3 id="ajax_h3">
                {subheading}
            </h3>
            <br>
            <br>
            <img id="ajax_img" src="{newsImgUrl}"
            alt="img">
            <br>
            <br>
            <br>
            <br>
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


def make_profile_page():
    pass


def make_collections():
    pass


def make_collections_li():
    pass


"""
<div class="collection_group flexed">
          <div class="collection">
            <div class="collection_name">
              {{current_user.username}}'s Collections
              <span class="delete_collection">
                <img src="{{url_for('static', filename='icons/delete.svg')}}" alt="delete this collection" srcset="" />
              </span>
            </div>
            <div class="collection_content"></div>
          </div>
        </div>

"""


"""
        <div class="collection_group flexed">
          <div class="read_later collection permanent_collection">
            <div class="collection_name">Read Later</div>
            <div class="collection_content">
              <ul>
                <li data-url="">
                  Crackdown on organised crime: NIA to launch national database of gangsters, jail networks, associates
                  <span class="delete_article">
                    <!-- flash message of deletion -->
                    <img src="{{url_for('static', filename='icons/delete.svg')}}" alt="" srcset="" />
                  </span>
                </li>
                <li data-url="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam repudiandae nemo perferendis quod itaque laborum fugit rem. Adipisci aliquid tempore delectus deserunt eum.
                  <span class="delete_article">
                    <!-- flash message of deletion -->
                    <img src="{{url_for('static', filename='icons/delete.svg')}}" alt="" srcset="" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
"""


"""
                <li data-url="">
                  Crackdown on organised crime: NIA to launch national database of gangsters, jail networks, associates
                  <span class="delete_article">
                    <!-- flash message of deletion -->
                    <img src="{{url_for('static', filename='icons/delete.svg')}}" alt="" srcset="" />
                  </span>
                </li>
                <li data-url="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam repudiandae nemo perferendis quod itaque laborum fugit rem. Adipisci aliquid tempore delectus deserunt eum.
                  <span class="delete_article">
                    <!-- flash message of deletion -->
                    <img src="{{url_for('static', filename='icons/delete.svg')}}" alt="" srcset="" />
                  </span>
                </li>
"""
