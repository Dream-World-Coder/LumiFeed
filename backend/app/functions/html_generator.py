from flask import url_for


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def gen_table(data: list, user) -> str:
    if user.is_authenticated:
        user_collections = user.collections.all()
        collections_input = '<option value="" disabled selected>Select a collection</option>'
        for coll in user_collections:
            if coll.collection_name != 'Read Later':
                collections_input += f'<option class="collections_input_option" value="{coll.collection_name}">{coll.collection_name}</option>'

        collections_input_full = f'<select class="collections_name_input" name="collections_name_input">{collections_input}</select>'
    else:
        collections_input_full = ''

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
                            {collections_input_full}
                        </td>
                        <td class="td3 data_box read"><span class="rbtn read_here" data-url="{row[2]}" onclick="show_news_preview()">Read</span></td>
                        <td class="td4 data_box">
                            <a class="news_urls_a_tag" href="{row[2]}" target="_blank" rel="noopener">Link</a>
                        </td>
                    </tr>
                """
    return html_table


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def gen_table_india_news(data: list, user) -> str:
    if user.is_authenticated:
        user_collections = user.collections.all()
        collections_input = '<option value="" disabled selected>Select a collection</option>'
        for coll in user_collections:
            if coll.collection_name != 'Read Later':
                collections_input += f'<option class="collections_input_option" value="{coll.collection_name}">{coll.collection_name}</option>'

        collections_input_full = f'<select class="collections_name_input" name="collections_name_input">{collections_input}</select>'
    else:
        collections_input_full = ''

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
                            {collections_input_full}
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

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def make_another_page(heading, subheading, news_content, newsImgUrl, home_url) -> str:
    head = """
            <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>LumiFeed</title>
                        <link rel="stylesheet" href="/static/css/read-page.css" />
                    </head>
        """

    read__navigations = f"""
                    <body>
                        <div class="read__container">
                            <div class="read__navigations">
                                <div class="icon icon0">
                                    <img src="{url_for('static', filename='images/favicon.png')}" alt="" srcset="" />
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
                                <h1 id="ajax_h1">{heading}</h1>
                                <h3 id="ajax_h3">{subheading}</h3>
                                <p id="ajax_p" class="">{news_content}</p>
                            </div>
                        </div>
    """

    scripts_and_all = """
                        <script src="/static/js/read-page/ajax.js"></script>
                        <script src="/static/js/read-page/utils.js"></script>
                    </body>
                </html>
            """

    html_doc = head + read__navigations + read__page + scripts_and_all

    return html_doc

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
