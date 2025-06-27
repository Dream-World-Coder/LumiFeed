// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { DatabaseService, initializeDatabase } from "../db/database";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if currentUser has stored his info in the indexedDB when the component mounts
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize database
        await initializeDatabase();

        // Check if user exists
        const user = await DatabaseService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const login = async (userData) => {
    try {
      // Validate required fields
      if (!userData.username || !userData.fullName) {
        throw new Error("Username and Full Name are required");
      }

      // Create or update user in database
      const user = await DatabaseService.createUser(userData);
      setCurrentUser(user);

      return { success: true, user };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (userData) => {
    try {
      if (!currentUser) {
        throw new Error("No user logged in");
      }

      const updatedUser = await DatabaseService.createUser({
        ...currentUser,
        ...userData,
      });

      setCurrentUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Update user error:", error);
      return { success: false, error: error.message };
    }
  };

  const deleteAllData = async () => {
    try {
      await DatabaseService.deleteAllUserData();
      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      console.error("Delete all data error:", error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    updateUser,
    deleteAllData,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = { children: PropTypes.node };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
