import requests
from bs4 import BeautifulSoup
import feedparser
import json
from typing import List, Dict, Optional
import concurrent.futures
import re

class NewsAgencyScraper:
  def __init__(self):
    # Configuration for different news agencies and their RSS/parsing strategies
    self.news_sources = {
        # working, in xml
        'bbc': {
            'base_url': 'http://feeds.bbci.co.uk/news/rss.xml',
            'genres': {
                'trending': 'http://feeds.bbci.co.uk/news/rss.xml',
                'sports': 'http://feeds.bbci.co.uk/sport/rss.xml',
                'technology': 'http://feeds.bbci.co.uk/news/technology/rss.xml',
                'entertainment': 'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
                'health': 'http://feeds.bbci.co.uk/news/health/rss.xml',
                'science': 'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
                'politics': 'http://feeds.bbci.co.uk/news/politics/rss.xml'
            }
        },
        # some working some not -- in xml
        'cnn': {
            'base_url': 'http://rss.cnn.com/rss/cnn_topstories.rss',
            'genres': {
                'trending': 'http://rss.cnn.com/rss/cnn_topstories.rss',
                'sports': 'http://rss.cnn.com/rss/cnn_latest.rss',
                'technology': 'http://rss.cnn.com/rss/cnn_technology.rss',
                'entertainment': 'http://rss.cnn.com/rss/cnn_showbiz.rss',
                'health': 'http://rss.cnn.com/rss/cnn_health.rss',
                'science': 'http://rss.cnn.com/rss/cnn_space.rss',
                'politics': 'http://rss.cnn.com/rss/cnn_allpolitics.rss'
            }
        },
        # rss reader needed
        'the_ny_times': {
            'base_url': 'https://www.nytimes.com/services/xml/rss/nyt/HomePage.xml',
            'genres': {
                'trending': 'https://www.nytimes.com/services/xml/rss/nyt/HomePage.xml',
                'sports': 'https://www.nytimes.com/services/xml/rss/nyt/Sports.xml',
                'technology': 'https://www.nytimes.com/services/xml/rss/nyt/Technology.xml',
                'entertainment': 'https://www.nytimes.com/services/xml/rss/nyt/Arts.xml',
                'health': 'https://www.nytimes.com/services/xml/rss/nyt/Health.xml',
                'science': 'https://www.nytimes.com/services/xml/rss/nyt/Science.xml',
                'politics': 'https://www.nytimes.com/services/xml/rss/nyt/Politics.xml'
            }
        },
        # working --xml
        'the_guardian': {
            'base_url': 'https://www.theguardian.com/uk/rss',
            'genres': {
                'trending': 'https://www.theguardian.com/uk/rss',
                'sports': 'https://www.theguardian.com/uk/sport/rss',
                'technology': 'https://www.theguardian.com/uk/technology/rss',
                'entertainment': 'https://www.theguardian.com/uk/culture/rss',
                'health': 'https://www.theguardian.com/uk/lifeandstyle/health-and-wellbeing/rss',
                'science': 'https://www.theguardian.com/science/rss',
                'politics': 'https://www.theguardian.com/politics/rss'
            }
        },
        # rss reader needed
        'al_jazeera': {
            'base_url': 'https://www.aljazeera.com/xml/rss/all.xml',
            'genres': {
                'trending': 'https://www.aljazeera.com/xml/rss/all.xml',
                'sports': 'https://www.aljazeera.com/sports/rss',
                'technology': 'https://www.aljazeera.com/technology/rss',
                'entertainment': 'https://www.aljazeera.com/entertainment/rss',
                'health': 'https://www.aljazeera.com/health/rss',
                'science': 'https://www.aljazeera.com/science/rss',
                'politics': 'https://www.aljazeera.com/politics/rss'
            }
        },
        # rss reader needed
        'hindustan_times': {
            'base_url': 'https://www.hindustantimes.com/feeds/rss/homepage/rssfeed.xml',
            'genres': {
                'trending': 'https://www.hindustantimes.com/feeds/rss/homepage/rssfeed.xml',
                'sports': 'https://www.hindustantimes.com/feeds/rss/sports/rssfeed.xml',
                'technology': 'https://www.hindustantimes.com/feeds/rss/technology/rssfeed.xml',
                'entertainment': 'https://www.hindustantimes.com/feeds/rss/entertainment/rssfeed.xml',
                'health': 'https://www.hindustantimes.com/feeds/rss/health/rssfeed.xml',
                'science': 'https://www.hindustantimes.com/feeds/rss/science/rssfeed.xml',
                'politics': 'https://www.hindustantimes.com/feeds/rss/politics/rssfeed.xml'
            }
        },
        # working --xml
        'times_of_india': {
            'base_url': 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
            'genres': {
                'trending': 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
                'sports': 'https://timesofindia.indiatimes.com/rssfeeds/4718841.cms',
                'technology': 'https://timesofindia.indiatimes.com/rssfeeds/5880659.cms',
                'entertainment': 'https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms',
                'health': 'https://timesofindia.indiatimes.com/rssfeeds/3908999.cms',
                'science': 'https://timesofindia.indiatimes.com/rssfeeds/4148774.cms',
                'politics': 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms'
            }
        },
        # rss reader needed
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
        },
        # not working
        'reuters': {
            'base_url': 'http://feeds.reuters.com/reuters/topNews',
            'genres': {
                'trending': 'http://feeds.reuters.com/reuters/topNews',
                'sports': 'http://feeds.reuters.com/reuters/sportsNews',
                'technology': 'http://feeds.reuters.com/reuters/technologyNews',
                'entertainment': 'http://feeds.reuters.com/reuters/entertainmentNews',
                'health': 'http://feeds.reuters.com/reuters/healthNews',
                'science': 'http://feeds.reuters.com/reuters/scienceNews',
                'politics': 'http://feeds.reuters.com/reuters/politicsNews'
            }
        },
        # not working
        'ndtv': {
            'base_url': 'https://feeds.feedburner.com/ndtvnews-top-stories',
            'genres': {
                'trending': 'https://feeds.feedburner.com/ndtvnews-top-stories',
                'sports': 'https://feeds.feedburner.com/ndtvnews-sports-news',
                'technology': 'https://feeds.feedburner.com/ndtvnews-tech-news',
                'entertainment': 'https://feeds.feedburner.com/ndtv/entertainment-news',
                'health': 'https://feeds.feedburner.com/ndtvnews-health-news',
                'science': 'https://feeds.feedburner.com/ndtvnews-sci-tech-news',
                'politics': 'https://feeds.feedburner.com/ndtvnews-political-news'
            }
        }
    }

  def fetch_news(self,
                  news_agency: str,
                  genre: str = 'trending',
                  news_count: int = 25) -> List[Dict[str, str]]:
      """
      Fetch news articles from a specific agency and genre

      :param news_agency: Name of the news agency
      :param genre: News genre (default: trending)
      :param news_count: Number of news articles to fetch (default: 25)
      :return: List of news articles with details
      """
      # Validate inputs
      if news_agency not in self.news_sources:
          raise ValueError(f"Unsupported news agency. Choose from: {', '.join(self.news_sources.keys())}")

      # Normalize genre to lowercase
      genre = genre.lower()

      # Validate genre
      if genre not in self.news_sources[news_agency]['genres']:
          raise ValueError(f"Unsupported genre for {news_agency}. Choose from: {', '.join(self.news_sources[news_agency]['genres'].keys())}")

      # Get RSS feed URL for the specific genre
      rss_url = self.news_sources[news_agency]['genres'][genre]

      # Parse RSS feed
      feed = feedparser.parse(rss_url)

      # Collect news articles
      news_articles = []
      for entry in feed.entries[:news_count]:
          article = {
              'title': entry.get('title', 'No Title'),
              'link': entry.get('link', ''),
              'description': entry.get('description', 'No description'),
              'published_date': entry.get('published', 'Unknown date')
          }
          news_articles.append(article)

      return news_articles

def main():
    # Example usage
    scraper = NewsAgencyScraper()

    # Fetch 10 trending news from BBC
    try:
        news = scraper.fetch_news(
            # news_agency='BBC News',
            news_agency='hindustan_times',
            # genre='trending',
            genre='politics',
            news_count=10
        )

        # Print news details
        for idx, article in enumerate(news, 1):
            print(f"{idx}. Title: {article['title']}")
            print(f"   Link: {article['link']}")
            print(f"   Published: {article['published_date']}")
            print("---")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()

# Installation Requirements:
# pip install requests beautifulsoup4 feedparser
"""
Usage Guide:
1. Install required libraries:
   pip install requests beautifulsoup4 feedparser

2. Example Usage:
   scraper = NewsAgencyScraper()

   # Fetch 25 sports news from CNN
   sports_news = scraper.fetch_news(
       news_agency='CNN',
       genre='sports',
       news_count=25
   )

3. Supported News Agencies:
   - BBC News
   - CNN
   - The New York Times
   - The Guardian
   - Al Jazeera
   - Hindustan Times
   - The Times of India
   - The Washington Post
   - Reuters
   - NDTV

4. Supported Genres:
   - trending
   - sports
   - technology
   - entertainment
   - health
   - science
   - politics
"""
