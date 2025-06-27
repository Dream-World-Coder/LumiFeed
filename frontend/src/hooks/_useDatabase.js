// src/hooks/useDatabase.js
import { useState, useCallback } from "react";
import { DatabaseService } from "../db/database";

export const useDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeOperation = useCallback(async (operation) => {
    setLoading(true);
    setError(null);

    try {
      const result = await operation();
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err.message || "An error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Export/Import utilities
  const exportData = useCallback(async () => {
    return executeOperation(() => DatabaseService.exportData());
  }, [executeOperation]);

  const importData = useCallback(
    async (data) => {
      return executeOperation(() => DatabaseService.importData(data));
    },
    [executeOperation],
  );

  const clearAllData = useCallback(async () => {
    return executeOperation(() => DatabaseService.clearAllData());
  }, [executeOperation]);

  return {
    loading,
    error,
    exportData,
    importData,
    clearAllData,
  };
};

// Hook for user operations
export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeOperation = useCallback(async (operation) => {
    setLoading(true);
    setError(null);

    try {
      const result = await operation();
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err.message || "An error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(
    async (userData) => {
      return executeOperation(() => DatabaseService.createUser(userData));
    },
    [executeOperation],
  );

  const getUser = useCallback(async () => {
    return executeOperation(() => DatabaseService.getUser());
  }, [executeOperation]);

  const updateUser = useCallback(
    async (userId, userData) => {
      return executeOperation(() =>
        DatabaseService.updateUser(userId, userData),
      );
    },
    [executeOperation],
  );

  const deleteUser = useCallback(
    async (userId) => {
      return executeOperation(() => DatabaseService.deleteUser(userId));
    },
    [executeOperation],
  );

  return {
    loading,
    error,
    createUser,
    getUser,
    updateUser,
    deleteUser,
  };
};

// Hook for article operations
export const useArticles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeOperation = useCallback(async (operation) => {
    setLoading(true);
    setError(null);

    try {
      const result = await operation();
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err.message || "An error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const addArticle = useCallback(
    async (collectionId, articleData) => {
      return executeOperation(() =>
        DatabaseService.addArticle(collectionId, articleData),
      );
    },
    [executeOperation],
  );

  const updateArticle = useCallback(
    async (articleId, data) => {
      return executeOperation(() =>
        DatabaseService.updateArticle(articleId, data),
      );
    },
    [executeOperation],
  );

  const deleteArticle = useCallback(
    async (articleId) => {
      return executeOperation(() => DatabaseService.deleteArticle(articleId));
    },
    [executeOperation],
  );

  const moveArticle = useCallback(
    async (articleId, newCollectionId) => {
      return executeOperation(() =>
        DatabaseService.moveArticle(articleId, newCollectionId),
      );
    },
    [executeOperation],
  );

  const getArticle = useCallback(
    async (articleId) => {
      return executeOperation(() => DatabaseService.getArticle(articleId));
    },
    [executeOperation],
  );

  const getCollectionArticles = useCallback(
    async (collectionId) => {
      return executeOperation(() =>
        DatabaseService.getCollectionArticles(collectionId),
      );
    },
    [executeOperation],
  );

  return {
    loading,
    error,
    addArticle,
    updateArticle,
    deleteArticle,
    moveArticle,
    getArticle,
    getCollectionArticles,
  };
};

// Hook for collection operations
export const useCollectionOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeOperation = useCallback(async (operation) => {
    setLoading(true);
    setError(null);

    try {
      const result = await operation();
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err.message || "An error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const createCollection = useCallback(
    async (name, userId, isDefault = false) => {
      return executeOperation(() =>
        DatabaseService.createCollection(name, userId, isDefault),
      );
    },
    [executeOperation],
  );

  const updateCollection = useCallback(
    async (collectionId, data) => {
      return executeOperation(() =>
        DatabaseService.updateCollection(collectionId, data),
      );
    },
    [executeOperation],
  );

  const deleteCollection = useCallback(
    async (collectionId) => {
      return executeOperation(() =>
        DatabaseService.deleteCollection(collectionId),
      );
    },
    [executeOperation],
  );

  const getUserCollections = useCallback(
    async (userId) => {
      return executeOperation(() => DatabaseService.getUserCollections(userId));
    },
    [executeOperation],
  );

  const getDefaultCollection = useCallback(
    async (userId) => {
      return executeOperation(() =>
        DatabaseService.getDefaultCollection(userId),
      );
    },
    [executeOperation],
  );

  return {
    loading,
    error,
    createCollection,
    updateCollection,
    deleteCollection,
    getUserCollections,
    getDefaultCollection,
  };
};

// Hook for advanced search and filtering
export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const searchArticles = useCallback(async (userId, query) => {
    setLoading(true);
    setError(null);

    try {
      const searchResults = await DatabaseService.searchArticles(userId, query);
      setResults(searchResults);
      return { success: true, data: searchResults };
    } catch (err) {
      const errorMessage = err.message || "Search failed";
      setError(errorMessage);
      setResults([]);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    loading,
    error,
    results,
    searchArticles,
    clearResults,
  };
};

// Hook for bulk operations
export const useBulkOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const bulkAddArticles = useCallback(
    async (collectionId, articles, onProgress = null) => {
      setLoading(true);
      setError(null);
      setProgress(0);

      const results = [];
      const total = articles.length;

      try {
        for (let i = 0; i < articles.length; i++) {
          try {
            const result = await DatabaseService.addArticle(
              collectionId,
              articles[i],
            );
            results.push({ success: true, article: result });
          } catch (err) {
            results.push({
              success: false,
              error: err.message,
              article: articles[i],
            });
          }

          const currentProgress = ((i + 1) / total) * 100;
          setProgress(currentProgress);
          onProgress?.(currentProgress, i + 1, total);
        }

        return { success: true, results };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message, results };
      } finally {
        setLoading(false);
        setProgress(0);
      }
    },
    [],
  );

  const bulkDeleteArticles = useCallback(
    async (articleIds, onProgress = null) => {
      setLoading(true);
      setError(null);
      setProgress(0);

      const results = [];
      const total = articleIds.length;

      try {
        for (let i = 0; i < articleIds.length; i++) {
          try {
            await DatabaseService.deleteArticle(articleIds[i]);
            results.push({ success: true, articleId: articleIds[i] });
          } catch (err) {
            results.push({
              success: false,
              error: err.message,
              articleId: articleIds[i],
            });
          }

          const currentProgress = ((i + 1) / total) * 100;
          setProgress(currentProgress);
          onProgress?.(currentProgress, i + 1, total);
        }

        return { success: true, results };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message, results };
      } finally {
        setLoading(false);
        setProgress(0);
      }
    },
    [],
  );

  const bulkMoveArticles = useCallback(
    async (articleIds, targetCollectionId, onProgress = null) => {
      setLoading(true);
      setError(null);
      setProgress(0);

      const results = [];
      const total = articleIds.length;

      try {
        for (let i = 0; i < articleIds.length; i++) {
          try {
            const result = await DatabaseService.moveArticle(
              articleIds[i],
              targetCollectionId,
            );
            results.push({ success: true, article: result });
          } catch (err) {
            results.push({
              success: false,
              error: err.message,
              articleId: articleIds[i],
            });
          }

          const currentProgress = ((i + 1) / total) * 100;
          setProgress(currentProgress);
          onProgress?.(currentProgress, i + 1, total);
        }

        return { success: true, results };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message, results };
      } finally {
        setLoading(false);
        setProgress(0);
      }
    },
    [],
  );

  const bulkUpdateArticles = useCallback(async (updates, onProgress = null) => {
    setLoading(true);
    setError(null);
    setProgress(0);

    const results = [];
    const total = updates.length;

    try {
      for (let i = 0; i < updates.length; i++) {
        const { articleId, data } = updates[i];
        try {
          const result = await DatabaseService.updateArticle(articleId, data);
          results.push({ success: true, article: result });
        } catch (err) {
          results.push({ success: false, error: err.message, articleId });
        }

        const currentProgress = ((i + 1) / total) * 100;
        setProgress(currentProgress);
        onProgress?.(currentProgress, i + 1, total);
      }

      return { success: true, results };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message, results };
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }, []);

  const bulkDeleteCollections = useCallback(
    async (collectionIds, onProgress = null) => {
      setLoading(true);
      setError(null);
      setProgress(0);

      const results = [];
      const total = collectionIds.length;

      try {
        for (let i = 0; i < collectionIds.length; i++) {
          try {
            await DatabaseService.deleteCollection(collectionIds[i]);
            results.push({ success: true, collectionId: collectionIds[i] });
          } catch (err) {
            results.push({
              success: false,
              error: err.message,
              collectionId: collectionIds[i],
            });
          }

          const currentProgress = ((i + 1) / total) * 100;
          setProgress(currentProgress);
          onProgress?.(currentProgress, i + 1, total);
        }

        return { success: true, results };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message, results };
      } finally {
        setLoading(false);
        setProgress(0);
      }
    },
    [],
  );

  return {
    loading,
    error,
    progress,
    bulkAddArticles,
    bulkDeleteArticles,
    bulkMoveArticles,
    bulkUpdateArticles,
    bulkDeleteCollections,
  };
};
