from urllib.parse import urlparse
import feedparser
from newspaper import Article
from datetime import datetime
import json
import re

class NewsExtractor:
    def __init__(self) -> None:
        pass

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
        # replace _http_ at the start with http://
        rss_link = re.sub(r'^_http_', 'http://', rss_link)
        # replace all -- with /
        rss_link = rss_link.replace('--', '/')
        return rss_link

    def __get_first_available(self, entry, keys, default=""):
        for key in keys:
            if key in entry and entry.get(key):
                val = entry.get(key)
                if isinstance(val, list) and val and isinstance(val[0], dict) and 'value' in val[0]:
                    return val[0]['value']
                if isinstance(val, list) and all(isinstance(x, str) for x in val):
                    return " ".join(val)
                return val
        return default

    def __extract_image(self, entry) -> str:
        if entry.get('media_content'):
            for m in entry.media_content:
                if m.get('url'):
                    return m['url']
        if entry.get('media_thumbnail'):
            for m in entry.media_thumbnail:
                if m.get('url'):
                    return m['url']
        for link in entry.get('links', []):
            if link.get('type', '').startswith('image/') and link.get('href'):
                return link['href']
        return ""

    def extract_news_list_from_rss(self, rss_link: str, number: int):
        extracted_news_data = []
        try:
            feed = feedparser.parse(rss_link)
            entries = feed.get('entries', [])
        except Exception:
            return extracted_news_data

        for entry in entries[:number]:
            try:
                title = self.__get_first_available(entry, ["title", "headline"], "")
                description = self.__get_first_available(entry, ["description", "summary", "content", "subtitle", "sub_title"], "")
                thumbnail = self.__extract_image(entry) or ""
                author = self.__get_first_available(entry, ["author", "creator"], "")
                date = self.__get_first_available(entry, ["published", "updated", "pubDate"], "")
                url = self.__get_first_available(entry, ["link", "id", "guid"], "")

                if not self.is_valid_url(url):
                    url = ""

                extracted_news_data.append({
                    "title": title,
                    "description": description,
                    "thumbnail": thumbnail,
                    "author": author,
                    "date": date,
                    "url": url
                })
            except Exception as e:
                print(e)
                return extracted_news_data

        return json.dumps(extracted_news_data, indent = 4)

    def extract_article_content(self, article_link):
        article = Article(article_link)
        article.download()
        article.parse()

        title = article.title or "Title not found for this article"
        description = article.summary
        thumbnail = article.top_img or article.imgs[0]
        articleContent = article.text or "Content not found for this article"
        author = article.authors
        date = article.publish_date or ""

        articleContent = re.sub("Story continues below this ad\n\n", "", articleContent)
        articleContent = re.sub("\n\n", "<br/><br/>", articleContent)

        return {
            "title": title,
            "description": description,
            "thumbnail": thumbnail,
            "articleContent":articleContent,
            "author": author,
            "date": date.isoformat() if isinstance(date, datetime) else "",
        }
