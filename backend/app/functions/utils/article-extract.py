from newspaper import Article

url = "https://indianexpress.com/article/trending/trending-in-india/tte-confronts-soldiers-standing-in-ac-coach-gallery-on-north-east-express-viral-video-10008288/"
article = Article(url)
article.download()
article.parse()

print("Title:", article.title)
print("Text:", article.text[:500])  # First 500 characters of the article
