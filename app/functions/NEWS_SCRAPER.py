from urllib.parse import quote
import logging
import requests
from bs4 import BeautifulSoup

from app.functions._utility__scraping import make_soup

# from web_scraper import make_soup

# will have to set the paths a/c to app.py , not this file.
# from io import BytesIO
# to open an image with pillow,first we need to load it in our memory, so, requests.get(img.url) , then as its an image, so we need to use bytesIO


class NewsScrape:
    def __init__(self) -> None:
        self.urls = {
            "indianExpressMain": "https://indianexpress.com/",
            "indianExpressBase": "https://indianexpress.com/section/",
            "indianExpressIndia": "https://indianexpress.com/section/india/",
            "indianExpressCities": "https://indianexpress.com/section/cities/",
            "indianExpressTrendingPremium": "https://indianexpress.com/section/trending/",
            "indianExpressScience": "https://indianexpress.com/section/technology/science/",
            "indianExpressTechnology": "https://indianexpress.com/section/technology/",
            "indianExpressSports": "https://indianexpress.com/section/sports/",
            "indianExpressBusiness": "https://",
            "indianExpressOpinion": "https://",
            "theHinduMain": "none",
        }
        self.cities = ["kolkata", "delhi", "mumbai", "bengaluru", "pune", "chennai"]
        self.max_pages = 15

    def validateNum(self, num):
        if not str(num).isdigit():
            num = 10
        elif num is None:
            num = 10
        else:
            num = int(num)
        return num

    # collecting news
    # --------------------
    def getTopNews(self, num=10) -> list:
        # all the news are not in a fixed place so ther are multiplpe same news fetched.

        news_num = self.validateNum(num)

        url = self.urls["indianExpressMain"]
        fetched_news_data = []
        count = 0
        serial = 0

        # making soup
        soup = None
        try:
            res = requests.get(url, timeout=5, allow_redirects=True)
            res.raise_for_status()
            soup = BeautifulSoup(res.content, "html.parser")
        except Exception as e:
            print(e)

        # the main place to scrape from
        content = (
            soup.body.find("main", id="wrapper")
            .find("div", id="body-section")
            .find("div", class_="container")
            .find("div", class_="left-sidebar")
            .find("div", id="HP_LATEST_NEWS")
            .find("div", class_="left-part")
        )

        # list of all the news div containers
        news_list = content.find_all("div", class_="other-article")
        context_part = news_list[0].find("div", class_="content-txt").h3.a

        news_title_of_first = ""  # flash some meessage
        count += 1

        # data scraped
        serial += 1
        news_title = context_part.text
        news_link = quote(context_part.get("href", "#"), safe=":/")

        # zipped list
        zip_list = [serial, news_title, news_link]
        fetched_news_data.append(zip_list)

        # storing the title of first news to break later on if same title encountered
        news_title_of_first = news_title

        while count < news_num and count < len(news_list):
            for news in news_list[1:]:
                if count >= news_num:
                    break

                serial += 1
                context_part = news.find("div", class_="content-txt").h3.a
                news_title = context_part.text

                # break if same news is encounered --end of list
                if news_title == news_title_of_first:
                    serial -= 1
                    print(f"no more news available, {count=}")
                    return fetched_news_data

                news_link = quote(context_part.get("href", "#"), safe=":/")

                if count == len(news_list) - 1:
                    serial = serial
                    news_title = "No more news available"
                    news_link = "javascript:void(0);"

                zip_list = [serial, news_title, news_link]
                fetched_news_data.append(zip_list)
                count += 1

        return fetched_news_data

    def getIndiaNews(self, num=10):
        pgNo = 1
        baseUrl = self.urls["indianExpressIndia"]
        news_num = self.validateNum(num)
        fetched_news_data = []
        count = 0
        serial = 0

        while count < news_num and pgNo <= self.max_pages:
            url = baseUrl + f"page/{pgNo}/"
            soup = make_soup(url)
            content = (
                soup.body.find("div", id="section")
                .find("div", class_="container")
                .find("div", class_="row")
                .find("div", class_="leftpanel")
                .find("div", class_="nation")
            )
            news_list = content.find_all("div", class_="articles")

            for news in news_list:
                if count >= news_num:
                    break
                serial += 1

                snaps = news.find("div", class_="snaps")
                news_link = quote(snaps.a.get("href", "#"), safe=":/")
                context_part = news.find("div", class_="img-context")
                news_title = context_part.h2.a.get("title")
                news_date = context_part.find("div", class_="date").text
                addtional_info = context_part.p.text

                zip_list = [serial, news_title, news_date, news_link]
                fetched_news_data.append(zip_list)
                count += 1
            pgNo += 1

        return fetched_news_data

    def getCitiesNews(self, cityname="kolkata", num=10):
        pgNo = 1
        baseUrl = self.urls["indianExpressCities"]
        news_num = self.validateNum(num)
        fetched_news_data = []
        count = 0
        serial = 0

        while count < news_num and pgNo <= self.max_pages:
            url = baseUrl + f"{cityname}/page/{pgNo}/"
            soup = make_soup(url)
            try:
                content = (
                    soup.body.find("main", id="wrapper")
                    .find("div", id="north-east-data")
                    .ul
                )
                news_list_meta = content.find_all("li")
                news_list = [news for news in news_list_meta if news.a]
                logging.info(f"Found {len(news_list)} news items on page {pgNo}")

                for news in news_list:
                    if count >= news_num:
                        break
                    serial += 1

                    news_link = quote(news.a.get("href", "#"), safe=":/")
                    news_title = news.h2.text if news.h2 else news.h3.text

                    zip_list = [serial, news_title, news_link]
                    logging.info(f"News {serial}: {news_title}, {news_link}")
                    fetched_news_data.append(zip_list)
                    count += 1

            except AttributeError as e:
                logging.error(f"Error processing page {pgNo}: {e}")
                return fetched_news_data

            pgNo += 1

        return fetched_news_data

    def getOthersNews(self, section_name="sports", num=10):
        pgNo = 1
        baseUrl = f'{self.urls["indianExpressBase"]}{section_name}/'
        news_num = self.validateNum(num)
        fetched_news_data = []
        count = 0
        serial = 0

        while count < news_num and pgNo <= self.max_pages:
            url = baseUrl + f"page/{pgNo}/"
            soup = make_soup(url)
            content = (
                soup.body.find("div", id="section")
                .find("div", class_="container")
                .find("div", class_="row")
                .find("div", class_="leftpanel")
                .find("div", class_="nation")
            )
            articles_list = content.find_all("div", class_="articles")

            for article in articles_list:
                if count >= news_num:
                    break
                serial += 1

                snaps_div = article.find("div", class_="snaps")
                news_link = quote(snaps_div.a.get("href", "#"), safe=":/")

                other_part = article.find("div", class_="img-context")
                news_title = other_part.h2.a.get("title")
                news_date = other_part.find("div", class_="date").text
                addtional_info = other_part.p.text

                zip_list = [serial, news_title, news_date, news_link]
                fetched_news_data.append(zip_list)
                count += 1
            pgNo += 1

        return fetched_news_data

    # Extract news content
    # ---------------------
    def extractNewsContent(self, url):
        soup = make_soup(url)

        # Initialize default values
        heading = "Heading not found for this news"
        subheading = "Subheading not found for this news"
        imgUrl = "ImgUrl not found for this news"
        news_data_string = "News data not found for this news"

        # Try extracting the content from the first structure
        try:
            content = (
                soup.body.find("main", id="wrapper")
                .find("div", id="section")
                .find("div", class_="container")
            )
            rows = content.find_all("div", class_="row")[:2]

            # Extract heading
            try:
                heading = rows[0].find("div", class_="heading-part").h1.text
            except Exception as e:
                print(f"Error extracting heading from first structure: {e}")

            # Extract subheading
            try:
                subheading = rows[0].find("div", class_="heading-part").h2.text
            except Exception as e:
                print(f"Error extracting subheading from first structure: {e}")

            # Extract news body
            # //*[@id="pcl-full-content"].all_div.text
            # scrape more content if not found
            try:
                newsBody = (
                    rows[1]
                    .find("div", class_="leftpanel")
                    .find("div", class_="story-details")
                    .find("div", class_="main-story")
                    .find("div", class_="articles")
                    .find("div", class_="full-details")
                )

                # Extract image URL
                try:
                    imgUrl = newsBody.find("span", class_="custom-caption").img.get(
                        "src"
                    )
                except Exception as e:
                    print(f"Error extracting image URL from first structure: {e}")

                # Extract paragraphs
                try:
                    paragraphs = newsBody.find("div", class_="story_details").find_all(
                        "p"
                    )[:-1]
                    news_data_list = []
                    for p in paragraphs:
                        news_data_list.append(p.text)
                        news_data_list.append("<br><br>")
                    news_data_string = "".join(news_data_list)
                except Exception as e:
                    print(f"Error extracting news data from first structure: {e}")

            except Exception as e:
                print(f"Error extracting news body from first structure: {e}")

        except AttributeError:
            # Try extracting content from the second structure
            try:
                # Extract heading
                try:
                    heading = soup.body.find(
                        "h1", class_="jsx-7b05a505bee4f2c9 seoHeading default"
                    ).text
                except Exception as e:
                    print(f"Error extracting heading from second structure: {e}")

                # Extract subheading
                try:
                    subheading = soup.body.find(
                        "h2", class_="jsx-de6b4adf1ab3edb subHeader"
                    ).text
                except Exception as e:
                    print(f"Error extracting subheading from second structure: {e}")

                # Extract image URL
                try:
                    imgUrl = soup.body.find(
                        "span", class_="jsx-59704401a1952a95 ieg-feature"
                    ).img.get("src")
                except Exception as e:
                    print(f"Error extracting image URL from second structure: {e}")

                # Extract paragraphs
                try:
                    paragraphs = soup.body.find(
                        "div", class_="o-post-content"
                    ).find_all("p")
                    news_data_list = []
                    for p in paragraphs:
                        news_data_list.append(p.text)
                        news_data_list.append("<br><br>")
                    news_data_string = "".join(news_data_list)
                except Exception as e:
                    print(f"Error extracting news data from second structure: {e}")

            except Exception as e:
                print(f"Error extracting content from second structure: {e}")

        except Exception as e:
            print(f"General error: {e}")

        return heading, subheading, imgUrl, news_data_string

    def extractNewsContentIndia(self, url):
        soup = make_soup(url)

        # Initialize variables with default values
        heading = "Heading not found for this news"
        subheading = "Subheading not found for this news"
        imgUrl = "ImgUrl not found for this news"
        news_data_string = "News data not found for this news"

        # Try extracting heading
        try:
            heading = soup.body.find(
                "h1", class_="native_story_title", itemprop_="headline"
            ).text
        except Exception as e:
            print(f"Error extracting heading: {e}")

        # Try extracting subheading
        try:
            subheading = soup.body.find(
                "h2", class_="synopsis", itemprop_="description"
            ).text
        except Exception as e:
            print(f"Error extracting subheading: {e}")

        # Try extracting content and paragraphs
        try:
            content = (
                soup.body.find("main", id="wrapper")
                .find("div", id="section")
                .find("div", class_="container")
            )
            rows = content.find_all("div", class_="row")[:2]
            newsBody = (
                rows[1]
                .find("div", class_="leftpanel")
                .find("div", class_="story-details")
                .find("div", class_="main-story")
                .find("div", class_="articles")
                .find("div", class_="full-details")
            )

            # Try extracting image URL
            try:
                imgUrl = newsBody.find("span", class_="custom-caption").img.get("src")
            except Exception as e:
                print(f"Error extracting image URL: {e}")

            # Try extracting news data paragraphs
            try:
                paragraphs = newsBody.find("div", class_="story_details").find_all("p")
                news_data_list = []
                for p in paragraphs:
                    news_data_list.append(p.text)
                    news_data_list.append("<br><br>")
                news_data_string = "".join(news_data_list)
            except Exception as e:
                print(f"Error extracting news data: {e}")

        except Exception as e:
            print(f"Error extracting content: {e}")

        return heading, subheading, imgUrl, news_data_string


if __name__ == "__main__":
    news = NewsScrape()
    data = news.getTopNews(20)
    for d in data:
        print(d)
    # print(news.getIndiaNews(1))
    # url = 'https://indianexpress.com/article/cities/kolkata/world-war-ii-bomb-found-in-jhargram-west-bengal-9454448/'
    # news.extractNewsContent(url=url)
