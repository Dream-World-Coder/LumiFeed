
# url = 'https://www.bbc.com/future/article/20241129-the-6000-year-old-hiking-gear-emerging-from-ice'
# newspaper4k : https://newspaper4k.readthedocs.io/en/latest/user_guide/quickstart.html
# news-please : https://github.com/fhamborg/news-please?tab=readme-ov-file

import requests
from bs4 import BeautifulSoup
from newspaper import Article

def fetch_news_articles(news_agency, news_genre, news_count=25):
    """
    Fetches news articles from the specified news agency and genre.

    Args:
        news_agency (str): Name of the news agency.
        news_genre (str): Genre of news (e.g., sports, politics).
        news_count (int): Number of articles to fetch (default: 25).

    Returns:
        list: A list of dictionaries containing article details (title, URL, summary).
    """
    # Mapping of news agencies to their URLs and genre-specific paths
    agency_urls = {
        "BBC News": "https://www.bbc.com",
        "CNN": "https://www.cnn.com",
        "The New York Times": "https://www.nytimes.com",
        "The Guardian": "https://www.theguardian.com",
        "Al Jazeera": "https://www.aljazeera.com",
        "Hindustan Times": "https://www.hindustantimes.com",
        "The Times of India": "https://timesofindia.indiatimes.com",
        "The Washington Post": "https://www.washingtonpost.com",
        "Reuters": "https://www.reuters.com",
        "NDTV": "https://www.ndtv.com",
    }

    if news_agency not in agency_urls:
        raise ValueError(f"Unsupported news agency: {news_agency}")

    base_url = agency_urls[news_agency]

    # Example genre paths (extend as needed for each agency)
    genre_paths = {
        "trending": "/world",
        "sports": "/sports",
        "entertainment": "/entertainment",
        "politics": "/politics",
        "health": "/health",
        "science": "/science",
        "technology": "/technology",
    }

    if news_genre not in genre_paths:
        raise ValueError(f"Unsupported news genre: {news_genre}")

    genre_url = base_url + genre_paths[news_genre]

    # Fetch the page
    response = requests.get(genre_url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch {genre_url}: {response.status_code}")

    # Parse the HTML
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract article links (adjust selectors based on the site structure)
    articles = []
    links = soup.find_all('a', href=True, limit=news_count * 2)  # Extra links to filter non-articles

    for link in links:
        url = link['href']
        if not url.startswith("http"):
            url = base_url + url

        try:
            # Use newspaper3k to extract article details
            article = Article(url)
            article.download()
            article.parse()

            articles.append({
                "title": article.title,
                "url": url,
                "summary": article.summary,
            })

            if len(articles) >= news_count:
                break
        except Exception as e:
            print(f"Error processing {url}: {e}")

    return articles

# Example Usage
if __name__ == "__main__":
    agency = "BBC News"
    genre = "sports"
    count = 10

    try:
        news = fetch_news_articles(agency, genre, count)
        for idx, article in enumerate(news, 1):
            print(f"{idx}. {article['title']} ({article['url']})\nSummary: {article['summary']}\n")
    except Exception as e:
        print(f"Error: {e}")


"""
"""
