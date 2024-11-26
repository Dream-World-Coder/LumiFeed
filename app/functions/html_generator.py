# from app import app
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
                            function _0x143d(_0x5b04c9,_0x44649d){const _0x595106=_0x5951();return _0x143d=function(_0x143dac,_0x2c1dc4){_0x143dac=_0x143dac-0x10f;let _0x59bee9=_0x595106[_0x143dac];return _0x59bee9;},_0x143d(_0x5b04c9,_0x44649d);}const _0x280dee=_0x143d;function _0x5951(){const _0x53bb12=['81850hDjyrw','/make_summary','2892UMjpgf','ajax_p','2778BPgiDo','textContent','83504qgUKEl','889UzeIUf','stringify','45RmdeoS','application/json','724265qcfSqv','then','4477gczfmS','summary','json','POST','67428tFUygZ','getElementById','catch','4XiRjOL','addEventListener','315042Xnixeq','1OTvtze'];_0x5951=function(){return _0x53bb12;};return _0x5951();}(function(_0x190b67,_0x4edb28){const _0x4183fb=_0x143d,_0x5b7184=_0x190b67();while(!![]){try{const _0x23ada7=-parseInt(_0x4183fb(0x125))/0x1*(parseInt(_0x4183fb(0x11f))/0x2)+parseInt(_0x4183fb(0x124))/0x3+-parseInt(_0x4183fb(0x122))/0x4*(parseInt(_0x4183fb(0x119))/0x5)+parseInt(_0x4183fb(0x112))/0x6*(parseInt(_0x4183fb(0x115))/0x7)+-parseInt(_0x4183fb(0x114))/0x8*(-parseInt(_0x4183fb(0x117))/0x9)+-parseInt(_0x4183fb(0x126))/0xa+-parseInt(_0x4183fb(0x11b))/0xb*(-parseInt(_0x4183fb(0x110))/0xc);if(_0x23ada7===_0x4edb28)break;else _0x5b7184['push'](_0x5b7184['shift']());}catch(_0x4ae47f){_0x5b7184['push'](_0x5b7184['shift']());}}}(_0x5951,0x1f16c),document[_0x280dee(0x123)]('DOMContentLoaded',()=>{const _0x138db7=_0x280dee,_0x222409=document[_0x138db7(0x120)](_0x138db7(0x11c)),_0x3456fe=document[_0x138db7(0x120)](_0x138db7(0x111));_0x222409[_0x138db7(0x123)]('click',()=>{const _0x1111b6=_0x138db7;var _0x585ae8=_0x3456fe[_0x1111b6(0x113)];fetch(_0x1111b6(0x10f),{'method':_0x1111b6(0x11e),'headers':{'Content-Type':_0x1111b6(0x118)},'body':JSON[_0x1111b6(0x116)]({'textToSummarise':_0x585ae8})})[_0x1111b6(0x11a)](_0x55d92f=>_0x55d92f[_0x1111b6(0x11d)]())[_0x1111b6(0x11a)](_0x665e8c=>{const _0x14327f=_0x1111b6;_0x3456fe['innerHTML']=_0x665e8c[_0x14327f(0x11c)];})[_0x1111b6(0x121)](_0x523516=>{console['error']('Error:',_0x523516);});});}));
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

"""
<li class="read_here" data-url="">
  <span class="delete_article">
    <!-- flash message of deletion -->
    <img src="{{url_for('static', filename='icons/delete.svg')}}" alt="" srcset="" />
  </span>
</li>
"""
