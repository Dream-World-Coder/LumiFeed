import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Plus,
  Minus,
  ExternalLink,
  Clock,
  Bookmark,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import { formatDate } from "../../services/dateFormat";
import rssLinks from "../../assets/data/rss-links.json";
import { useAuth } from "../../contexts/AuthContext";
import { useCollections, useArticles, useSearch } from "../../hooks/useDB";

export function useSelectNews() {
  // make a context and store them there so it stays:
  const [selectedSource, setSelectedSource] = useState("The Indian Express");
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Top News");
  const [numberOfNews, setNumberOfNews] = useState(25);
  // ----

  const [news, setNews] = useState(() => {
    const savedArticles = localStorage.getItem("newsArticles");
    return savedArticles ? JSON.parse(savedArticles) : [];
  });
  const [newsLoading, setIsNewsLoading] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState("auto");

  const contentRef = useRef(null);
  const dropdownRef = useRef(null);

  const newsSources = Object.keys(rssLinks);
  const categories = selectedSource
    ? Object.keys(rssLinks[selectedSource])
    : [];

  const subCategoriesObj = rssLinks[selectedSource]?.[selectedCategory] ?? {};
  const subCategories = Object.keys(subCategoriesObj);

  const handleNewsFetch = async () => {
    setIsNewsLoading(true);
    let newsApiUrl =
      `${import.meta.env.VITE_BACKEND_URL}/fetch/news` +
      `?source=${selectedSource.toLowerCase().replace(/\s+/g, "-")}` +
      `&category=${selectedCategory.toLowerCase().replace(/\s+/g, "-")}` +
      `&subcategory=${selectedSubCategory.toLowerCase().replace(/\s+/g, "-")}` +
      `&rssLink=${
        subCategoriesObj?.[selectedSubCategory]
          ?.replace("https://", "_https_")
          .replace("http://", "_http_")
          .replace(/\//g, "--") || ""
      }` +
      `&number=${numberOfNews}`;

    try {
      const res = await fetch(newsApiUrl);
      const data = await res.json();

      if (data.success) {
        setNews(JSON.parse(data.news_list));
      } else {
        console.error(data.error);
        toast.error(data.error);
      }
    } catch (e) {
      console.error(e);
      if (e instanceof TypeError) {
        toast.error("Server unreachable");
      } else {
        toast.error(e.message);
      }
    } finally {
      setIsNewsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("newsArticles", JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    // Handle click outside dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSourceOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      if (isCategoryOpen) {
        setContentHeight(`auto`);
      } else {
        setContentHeight("0px");
      }
    }
  }, [isCategoryOpen, selectedSource, selectedCategory]);

  function SelectNews() {
    return (
      <div className="flex flex-col md:flex-row gap-4 w-full py-4 mb-12">
        {/* News Category Selector */}
        <div className="w-full md:w-3/4 border border-[#D8D2C2] dark:border-[#333] rounded-lg overflow-hidden bg-transparent">
          <div
            className="flex justify-between items-center px-4 py-2 cursor-pointer"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <h2 className="text-2xl md:text-4xl text-black dark:text-white font-serif font-semibold">
              Select News Category
            </h2>
            <button className="h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300">
              {isCategoryOpen ? <Minus size={24} /> : <Plus size={24} />}
            </button>
          </div>

          <div
            ref={contentRef}
            style={{
              height: contentHeight,
              opacity: isCategoryOpen ? 1 : 0,
            }}
            className="overflow-hidden transition-all duration-300 ease-in-out"
          >
            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.length > 0 &&
                  categories.map((category) => (
                    <button
                      key={category}
                      className={`${
                        selectedCategory === category
                          ? "bg-[#B17457] hover:bg-[#B17457] text-white dark:bg-[#333]"
                          : "bg-[#D8D2C2] hover:bg-[#C8C2B2] dark:bg-[#222] dark:hover:bg-[#252525]"
                      }
                                            py-3 px-4 rounded text-center transition-colors font-poppins text-sm capitalize`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
              </div>

              {subCategories.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-xl font-serif mt-2 mb-4">
                    Select a subcategory
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {subCategories.map((subCategory) => (
                      <button
                        key={subCategory}
                        onClick={() => setSelectedSubCategory(subCategory)}
                        className={`${
                          selectedSubCategory === subCategory
                            ? "bg-[#B17457] hover:bg-[#B17457] text-white dark:bg-[#333]"
                            : "bg-[#D8D2C2] hover:bg-[#C8C2B2] dark:bg-[#222] dark:hover:bg-[#252525]"
                        }
                                                py-3 px-4 rounded text-center transition-colors font-poppins text-sm capitalize`}
                      >
                        {subCategory}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="whitespace-nowrap font-poppins">
                  Enter Number of News to Fetch:
                </span>
                <div className="flex items-center justify-between w-full">
                  <input
                    type="number"
                    value={numberOfNews}
                    min={1}
                    max={256}
                    onChange={(e) =>
                      setNumberOfNews(parseInt(e.target.value) || 0)
                    }
                    className="w-32 px-4 py-2 border border-[#D8D2C2] dark:border-[#333] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D8D2C2] dark:focus:ring-[#333] transition-all dark:bg-[#171717]"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleNewsFetch}
                      className="px-4 py-2 bg-[#D25769] dark:bg-rose-600 hover:bg-[#B24759] text-white rounded-full transition-colors text-sm font-poppins"
                      disabled={newsLoading}
                    >
                      {newsLoading ? "Fetching..." : "Fetch"}
                    </button>
                    {/* <button className="px-4 py-2 bg-[#D25769] dark:bg-rose-600 hover:bg-[#B24759] text-white rounded-full transition-colors text-sm font-poppins">
                        Reset
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Source Selector */}
        <div
          className="w-full md:w-1/4 relative font-poppins"
          ref={dropdownRef}
        >
          <div
            className="w-full px-4 py-2 md:px-4 md:py-4 bg-[#F8F2E2] dark:text-neutral-400 dark:bg-[#171717] border border-[#D8D2C2] dark:border-[#333] rounded-lg flex justify-between items-center cursor-pointer shadow-sm"
            onClick={() => setIsSourceOpen(!isSourceOpen)}
          >
            <span className="font-medium">{selectedSource}</span>
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${isSourceOpen ? "rotate-180" : ""}`}
            />
          </div>

          {isSourceOpen && (
            <div className="absolute z-10 mt-2 px-4 pb-4 w-full bg-[#F8F2E2] dark:bg-[#000] border border-[#D8D2C2] dark:border-[#222] rounded-lg shadow-lg overflow-hidden transition-all duration-300 opacity-100 scale-100 origin-top">
              <div className="p-2 text-gray-400 border-b border-[#D8D2C2] dark:border-[#171717]">
                --select--
              </div>
              {newsSources.map((source) => (
                <div
                  key={source}
                  className={`p-2 cursor-pointer hover:bg-[#d8d2c2] dark:hover:bg-[#171717] flex items-center transition-colors ${selectedSource === source ? "text-black dark:text-white" : "text-neutral-700 dark:text-gray-300"}`}
                  onClick={() => {
                    setSelectedSource(source);
                    setIsSourceOpen(false);
                  }}
                >
                  {selectedSource === source && <span className="mr-2">✓</span>}
                  {source}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return { SelectNews, news, newsLoading };
}

export function useNewsList({ news: articles, newsLoading }) {
  const skeletonItems = Array(4).fill(0);
  const navigate = useNavigate();
  const [articleLoading, setArticleLoading] = useState(false);

  const { currentUser } = useAuth();
  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
    createCollection,
  } = useCollections();

  const {
    loading: articlesLoading,
    error: articlesError,
    addArticle,
    removeArticle,
  } = useArticles();

  function NewsList() {
    const handleArticleClick = (url, description, date) => {
      setArticleLoading(true);
      const apiUrl =
        `${import.meta.env.VITE_BACKEND_URL}/fetch/article` +
        `?url=${encodeURIComponent(url)}`;
      /*
        or use:
        .replace("https://", "_https_")
        .replace("http://", "_http_")
        .replace(/\//g, "--")
      */

      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          const articleData = JSON.parse(data);

          // if description +nt then just use that
          if (description) articleData.description = description;
          if (date) articleData.date = date;

          navigate("/article-reader", {
            state: articleData,
          });
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
          setArticleLoading(false);
        });
    };

    return (
      <div className="space-y-4">
        {newsLoading &&
          skeletonItems.map((_, index) => (
            <div key={index} className="rounded-lg border p-2 z-10">
              <Skeleton className="h-6 w-3/4 mb-1" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-24" />
                <div className="flex gap-6 items-center justify-center">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        {!newsLoading &&
          articles.map((article, index) => (
            <article
              key={index}
              className="rounded-lg border p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-start gap-4 mb-2">
                {article.thumbnail && (
                  <div className="overflow-hidden aspect-video md:min-w-40 md:max-w-40 rounded">
                    <img src={article.thumbnail} alt="" />
                  </div>
                )}

                <div className="">
                  <h3
                    className={`${article.description ? `text-xl font-serif font-semibold` : `text-lg font-serif`}
                                        leading-tight mb-3 md:mb-2 dark:text-gray-50`}
                  >
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-sm mb-4 leading-tight dark:text-gray-400">
                      {article.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center">
                <div className="flex gap-8 mb-4 md:mb-0 items-center justify-between md:justify-center">
                  {article.date && (
                    <div className="text-xs dark:text-gray-400">
                      {formatDate(article.date)}
                    </div>
                  )}

                  {currentUser && (
                    <div className="flex items-center gap-1">
                      <Clock
                        size={16}
                        className="cursor-pointer text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200
                        dark:hover:bg-[#000] transition-colors rounded-lg box-content p-1"
                        onClick={async () => {
                          // console.log("collections", collections);
                          const collId = collections?.find(
                            (col) => col.name === "Read Later",
                          )?.id;
                          if (!collId) {
                            toast.error("Some error occurred");
                            console.log("collection Id not found");
                            return;
                          }

                          const res = await addArticle(article, collId);
                          if (res.success) {
                            toast.success("Article saved in Read Later");
                          } else {
                            console.log(res.error);
                            toast.error(res.error);
                          }
                        }}
                      />
                      <Bookmark
                        size={16}
                        className="cursor-pointer text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200
                        dark:hover:bg-[#000] transition-colors rounded-lg box-content p-1"
                        onClick={async () => {
                          toast("will be added later");
                        }}
                      />
                    </div>
                  )}

                  {article.url && (
                    <a
                      href={article.url}
                      target="_blank"
                      className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-700 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                {article.url && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleArticleClick(
                        // e.target.dataset.url,
                        article.url,
                        article.description || null,
                        article.date || null,
                      );
                    }}
                    className="px-4 py-1 text-sm rounded-lg transition-colors bg-[#D8D2C2] dark:bg-[#000] hover:bg-[#C8C2B2]"
                  >
                    Read Here
                  </button>
                )}
              </div>
            </article>
          ))}
      </div>
    );
  }

  return { NewsList, articleLoading };
}
