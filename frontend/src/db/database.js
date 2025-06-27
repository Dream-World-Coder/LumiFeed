// src/db/database.js
import Dexie from "dexie";

// Define the database
export class AppDatabase extends Dexie {
  constructor() {
    super("LumiFeedDB");

    this.version(1).stores({
      user: "++id, username, fullName, profilePicture, createdAt",
      collections: "++id, name, createdAt",
      articles:
        "++id, collectionId, title, url, date, thumbnail, description, articleContent, createdAt",
    });

    // Define indexes
    this.articles.hook("creating", function (primKey, obj, trans) {
      obj.createdAt = obj.createdAt || new Date();
    });

    this.collections.hook("creating", function (primKey, obj, trans) {
      obj.createdAt = obj.createdAt || new Date();
    });

    this.user.hook("creating", function (primKey, obj, trans) {
      obj.createdAt = obj.createdAt || new Date();
    });
  }
}

// Create database instance
export const db = new AppDatabase();

// Database operations
export class DatabaseService {
  // ========== USER OPERATIONS ==========

  // Get current user
  static async getCurrentUser() {
    try {
      const users = await db.user.toArray();
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error;
    }
  }

  // Create or update user
  static async createUser(userData) {
    try {
      // Check if user already exists
      const existingUser = await this.getCurrentUser();
      if (existingUser) {
        // Update existing user
        await db.user.update(existingUser.id, {
          ...userData,
          createdAt: existingUser.createdAt, // Keep original creation date
        });
        return await this.getCurrentUser();
      } else {
        // Create new user and default collection
        // const userId =
        await db.user.add({
          ...userData,
          createdAt: new Date(),
        });

        // Create default "Read Later" & "Liked Articles" collections
        try {
          await this.createCollection("Read Later");
          await this.createCollection("Liked Articles");
        } catch (err) {
          console.log(err);
        }

        return await this.getCurrentUser();
      }
    } catch (error) {
      console.error("Error creating/updating user:", error);
      throw error;
    }
  }

  // ========== COLLECTION OPERATIONS ==========

  // Get all collections
  static async getAllCollections() {
    try {
      return await db.collections.orderBy("createdAt").toArray();
    } catch (error) {
      console.error("Error getting collections:", error);
      throw error;
    }
  }

  // Create collection
  static async createCollection(name) {
    try {
      // Validate collection name (a-z, A-Z, 0-9, spaces, hyphens, underscores)
      if (!name || typeof name !== "string") {
        throw new Error("Collection name is required and must be a string");
      }

      const trimmedName = name.trim();
      if (trimmedName.length === 0) {
        throw new Error("Collection name cannot be empty");
      }

      if (!/^[a-zA-Z0-9\s\-_]+$/.test(trimmedName)) {
        throw new Error(
          "Collection name can only contain letters, numbers, spaces, hyphens, and underscores",
        );
      }

      // Check if collection already exists
      const existingCollection = await db.collections
        .where("name")
        .equals(trimmedName)
        .first();
      if (existingCollection) {
        throw new Error("Collection with this name already exists");
      }

      const collectionId = await db.collections.add({
        name: trimmedName,
        createdAt: new Date(),
      });

      return await db.collections.get(collectionId);
    } catch (error) {
      console.error("Error creating collection:", error);
      throw error;
    }
  }

  // Delete collection
  static async deleteCollection(collectionId) {
    try {
      if (!collectionId) {
        throw new Error("Collection ID is required");
      }

      // Get collection first to check if it exists
      const collection = await db.collections.get(collectionId);
      if (!collection) {
        throw new Error("Collection not found");
      }

      // Don't allow deleting "Read Later" collection
      if (collection.name === "Read Later") {
        throw new Error('Cannot delete the default "Read Later" collection');
      }

      // Delete all articles in this collection first
      await db.articles.where("collectionId").equals(collectionId).delete();

      // Delete the collection
      await db.collections.delete(collectionId);

      return true;
    } catch (error) {
      console.error("Error deleting collection:", error);
      throw error;
    }
  }

  // ========== ARTICLE OPERATIONS ==========

  // Get articles from a collection
  static async getArticlesByCollection(collectionId) {
    try {
      if (!collectionId) {
        throw new Error("Collection ID is required");
      }

      return await db.articles
        .where("collectionId")
        .equals(collectionId)
        .orderBy("createdAt")
        .reverse()
        .toArray();
    } catch (error) {
      console.error("Error getting articles by collection:", error);
      throw error;
    }
  }

