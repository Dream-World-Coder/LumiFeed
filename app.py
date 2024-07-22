from flask import Flask, render_template, request, redirect, session, jsonify, g
from functions.html_gen import gen_table, gen_table_2, generate_search_reasult, make_another_page
from functions.file_functions import makeAlternateFilePath, cleanup_files
from functions.data_collect import get_device_type, write_to_csv
# from functions.news_summariser import generate_summary
from functions.news_fetcher import NewsScrape
from functions.search_algorithms import s2x1
from datetime import datetime
import user_agents
import time
import os


app = Flask(__name__)
app.secret_key = os.urandom(24)


news_types = ['top_n', 'india_n', 'city_n']
obj = NewsScrape()



@app.route('/')
def index():
    return render_template('index.html')


@app.route('/fetch', methods=['GET']) 
def fetchnews():
    city_choice = None
        
    news_type = request.args.get('news_type')
    news_count = request.args.get('news_count')
    city_choice = request.args.get('city_choice')
    
    try:
        news_count = int(news_count)
    except Exception as e:
        print(e)
        return render_template('index.html', table='None')
    
    home_url = f'http://127.0.0.1:5500/fetch?news_type={news_type}&city_choice={city_choice}&news_count={news_count}'
    session['home_url'] = home_url
    
    if news_type == 'top_n':
        news_list = obj.getTopNews(num=news_count)
        news_table = gen_table(news_list)
        
    elif news_type == 'india_n':
        news_list = obj.getIndiaNews(num=news_count)
        news_table = gen_table_2(news_list)
        
    elif news_type == 'city_n':
        if city_choice is None:
            # flash('Please select a city')
            # return redirect('/')
            # get_flashed_messages('Please select a city')
            news_table = 'Please select a city'
            return render_template('index.html', table=news_table)
        else:
            news_list = obj.getCitiesNews(cityname=city_choice, num=news_count)
            news_table = gen_table(news_list)
            
    else:
        print('error')
        return render_template('index.html', table='None')
    
    session['news_list'] = news_list
    session['news_table'] = news_table
    return render_template('index.html', table=news_table)


@app.route('/search_in_title', methods=['POST']) 
def search_in_title():
    news_list = session.get('news_list', [])
    
    if  len(news_list) == 0:
        # flash('Please fetch news first')
        return render_template('index.html', table='Please fetch news first, to enable search', search_result='Search something')
    
    data = request.json
    part = data.get('searchPart')
    matches = s2x1(database=news_list, part=part)
    data = generate_search_reasult(matches=matches)
    response = {'html' : data}
    return jsonify(response)



@app.route('/read_news_here', methods=['POST'])
def read_news_here():
    data = request.json
    url = data.get('url')
    if url.__contains__('https://indianexpress.com/section/india/'):
        heading, subheading, imgUrl, news_data_string = obj.extractNewsContentIndia(url=url)
    else:
        heading, subheading, imgUrl, news_data_string = obj.extractNewsContent(url=url)

    response = {
                'heading': heading,
                'subheading': subheading,
                'imgUrl': imgUrl,
                'news_data_string': news_data_string
                }
    return jsonify(response)


@app.route('/read_news_in_new_tab', methods=['POST'])
def read_news_in_new_tab():
    home_url = session.get('home_url', '')
    
    heading = request.form.get('heading')
    subheading = request.form.get('subheading')
    news_content = request.form.get('news_content')
    newsImgUrl = request.form.get('newsImgUrl')
    
    html_file_str = make_another_page(home_url=home_url, heading=heading, subheading=subheading, news_content=news_content, newsImgUrl=newsImgUrl)
    path = 'templates/news.html'
    final_path = makeAlternateFilePath(path=path)
    with open(final_path, 'w') as f:
        f.write(html_file_str)

    if 'file_paths' not in session:
        session['file_paths'] = []
    session['file_paths'].append(final_path)
    
    return render_template(os.path.basename(final_path))


@app.teardown_request
def teardown_request(exception=None):
    file_paths = session.pop('file_paths', [])
    cleanup_files(file_paths)

'''
@app.route('/make_summary', methods=['POST'])
def make_summary():
    data = request.json
    text = data.get('textToSummarise')
    summary = generate_summary(text)
    response = {'summary': summary}
    return jsonify(response)
'''

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5500)
