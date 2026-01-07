# LumiFeed

### Ad-Free News Platform with Summaries & Key Points

[Live Demo](https://lumifeed.vercel.app)

> Note: This deployment is for **personal and educational purposes only**. It may include scraped content under fair use for demo/testing.

**LumiFeed** is an ad-free news platform that delivers the latest news with a clean, clutter-free user experience. It provides quick summaries of articles to help you stay informed without the noise. News is fetched from multiple sources, with a strong focus on readability and performance. You can also organise your articles in collections.

All development so far by [DWC](https://github.com/Dream-World-Coder) — over 23,000 lines of code.

## Features

- **Ad-Free**: Enjoy news articles without the interruption of advertisements. Stay focused while reading
- **Collections to Store Articles**: Collections like `Read Later` and `Liked Articles` for easy organization, also you can create custom collections of your own.
- **Quick Summaries**: Each news article is summarized into key points for quick consumption. [in development]
- **Responsive Design**: Fully responsive, works smoothly across all devices.
- **Clean UI/UX**: A simple and intuitive interface designed to prioritize user comfort.

## In Progress

- **News Summary**: Short summary for each news article Using Google Pegasus and BERT

## Tech Stack

- **Backend**: Flask (Python), Gunicorn
- **Frontend**: React (jsx), Dexie, Tailwind
- **Database**: N/A now | SQLite + PostgreSQL


## Installation

```bash
git clone https://github.com/Dream-World-Coder/LumiFeed.git
cd lumifeed

# --- frontend ---
cd frontend
pnpm i
pnpm dev

# --- backend ---
cd ../backend
python3 -m venv .venv # or python -m venv .venv
source .venv/bin/activate  # For Windows: .venv\Scripts\activate
pip install -r requirements.txt
flask run or python run.py

# Now visit <u>localhost:5173</u> in your brower to see the dev site
```



## Contributing

Feel free to open an issue or submit a pull request if you'd like to contribute to LumiFeed. All contributions are welcome!

## License

This project is licensed under the MIT License.

## Disclaimer

LumiFeed is intended for **personal and educational use only**. It fetches article headlines via RSS and uses `newspaper3k` to extract summary text _for your learning purposes_.
Please ensure any site’s Terms of Service permit this kind of access. Avoid publicly hosting full scraped content or using it in commercial applications.
