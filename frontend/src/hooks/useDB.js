// src/hooks/useDB.js
import { useState, useEffect, useCallback } from "react";
import { DatabaseService } from "../db/database";

export const useCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all collections
  const loadCollections = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const collectionsData = await DatabaseService.getCollectionsWithCounts();
      setCollections(collectionsData);
    } catch (err) {
      setError(err.message);
      console.error("Error loading collections:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new collection
  const createCollection = useCallback(async (name) => {
    setError(null);
    try {
      const newCollection = await DatabaseService.createCollection(name);
      return { success: true, collection: newCollection };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Delete collection
  const deleteCollection = useCallback(
    async (collectionId) => {
      setError(null);
      try {
        await DatabaseService.deleteCollection(collectionId);
        await loadCollections(); // Refresh the list
        return { success: true };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    },
    [loadCollections],
  );

  // Get collection by name
  const getCollectionByName = useCallback(async (name) => {
    try {
      return await DatabaseService.getCollectionByName(name);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  // Load collections on hook initialization
  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  return {
    collections,
    setCollections,
    loading,
    error,
    loadCollections,
    createCollection,
    deleteCollection,
    getCollectionByName,
    clearError: () => setError(null),
  };
};

export const useArticles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load articles for a collection
  const loadArticles = useCallback(async (collectionId) => {
    if (!collectionId) return;

    setLoading(true);
    setError(null);
    try {
      const articlesData =
        await DatabaseService.getArticlesByCollection(collectionId);
      return { success: true, articlesData };
    } catch (err) {
      setError(err.message);
      console.error("Error loading articles:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add article to collection
  const addArticle = useCallback(
    async (articleData, collectionId) => {
      if (!collectionId)
        return { success: false, error: "No collection selected" };

      setError(null);
      try {
        const newArticle = await DatabaseService.addArticleToCollection(
          collectionId,
          articleData,
        );
        await loadArticles(); // Refresh the list
        return { success: true, article: newArticle };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    },
    [loadArticles],
  );

  // Remove article from collection -- problematic, deletes from all collection, needs fix
  const removeArticle = useCallback(
    async (articleId, collectionId) => {
      setError(null);
      try {
        await DatabaseService.removeArticleFromCollection(articleId);
        await loadArticles(); // Refresh the list
        return { success: true };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    },
    [loadArticles],
  );

  // Get article by ID
  const getArticleById = useCallback(async (articleId) => {
    try {
      return await DatabaseService.getArticleById(articleId);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  return {
    loading,
    error,
    loadArticles,
    addArticle,
    removeArticle,
    getArticleById,
    clearError: () => setError(null),
  };
};

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Search articles
  const searchArticles = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length === 0) {
      setSearchResults([]);
      setQuery("");
      return;
    }

    setLoading(true);
    setError(null);
    setQuery(searchQuery);

    try {
      const results = await DatabaseService.searchArticles(searchQuery);
      setSearchResults(results);
      return { success: true, results };
    } catch (err) {
      setError(err.message);
      console.error("Error searching articles:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear search results
  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setQuery("");
    setError(null);
  }, []);

  return {
    searchResults,
    loading,
    error,
    query,
    searchArticles,
    clearSearch,
    clearError: () => setError(null),
  };
};

// Hook for database statistics and management
export const useDatabase = () => {
  const [stats, setStats] = useState({ users: 0, collections: 0, articles: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get database statistics
  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const statsData = await DatabaseService.getDatabaseStats();
      setStats(statsData);
    } catch (err) {
      setError(err.message);
      console.error("Error loading database stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Export all data
  const exportData = useCallback(async () => {
    try {
      const data = await DatabaseService.exportAllData();
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Delete all user data
  const deleteAllData = useCallback(async () => {
    try {
      await DatabaseService.deleteAllUserData();
      await loadStats(); // Refresh stats
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [loadStats]);

  // Load stats on hook initialization
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    loadStats,
    exportData,
    deleteAllData,
    clearError: () => setError(null),
  };
};
