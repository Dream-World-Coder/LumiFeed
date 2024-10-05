# LumiFeed

### Ad-Free News Platform with Summaries & Key Points, Delightful clutterless ui

**LumiFeed** is an ad-free news platform that delivers the latest news with a clean, clutter-free user experience. It provides quick summaries of articles to help you stay informed without the noise. News is delivered from multiple sources, with a focus on user experience.

## Features

- **Ad-Free Browsing**: Enjoy news articles without the interruption of advertisements.
- **Clean UI/UX**: A simple and intuitive interface designed to prioritize user comfort.
- **Quick Summaries**: Each news article is summarized into key points for quick consumption.
- **City-Specific News**: Get personalized news updates by selecting your city of interest.
- **Kolkata & Indian News**: Special coverage for Kolkata and other Indian cities.
- **Single Page Application (SPA)**: Using Ajax for a seamless experience, all interactions happen on a single page.
- **Responsive Design**: Fully responsive, works smoothly across all devices.
- **Dark Mode**: A optimised dark mode for 'night-owls'.

## In Progress

- **News Summary**: Short summary for each news article Using Google Pegasus and BERT
- **Reading playLists**: Read later and liked lists

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS (with Tailwind), JavaScript, jQuery
- **Database**: SQLite
- **Other Tools**:
  - Flask-SQLAlchemy
  - Ajax for dynamic content loading
  - LocalStorage for client-side caching

## Installation

```bash
# Clone the repository
git clone https://github.com/Dream-World-Coder/LumiFeed.git
cd lumifeed

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the app
flask run
```

## How It Works

1. **Fetch News**: Users can select a news category (top news, India news, city news) and specify the number of articles. The platform uses Flask's backend to fetch news and generate summaries.
2. **Display**: The news articles are displayed dynamically in a neatly formatted table, with the option to read more or open articles in a new tab.
3. **Single Page Application**: LumiFeed is built using multiple Ajax calls to load data without refreshing the page, enhancing the user experience.
4. **City-Specific News**: Select a city to get targeted news for that location.
5. **Summary Display**: News is summarized to ensure users can quickly understand the key points.
6. **Completely Responsive**: The UI adapts perfectly across devices of all sizes and resolutions.

## API Routes

```bash
# Fetches news based on user-selected options (news type, count, city)
/fetchnews
--topNews
--indiaNews
--cityWiseNews ['kolkata', 'pune', 'delhi','mumbai','bangalore','lucknow']

# search news titles
/search_in_title

# Reads a news article within the app [preview]
/read_news_here

# Opens a news article in a new tab
/read_news_in_new_tab
--summary : /summary
```

## Screenshots

![LumiFeed Homepage](path/to/screenshot1.png)
_Homepage displaying top news and summary features._

## Future Features

- **Push Notifications**: Real-time notifications for breaking news.
- **Read later and Saved articles features**: Allow users to save news articles in various playlists
- **User Customization**: Allow users to customize the type of news they want to see on their feed.

## Contributing

Feel free to open an issue or submit a pull request if you'd like to contribute to LumiFeed. All contributions are welcome!

## License

This project is licensed under the MIT License.

---

### Author

- **Subhajit Gorai** - All development, UI/UX design, and backend logic were done by me!
