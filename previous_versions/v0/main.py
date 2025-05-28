# import re
from utils.scraper import make_soup
from utils.match.find_match import match_part
from urllib.parse import quote
from functions import generate_html_table

class NewsScrape:

    def __init__(self) -> None:
        self.cities = ['kolkata', 'delhi', 'mumbai', 'bengaluru', 'pune', 'chennai']
        self.pgNo = 1
        cityname = 'kolkata'
        self.urls = {
            'indianExpressMain' : 'https://indianexpress.com',
            'indianExpressIndia' : f'https://indianexpress.com/section/india/page/{self.pgNo}/',
            'indianExpressCities' : f'https://indianexpress.com/section/cities/{cityname}/'
        }

        # greet
        print(f'\n\nWelcome!')
        print(f'Get TOP NEWS[press: 1]')
        print(f'Get TOP NEWS from all over INDIA[press: 2]')
        print(f'Get TOP NEWS of aspecific Indian Cities[press: 3]\n')

        self.getInput()


    def getInput(self):
        try:
            inp = int(input('Enter your choice: '))
            if inp == 1:
                self.getTopNews()
            elif inp == 2:
                self.getIndiaNews()
            elif inp == 3:
                city = input(f'available cities: {[(item.capitalize()) for item in self.cities]}\nEnter CityName or First letter/letters: ').strip().lower()
                if city in self.cities:
                    self.getCitiesNews(cityname=city)
                else:
                    cn:str = match_part(part=city, array=self.cities, least=False)
                    self.getCitiesNews(cityname=cn)
            else:
                # or just redirect tp getTopNews
                print('Invalid Input\nUSe 1 , 2 or 3 only')
                self.getInput()
        except Exception as e:
            print(e)


    def getTopNews(self, num = 10):
        num = input("Enter thr num of news you want to get: ")
        if not num.isdigit():
            num = 10
        else:
            num = int(num)

        url = self.urls['indianExpressMain']
        fetched_news_data = [['SERIAL NO', 'NEWS TITLE', 'LINK']]
        count = 0
        serial = 0
        soup = make_soup(url)
        content = soup.body.find('div', id="wrapper").find('div', id="body-section").find('div', class_="container").find('div', class_="left-sidebar").find('div', id="HP_LATEST_NEWS").find('div', class_="left-part")
        news_list = content.find_all('div', class_="other-article")

        while count < num:
            for news in news_list:
                if count >= num:
                    break
                serial += 1
                context_part = news.find('div', class_="content-txt").h3.a
                news_title = context_part.text
                news_link = quote(context_part.get('href', '#'), safe=':/')
                zip_list = [serial, news_title, news_link]
                fetched_news_data.append(zip_list)
                count += 1

        generate_html_table(data=fetched_news_data)
        return fetched_news_data


    def getIndiaNews(self, num = 10):
        url = self.urls['indianExpressIndia']


    def getCitiesNews(self, cityname='kolkata', num = 10):
        url = self.urls['indianExpressCities'] # modify link



news = NewsScrape()
