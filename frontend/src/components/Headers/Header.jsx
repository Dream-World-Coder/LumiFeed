import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu, X, LogIn, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import AppLogo from "../Logo";

const Header = () => {
    // const { isDark, setIsDark } = useDarkMode();
    const navigate = useNavigate();
    const { isDark, toggleDarkMode } = useDarkMode();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const headerLinks = [
        { name: "Home", href: "/home" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        // { name: "Home", href: "/home" },
    ];

    return (
        <>
            <header
                className={`${isDark ? "bg-stone-900 border-stone-700" : "bg-cream-light border-[#8B4513]/20"} border-b fixed w-full top-0 z-50 transition-colors duration-300`}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <a className="flex items-center" href="/">
                                <AppLogo
                                    width={28}
                                    height={28}
                                    backgroundColor="#8B4513"
                                    letterColor="#FFFFFF"
                                />
                                <span
                                    className={`ml-2 text-xl font-dahlia ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                                >
                                    LumiFeed
                                </span>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-4">
                            {headerLinks.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(item.href)}
                                    href={item.href}
                                    className={`${isDark ? "text-stone-200 hover:bg-stone-400/40" : "text-[#8B4513] hover:bg-cream-dark/40"} rounded-lg box-content px-2 py-1 font-sentient`}
                                >
                                    {item.name}
                                </div>
                            ))}
                            <button
                                className="block cursor-pointer hover:rotate-[0deg] transition-all duration-500"
                                onClick={toggleDarkMode}
                            >
                                {isDark ? (
                                    <Sun size={20} className="text-stone-200" />
                                ) : (
                                    <Moon
                                        size={20}
                                        className="text-[#8B4513]"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`${isDark ? "text-stone-200 hover:text-stone-400" : "text-[#8B4513] hover:text-[#8B4513]/80"}`}
                            >
                                <Search className="h-5 w-5" />
                            </button>
                            <a
                                href="/auth/login"
                                className={`flex items-center px-4 py-2 ${isDark ? "bg-stone-700 text-stone-200 hover:bg-stone-600" : "bg-[#8B4513] text-white hover:bg-[#8B4513]/90"} rounded-md font-zodiak`}
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Login
                            </a>
                        </nav>

                        {/* Mobile Controls */}
                        <div
                            className={`md:hidden ${isDark ? "text-stone-200" : "text-[#8B4513]"} flex justify-center items-center gap-4 pr-0`}
                        >
                            <button
                                className="block cursor-pointer hover:rotate-[0deg] transition-all duration-500"
                                // onClick={() => setIsDark(!isDark)}
                                onClick={toggleDarkMode}
                            >
                                {isDark ? (
                                    <Sun size={20} className="text-stone-200" />
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
                                    className={`w-full px-4 py-2 pl-10 ${isDark ? "bg-stone-800 border-stone-700 text-stone-200 focus:ring-stone-600" : "bg-white/50 border-[#8B4513]/20 focus:ring-[#8B4513]/40"} border rounded-md focus:outline-none focus:ring-1 font-sentient`}
                                />
                                <Search
                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? "text-stone-400" : "text-[#8B4513]/60"}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? "h-64" : "h-0"} overflow-hidden ${isDark ? "bg-stone-900 border-stone-700" : "bg-cream-light border-[#8B4513]/20"} border-t`}
                >
                    <div className="px-4 py-2 space-y-4 pr-10">
                        {headerLinks.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(item.href)}
                                className={`${isDark ? "text-stone-200 hover:text-stone-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-sentient`}
                            >
                                {item.name}
                            </div>
                        ))}
                        <a
                            href="/auth/login"
                            className={`flex items-center px-4 py-2 ${isDark ? "bg-stone-700 text-stone-200 hover:bg-stone-600" : "bg-[#8B4513] text-white hover:bg-[#8B4513]/90"} rounded-md font-zodiak w-full justify-center`}
                        >
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                        </a>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className={`w-full px-4 py-2 pl-10 ${isDark ? "bg-stone-800 border-stone-700 text-stone-200 focus:ring-stone-600" : "bg-white/50 border-[#8B4513]/20 focus:ring-[#8B4513]/40"} border rounded-md focus:outline-none focus:ring-1 font-sentient`}
                            />
                            <Search
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? "text-stone-400" : "text-[#8B4513]/60"}`}
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
