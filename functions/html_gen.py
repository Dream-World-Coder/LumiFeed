
def generate_html_table(data:list):

    doctype = '''
                <!doctype html>
            '''
    html_start = '''
                <html lang="en">
                '''
    head = '''
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>News Fetcher</title>
                <link rel="stylesheet" href="static/css/style.css" />
                <link rel="stylesheet" href="static/css/components/fonts.css" />
                <link rel="stylesheet" href="static/css/dark-mode.css" />
                <link rel="stylesheet" href="static/css/components/header.css" />
                <link rel="stylesheet" href="static/css/components/nav.css" />
                <link rel="stylesheet" href="static/css/components/fetch_news.css" />
                <link rel="stylesheet" href="static/css/components/table.css" />
                <link rel="stylesheet" href="static/css/components/read.css" />
                <link rel="stylesheet" href="static/css/components/search.css" />
                <link
                    rel="stylesheet"
                    href="static/css/components/about_and_contact.css"
                />
                <link rel="stylesheet" href="static/css/utils.css" />
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </head>
            '''
    body_header='''
                <body>
                    <header class="fixed dark-glass">
                        <div class="header_wrapper full flex align-center">
                            <!-- logo -->
                            <div class="logo flex align-center justify-start">
                                <img src="static/images/mic.svg" alt="logo" />
                                <span id="logo-text">Ad Free News</span>
                            </div>

                            <!-- nav -->
                            <nav class="relative flexed">
                                <div class="ul relative flexed justify-evenly">
                                    <div class="li li1">
                                        <a class="f0 flexed" href="#table-end" rel="noopener">
                                            <img id="eee" src="static/icons/dd1.svg" alt="" />
                                            End of Table
                                        </a>
                                    </div>
                                    <div class="li li2">
                                        <a class="f0 flexed" href="#table-start" rel="noopener">
                                            <img id="uuu" src="static/icons/dd2.svg" alt="" />
                                            Start of Table
                                        </a>
                                    </div>
                                    <div class="li li3 animated-underline-white">
                                        <a href="#about" class="flexed" rel="noopener">About</a>
                                    </div>
                                    <div class="li li4 animated-underline-white">
                                        <a href="#contact" class="flexed" rel="noopener">Contact</a>
                                    </div>
                                </div>
                            </nav>

                            <!-- search for mobile -->
                            <div class="mobile_search">
                                <img src="static/icons/search.svg" alt="">
                            </div>

                            <!-- buttons -->
                            <div class="buttons">
                                <!-- dark mode -->
                                <div class="dark_mode dmbtn">
                                    <span id="dm">
                                        <img src="static/icons/dm.svg" alt="" />
                                    </span>
                                </div>
                                <div class="bigger-font">
                                    <span id="big_f">
                                        <img src="static/icons/bigger.svg" alt="" />
                                    </span>
                                </div>
                            </div>

                            <div class="mobile-nav flexed">
                                <img src="static/icons/ham.svg" alt="">
                                <div>
                                </div>
                    </header>
                    '''
    fetch_news = '''
                <!--find news type, fetch_news -->
                <div class="fetch_news borderX" id="table-start">
                    <form action="/fetchnews" method="post">
                        <h2>Select News Type to Fetch</h2>
                        <div class="options flex-col align-start">
                            <div class="op op1 flex align-center">
                                <input class="border" type="radio" name="news_type" id="top_news" required />
                                <label for="top_news">Top News [global]</label>
                            </div>
                            <div class="op op2 flex align-center">
                                <input class="border" type="radio" name="news_type" id="india_news" required />
                                <label for="india_news">India News</label>
                            </div>
                            <!-- needed:  pop up input for mobiles -->
                            <div id="cyt" class="op op3 flex align-center">
                                <input class="border" type="radio" name="news_type" id="city_news" required />
                                <label for="city_news">City News[{city list}]</label>
                            </div>

                            <br />

                            <div class="opp">
                                <label id="lb" for="news_count">Enter Num of News to Fetch:</label>
                                <input type="number" name="news_count" id="news_count" min="1" max="1500" required />
                            </div>

                            <div class="city-option flexed" id="c-o">
                                <span id="sps" class="block op">
                                    Choose city: 
                                </span>
                                <div id="cpc" class="op f-gap-2">
                                    <div class="city_op flexed">
                                        <input required type="radio" name="city_choice" id="kolkata"><label
                                            for="kolkata">Kolkata</label>
                                    </div>
                                    <div class="city_op flexed">
                                        <input required type="radio" name="city_choice" id="Pune"><label for="Pune">Pune</label>
                                    </div>
                                    <div class="city_op flexed">
                                        <input required type="radio" name="city_choice" id="Bengaluru"><label
                                            for="Bengaluru">Bengaluru</label>
                                    </div>
                                    <div class="city_op flexed">
                                        <input required type="radio" name="city_choice" id="Delhi"><label for="Delhi">Delhi</label>
                                    </div>
                                    <div class="city_op flexed">
                                        <input required type="radio" name="city_choice" id="Mumbai"><label
                                            for="Mumbai">Mumbai</label>
                                    </div>
                                </div>
                            </div>

                            <br />

                            <div class="btns flex f-gap-2">
                                <button class="btn" type="submit">Fetch</button>
                                <button class="btn" type="reset">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
                '''
    container_table='''
                        <div class="container">
                        <!-- table -->
                        <table class="">
                            <tr class="tr1 rows">
                                <th class="th1">NO</th>
                                <th class="th2">NEWS TITLE</th>
                                <th class="th3">READ HERE</th>
                                <th class="th4">DIRECT LINK</th>
                            </tr>
                    '''

    for row in data[1:]:
        container_table += f'''
                            <tr class="rows">
                                <td class="td1 data_box">{row[0]}</td>
                                <td class="td2 data_box">{row[1]}</td>
                                <td class="td3 data_box read"><span class="rbtn">Read</span></td>
                                <td class="td4 data_box"><a href="{row[2]}" target="_blank" rel="noopener">Link</a></td>
                            </tr>
                            '''

    table_end='''
                </table>
                <div class="read flexed" id="read">
                    <div class="read__container full flex-col">
                        <div class="read__navigations flex align-center f-gap-2">
                            <div class="read__icons ri1">
                                <img src="static/icons/open1.svg" alt="">
                            </div>
                            <div class="read__icons ri2" id="close">
                                <img src="static/icons/cross1.svg" alt="">
                            </div>
                        </div>
                        <div class="read__page bg-set">
                            <br>
                            <h1>{{TITLE}}</h1>
                            <br>
                            <p>
                                {{content}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            '''
    container_table += table_end

    search = '''
            <div class="find fixed borderX flex-col f-gap-2">
                <!-- search query -->
                <div
                    class="search-bar borderX relative flex justify-between align-center"
                >
                    <form
                        id="search-form"
                        class="relative full flex justify-between align-center"
                        action="/search"
                        method="post"
                    >
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search in News Titles"
                            required
                        />
                        <button
                            class="search-icon bg-set"
                            type="submit"
                            name="submit"
                            id="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            '''
    result = '''
            <!-- search results -->
                <!-- this will be genrated when search is pressedelse not -->
                <div class="search-reasults relative flex-col f-gap-1">
                    <div class="res__container full">
                        
                    </div>
                </div>
            </div>
            '''
    search_and_result = '''
                        <!-- search + result -->
                        ''' + search  + result

    about = '''
            <!-- about + contact -->
            <div class="about-hanger" id="about"></div>
            <div class="about">
                <h2>About</h2>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, quas veritatis? Est dolorum quia
                    officiis ipsum impedit modi aliquid rem architecto, blanditiis sapiente nostrum dignissimos quod voluptatum
                    sunt dolorem perferendis harum fuga fugiat facilis quasi eum, voluptatibus provident! Doloribus quas ex
                    atque impedit labore consequatur.
                </p>
                <div class="contact-hanger" id="contact"></div>
            </div>
            '''
    contact = '''
            <div class="contact">
                <h2>Contact</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro praesentium fugit veniam repudiandae nobis,
                    beatae, doloremque sequi alias officiis non sapiente? Eligendi, sequi dolores!
                    Feel Free to contact me if needed.
                    Email
                    GitHub
                    My Personal Website
                </p>
            </div>
            '''
    footer = '''
                <footer>
                    <div class="sp" id="table-end"></div>
                    <div class="cen cc">
                        © 2024 Subhajit Gorai. All rights reserved.
                    </div>
                </footer>
                '''
    scripts = '''
                <!-- scripts -->
                <script src="static/js/script.js"
                ></script>
                <script
                    type="text/javascript"
                    src="static/js/functions/utils/scroll-related/smooth-scrolling.js"
                ></script>
                <script
                    type="text/javascript"
                    src="static/js/functions/simple_dm.js"
                ></script>
                <script
                    type="text/javascript"
                    src="static/js/functions/bigger.js"
                ></script>
                <script
                    type="text/javascript"
                    src="static/js/functions/btn_visible.js"
                ></script>
                <script
                    type="text/javascript"
                    src="static/js/functions/read.js"
                ></script>
            '''
    body_end = '''
                </body>
                '''
    html_end= '''
                </html>
            '''


    html = doctype + html_start + head + body_header + fetch_news+ container_table + search_and_result + about + contact + footer + scripts + body_end + html_end
    with open('index.html', 'w') as file:
        file.write(html)

    return html


