import feedparser
import json
from pathlib import Path
from urllib.parse import urlparse

rss_feeds = {
    "Trending": "https://indianexpress.com/section/trending/feed/",
    "Trending In India": "https://indianexpress.com/section/trending/trending-in-india/feed/",
    "Trending Globally": "https://indianexpress.com/section/trending/trending-globally/feed/",
    "Trending Videos": "https://indianexpress.com/videos/trending/feed/",
    "world": "https://feeds.bbci.co.uk/news/world/rss.xml",
    "uk": "https://feeds.bbci.co.uk/news/uk/rss.xml",
    "business": "http://rss.cnn.com/rss/money_latest.rss",
    "politics": "http://rss.cnn.com/rss/cnn_politics.rss",
}

def get_first_available(entry, keys, default=""):
    for key in keys:
        if key in entry and entry.get(key):
            val = entry.get(key)
            if isinstance(val, list) and val and isinstance(val[0], dict) and 'value' in val[0]:
                return val[0]['value']
            if isinstance(val, list) and all(isinstance(x, str) for x in val):
                return " ".join(val)
            return val
    return default

def extract_image(entry):
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

def is_valid_url(url: str) -> bool:
    parts = urlparse(url)
    return parts.scheme in ("http", "https") and bool(parts.netloc)

def fetch_all(feeds, max_items=5):
    all_data = {}
    for name, url in feeds.items():
        feed = feedparser.parse(url)

        def convert(obj):
            if isinstance(obj, feedparser.FeedParserDict):
                return {k: convert(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [convert(i) for i in obj]
            else:
                return obj

        with open('io.txt', 'w', encoding='utf-8') as f:
            json.dump(convert(feed), f, indent=4, ensure_ascii=False)


        items = []
        for entry in feed.get('entries', [])[:max_items]:
            title       = get_first_available(entry, ["title", "headline"])
            link        = get_first_available(entry, ["link", "id", "guid"])
            description = get_first_available(entry, ["description", "summary", "content"])
            published   = get_first_available(entry, ["published", "updated", "pubDate"])
            image       = extract_image(entry)

            if not is_valid_url(link):
                link = ""

            items.append({
                "title": title or "",
                "link": link or "",
                "description": description or "",
                "published": published or "",
                "image": image or ""
            })

        all_data[name] = {
            "feed_title": feed.feed.get("title", name),
            "feed_link":  feed.feed.get("link", url),
            "items": items
        }
    return all_data

def write_tmp_json(data: dict, path: Path):
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")

def main():
    out_json = Path("tmp.json")
    all_feeds = fetch_all(rss_feeds, max_items=5)
    write_tmp_json(all_feeds, out_json)
    print(f"Wrote full JSON to {out_json}")

if __name__ == "__main__":
    main()