  // Add article to collection
  static async addArticleToCollection(collectionId, articleData) {
    try {
      if (!collectionId) {
        throw new Error("Collection ID is required");
      }

      if (!articleData || !articleData.url) {
        throw new Error("Article data with URL is required");
      }

      // Check if collection exists
      const collection = await db.collections.get(collectionId);
      if (!collection) {
        throw new Error("Collection not found");
      }

      // Check if article already exists in this collection
      const existingArticle = await db.articles
        .where("collectionId")
        .equals(collectionId)
        .and((article) => article.url === articleData.url)
        .first();

      if (existingArticle) {
        throw new Error("Article already exists in this collection");
      }

      // Add article
      const articleId = await db.articles.add({
        collectionId,
        title: articleData.title || "",
        url: articleData.url,
        date: articleData.date || new Date(),
        thumbnail: articleData.thumbnail || "",
        description: articleData.description || "",
        articleContent: articleData.articleContent || "",
        createdAt: new Date(),
      });

      return await db.articles.get(articleId);
    } catch (error) {
      console.error("Error adding article to collection:", error);
      throw error;
    }
  }

  // Remove article from collection -> this delets from all collections, needs to be fixed
  static async removeArticleFromCollection(articleId) {
    try {
      if (!articleId) {
        throw new Error("Article ID is required");
      }

      const article = await db.articles.get(articleId);
      if (!article) {
        throw new Error("Article not found");
      }

      await db.articles.delete(articleId);
      return true;
    } catch (error) {
      console.error("Error removing article from collection:", error);
      throw error;
    }
  }

  // Get article by ID
  static async getArticleById(articleId) {
    try {
      if (!articleId) {
        throw new Error("Article ID is required");
      }

      return await db.articles.get(articleId);
    } catch (error) {
      console.error("Error getting article by ID:", error);
      throw error;
    }
  }

  // ========== SEARCH OPERATIONS ==========

  // Search articles across all collections
  static async searchArticles(query) {
    try {
      if (!query || typeof query !== "string") {
        return [];
      }

      const searchTerm = query.toLowerCase().trim();
      if (searchTerm.length === 0) {
        return [];
      }

      const articles = await db.articles.toArray();

      return articles.filter((article) => {
        const title = (article.title || "").toLowerCase();
        const description = (article.description || "").toLowerCase();
        const url = (article.url || "").toLowerCase();
        const content = (article.articleContent || "").toLowerCase();

        return (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          url.includes(searchTerm) ||
          content.includes(searchTerm)
        );
      });
    } catch (error) {
      console.error("Error searching articles:", error);
      throw error;
    }
  }

  // ========== UTILITY OPERATIONS ==========

  // Get collection by name
  static async getCollectionByName(name) {
    try {
      if (!name) {
        throw new Error("Collection name is required");
      }

      return await db.collections.where("name").equals(name.trim()).first();
    } catch (error) {
      console.error("Error getting collection by name:", error);
      throw error;
    }
  }

  // Get collection with articles count
  static async getCollectionsWithCounts() {
    try {
      const collections = await this.getAllCollections();
      const collectionsWithCounts = await Promise.all(
        collections.map(async (collection) => {
          const count = await db.articles
            .where("collectionId")
            .equals(collection.id)
            .count();
          return {
            ...collection,
            articlesCount: count,
          };
        }),
      );

      return collectionsWithCounts;
    } catch (error) {
      console.error("Error getting collections with counts:", error);
      throw error;
    }
  }

  // ========== DATA MANAGEMENT ==========

  // Delete all user data
  static async deleteAllUserData() {
    try {
      await db.transaction(
        "rw",
        db.user,
        db.collections,
        db.articles,
        async () => {
          await db.articles.clear();
          await db.collections.clear();
          await db.user.clear();
        },
      );

      return true;
    } catch (error) {
      console.error("Error deleting all user data:", error);
      throw error;
    }
  }

  // Get database statistics
  static async getDatabaseStats() {
    try {
      const userCount = await db.user.count();
      const collectionsCount = await db.collections.count();
      const articlesCount = await db.articles.count();

      return {
        users: userCount,
        collections: collectionsCount,
        articles: articlesCount,
      };
    } catch (error) {
      console.error("Error getting database stats:", error);
      throw error;
    }
  }

  // Export all data
  static async exportAllData() {
    try {
      const user = await this.getCurrentUser();
      const collections = await this.getAllCollections();
      const articles = await db.articles.toArray();

      return {
        user,
        collections,
        articles,
        exportDate: new Date(),
      };
    } catch (error) {
      console.error("Error exporting data:", error);
      throw error;
    }
  }
}

// Initialize database
export const initializeDatabase = async () => {
  try {
    await db.open();
    console.log("Database initialized successfully");

    // Create default collection if no collections exist
    const collections = await DatabaseService.getAllCollections();
    if (collections.length === 0) {
      await DatabaseService.createCollection("Read Later");
      await DatabaseService.createCollection("Liked Articles");
      console.log('Default "Read Later", "Liked Articles" collection created');
    }

    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};