def generate_search_reasult(matches:list) -> str:
    no_of_matches = f'''
                    <div class="res__num border_res">
                        {len(matches)} Matches found
                    </div>
                    '''
    results = ''
    for index,row in enumerate(matches):
        results   += f'''
                    <div class="res border_res">
                        <div class="res__title">
                            {matches[index][1]},
                            <br>
                            <span data-href="serial_no_{matches[index][0]}" class="res__serial">
                                serial no: {matches[index][0]}
                            </span>
                        </div>
                        <div class="res__link">
                            <span class="read_here">Read</span>
                        </div>
                        <div class="res__unlink">
                            <a target="_blank" rel="noopener" class="res__unlink news_urls_a_tag" href="{matches[index][2]}">Link</a>
                        </div>
                    </div>
                    '''
    return no_of_matches + results


def gen_table(data:list) -> str:
    html_table = '''
                    <tr class="tr1 rows">
                        <th class="th1">NO</th>
                        <th class="th2">NEWS TITLE</th>
                        <th class="th3">READ HERE</th>
                        <th class="th4">DIRECT LINK</th>
                    </tr>
                '''
    for row in data:
        html_table += f'''
                    <tr class="rows">
                        <td class="td1 data_box" id="serial_no_{row[0]}">{row[0]}</td>
                        <td class="td2 data_box">{row[1]}</td>
                        <td class="td3 data_box read"><span class="rbtn read_here">Read</span></td>
                        <td class="td4 data_box">
                            <a class="news_urls_a_tag" href="{row[2]}" target="_blank" rel="noopener">Link</a>
                        </td>
                    </tr>
                '''
    return html_table


