import { useState } from "react";
import {
    Plus,
    Trash2,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    ExternalLink,
} from "lucide-react";
import ProfileHeader from "../../components/Headers/ProfileHeader";
// import Footer from "../../components/Footers/Footer";
import { useDarkMode } from "../../contexts/DarkModeContext";

const ProfilePage = () => {
    const { isDark } = useDarkMode();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;

    // Sample data - replace with actual data
    const userData = {
        name: "John Doe",
        email: "john@example.com",
        profilePic: "https://picsum/100/100",
    };

    const collections = [
        {
            id: 1,
            name: "Technology News",
            articles: Array(25)
                .fill(null)
                .map((_, index) => ({
                    id: index + 1,
                    title: `Tech Article ${index + 1}`,
                    source: "BBC News",
                    date: "2024-03-15",
                    summary:
                        "This is a brief summary of the article content...",
                    url: "#",
                })),
        },
        {
            id: 2,
            name: "Sports Updates",
            articles: Array(15)
                .fill(null)
                .map((_, index) => ({
                    id: index + 100,
                    title: `Sports Article ${index + 1}`,
                    source: "ESPN",
                    date: "2024-03-13",
                    summary: "This is a brief summary of the sports article...",
                    url: "#",
                })),
        },
    ];

    const CollectionView = ({ collection }) => {
        const totalPages = Math.ceil(
            collection.articles.length / articlesPerPage,
        );
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const currentArticles = collection.articles.slice(startIndex, endIndex);

        return (
            <div
                className={`${isDark ? "bg-stone-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg shadow-xl border ${isDark ? "border-stone-700" : "border-[#8B4513]/20"}`}
            >
                {/* Collection Header */}
                <div
                    className={`p-4 border-b ${isDark ? "border-stone-700" : "border-[#8B4513]/10"} flex justify-between items-center`}
                >
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSelectedCollection(null)}
                            className={`${isDark ? "text-stone-200 hover:bg-stone-700" : "text-[#8B4513] hover:bg-[#8B4513]/10"} p-2 rounded-full transition-colors`}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div>
                            <h2
                                className={`font-zodiak text-2xl ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                            >
                                {collection.name}
                            </h2>
                            <p
                                className={`${isDark ? "text-stone-400" : "text-[#8B4513]/60"}`}
                            >
                                {collection.articles.length} articles
                            </p>
                        </div>
                    </div>
                    <button
                        className="text-red-600 hover:text-red-500 transition-colors"
                        title="Delete Collection"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                {/* Articles Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead
                            className={`${isDark ? "bg-stone-700/50" : "bg-[#8B4513]/10"}`}
                        >
                            <tr
                                className={`font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                            >
                                <th className="py-3 px-4 text-left">Article</th>
                                <th className="py-3 px-4 text-left">Source</th>
                                <th className="py-3 px-4 text-left">Date</th>
                                <th className="py-3 px-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className={`divide-y ${isDark ? "divide-stone-700" : "divide-[#8B4513]/10"}`}
                        >
                            {currentArticles.map((article) => (
                                <tr
                                    key={article.id}
                                    className={`${isDark ? "hover:bg-stone-700/30" : "hover:bg-[#8B4513]/5"}`}
                                >
                                    <td className="py-4 px-4">
                                        <h4
                                            className={`font-medium ${isDark ? "text-stone-200" : "text-[#8B4513]"} text-lg`}
                                        >
                                            {article.title}
                                        </h4>
                                        <p
                                            className={`text-sm ${isDark ? "text-stone-400" : "text-[#8B4513]/60"} mt-1`}
                                        >
                                            {article.summary}
                                        </p>
                                    </td>
                                    <td
                                        className={`py-4 px-4 ${isDark ? "text-stone-300" : "text-[#8B4513]/80"}`}
                                    >
                                        {article.source}
                                    </td>
                                    <td
                                        className={`py-4 px-4 ${isDark ? "text-stone-300" : "text-[#8B4513]/80"}`}
                                    >
                                        {article.date}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-center space-x-2">
                                            <button
                                                className={`${isDark ? "text-stone-200 hover:bg-stone-700" : "text-[#8B4513] hover:bg-[#8B4513]/10"} p-2 rounded-full transition-colors`}
                                                title="Read Article"
                                            >
                                                <BookOpen size={20} />
                                            </button>
                                            <a
                                                href={article.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`${isDark ? "text-stone-200 hover:bg-stone-700" : "text-[#8B4513] hover:bg-[#8B4513]/10"} p-2 rounded-full transition-colors`}
                                                title="Visit Original"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                            <button
                                                className={`text-red-600 ${isDark ? "hover:bg-stone-700" : "hover:bg-red-50"} p-2 rounded-full transition-colors`}
                                                title="Remove from Collection"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div
                        className={`border-t ${isDark ? "border-stone-700" : "border-[#8B4513]/10"} p-4 flex justify-between items-center`}
                    >
                        <p
                            className={`${isDark ? "text-stone-400" : "text-[#8B4513]/60"}`}
                        >
                            Showing {startIndex + 1}-
                            {Math.min(endIndex, collection.articles.length)} of{" "}
                            {collection.articles.length}
                        </p>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1),
                                    )
                                }
                                disabled={currentPage === 1}
                                className={`${isDark ? "text-stone-200 hover:bg-stone-700" : "text-[#8B4513] hover:bg-[#8B4513]/10"}
                                        p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span
                                className={`${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                            >
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages),
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className={`${isDark ? "text-stone-200 hover:bg-stone-700" : "text-[#8B4513] hover:bg-[#8B4513]/10"}
                                        p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ok, now generate an appropriate logo for my site, normal image or svg
    return (
        <div
            className={`min-h-screen ${isDark ? `bg-stone-900 text-stone-200` : `bg-cream`} font-sentient relative`}
        >
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64">
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full opacity-10"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#8B4513"
                            strokeWidth="0.5"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke="#8B4513"
                            strokeWidth="0.5"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="30"
                            fill="none"
                            stroke="#8B4513"
                            strokeWidth="0.5"
                        />
                    </svg>
                </div>
            </div>

            {/* Header */}
            <ProfileHeader />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 mt-[4rem]">
                {!selectedCollection ? (
                    <>
                        {/* Collections Header */}
                        <div className="flex justify-between items-center mb-8">
                            <h2
                                className={`text-3xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                            >
                                Your Collections
                            </h2>
                            <button
                                onClick={() => setShowNewCollectionModal(true)}
                                className={`${isDark ? "bg-stone-700 text-stone-200 hover:bg-stone-600" : "bg-[#8B4513] text-[#F2E8CF] hover:bg-[#8B4513]/90"}
                                px-4 py-2 rounded-md font-zodiak transition-all duration-300 flex items-center space-x-2`}
                            >
                                <Plus size={20} />
                                <span>New Collection</span>
                            </button>
                        </div>

                        {/* Collections Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {collections.map((collection) => (
                                <div
                                    key={collection.id}
                                    className={`${isDark ? "bg-stone-800/40 border-stone-700" : "bg-white/40 border-[#8B4513]/20"}
                                    backdrop-blur-md rounded-lg shadow-xl border overflow-hidden`}
                                >
                                    <div
                                        className={`p-4 border-b ${isDark ? "border-stone-700" : "border-[#8B4513]/10"} flex justify-between items-center`}
                                    >
                                        <h3
                                            className={`font-zodiak text-xl ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                                        >
                                            {collection.name}
                                        </h3>
                                        <button
                                            className="text-red-600 hover:text-red-700 transition-colors"
                                            title="Delete Collection"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <p
                                            className={`${isDark ? "text-stone-400" : "text-[#8B4513]/60"} mb-4`}
                                        >
                                            {collection.articles.length}{" "}
                                            articles
                                        </p>
                                        <div className="space-y-4">
                                            {collection.articles
                                                .slice(0, 3)
                                                .map((article) => (
                                                    <div
                                                        key={article.id}
                                                        className={`flex justify-between items-start space-x-4 pb-4 border-b ${
                                                            isDark
                                                                ? "border-stone-700"
                                                                : "border-[#8B4513]/10"
                                                        } last:border-0`}
                                                    >
                                                        <div className="flex-1">
                                                            <h4
                                                                className={`font-medium ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                                                            >
                                                                {article.title}
                                                            </h4>
                                                            <p
                                                                className={`text-sm ${isDark ? "text-stone-400" : "text-[#8B4513]/60"}`}
                                                            >
                                                                {article.source}{" "}
                                                                • {article.date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        {collection.articles.length > 3 && (
                                            <button
                                                onClick={() => {
                                                    setSelectedCollection(
                                                        collection,
                                                    );
                                                    setCurrentPage(1);
                                                }}
                                                className={`mt-4 ${
                                                    isDark
                                                        ? "text-stone-200 hover:text-stone-400"
                                                        : "text-[#8B4513] hover:text-[#8B4513]/80"
                                                } transition-colors text-sm`}
                                            >
                                                View all{" "}
                                                {collection.articles.length}{" "}
                                                articles →
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <CollectionView collection={selectedCollection} />
                )}
            </main>

            {/* New Collection Modal */}
            {showNewCollectionModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <h3 className="text-2xl font-zodiak text-[#8B4513] mb-4">
                            Create New Collection
                        </h3>
                        <input
                            type="text"
                            placeholder="Collection Name"
                            className="w-full bg-[#F2E8CF]/30 border border-[#8B4513]/20 rounded-md py-2 px-4
                            focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40
                            transition-all duration-300 outline-none mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowNewCollectionModal(false)}
                                className="px-4 py-2 text-[#8B4513] hover:bg-[#8B4513]/10 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-[#8B4513] text-[#F2E8CF] rounded-md
                              hover:bg-[#8B4513]/90 transition-colors"
                            >
                                Create Collection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
