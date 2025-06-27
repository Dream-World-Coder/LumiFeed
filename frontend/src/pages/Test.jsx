// src/components/ExampleUsage.jsx
import { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  BookOpen,
  Download,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  useCollections,
  useArticles,
  useSearch,
  useDatabase,
} from "../hooks/useDB";

const ExampleUsage = () => {
  const { currentUser, deleteAllData } = useAuth();
  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
    createCollection,
    deleteCollection,
  } = useCollections();

  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
    addArticle,
    removeArticle,
  } = useArticles(selectedCollectionId);

  const {
    searchResults,
    loading: searchLoading,
    query,
    searchArticles,
    clearSearch,
  } = useSearch();

  const { stats, exportData, deleteAllData: deleteAllDbData } = useDatabase();

  // Form states
  const [newCollectionName, setNewCollectionName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newArticle, setNewArticle] = useState({
    title: "",
    url: "",
    description: "",
    thumbnail: "",
  });

  // Handle creating collection
  const handleCreateCollection = async (e) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    const result = await createCollection(newCollectionName.trim());
    if (result.success) {
      setNewCollectionName("");
    }
  };

  // Handle adding article
  const handleAddArticle = async (e) => {
    e.preventDefault();
    if (!selectedCollectionId || !newArticle.url) return;

    const result = await addArticle({
      ...newArticle,
      date: new Date(),
    });

    if (result.success) {
      setNewArticle({
        title: "",
        url: "",
        description: "",
        thumbnail: "",
      });
    }
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    await searchArticles(searchQuery.trim());
  };

  // Handle export data
  const handleExportData = async () => {
    const result = await exportData();
    if (result.success) {
      const dataStr = JSON.stringify(result.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `lumifeed-backup-${new Date().toISOString().split("T")[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // Handle delete all data
  const handleDeleteAllData = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete ALL data? This cannot be undone!",
      )
    ) {
      await deleteAllDbData();
      await deleteAllData();
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Please register to use the app</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {currentUser.fullName}
            </h1>
            <p className="text-gray-600">@{currentUser.username}</p>
          </div>
          {currentUser.profilePicture && (
            <img
              src={currentUser.profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-3 rounded">
            <div className="text-2xl font-bold text-blue-600">
              {stats.collections}
            </div>
            <div className="text-sm text-blue-600">Collections</div>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <div className="text-2xl font-bold text-green-600">
              {stats.articles}
            </div>
            <div className="text-sm text-green-600">Articles</div>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <div className="text-2xl font-bold text-purple-600">
              {stats.users}
            </div>
            <div className="text-sm text-purple-600">Users</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search Articles
        </h2>

        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={searchLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {searchLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Search"
            )}
          </button>
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Clear
            </button>
          )}
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">
              Search Results ({searchResults.length})
            </h3>
            {searchResults.map((article) => (
              <div
                key={article.id}
                className="p-3 bg-gray-50 rounded border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">
                      {article.title || "Untitled"}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {article.description}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm flex items-center gap-1 mt-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {article.url}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collections and Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collections */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Collections
          </h2>

          {/* Create Collection Form */}
          <form onSubmit={handleCreateCollection} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={collectionsLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {collectionsError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {collectionsError}
            </div>
          )}

          {/* Collections List */}
          <div className="space-y-2">
            {collectionsLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              collections.map((collection) => (
                <div
                  key={collection.id}
                  className={`p-3 rounded cursor-pointer border-2 transition-colors ${
                    selectedCollectionId === collection.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedCollectionId(collection.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{collection.name}</h3>
                      <p className="text-sm text-gray-600">
                        {collection.articlesCount} articles
                      </p>
                    </div>
                    {collection.name !== "Read Later" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            window.confirm(
                              `Delete "${collection.name}" collection?`,
                            )
                          ) {
                            deleteCollection(collection.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Articles */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Articles
            {selectedCollectionId && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({collections.find((c) => c.id === selectedCollectionId)?.name})
              </span>
            )}
          </h2>

          {selectedCollectionId ? (
            <>
              {/* Add Article Form */}
              <form
                onSubmit={handleAddArticle}
                className="space-y-3 mb-4 p-3 bg-gray-50 rounded"
              >
                <input
                  type="text"
                  value={newArticle.title}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, title: e.target.value })
                  }
                  placeholder="Article title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  value={newArticle.url}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, url: e.target.value })
                  }
                  placeholder="Article URL (required)"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newArticle.description}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  value={newArticle.thumbnail}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, thumbnail: e.target.value })
                  }
                  placeholder="Thumbnail URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={articlesLoading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Add Article
                </button>
              </form>

              {articlesError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {articlesError}
                </div>
              )}

              {/* Articles List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {articlesLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : articles.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No articles in this collection
                  </p>
                ) : (
                  articles.map((article) => (
                    <div
                      key={article.id}
                      className="p-3 border border-gray-200 rounded"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">
                            {article.title || "Untitled"}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {article.description}
                          </p>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm flex items-center gap-1 mt-2"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Article
                          </a>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm("Remove this article?")) {
                              removeArticle(article.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Select a collection to view articles
            </p>
          )}
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Data Management
        </h2>

        <div className="flex gap-4">
          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>

          <button
            onClick={handleDeleteAllData}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete All Data
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          Export your data as JSON backup or permanently delete all stored data.
        </p>
      </div>
    </div>
  );
};

export default ExampleUsage;
