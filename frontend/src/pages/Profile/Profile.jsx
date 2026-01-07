import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import PropTypes from "prop-types";
import { toast } from "sonner";

import Header from "../../components/Headers/HomeHeader";
import Footer from "../../components/Footers/HomeFooter";
import { useAuth } from "../../contexts/AuthContext";
import { useCollections, useArticles, useSearch } from "../../hooks/useDB";
import { useDarkMode } from "../../contexts/DarkModeContext";
import DecorativeElm, {
  Article,
  ArticleRow,
  NewCollectionModal,
} from "./components";

/**
 *
 * collection +, - ~~> done
 * article - ~~> Halfway done, bugfix needed
 * diff Collection choise when saving ~~> done
 * acc Delete ~~> 50% done
 * search ~~>
 *
 */

const ProfilePage = () => {
  const { isDark } = useDarkMode();

  const { currentUser, deleteAllData } = useAuth();
  const {
    collections,
    setCollections,
    loading: collectionsLoading,
    error: collectionsError,
    deleteCollection,
  } = useCollections();

  const [selectedCollection, setSelectedCollection] = useState(null);
  // const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);

  const {
    loadArticles,
    loading: articlesLoading,
    error: articlesError,
  } = useArticles();

  const [collectionsWithArticles, setCollectionsWithArticles] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      const updated = await Promise.all(
        collections.map(async (collection) => {
          const res = await loadArticles(collection.id);
          const articles = res?.success ? res.articlesData : [];
          return { ...collection, articles };
        }),
      );

      setCollectionsWithArticles(updated);
    };

    if (collections.length > 0) {
      loadAll();
    }
  }, [collections, loadArticles]);

  /**
   *
   * CollectionView Component
   *
   */
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  const CollectionView = ({ collection }) => {
    const totalPages = Math.ceil(
      collection?.articles?.length / articlesPerPage,
    );
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const currentArticles = collection?.articles?.slice(startIndex, endIndex);

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
                {collection?.name}
              </h2>
              <p
                className={`${isDark ? "text-stone-400" : "text-[#8B4513]/60"}`}
              >
                {collection?.articles?.length} articles
              </p>
            </div>
          </div>

          {collection?.name?.toLowerCase() !== "read later" &&
            collection?.name?.toLowerCase() !== "liked articles" && (
              <button
                className="text-red-600 hover:text-red-500 transition-colors"
                title="Delete Collection"
                onClick={async () => {
                  const confirm = window.confirm("Are you sure? Its permanent");
                  if (confirm) {
                    const res = await deleteCollection(collection.id);
                    if (res.success) {
                      toast.success("Collection deleted successfully");
                      setCollections((prev) =>
                        prev.filter((c) => c.id != collection.id),
                      );
                    } else {
                      toast.error(
                        `Collection Deletion Error: ${collectionsError.toString()}`,
                      );
                    }
                  }
                }}
              >
                <Trash2 size={20} />
              </button>
            )}
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
                <th className="py-3 px-4 text-left hidden md:block">Index</th>
                <th className="py-3 px-4 text-left">Article</th>
                <th className="py-3 px-4 text-left hidden md:block">Date</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDark ? "divide-stone-700" : "divide-[#8B4513]/10"}`}
            >
              {articlesLoading ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : (
                currentArticles.map((article, idx) => (
                  <ArticleRow
                    key={article?.id || idx}
                    article={article}
                    index={startIndex + idx}
                    isDark={isDark}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className={`border-t ${isDark ? "border-stone-700" : "border-[#8B4513]/10"} p-4 flex justify-between items-center`}
          >
            <p className={`${isDark ? "text-stone-400" : "text-[#8B4513]/60"}`}>
              Showing {startIndex + 1}-
              {Math.min(endIndex, collection?.articles?.length)} of{" "}
              {collection?.articles?.length}
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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
  CollectionView.propTypes = {
    collection: PropTypes.object,
  };

  return (
    <>
      <Header />

      <div
        className={`min-h-[80dvh] ${isDark ? `bg-stone-900 text-stone-200` : `bg-cream`} font-sentient relative pb-16`}
      >
        <DecorativeElm />

        <main className="container mx-auto px-4 py-8 mt-14">
          {!selectedCollection ? (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2
                  className={`text-3xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                >
                  Your Collections
                </h2>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setShowNewCollectionModal(true)}
                    className={`${isDark ? "bg-stone-700 text-stone-200 hover:bg-stone-600" : "bg-[#8B4513] text-[#F2E8CF] hover:bg-[#8B4513]/90"}
                                px-4 py-2 rounded-md font-zodiak transition-all duration-300 flex items-center space-x-2`}
                  >
                    <Plus size={20} />
                    <span>New Collection</span>
                  </button>

                  <button
                    onClick={() => {}}
                    className={`bg-[#8B4513] text-[#F2E8CF] p-3 rounded-full transition-all duration-300 flex items-center`}
                  >
                    <Settings size={20} />
                  </button>
                </div>
              </div>
              {/* end Header */}

              {/* Collections Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collectionsLoading ? (
                  <div className="text-xl text-center p-5">Loading...</div>
                ) : (
                  collectionsWithArticles.map((collection) => (
                    <div
                      key={collection?.id}
                      className={`${isDark ? "bg-stone-800/40 border-stone-700" : "bg-white/40 border-[#8B4513]/20"}
                                    backdrop-blur-md rounded-lg shadow-xl border overflow-hidden`}
                    >
                      <div
                        className={`p-4 border-b ${isDark ? "border-stone-700" : "border-[#8B4513]/10"} flex justify-between items-center`}
                      >
                        <h3
                          className={`font-zodiak text-xl ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                        >
                          {collection?.name}
                        </h3>
                        {collection?.name?.toLowerCase() !== "read later" &&
                          collection?.name?.toLowerCase() !==
                            "liked articles" && (
                            <button
                              className="text-red-600 hover:text-red-700 transition-colors"
                              title="Delete Collection"
                              onClick={async () => {
                                const confirm = window.confirm(
                                  "Are you sure? Its permanent",
                                );
                                if (confirm) {
                                  const res = await deleteCollection(
                                    collection.id,
                                  );
                                  if (res.success) {
                                    toast.success(
                                      "Collection deleted successfully",
                                    );
                                    setCollections((prev) =>
                                      prev.filter((c) => c.id != collection.id),
                                    );
                                  } else {
                                    toast.error(
                                      `Collection Deletion Error: ${collectionsError.toString()}`,
                                    );
                                  }
                                }
                              }}
                            >
                              <Trash2 size={20} />
                            </button>
                          )}
                      </div>
                      <div className="p-4">
                        <p
                          className={`${isDark ? "text-stone-400" : "text-[#8B4513]/60"} mb-4`}
                        >
                          {collection?.articles?.length} articles
                        </p>
                        <div className="space-y-4">
                          {collection?.articles?.slice(0, 3).map((article) => (
                            <Article
                              key={article.id}
                              article={article}
                              isDark={isDark}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setSelectedCollection(collection);
                            setCurrentPage(1);
                          }}
                          className={`mt-4 ${
                            isDark
                              ? "text-stone-200 hover:text-stone-400"
                              : "text-[#8B4513] hover:text-[#8B4513]/80"
                          } transition-colors text-sm`}
                        >
                          View all {collection?.articles?.length} articles →
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <CollectionView collection={selectedCollection} />
          )}
        </main>

        {/* new Collection modal */}
        {showNewCollectionModal && (
          <NewCollectionModal
            setShowNewCollectionModal={setShowNewCollectionModal}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
