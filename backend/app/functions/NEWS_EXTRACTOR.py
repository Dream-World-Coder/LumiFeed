from urllib.parse import urlparse
import feedparser
from newspaper import Article

class NewsExtractor:
    def __init__(self) -> None:
        self.max_pages = 15

    def is_valid_url(self, url: str) -> bool:
        try:
            parts = urlparse(url)
            return parts.scheme in ("http", "https") and bool(parts.netloc)
        except Exception:
            return False

    def normalize_link(self, rss_link: str) -> str:
        import re
        # lowercase
        rss_link = rss_link.lower()
        # replace _https_ at the start with https://
        rss_link = re.sub(r'^_https_', 'https://', rss_link)
        # replace all -- with /
        rss_link = rss_link.replace('--', '/')
        return rss_link

    def extract_news_list_from_rss(self, rss_link, number) -> list[dict[str, str]]:
        news_list = []
        # array of dict, {title, drescription, date, url}

        return news_list

    def extract_article_content(self, article_link):
        pass


# if __name__ == "__main__":
#     news = NewsExtractor()
#     data = news.getTopNews(20)
#     for d in data:
#         print(d)
