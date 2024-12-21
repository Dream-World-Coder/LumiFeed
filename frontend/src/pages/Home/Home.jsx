import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useDarkMode } from "../../contexts/DarkModeContext";
import {
    Plus,
    Minus,
    BookOpen,
    Save,
    ChevronUp,
    ChevronDown,
    Bookmark,
    Clock,
    ExternalLink,
    Flame,
    Library,
} from "lucide-react";

const newsAgencies = [
    "The Indian Express",
    "BBC News",
    "CNN",
    "The New York Times",
    "The Guardian",
    "The Washington Post",
    "Al Jazeera",
    "The Times of India",
    "NDTV",
    "Hindustan Times",
];

const newsCategories = [
    "Trending",
    "India",
    "City Wise",
    "Science",
    "Technology",
    "Business",
    "Health",
    "Cricket",
    "Sports",
    "Politics",
    "Lifestyle",
    "Entertainment",
];

const HomePage = () => {
    const { isDark } = useDarkMode();
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newsCount, setNewsCount] = useState(25);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAgencyDropdown, setShowAgencyDropdown] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState("The Indian Express");

    const handleFetch = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setArticles([
                {
                    title: "Sample Article 1",
                    summary: "Lorem ipsum dolor sit amet...",
                },
                {
                    title: "Sample Article 2",
                    summary: "Consectetur adipiscing elit...",
                },
            ]);
        }, 500);
    };

    return (
        <div
            className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-[#F2E8CF]"} p-4 font-[Cormorant] transition-colors duration-300`}
        >
            {/* Header */}
            <Header />

            <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mt-[4rem]">
                {/* Left Panel */}
                <div className="w-full md:w-96">
                    {/* Category Selection */}
                    <div
                        className={`${isDark ? "bg-gray-800/40 border-gray-700" : "bg-white/40 border-[#8B4513]/20"} backdrop-blur-md rounded-lg border overflow-hidden mb-6`}
                    >
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`w-full px-6 py-4 flex items-center justify-between text-xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"}`}
                        >
                            <span>Select News Category</span>
                            {isExpanded ? (
                                <Minus size={20} />
                            ) : (
                                <Plus size={20} />
                            )}
                        </button>

                        {isExpanded && (
                            <div
                                className={`p-6 border-t ${isDark ? "border-gray-700" : "border-[#8B4513]/20"}`}
                            >
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {newsCategories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() =>
                                                setSelectedCategory(category)
                                            }
                                            className={`p-3 rounded-md text-center transition-colors
                                                            ${
                                                                selectedCategory ===
                                                                category
                                                                    ? isDark
                                                                        ? "bg-gray-700 text-gray-200"
                                                                        : "bg-[#8B4513] text-[#F2E8CF]"
                                                                    : isDark
                                                                      ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                                                                      : "bg-[#8B4513]/10 text-[#8B4513] hover:bg-[#8B4513]/20"
                                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <label
                                        className={
                                            isDark
                                                ? "text-gray-200"
                                                : "text-[#8B4513]"
                                        }
                                    >
                                        Enter Number of News to Fetch:
                                    </label>
                                    <input
                                        type="number"
                                        value={newsCount}
                                        onChange={(e) =>
                                            setNewsCount(e.target.value)
                                        }
                                        className={`w-20 p-2 border rounded-md ${
                                            isDark
                                                ? "bg-gray-800 border-gray-700 text-gray-200"
                                                : "bg-white/50 border-[#8B4513]/20"
                                        }`}
                                    />
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={handleFetch}
                                        disabled={isLoading}
                                        className={`flex-1 py-2 rounded-md transition-colors disabled:opacity-50 ${
                                            isDark
                                                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                                : "bg-[#8B4513] text-[#F2E8CF] hover:bg-[#8B4513]/90"
                                        }`}
                                    >
                                        {isLoading ? "Fetching..." : "Fetch"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory("");
                                            setNewsCount(25);
                                        }}
                                        className={`flex-1 border py-2 rounded-md transition-colors ${
                                            isDark
                                                ? "border-gray-700 text-gray-200 hover:bg-gray-800"
                                                : "border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513]/10"
                                        }`}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* News Agency Selection */}
                    <div className="w-full md:w-96 mb-6">
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setShowAgencyDropdown(!showAgencyDropdown)
                                }
                                className={`w-full ${
                                    isDark
                                        ? "bg-gray-800/40 border-gray-700"
                                        : "bg-white/40 border-[#8B4513]/20"
                                } backdrop-blur-md rounded-lg border px-6 py-4 flex items-center justify-between ${
                                    isDark ? "text-gray-200" : "text-[#8B4513]"
                                }`}
                            >
                                <span className="font-[Cinzel]">
                                    {selectedAgency}
                                </span>
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform ${showAgencyDropdown ? "rotate-180" : ""}`}
                                />
                            </button>

                            {showAgencyDropdown && (
                                <div
                                    className={`absolute top-full left-0 right-0 mt-2 ${
                                        isDark
                                            ? "bg-gray-800/90 border-gray-700"
                                            : "bg-white/90 border-[#8B4513]/20"
                                    } backdrop-blur-md border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto`}
                                >
                                    {newsAgencies.map((agency) => (
                                        <button
                                            key={agency}
                                            onClick={() => {
                                                setSelectedAgency(agency);
                                                setShowAgencyDropdown(false);
                                            }}
                                            className={`w-full px-6 py-3 text-left transition-colors ${
                                                isDark
                                                    ? "hover:bg-gray-700 text-gray-200"
                                                    : "hover:bg-[#8B4513]/10 text-[#8B4513]"
                                            } ${
                                                agency === selectedAgency
                                                    ? isDark
                                                        ? "bg-gray-700"
                                                        : "bg-[#8B4513]/5"
                                                    : ""
                                            } font-semibold`}
                                        >
                                            {agency}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div
                        className={`${
                            isDark
                                ? "bg-gray-800/40 border-gray-700"
                                : "bg-white/40 border-[#8B4513]/20"
                        } backdrop-blur-md rounded-lg border p-3 md:p-6`}
                    >
                        <h2
                            className={`text-xl font-[Cinzel] ${
                                isDark ? "text-gray-200" : "text-[#8B4513]"
                            } mb-4`}
                        >
                            Quick Stats
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                {
                                    icon: BookOpen,
                                    label: "Articles Read",
                                    value: "24",
                                },
                                {
                                    icon: Save,
                                    label: "Saved Articles",
                                    value: "12",
                                },
                                {
                                    icon: Library,
                                    label: "Total Collections",
                                    value: "4",
                                },
                                {
                                    icon: Flame,
                                    label: "Remaining Summary Credits",
                                    value: "9",
                                },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className={`p-4 ${
                                        isDark
                                            ? "bg-gray-700/50 border-gray-600"
                                            : "bg-white/50 border-[#8B4513]/20"
                                    } rounded-lg border`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <stat.icon
                                            size={20}
                                            className={
                                                isDark
                                                    ? "text-gray-200"
                                                    : "text-[#8B4513]"
                                            }
                                        />
                                        <span
                                            className={`text-2xl ${
                                                isDark
                                                    ? "text-gray-200"
                                                    : "text-[#8B4513]"
                                            }`}
                                        >
                                            {stat.value}
                                        </span>
                                    </div>
                                    <p
                                        className={
                                            isDark
                                                ? "text-gray-400"
                                                : "text-[#8B4513]/80"
                                        }
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Articles */}
                <div className="flex-1">
                    <div
                        className={`${
                            isDark
                                ? "bg-gray-800/40 border-gray-700"
                                : "bg-white/40 border-[#8B4513]/20"
                        } backdrop-blur-md rounded-lg border p-3 md:p-6`}
                    >
                        {articles.length === 0 ? (
                            <div className="text-center py-12">
                                <BookOpen
                                    size={48}
                                    className={`mx-auto ${
                                        isDark
                                            ? "text-gray-600"
                                            : "text-[#8B4513]/40"
                                    } mb-4`}
                                />
                                <p
                                    className={`text-xl font-[Cinzel] ${
                                        isDark
                                            ? "text-gray-400"
                                            : "text-[#8B4513]/60"
                                    }`}
                                >
                                    Select a category and fetch news to start
                                    reading
                                </p>
                                <p
                                    className={`mt-2 italic ${
                                        isDark
                                            ? "text-gray-400"
                                            : "text-[#8B4513]/60"
                                    }`}
                                >
                                    "Knowledge awaits your curiosity"
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {articles.map((article, index) => (
                                    <article
                                        key={index}
                                        className={`${
                                            isDark
                                                ? "bg-gray-700/50 border-gray-600"
                                                : "bg-white/50 border-[#8B4513]/20"
                                        } rounded-lg border p-6 hover:shadow-lg transition-shadow`}
                                    >
                                        <h3
                                            className={`text-xl font-[Cinzel] ${
                                                isDark
                                                    ? "text-gray-200"
                                                    : "text-[#8B4513]"
                                            } mb-2`}
                                        >
                                            {article.title}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <button
                                                className={`px-4 py-1 rounded-md transition-colors ${
                                                    isDark
                                                        ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                                                        : "bg-[#8B4513] text-[#F2E8CF] hover:bg-[#8B4513]/90"
                                                }`}
                                            >
                                                Read Here
                                            </button>
                                            <div className="flex gap-6 items-center justify-center">
                                                <button
                                                    className={`${
                                                        isDark
                                                            ? "text-gray-200 hover:text-gray-400"
                                                            : "text-[#8B4513] hover:text-[#8B4513]/50"
                                                    } transition-colors`}
                                                >
                                                    <ExternalLink size={16} />
                                                </button>
                                                <div className="flex items-center gap-2">
                                                    {[Clock, Bookmark].map(
                                                        (Icon, i) => (
                                                            <Icon
                                                                key={i}
                                                                size={16}
                                                                className={`cursor-pointer ${
                                                                    isDark
                                                                        ? "text-gray-200 hover:bg-gray-600"
                                                                        : "text-[#8B4513] hover:bg-[#8B4513]/20"
                                                                } transition-colors rounded-lg box-content p-1`}
                                                            />
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Scroll to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-6 right-6 p-3 bg-[#8B4513] text-[#F2E8CF] rounded-full shadow-lg hover:bg-[#8B4513]/90 transition-colors"
            >
                <ChevronUp size={24} />
            </button>

            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");
            `}</style>
        </div>
    );
};

export default HomePage;
