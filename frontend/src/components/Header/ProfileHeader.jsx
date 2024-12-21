import React, { useState, useEffect } from "react";
import {
    Feather,
    User,
    Home,
    Info,
    Phone,
    ChevronDown,
    LogOut,
    Trash2,
    Menu,
    X,
    Sun,
    Moon,
} from "lucide-react";

const ProfileHeader = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Sample user data
    const userData = {
        name: "John Doe",
        email: "john@example.com",
        profilePic: "/api/placeholder/100/100",
    };

    // Handle dark mode toggle
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".menu-container")) {
                setShowProfileMenu(false);
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <header className="border-b border-[#8B4513]/20 bg-white/40 dark:bg-[#2A1810]/90 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <Feather className="w-8 h-8 text-[#8B4513] dark:text-[#F2E8CF]" />
                        <h1 className="text-3xl font-[Cinzel] text-[#8B4513] dark:text-[#F2E8CF]">
                            LumiFeed
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <a
                            href="#"
                            className="text-[#8B4513] dark:text-[#F2E8CF] hover:opacity-80 transition-colors flex items-center space-x-2"
                        >
                            <Home size={20} />
                            <span className="font-[Cinzel]">Home</span>
                        </a>
                        <a
                            href="#"
                            className="text-[#8B4513] dark:text-[#F2E8CF] hover:opacity-80 transition-colors flex items-center space-x-2"
                        >
                            <Info size={20} />
                            <span className="font-[Cinzel]">About</span>
                        </a>
                        <a
                            href="#"
                            className="text-[#8B4513] dark:text-[#F2E8CF] hover:opacity-80 transition-colors flex items-center space-x-2"
                        >
                            <Phone size={20} />
                            <span className="font-[Cinzel]">Contact</span>
                        </a>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="text-[#8B4513] dark:text-[#F2E8CF] hover:opacity-80 transition-colors p-2 rounded-full hover:bg-[#8B4513]/10 dark:hover:bg-[#F2E8CF]/10"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <Sun size={20} />
                            ) : (
                                <Moon size={20} />
                            )}
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative menu-container">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowProfileMenu(!showProfileMenu);
                                }}
                                className="flex items-center space-x-2 text-[#8B4513] dark:text-[#F2E8CF] hover:opacity-80 transition-colors"
                            >
                                <User size={20} />
                                <span className="font-[Cinzel]">Profile</span>
                                <ChevronDown size={16} />
                            </button>

                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#2A1810] rounded-lg shadow-xl border border-[#8B4513]/20 dark:border-[#F2E8CF]/20 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-[#8B4513]/10 dark:border-[#F2E8CF]/10">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={userData.profilePic}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <p className="font-[Cinzel] text-[#8B4513] dark:text-[#F2E8CF]">
                                                    {userData.name}
                                                </p>
                                                <p className="text-sm text-[#8B4513]/60 dark:text-[#F2E8CF]/60">
                                                    {userData.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2">
                                        <Trash2 size={16} />
                                        <span>Delete Account</span>
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-[#8B4513] dark:text-[#F2E8CF] hover:bg-[#8B4513]/10 dark:hover:bg-[#F2E8CF]/10 transition-colors flex items-center space-x-2">
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center space-x-4 md:hidden">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="text-[#8B4513] dark:text-[#F2E8CF] hover:opacity-80 transition-colors p-2 rounded-full hover:bg-[#8B4513]/10 dark:hover:bg-[#F2E8CF]/10"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <Sun size={20} />
                            ) : (
                                <Moon size={20} />
                            )}
                        </button>
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="text-[#8B4513] dark:text-[#F2E8CF] hover:opacity-80 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-[#8B4513]/20 dark:border-[#F2E8CF]/20">
                        <nav className="flex flex-col space-y-4">
                            <a
                                href="#"
                                className="text-[#8B4513] dark:text-[#F2E8CF] hover:opacity-80 transition-colors flex items-center space-x-2"
                            >
                                <Home size={20} />
                                <span className="font-[Cinzel]">Home</span>
                            </a>
                            <a
                                href="#"
                                className="text-[#8B4513] dark:text-[#F2E8CF] hover:opacity-80 transition-colors flex items-center space-x-2"
                            >
                                <Info size={20} />
                                <span className="font-[Cinzel]">About</span>
                            </a>
                            <a
                                href="#"
                                className="text-[#8B4513] dark:text-[#F2E8CF] hover:opacity-80 transition-colors flex items-center space-x-2"
                            >
                                <Phone size={20} />
                                <span className="font-[Cinzel]">Contact</span>
                            </a>

                            {/* Mobile Profile Section */}
                            <div className="pt-4 border-t border-[#8B4513]/20 dark:border-[#F2E8CF]/20">
                                <div className="flex items-center space-x-3 mb-4">
                                    <img
                                        src={userData.profilePic}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="font-[Cinzel] text-[#8B4513] dark:text-[#F2E8CF]">
                                            {userData.name}
                                        </p>
                                        <p className="text-sm text-[#8B4513]/60 dark:text-[#F2E8CF]/60">
                                            {userData.email}
                                        </p>
                                    </div>
                                </div>
                                <button className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2 rounded-md">
                                    <Trash2 size={16} />
                                    <span>Delete Account</span>
                                </button>
                                <button className="w-full px-4 py-2 mt-2 text-left text-[#8B4513] dark:text-[#F2E8CF] hover:bg-[#8B4513]/10 dark:hover:bg-[#F2E8CF]/10 transition-colors flex items-center space-x-2 rounded-md">
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");

                :root {
                    color-scheme: light dark;
                }
            `}</style>
        </header>
    );
};

export default ProfileHeader;
