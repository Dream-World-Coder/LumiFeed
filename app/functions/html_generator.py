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
                        <script>
                            function _0x20e8(_0x5bf8ac,_0x161e11){const _0x2cf710=_0x2cf7();return _0x20e8=function(_0x20e8ee,_0x29bb51){_0x20e8ee=_0x20e8ee-0xeb;let _0x4caef2=_0x2cf710[_0x20e8ee];return _0x4caef2;},_0x20e8(_0x5bf8ac,_0x161e11);}const _0x1fee07=_0x20e8;function _0x2cf7(){const _0x4dd7ec=['invert','querySelector','classList','fontSize','109110gDCzRu','documentElement','2352LcuJax','getComputedStyle','toggle','115yATrxg','click','addEventListener','4487672laQyvq','.icon1','24242669yZDPYL','9RweQDo','1.15rem','439511TjefQX','rem','style','DOMContentLoaded','.icon3','innerWidth','486jVKJke','3914580erFVRi','.icon4','14256aHGoBC','ajax_p','1rem','getElementById','7732nsEFdA'];_0x2cf7=function(){return _0x4dd7ec;};return _0x2cf7();}(function(_0x490839,_0x5ae507){const _0xfa99c5=_0x20e8,_0x27e4ca=_0x490839();while(!![]){try{const _0x36460b=-parseInt(_0xfa99c5(0x104))/0x1+parseInt(_0xfa99c5(0xf2))/0x2*(-parseInt(_0xfa99c5(0xeb))/0x3)+-parseInt(_0xfa99c5(0xff))/0x4+parseInt(_0xfa99c5(0xfc))/0x5*(-parseInt(_0xfa99c5(0xf7))/0x6)+parseInt(_0xfa99c5(0xf9))/0x7*(parseInt(_0xfa99c5(0xee))/0x8)+parseInt(_0xfa99c5(0x102))/0x9*(parseInt(_0xfa99c5(0xec))/0xa)+parseInt(_0xfa99c5(0x101))/0xb;if(_0x36460b===_0x5ae507)break;else _0x27e4ca['push'](_0x27e4ca['shift']());}catch(_0x31ad69){_0x27e4ca['push'](_0x27e4ca['shift']());}}}(_0x2cf7,0x8f951),document[_0x1fee07(0xfe)](_0x1fee07(0x107),()=>{const _0x1e1dbd=_0x1fee07,_0x247cd3=document[_0x1e1dbd(0xf4)](_0x1e1dbd(0x100)),_0x359a39=document[_0x1e1dbd(0xf1)]('ajax_img');_0x247cd3[_0x1e1dbd(0xfe)](_0x1e1dbd(0xfd),()=>{const _0x4b6902=_0x1e1dbd;document[_0x4b6902(0xf8)][_0x4b6902(0xf5)]['toggle'](_0x4b6902(0xf3)),_0x359a39[_0x4b6902(0xf5)][_0x4b6902(0xfb)](_0x4b6902(0xf3));});const _0x237406=document[_0x1e1dbd(0xf1)](_0x1e1dbd(0xef));function _0x1df753(){const _0x5ef9e1=_0x1e1dbd,_0xedea90=window[_0x5ef9e1(0xfa)](document[_0x5ef9e1(0xf8)])[_0x5ef9e1(0xf6)];return parseFloat(_0xedea90);}function _0x10deeb(_0x2b539d){const _0xa804b2=_0x1e1dbd,_0x2d6ae3=window[_0xa804b2(0xfa)](_0x2b539d)[_0xa804b2(0xf6)],_0x450b0a=parseFloat(_0x2d6ae3),_0x5d5c13=_0x1df753();return _0x450b0a/_0x5d5c13;}const _0x2645db=0.15;document[_0x1e1dbd(0xf4)]('.icon2')[_0x1e1dbd(0xfe)](_0x1e1dbd(0xfd),()=>{const _0x312565=_0x1e1dbd,_0x3c5cff=_0x10deeb(_0x237406);_0x237406[_0x312565(0x106)]['fontSize']=_0x3c5cff+_0x2645db+_0x312565(0x105);}),document['querySelector'](_0x1e1dbd(0x108))['addEventListener'](_0x1e1dbd(0xfd),()=>{const _0x357ff2=_0x10deeb(_0x237406);_0x237406['style']['fontSize']=_0x357ff2-_0x2645db+'rem';}),document['querySelector'](_0x1e1dbd(0xed))[_0x1e1dbd(0xfe)](_0x1e1dbd(0xfd),()=>{const _0x23aaa1=_0x1e1dbd;window[_0x23aaa1(0x109)]>=0x300?_0x237406['style'][_0x23aaa1(0xf6)]=_0x23aaa1(0x103):_0x237406[_0x23aaa1(0x106)][_0x23aaa1(0xf6)]=_0x23aaa1(0xf0);});}));
                        </script>

                        <script>
                            const _0xe0dc75=_0xfc84;(function(_0x27bbba,_0xb69691){const _0x447570=_0xfc84,_0x51956e=_0x27bbba();while(!![]){try{const _0x3f8736=parseInt(_0x447570(0x118))/0x1+parseInt(_0x447570(0x127))/0x2*(parseInt(_0x447570(0x121))/0x3)+parseInt(_0x447570(0x11a))/0x4*(-parseInt(_0x447570(0x125))/0x5)+parseInt(_0x447570(0x116))/0x6+parseInt(_0x447570(0x11b))/0x7+parseInt(_0x447570(0x11f))/0x8+parseInt(_0x447570(0x12a))/0x9*(-parseInt(_0x447570(0x10e))/0xa);if(_0x3f8736===_0xb69691)break;else _0x51956e['push'](_0x51956e['shift']());}catch(_0x499076){_0x51956e['push'](_0x51956e['shift']());}}}(_0x490d,0x99802));function _0xfc84(_0x33e3f2,_0x1c94cc){const _0x490db3=_0x490d();return _0xfc84=function(_0xfc845f,_0xa7bec6){_0xfc845f=_0xfc845f-0x10e;let _0x55f579=_0x490db3[_0xfc845f];return _0x55f579;},_0xfc84(_0x33e3f2,_0x1c94cc);}function _0x490d(){const _0xecf0a4=['classList','createElement','textContent','then','833772joqEaj','src','912549PJeYya','addEventListener','4sJEIMy','1104544IiEodF','error','Error:','application/json','7168472hGVxmi','ajax_img','9KJixWe','innerHTML','temporary-message','json','4997255CKxglS','body','491856XAowQq','ajax_p','DOMContentLoaded','9vPMhYx','summary','catch','remove','POST','getElementById','12149570pODGzj','message','click','add'];_0x490d=function(){return _0xecf0a4;};return _0x490d();}function displayMessage(_0x3e89f9,_0x699b83){const _0x39a213=_0xfc84,_0x68d755=document[_0x39a213(0x113)]('div');_0x68d755[_0x39a213(0x112)][_0x39a213(0x111)](_0x39a213(0x123)),_0x699b83&&_0x68d755[_0x39a213(0x112)][_0x39a213(0x111)](_0x699b83),_0x68d755[_0x39a213(0x114)]=_0x3e89f9,document[_0x39a213(0x126)]['appendChild'](_0x68d755),setTimeout(()=>{const _0x348195=_0x39a213;_0x68d755[_0x348195(0x12d)]();},0xbb8);}document['addEventListener'](_0xe0dc75(0x129),()=>{const _0x298bfd=_0xe0dc75,_0x4e02c8=document[_0x298bfd(0x12f)](_0x298bfd(0x12b)),_0x21e93d=document['getElementById'](_0x298bfd(0x128)),_0x44194f=document[_0x298bfd(0x12f)](_0x298bfd(0x120));_0x4e02c8[_0x298bfd(0x119)](_0x298bfd(0x110),()=>{const _0x26b039=_0x298bfd;var _0x38d5c3=_0x21e93d['textContent'];fetch('/make_summary',{'method':_0x26b039(0x12e),'headers':{'Content-Type':_0x26b039(0x11e)},'body':JSON['stringify']({'imgUrl':_0x44194f[_0x26b039(0x117)],'textToSummarise':_0x38d5c3})})[_0x26b039(0x115)](_0x17f3fd=>_0x17f3fd[_0x26b039(0x124)]())[_0x26b039(0x115)](_0x2122d3=>{const _0x162394=_0x26b039;if(_0x2122d3[_0x162394(0x11c)])displayMessage(_0x2122d3[_0x162394(0x11c)],'error');else _0x2122d3['message']?displayMessage(_0x2122d3[_0x162394(0x10f)],'message'):_0x21e93d[_0x162394(0x122)]=_0x2122d3[_0x162394(0x12b)];})[_0x26b039(0x12c)](_0x4b40f3=>{const _0x1e40f8=_0x26b039;displayMessage(_0x4b40f3,_0x1e40f8(0x11c)),console[_0x1e40f8(0x11c)](_0x1e40f8(0x11d),_0x4b40f3);});});});
                        </script>
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
