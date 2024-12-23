import feedparser

# Define RSS feed information
news_agency = {
    'the_washington_post': {
        'base_url': 'http://feeds.washingtonpost.com/rss/homepage',
        'genres': {
            'trending': 'http://feeds.washingtonpost.com/rss/homepage',
            'sports': 'http://feeds.washingtonpost.com/rss/sports',
            'technology': 'http://feeds.washingtonpost.com/rss/business/technology',
            'entertainment': 'http://feeds.washingtonpost.com/rss/entertainment',
            'health': 'http://feeds.washingtonpost.com/rss/health',
            'science': 'http://feeds.washingtonpost.com/rss/science',
            'politics': 'http://feeds.washingtonpost.com/rss/politics'
        }
    }
}

def fetch_rss_feed(agency_name, genre, news_count=25):
    """
    Fetch articles from an RSS feed for the given agency and genre.

    Args:
        agency_name (str): Name of the news agency (e.g., 'the_washington_post').
        genre (str): News genre (e.g., 'sports', 'technology').
        news_count (int): Number of articles to fetch (default: 25).

    Returns:
        list: A list of dictionaries containing article details (title, link, summary, and published date).
    """
    if agency_name not in news_agency:
        raise ValueError(f"Unsupported news agency: {agency_name}")

    agency = news_agency[agency_name]
    if genre not in agency['genres']:
        raise ValueError(f"Unsupported genre: {genre}")

    rss_url = agency['genres'][genre]
    feed = feedparser.parse(rss_url)

    if 'entries' not in feed:
        raise Exception(f"Failed to fetch entries from the RSS feed: {rss_url}")

    articles = []
    for entry in feed['entries'][:news_count]:  # Limit to the required number of articles
        articles.append({
            'title': entry.get('title', 'No title available'),
            'link': entry.get('link', 'No link available'),
            'summary': entry.get('summary', 'No summary available'),
            'published': entry.get('published', 'No published date available')
        })

    return articles

# Example usage
if __name__ == "__main__":
    try:
        agency = 'the_washington_post'
        genre = 'technology'
        count = 10

        articles = fetch_rss_feed(agency, genre, count)
        for idx, article in enumerate(articles, 1):
            print(f"{idx}. {article['title']}\nLink: {article['link']}\nSummary: {article['summary']}\nPublished: {article['published']}\n")
    except Exception as e:
        print(f"Error: {e}")
