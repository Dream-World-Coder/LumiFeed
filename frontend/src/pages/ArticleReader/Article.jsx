import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  Moon,
  Sun,
  FileText,
  ChevronLeft,
  Type,
  Loader2,
  AlertCircle,
} from "lucide-react";
import AppLogo from "../../components/Logo";
import { useDarkMode } from "../../contexts/DarkModeContext";
import fontSizes from "./fontsSizes";
import fonts from "./fontFamilies";
import { formatDate } from "../../services/dateFormat";

const NewsArticle = () => {
  const [fontSize, setFontSize] = useState("base");
  const { isDark, toggleDarkMode } = useDarkMode();

  // Summary States
  const [showSummary, setShowSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  const [fontFamily, setFontFamily] = useState("easyRead");
  const [showFontMenu, setShowFontMenu] = useState(false);

  const location = useLocation();
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setArticleData(location.state);
    }
  }, [location.state]);

  // Effect: Fetch summary when drawer opens
  useEffect(() => {
    const fetchSummary = async () => {
      // Conditions: Drawer is open, no summary exists, not currently loading, and we have data
      if (showSummary && !aiSummary && !isGenerating && articleData) {
        setIsGenerating(true);
        setSummaryError(null);

        try {
          // 1. Clean the HTML content to plain text to save tokens/bandwidth
          const cleanText = articleData.articleContent
            ? articleData.articleContent.replace(/<[^>]+>/g, " ")
            : articleData.description;

          // 2. Make the request
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/article/summary`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                content: cleanText,
              }),
            },
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Failed to generate summary");
          }

          setAiSummary(data.summary);
        } catch (err) {
          console.error(err);
          setSummaryError(err.message || "Could not generate summary.");
        } finally {
          setIsGenerating(false);
        }
      }
    };

    fetchSummary();
  }, [showSummary, aiSummary, isGenerating, articleData]);

  if (!articleData) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-stone-900 text-stone-200" : "bg-cream-light"}`}
      >
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-stone-900 text-stone-200" : "bg-cream-light text-stone-800"
      }`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isDark
            ? "bg-stone-900 border-stone-700"
            : "bg-cream border-[#8B4513]/20"
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className={`mr-4 ${isDark ? "text-gray-100" : "text-[#8B4513]"} hover:opacity-80`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <NavLink to={"/"} className={`flex items-center`}>
                <AppLogo
                  width={26}
                  height={26}
                  backgroundColor="#8B4513"
                  letterColor="#FFFFFF"
                />
                <span className="ml-2 text-xl font-dahlia">LumiFeed</span>
              </NavLink>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSummary(!showSummary)}
                className={`p-2 rounded-md transition-colors ${
                  isDark
                    ? showSummary
                      ? "bg-stone-700"
                      : "hover:bg-gray-800"
                    : showSummary
                      ? "bg-[#8B4513]/20"
                      : "hover:bg-[#8B4513]/10"
                }`}
                title="Show Summary"
              >
                <FileText
                  className={`w-5 h-5 ${showSummary ? "fill-current" : ""}`}
                />
              </button>

              <div className="flex items-center space-x-2 border-l border-r px-4 mx-2">
                <button
                  onClick={() => setFontSize("sm")}
                  className={`font-serif ${fontSize === "sm" ? "font-bold" : ""}`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize("base")}
                  className={`font-serif ${fontSize === "base" ? "font-bold" : ""}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("lg")}
                  className={`font-serif ${fontSize === "lg" ? "font-bold" : ""}`}
                >
                  A+
                </button>
              </div>

              <div className="flex items-center justify-center gap-1">
                {/* Font Family Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowFontMenu(!showFontMenu)}
                    className={`p-1 rounded-md transition-colors ${
                      isDark ? "hover:bg-gray-800" : "hover:bg-[#8B4513]/10"
                    }`}
                    title="Change Font"
                  >
                    <Type className="w-5 h-5" />
                  </button>

                  {/* Font Menu Dropdown */}
                  {showFontMenu && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1
                                  ${isDark ? "bg-gray-800" : "bg-white"} ring-1 ring-black ring-opacity-5`}
                    >
                      {Object.entries(fonts).map(([key, font]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setFontFamily(key);
                            setShowFontMenu(false);
                          }}
                          className={`${font.class} block px-4 py-2 text-lg w-full text-left
                                                      ${
                                                        fontFamily === key
                                                          ? isDark
                                                            ? "bg-gray-700"
                                                            : "bg-[#8B4513]/10"
                                                          : ""
                                                      } hover:${isDark ? "bg-gray-700" : "bg-[#8B4513]/10"}`}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleDarkMode(!isDark)}
                  className={`p-1 rounded-md transition-colors ${
                    isDark ? "hover:bg-gray-800" : "hover:bg-[#8B4513]/10"
                  }`}
                  title="Toggle Dark Mode"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <article>
          {articleData.title && (
            <h1
              className={`font-serif font-bold ${fontSizes[fontSize].heading} mb-6`}
            >
              {articleData.title}
            </h1>
          )}

          {(articleData.date || articleData.author?.length > 0) && (
            <div className="flex items-center justify-between mt-2 mb-4 text-sm dark:text-neutral-400 text-neutral-700">
              {articleData.date && <span>{formatDate(articleData.date)}</span>}
              {articleData.author?.length > 0 && (
                <span className="">
                  By{" "}
                  <span className="font-serif italic">
                    {articleData.author[0]}
                  </span>
                </span>
              )}
            </div>
          )}

          {articleData.description && (
            <h2
              className={`font-sentient ${fontSizes[fontSize].subheading} mb-8 opacity-80`}
            >
              {articleData.description}
            </h2>
          )}

          {/* AI Summary Drawer */}
          {showSummary && (
            <div
              className={`mb-8 p-6 rounded-lg border transition-all duration-300 ${
                isDark
                  ? "bg-stone-800/50 border-stone-700"
                  : "bg-white/60 border-[#8B4513]/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 opacity-70" />
                <h3 className="font-sentient text-xl">AI Smart Summary</h3>
              </div>

              <div
                className={`${fonts[fontFamily].class} text-lg leading-relaxed`}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2 py-4 opacity-70">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing content with Groq AI...</span>
                  </div>
                ) : summaryError ? (
                  <div className="flex items-center gap-2 text-red-400 py-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>{summaryError}</span>
                  </div>
                ) : (
                  <div className="opacity-90 whitespace-pre-line">
                    {aiSummary}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Article Image */}
          {articleData.thumbnail && (
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden shadow-sm">
              <img
                src={articleData.thumbnail}
                alt={articleData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className={`${fonts[fontFamily].class} ${fontSizes[fontSize].content} space-y-6 [&>p]:mb-4`}
            dangerouslySetInnerHTML={{
              __html: articleData.articleContent,
            }}
          ></div>
        </article>
      </main>
    </div>
  );
};

export default NewsArticle;
