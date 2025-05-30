import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Moon, Sun, FileText, ChevronLeft, Type } from "lucide-react";
import AppLogo from "../../components/Logo";
import { useDarkMode } from "../../contexts/DarkModeContext";
import fontSizes from "./fontsSizes";
import fonts from "./fontFamilies";
import { formatDate } from "../../services/dateFormat";

const NewsArticle = () => {
    const [fontSize, setFontSize] = useState("base");
    const { isDark, toggleDarkMode } = useDarkMode();
    const [showSummary, setShowSummary] = useState(false);
    const [fontFamily, setFontFamily] = useState("easyRead");
    const [showFontMenu, setShowFontMenu] = useState(false);

    const location = useLocation();
    // const navigate = useNavigate();
    const [articleData, setArticleData] = useState(null);

    useEffect(() => {
        if (location.state) {
            setArticleData(location.state);
        }
    }, [location.state]);

    if (!articleData) {
        return <div>Loading article...</div>;
    }

    // const { heading, subHeading, imgUrl, articleContent } = articleData;

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${
                isDark
                    ? "bg-stone-900 text-stone-200"
                    : "bg-cream-light text-stone-800"
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
                                <span className="ml-2 text-xl font-dahlia">
                                    LumiFeed
                                </span>
                            </NavLink>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowSummary(!showSummary)}
                                className={`p-2 rounded-md transition-colors ${
                                    isDark
                                        ? "hover:bg-gray-800"
                                        : "hover:bg-[#8B4513]/10"
                                }`}
                                title="Show Summary"
                            >
                                <FileText className="w-5 h-5" />
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
                                        onClick={() =>
                                            setShowFontMenu(!showFontMenu)
                                        }
                                        className={`p-1 rounded-md transition-colors ${
                                            isDark
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-[#8B4513]/10"
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
                                            {Object.entries(fonts).map(
                                                ([key, font]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => {
                                                            setFontFamily(key);
                                                            setShowFontMenu(
                                                                false,
                                                            );
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
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => toggleDarkMode(!isDark)}
                                    className={`p-1 rounded-md transition-colors ${
                                        isDark
                                            ? "hover:bg-gray-800"
                                            : "hover:bg-[#8B4513]/10"
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
                            {articleData.date && (
                                <span>{formatDate(articleData.date)}</span>
                            )}
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

                    {/* Summary Drawer */}
                    {showSummary && (
                        <div
                            className={`mb-8 p-6 rounded-lg transition-all duration-500 ${
                                isDark ? "bg-gray-800" : "bg-white/40"
                            }`}
                        >
                            <h3 className="font-sentient text-xl mb-4">
                                Article Summary
                            </h3>
                            <p
                                className={`${fonts[fontFamily].class} text-lg opacity-80`}
                            >
                                {articleData.description ||
                                    "Summary Unavilable"}
                            </p>
                        </div>
                    )}

                    {/* Article Image */}
                    {articleData.thumbnail && (
                        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                            <img
                                src={articleData.thumbnail}
                                alt={articleData.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <div
                        className={`${fonts[fontFamily].class} ${fontSizes[fontSize].content} space-y-6`}
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
