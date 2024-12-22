import React, { useState } from "react";
import { Feather, Search, Menu, X, LogIn, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../contexts/DarkModeContext";

const Header = () => {
    // const { isDark, setIsDark } = useDarkMode();
    const { isDark, toggleDarkMode } = useDarkMode();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header
                className={`${isDark ? "bg-gray-900 border-gray-700" : "bg-[#F2E8CF] border-[#8B4513]/20"} border-b fixed w-full top-0 z-50 transition-colors duration-300`}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <a className="flex items-center" href="/">
                                <Feather
                                    className={`h-8 w-8 ${isDark ? "text-gray-200" : "text-[#8B4513]"}`}
                                />
                                <span
                                    className={`ml-2 text-xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"}`}
                                >
                                    LumiFeed
                                </span>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <a
                                href="/home"
                                className={`${isDark ? "text-gray-200 hover:text-gray-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-[Cormorant]`}
                            >
                                Home
                            </a>
                            <a
                                href="/about"
                                className={`${isDark ? "text-gray-200 hover:text-gray-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-[Cormorant]`}
                            >
                                About
                            </a>
                            <a
                                href="/contact"
                                className={`${isDark ? "text-gray-200 hover:text-gray-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-[Cormorant]`}
                            >
                                Contact
                            </a>
                            <button
                                className="block cursor-pointer hover:rotate-[0deg] transition-all duration-500"
                                onClick={toggleDarkMode}
                            >
                                {isDark ? (
                                    <Sun size={20} className="text-gray-200" />
                                ) : (
                                    <Moon
                                        size={20}
                                        className="text-[#8B4513]"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`${isDark ? "text-gray-200 hover:text-gray-400" : "text-[#8B4513] hover:text-[#8B4513]/80"}`}
                            >
                                <Search className="h-5 w-5" />
                            </button>
                            <a
                                href="/auth/login"
                                className={`flex items-center px-4 py-2 ${isDark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-[#8B4513] text-white hover:bg-[#8B4513]/90"} rounded-md font-[Cinzel]`}
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Login
                            </a>
                        </nav>

                        {/* Mobile Controls */}
                        <div
                            className={`md:hidden ${isDark ? "text-gray-200" : "text-[#8B4513]"} flex justify-center items-center gap-4 pr-0`}
                        >
                            <button
                                className="block cursor-pointer hover:rotate-[0deg] transition-all duration-500"
                                // onClick={() => setIsDark(!isDark)}
                                onClick={toggleDarkMode}
                            >
                                {isDark ? (
                                    <Sun size={20} className="text-gray-200" />
                                ) : (
                                    <Moon
                                        size={20}
                                        className="text-[#8B4513]"
                                    />
                                )}
                            </button>

                            <button
                                className="md:hidden pr-6"
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ${isSearchOpen ? "h-16" : "h-0"}`}
                    >
                        <div className="py-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for articles..."
                                    className={`w-full px-4 py-2 pl-10 ${isDark ? "bg-gray-800 border-gray-700 text-gray-200 focus:ring-gray-600" : "bg-white/50 border-[#8B4513]/20 focus:ring-[#8B4513]/40"} border rounded-md focus:outline-none focus:ring-1 font-[Cormorant]`}
                                />
                                <Search
                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? "text-gray-400" : "text-[#8B4513]/60"}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? "h-64" : "h-0"} overflow-hidden ${isDark ? "bg-gray-900 border-gray-700" : "bg-[#F2E8CF] border-[#8B4513]/20"} border-t`}
                >
                    <div className="px-4 py-2 space-y-4 pr-10">
                        <a
                            href="/home"
                            className={`block ${isDark ? "text-gray-200 hover:text-gray-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-[Cormorant]`}
                        >
                            Home
                        </a>
                        <a
                            href="/about"
                            className={`block ${isDark ? "text-gray-200 hover:text-gray-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-[Cormorant]`}
                        >
                            About
                        </a>
                        <a
                            href="/contact"
                            className={`block ${isDark ? "text-gray-200 hover:text-gray-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-[Cormorant]`}
                        >
                            Contact
                        </a>
                        <a
                            href="/auth/login"
                            className={`flex items-center px-4 py-2 ${isDark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-[#8B4513] text-white hover:bg-[#8B4513]/90"} rounded-md font-[Cinzel] w-full justify-center`}
                        >
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                        </a>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className={`w-full px-4 py-2 pl-10 ${isDark ? "bg-gray-800 border-gray-700 text-gray-200 focus:ring-gray-600" : "bg-white/50 border-[#8B4513]/20 focus:ring-[#8B4513]/40"} border rounded-md focus:outline-none focus:ring-1 font-[Cormorant]`}
                            />
                            <Search
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? "text-gray-400" : "text-[#8B4513]/60"}`}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");
            `}</style>
        </>
    );
};

export default Header;
