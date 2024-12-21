import React, { createContext, useState, useContext } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    return (
        <DarkModeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode() {
    return useContext(DarkModeContext);
}
