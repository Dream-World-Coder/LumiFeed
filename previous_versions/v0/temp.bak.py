import time
import requests
import re
import os
from bs4 import BeautifulSoup
from urllib.parse import quote


class NewsScrape:
    def __init__(self) -> None:
        self.cities = ['kolkata', 'delhi', 'mumbai', 'bengaluru', 'pune', 'chennai']
        self.pgNo = 1
        self.cityname = 'kolkata'  # Changed to an instance variable
        self.urls = {
            'indianExpressMain': 'https://indianexpress.com',
            'indianExpressIndia': f'https://indianexpress.com/section/india/page/{self.pgNo}/',
            'indianExpressCities': f'https://indianexpress.com/section/cities/{self.cityname}/'
        }
        
        # greet
        print(f'\n\nWelcome!')
        print(f'Get TOP NEWS[press: 1]')
        print(f'Get TOP NEWS from all over INDIA[press: 2]')
        print(f'Get TOP NEWS of specific Indian Cities[press: 3]\n')
        
        self.getInput()

    def match_part(self, part: str, array: list, least=False):  # Changed array: iter to array: list
        matchdegree = {}
        total_matches = 0
        for item in array:
            matchdegree[f'{item}'] = item.lower().count(part.lower())
            total_matches += matchdegree[f'{item}']        
        
        if total_matches == 0:
            print("No match found")
            return None
        
        else:
            for key, value in matchdegree.items():
                matchdegree[key] = value / total_matches
                
            lst = list(matchdegree.values())
            lst.sort(reverse=least)
            
            for key, value in matchdegree.items():
                if value == lst[-1]:
                    return key

    def getInput(self):
        try:
            inp = int(input('Enter your choice: '))
        except Exception as e:
            print(e)
        
        if inp == 1:
            self.getTopNews()
        elif inp == 2:
            self.getIndiaNews()
        elif inp == 3:
            city = input(f'available cities: {[(item.capitalize()) for item in self.cities]}\nEnter CityName or First letter/letters: ').strip().lower()
            if city in self.cities:
                self.getCitiesNews(cityname=city)
            else:
                cn = self.match_part(part=city, array=self.cities, least=False)
                self.getCitiesNews(cityname=cn)
        else:
            print('Invalid Input\nUse 1, 2 or 3 only')
            self.getInput()

    def make_soup(self, url, timeout: int = 8, redirect: bool = True, soup_type: str = 'html.parser') -> BeautifulSoup:
        try:
            res = requests.get(url, timeout=timeout, allow_redirects=redirect)
            res.raise_for_status()
            soup = BeautifulSoup(res.content, soup_type)
            return soup
        except Exception as e:
            print(e)
            return None
        
    def generate_html_table(self, data: list):
        html = '''
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>News Data</title>
                <link rel="stylesheet" href="deem/public/style.css">
                <link rel="stylesheet" href="deem/public/utils.css">
            </head>
            <body>
                <div class="container cen">
                    <table class="">
                        <tr class="tr1 rows">
                            <th class="th1">NEWS TITLE</th>
                            <th class="th2">LINK</th>
                        </tr>
            '''
            
        for row in data[1:]:
            html += f'''
                    <tr class="rows">
                        <td class="td1 data_box">{row[0]}</td>
                        <td class="td2 data_box"><a href="{row[1]}">Link</a></td>
                    </tr>
            '''
        
        html += '''
                    </table>
                </div>
                <div class="find fixed">
                    <div class="search borderX relative">
                        <div class="search-bar borderX flexed justify-between">
                            <form class="flexed" action="/search" method="post">
                                <input type="text" name="search" id="search" placeholder="Search" required>
                                <button class="search-icon bg-set" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div class="search-reasults flex-col"></div>
                </div>
                <div class="sp"></div>
                <script src="deem/public/script.js"></script>
            </body>
            </html>
            '''
        
        with open('index.html', 'w') as file:
            file.write(html)
        
        return html
    
    def getTopNews(self, num=10):
        num = input("Enter the number of news you want to get: ")
        if not num.isdigit():
            num = 10
        else:
            num = int(num)
            
        url = self.urls['indianExpressMain']
        fetched_news_data = [['NEWS TITLE', 'LINK']]
        count = 0
        soup = self.make_soup(url)
        if soup is None:
            print("Failed to retrieve the content.")
            return

        content = soup.find('div', id="wrapper")
        if not content:
            print("Content not found")
            return

        container = content.find('div', class_="container")
        if not container:
            print("Container not found")
            return

        left_sidebar = container.find('div', class_="left-sidebar")
        if not left_sidebar:
            print("Left sidebar not found")
            return

        left_part = left_sidebar.find('div', class_="left-part")
        if not left_part:
            print("Left part not found")
            return

        news_list = left_part.find_all('div', class_="other-article")
        if not news_list:
            print("No news articles found")
            return

        while count < num:
            for news in news_list:
                if count >= num:
                    break
                context_part = news.find('div', class_="content-txt").h3.a
                if context_part:
                    news_title = context_part.text
                    news_link = quote(context_part.get('href', '#'), safe=':/')
                    zip_list = [news_title, news_link]
                    fetched_news_data.append(zip_list)
                    count += 1
                
        self.generate_html_table(fetched_news_data)
        return fetched_news_data

    def getIndiaNews(self, num=10):
        url = self.urls['indianExpressIndia']
        print(f"Fetching India news from URL: {url}")
        # Implement the logic similar to getTopNews

    def getCitiesNews(self, cityname='kolkata', num=10):
        url = f'https://indianexpress.com/section/cities/{cityname}/'
        print(f"Fetching city news from URL: {url}")
        # Implement the logic similar to getTopNews


news = NewsScrape()