def gen_table_2(data:list) -> str:
    html_table = '''
                    <tr class="tr1 rows">
                        <th class="th1">NO</th>
                        <th class="th2">TITLE</th>
                        <th class="th3">DATE</th>
                        <th class="th4">READ HERE</th>
                        <th class="th5">LINK</th>
                    </tr>
                '''
    for row in data:
        html_table += f'''
                    <tr class="rows">
                        <td class="td1 data_box" id="serial_no_{row[0]}">{row[0]}</td>
                        <td class="td2 data_box">{row[1]}</td>
                        <td class="td3 data_box">{row[2]}</td>
                        <td class="td4 data_box read"><span class="rbtn read_here">Read</span></td>
                        <td class="td5 data_box">
                            <a class="news_urls_a_tag" href="{row[3]}" target="_blank" rel="noopener">Link</a>
                        </td>
                    </tr>
                '''
    return html_table


def make_another_page(heading, subheading, news_content, newsImgUrl, home_url) -> str:
    head = '''
        <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ad Free News</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
    '''
    
    style = '''
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
            background-color: rgb(255, 245, 233);
            overflow-x: hidden;
        }
        .read__container {
            position: relative;
            width: 100vw;
            background-color: rgb(255, 245, 233);
        }
        .read__navigations {
            position: fixed;
            top: 0;
            left: 0;
            height: 5rem;
            width: 100vw;
            background-color: darkorange;
            border-bottom: 2px solid rgb(255, 201, 135);
            z-index: 99;
            padding-right: 30px;
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
            background-color: #e65100;
            /* 230, 80, 0*/
        }
        /* summary */
        .iconS{
            width: 4.25rem;
            position: absolute;
            top: 24px;
            left: 70px;
            font-size: 1rem;
            font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        }
        .read__page {
            margin-top: 6rem;
            position: relative;
            width: 100vw;
            padding: 70px;
            font-family: Georgia, Times, 'Times New Roman', serif;
        }
        .read__page h1 {font-size: 3.5rem;}
        .read__page h3 {font-size: 1.5rem;}
        .read__page p {
            font-size: 1.5rem;
            font-family: "Red Hat Display", sans-serif, Arial, Helvetica;
        }
        .ss{
            width: 100vw;
            height: 40vh;
        }
        .invert{
            filter: invert(1);
        }
        @media (min-width: 300px) and (max-width: 767px) {
            .iconS{
                width: 3.85rem;
                top: 16px;
                left: 20px;
                font-size: 0.85rem;
            }
            .read__navigations{
                height: 4rem;
            }
            .read__page{
                margin-top: 5rem;
            }
            .read__page h1 {
                font-size: 1.3rem;
            }
            .read__page h3 {
                font-size: 0.8rem;
            }
            .read__page p {
                font-size: 0.8rem;
            }
            .read__page{
                padding: 20px;
            }
            .read__page img{
                width: 100%;
                height: 20vh;
            }
        }
    </style>
</head>
    '''
    
    dm_icon_url = "{{url_for('static', filename='icons/dm3.svg')}}"
    read__navigations = f'''
    <body>
    <div class="read__container">
        <div class="read__navigations">
            <div class="icon icon5">
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
            <div class="icon icon1">
                <img src="{dm_icon_url}" alt="" srcset=""
                width="24px" height="24px">
            </div>
            <div class="icon icon2">A+</div>
            <div class="icon icon3">A-</div>
            <div class="icon icon4">A</div>
            <div id="summary" class="icon iconS">
                Summary
            </div>
        </div>

    '''
    
    read__page = f'''
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
    '''
    
    scripts_and_all ='''    
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
                // Assuming default font size is 1.5rem for desktop and 0.8rem for mobile
                if (window.innerWidth >= 768) {
                    p.style.fontSize = '1.5rem';
                } else {
                    p.style.fontSize = '0.8rem';
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
    '''
    
    html_doc = head + style + read__navigations + read__page + scripts_and_all
    return html_doc