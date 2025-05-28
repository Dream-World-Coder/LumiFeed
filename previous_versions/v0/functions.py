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


def generate_search_reasult():
    no_of_matches = '''
                    <div class="res__num border_res">
                        {$num} Matches found
                    </div>
                    '''
                    
    results   = '''
                <div class="res border_res">
                    <div class="res__title">
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Earum amet consequatur doloremque facere?
                    </div>
                    <div class="res__link">
                        <a href="#">{Link}</a>
                    </div>
                </div>
                '''
