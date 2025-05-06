import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Moon, Sun, FileText, ChevronLeft, Type } from "lucide-react";
import AppLogo from "../../components/Logo";
import { useDarkMode } from "../../contexts/DarkModeContext";
import fontSizes from "./fontsSizes";
import fonts from "./fontFamilies";

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

    const { heading, subHeading, imgUrl, articleContent } = articleData;

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
                            <AppLogo
                                width={26}
                                height={26}
                                backgroundColor="#8B4513"
                                letterColor="#FFFFFF"
                            />
                            <span className="ml-2 text-xl font-dahlia">
                                LumiFeed
                            </span>
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
                                    className={`font-[Cinzel] ${fontSize === "sm" ? "font-bold" : ""}`}
                                >
                                    A-
                                </button>
                                <button
                                    onClick={() => setFontSize("base")}
                                    className={`font-[Cinzel] ${fontSize === "base" ? "font-bold" : ""}`}
                                >
                                    A
                                </button>
                                <button
                                    onClick={() => setFontSize("lg")}
                                    className={`font-[Cinzel] ${fontSize === "lg" ? "font-bold" : ""}`}
                                >
                                    A+
                                </button>
                            </div>

                            {/* Font Family Selector */}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowFontMenu(!showFontMenu)
                                    }
                                    className={`p-2 rounded-md transition-colors ${
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
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => toggleDarkMode(!isDark)}
                                className={`p-2 rounded-md transition-colors ${
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
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
                <article>
                    <h1
                        className={`font-sentient font-bold ${fontSizes[fontSize].heading} mb-6`}
                    >
                        {heading}
                    </h1>

                    <h2
                        className={`font-sentient ${fontSizes[fontSize].subheading} mb-8 opacity-80`}
                    >
                        {subHeading}
                    </h2>

                    {/* Summary Drawer */}
                    {showSummary && (
                        <div
                            className={`mb-8 p-6 rounded-lg transition-all duration-500 ${
                                isDark ? "bg-gray-800" : "bg-white/40"
                            }`}
                        >
                            <h3 className="font-[Cinzel] text-xl mb-4">
                                Article Summary
                            </h3>
                            <p
                                className={`${fonts[fontFamily].class} text-lg opacity-80`}
                            >
                                {subHeading}
                            </p>
                        </div>
                    )}

                    {/* Article Image */}
                    <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                        <img
                            src={`${imgUrl}`}
                            alt={`${heading}`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Article Content */}
                    <div
                        className={`${fonts[fontFamily].class} ${fontSizes[fontSize].content} space-y-6`}
                        dangerouslySetInnerHTML={{ __html: articleContent }}
                    ></div>
                </article>
            </main>

            {/* jsx global */}
            <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;1,400&display=swap");
            `}</style>
        </div>
    );
};

export default NewsArticle;
