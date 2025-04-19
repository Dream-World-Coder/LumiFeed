import { createContext, useState, useContext, useEffect } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    // Initialize state from localStorage or system preference
    const [isDark, setIsDark] = useState(() => {
        // First check localStorage
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode !== null) {
            return JSON.parse(savedMode);
        }

        // If nothing in localStorage, check system preference
        if (window.matchMedia) {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }

        // Default to light mode
        return false;
    });

    // Update localStorage when isDark changes
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(isDark));

        // Optional: Update document class for global styling
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e) => {
            // Only update if user hasn't set a preference in localStorage
            if (localStorage.getItem("darkMode") === null) {
                setIsDark(e.matches);
            }
        };

        // Add listener
        if (mediaQuery?.addEventListener) {
            mediaQuery.addEventListener("change", handleChange);
        } else if (mediaQuery?.addListener) {
            // Fallback for older browsers
            mediaQuery.addListener(handleChange);
        }

        // Cleanup
        return () => {
            if (mediaQuery?.removeEventListener) {
                mediaQuery.removeEventListener("change", handleChange);
            } else if (mediaQuery?.removeListener) {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDark((prev) => !prev);
    };

    return (
        <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }
    return context;
}
