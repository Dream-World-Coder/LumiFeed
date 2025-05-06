// src/contexts/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext(null);

// Custom hook for using the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Provider component that wraps your app and makes auth available to any child component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if currentUser is logged in when the component mounts
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("currentUser");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Login method
    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();

            // Store user data and token
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("currentUser", JSON.stringify(data.user));

            setToken(data.access_token);
            setCurrentUser(data.user);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Logout method
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        setToken(null);
        setCurrentUser(null);
    };

    // Check if currentUser is authenticated
    const isAuthenticated = () => {
        return !!token;
    };

    // Get the auth header for API calls
    const getAuthHeader = () => {
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    // Create an authenticated fetch wrapper
    const authFetch = async (url, options = {}) => {
        if (!token) {
            throw new Error("No authentication token available");
        }

        const headers = {
            ...options.headers,
            ...getAuthHeader(),
        };

        // try {
        const response = await fetch(url, { ...options, headers });

        // Handle token expiration
        if (response.status === 401) {
            logout();
            throw new Error("Session expired");
        }

        return response;
        // } catch (error) {
        //     throw error;
        // }
    };

    // Value object that will be passed to provider
    const value = {
        currentUser,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
        authFetch,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
