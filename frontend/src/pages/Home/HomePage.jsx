import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    Header,
    SelectNews,
    InfoContainer,
    NewsList,
    Footer,
} from "./components";
import { useDarkMode } from "../../contexts/DarkModeContext";

/*
/saved : /profile
*/
export default function LumiFeed() {
    const [numberOfNews, setNumberOfNews] = useState(25);
    const [selectedCategory, setSelectedCategory] = useState("Trending");
    const [selectedSource, setSelectedSource] = useState("The Indian Express");

    const [news, setNews] = useState(() => {
        const savedArticles = localStorage.getItem("newsArticles");
        return savedArticles ? JSON.parse(savedArticles) : [];
    });
    // const [searchResults, setSearchResults] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [articleLoading, setArticleLoading] = useState(false);
    const navigate = useNavigate();
    const { isDark } = useDarkMode();

    useEffect(() => {
        localStorage.setItem("newsArticles", JSON.stringify(news));
    }, [news]);

    const handleNewsFetch = () => {
        setIsLoading(true);
        let newsApiUrl =
            `http://127.0.0.1:8000/api/fetch/news?news_agency=${selectedSource.toLowerCase().replace(/\s+/g, "")}` +
            `&news_type=${selectedCategory.toLowerCase()}` +
            `&news_count=${numberOfNews}`;

        fetch(newsApiUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Some error occurred.");
                }
                return res.json();
            })
            .then((data) => {
                setNews(JSON.parse(data.news_list));
                // console.log(data.news_list);
            })
            .catch((e) => {
                console.error(e);
                if (e instanceof TypeError) {
                    toast.error("Server unreachable");
                } else {
                    toast.error(e.message);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleArticleClick = (url) => {
        setArticleLoading(true);
        const apiUrl = `http://127.0.0.1:8000/api/fetch/article?url=${encodeURIComponent(url)}`;

        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => {
                data = JSON.parse(data);

                // array of objects to a single object
                const articleData = data.reduce(
                    (acc, item) => ({ ...acc, ...item }),
                    {},
                );

                // Navigate to article page with data
                navigate("/article", {
                    state: articleData,
                });
            })
            .catch((e) => {
                console.error("Error fetching article:", e);
                toast.error(e.toString());
            })
            .finally(() => {
                setArticleLoading(false);
            });
    };

    return (
        <section
            className={`pt-16 ${isDark ? "bg-[#171717]" : "bg-[#fffcf5]"} __min-h-screen`}
        >
            <Header />

            {/* container */}
            <div className={`max-w-7xl mx-auto min-h-[calc(80vh)]`}>
                {articleLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <SelectNews
                    news={news}
                    setNews={setNews}
                    numberOfNews={numberOfNews}
                    setNumberOfNews={setNumberOfNews}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedSource={selectedSource}
                    setSelectedSource={setSelectedSource}
                    loading={loading}
                    handleNewsFetch={handleNewsFetch}
                />

                <div className="w-full flex gap-4">
                    <main className="w-full md:w-3/4">
                        {news?.length > 0 ? (
                            <NewsList
                                news={news}
                                handleArticleClick={handleArticleClick}
                                loading={loading}
                            />
                        ) : (
                            <InfoContainer />
                        )}
                    </main>

                    {/* right side : search for desktop */}
                    <aside className="hidden md:block w-1/4 __border border-neutral-200 rounded-lg">
                        {/* <SearchResultsDisplay searchResults={searchResults}/> */}
                    </aside>
                </div>
            </div>

            <Footer />
        </section>
    );
}
