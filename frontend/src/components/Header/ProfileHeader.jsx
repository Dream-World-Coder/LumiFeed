import { useState } from "react";
import {
    Search,
    Menu,
    X,
    Moon,
    Sun,
    LogOut,
    User,
    Trash2,
    ChevronDown,
} from "lucide-react";
import AppLogo from "../Logo";
import { useDarkMode } from "../../contexts/DarkModeContext";

const Header = () => {
    // provide usedata from props
    const userData = {
        name: "Mr X",
        email: "mr@x.com",
        profilePic: "https://picsum.photos/100/100",
    };

    const { isDark, toggleDarkMode } = useDarkMode();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                                    className={`${isDark ? "invert" : "invert-0"}`}
                                />
                                <span
                                    className={`ml-2 text-xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                                >
                                    LumiFeed
                                </span>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden text-lg md:flex items-center space-x-8">
                            <a
                                href="/home"
                                className={`${isDark ? "text-stone-200 hover:text-stone-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-sentient`}
                            >
                                Home
                            </a>
                            <a
                                href="/about"
                                className={`${isDark ? "text-stone-200 hover:text-stone-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-sentient`}
                            >
                                About
                            </a>
                            <a
                                href="/contact"
                                className={`${isDark ? "text-stone-200 hover:text-stone-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-sentient`}
                            >
                                Contact
                            </a>
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

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowProfileMenu(!showProfileMenu)
                                    }
                                    className="flex items-center space-x-2 text-[#8B4513] hover:text-[#8B4513]/80 transition-colors"
                                >
                                    <User size={20} />
                                    <span className="font-zodiak">Profile</span>
                                    <ChevronDown size={16} />
                                </button>

                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-[#8B4513]/20 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-[#8B4513]/10">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={userData.profilePic}
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-zodiak text-[#8B4513]">
                                                        {userData.name}
                                                    </p>
                                                    <p className="text-sm text-[#8B4513]/60">
                                                        {userData.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <a
                                            href="#"
                                            className="w-full px-4 py-2 text-left text-[#8B4513] hover:bg-[#8B4513]/10 transition-colors flex items-center space-x-2"
                                        >
                                            <LogOut size={16} />
                                            <span>Logout</span>
                                        </a>
                                        <a
                                            href="/auth/delete-account"
                                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                                        >
                                            <Trash2 size={16} />
                                            <span>Delete Account</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Mobile Controls */}
                        <div
                            className={`md:hidden ${isDark ? "text-stone-200" : "text-[#8B4513]"} flex justify-center items-center gap-4 pr-0`}
                        >
                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowProfileMenu(!showProfileMenu)
                                    }
                                    className="flex items-center space-x-2 text-[#8B4513] hover:text-[#8B4513]/80 transition-colors"
                                >
                                    <User size={20} />
                                </button>

                                {showProfileMenu && (
                                    <div className="absolute right-[-100px] mt-2 w-64 bg-white rounded-lg shadow-xl border border-[#8B4513]/20 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-[#8B4513]/10">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={userData.profilePic}
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-zodiak text-[#8B4513]">
                                                        {userData.name}
                                                    </p>
                                                    <p className="text-sm text-[#8B4513]/60">
                                                        {userData.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <a
                                            href="#"
                                            className="w-full px-4 py-2 text-left text-[#8B4513] hover:bg-[#8B4513]/10 transition-colors flex items-center space-x-2"
                                        >
                                            <LogOut size={16} />
                                            <span>Logout</span>
                                        </a>
                                        <a
                                            href="/auth/delete-account"
                                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                                        >
                                            <Trash2 size={16} />
                                            <span>Delete Account</span>
                                        </a>
                                    </div>
                                )}
                            </div>

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
                    className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? "h-64" : "h-0"} overflow-hidden ${isDark ? "bg-stone-900 border-stone-700" : "bg-[#F2E8CF] border-[#8B4513]/20"} border-t`}
                >
                    <div className="px-4 py-2 space-y-4 pr-10">
                        <a
                            href="/home"
                            className={`block ${isDark ? "text-stone-200 hover:text-stone-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-sentient`}
                        >
                            Home
                        </a>
                        <a
                            href="/about"
                            className={`block ${isDark ? "text-stone-200 hover:text-stone-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-sentient`}
                        >
                            About
                        </a>
                        <a
                            href="/contact"
                            className={`block ${isDark ? "text-stone-200 hover:text-stone-400" : "text-[#8B4513] hover:text-[#8B4513]/80"} font-sentient`}
                        >
                            Contact
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
