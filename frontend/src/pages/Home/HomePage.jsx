import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useDarkMode } from "../../contexts/DarkModeContext";

import Header from "../../components/Headers/HomeHeader";
import Footer from "../../components/Footers/HomeFooter";
import { SelectNews, InfoContainer, NewsList } from "./components";

/*
/saved : /profile
in case of env in vite always have to add VITE_ prefix to every variable
*/
export default function LumiFeed() {
    const [selectedSource, setSelectedSource] = useState("The Indian Express");
    const [selectedCategory, setSelectedCategory] = useState("Top");
    const [selectedSubCategory, setSelectedSubCategory] = useState("kolkata");
    const [numberOfNews, setNumberOfNews] = useState(25);

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
        let category = null;
        selectedCategory === "City Wise"
            ? (category = "city")
            : (category = selectedCategory);
        let newsApiUrl =
            `${import.meta.env.VITE_BACKEND_URL}/fetch/news` +
            `?news_agency=${selectedSource.toLowerCase().replace(/\s+/g, "")}` +
            `&news_type=${category.toLowerCase()}` +
            `&name_of_city=${selectedSubCategory.toLowerCase()}` +
            `&news_count=${numberOfNews}`;

        fetch(newsApiUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Some error occurred.");
                }
                return res.json();
            })
            .then((data) => {
                // console.log(data);
                setNews(JSON.parse(data.news_list));
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
        const apiUrl =
            `${import.meta.env.VITE_BACKEND_URL}/fetch/article` +
            `?url=${encodeURIComponent(url)}`;

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
                navigate("/article-reader", {
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
            // style={{
            //     background:
            //         "radial-gradient(35.36% 35.36% at 100% 25%,transparent 66%,#fff 68% 70%,transparent 72%) 80px 80px/160px 160px,radial-gradient(35.36% 35.36% at 0 75%,transparent 66%,#fff 68% 70%,transparent 72%) 80px 80px/160px 160px,radial-gradient(35.36% 35.36% at 100% 25%,transparent 66%,#fff 68% 70%,transparent 72%) 0 0/160px 160px,radial-gradient(35.36% 35.36% at 0 75%,transparent 66%,#fff 68% 70%,transparent 72%) 0 0/160px 160px,repeating-conic-gradient(#f4f4f4 0 25%,transparent 0 50%) 0 0/160px 160px,radial-gradient(transparent 66%,#fff 68% 70%,transparent 72%) 0 40px/80px 80px #f4f4f4",
            // }}
        >
            <Header exclude={["/contact", "/about"]} />

            {/* container */}
            <div
                className={`max-w-7xl px-4 md:px-0 mx-auto min-h-[calc(80vh)]`}
            >
                {articleLoading && (
                    <div className="fixed top-0 left-0 h-screen w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                    selectedSubCategory={selectedSubCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
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
