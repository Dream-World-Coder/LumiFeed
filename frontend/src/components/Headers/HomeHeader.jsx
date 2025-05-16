import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Menu, Sun, Moon, Search } from "lucide-react";
import PropTypes from "prop-types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useDarkMode } from "../../contexts/DarkModeContext";
import { useAuth } from "../../contexts/AuthContext";

import AppLogo from "../Logo";
// import SearchBar from "../../components/SearchBar";

export default function Header({
    exclude = [""],
    abs = false,
    darkBg = "dark:bg-[#282828]",
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { isDark, toggleDarkMode } = useDarkMode();

    let navLinks = [
        { name: "Home", href: "/home" },
        { name: "Saved", href: "/saved" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    if (!currentUser) {
        navLinks.push({ name: "Login", href: "/auth/login" });
    }
    if (currentUser) {
        navLinks.push({ name: "Profile", href: "/profile" });
    }

    return (
        <header
            className={`${abs ? "absolute" : "fixed"} w-full top-0 z-50
                bg-[#d8d2c2] ${darkBg} dark:text-white border-b ${isDark ? "border-[#222]" : "border-[#b8b2a2]"}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-0 py-3">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        {/* Logo */}
                        <div
                            onClick={() => navigate("/landing-page")}
                            className="flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <AppLogo
                                width={32}
                                height={32}
                                backgroundColor="#8B4513"
                                letterColor="#fff"
                            />
                            <span
                                className={`font-dahlia text-2xl ${isDark ? "text-[f8f8f8]" : "text-[#4a4947]"}`}
                            >
                                LumiFeed
                            </span>
                        </div>
                        {/* <SearchBar round={true} hideSubmitBtn={true} /> */}
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map(
                            (link, index) =>
                                !exclude.includes(link.href) && (
                                    <button
                                        key={index}
                                        onClick={() => navigate(link.href)}
                                        className={`text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-[#fff]
                                            box-content px-3 py-1 rounded-lg text-sm font-poppins`}
                                    >
                                        {link.href !== "/profile" ? (
                                            link.name
                                        ) : (
                                            <Avatar className="size-6 md:size-8">
                                                <AvatarImage
                                                    src={
                                                        currentUser.profilePicture
                                                    }
                                                    alt={`${currentUser.username}`}
                                                />
                                                <AvatarFallback>
                                                    {currentUser.fullName
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </button>
                                ),
                        )}

                        <button onClick={toggleDarkMode} className="">
                            {isDark ? (
                                <Sun size={16} />
                            ) : (
                                <Moon className="text-neutral-600" size={16} />
                            )}
                        </button>

                        <button className="hidden md:block text-neutral-600 dark:text-white">
                            <Search size={16} className="ml-2" />
                        </button>
                    </div>

                    <div className="md:hidden flex items-center justify-center gap-2">
                        {/* mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-white/50 rounded-sm transition-colors dark:hover:bg-[#222]/50"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6 text-stone-600 dark:text-gray-200" />
                            ) : (
                                <Menu className="h-6 w-6 text-stone-600 dark:text-gray-200" />
                            )}
                        </button>
                    </div>
                </nav>

                {/* mobile menu */}
                <div
                    className={`md:hidden absolute left-0 right-0 bg-white dark:bg-[#111] backdrop-blur-md border-b border-stone-200/50 dark:border-stone-700/50 transition-all duration-300 ease-in-out ${
                        isMenuOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                    <div className="px-4 py-6 space-y-6">
                        {/* mobile nav links */}
                        <div className="flex flex-col">
                            {navLinks.map((link, index) => (
                                <button
                                    key={index}
                                    className="py-2 pl-4 rounded-lg text-stone-600 dark:text-gray-300 hover:text-stone-800 dark:hover:text-gray-200
                                    hover:bg-lime-300/50 transition-colors font-poppins"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        navigate(link.href);
                                    }}
                                >
                                    {link.name}
                                </button>
                            ))}
                            <button onClick={toggleDarkMode}>
                                {isDark ? (
                                    <Sun size={20} />
                                ) : (
                                    <Moon size={20} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
Header.propTypes = {
    abs: PropTypes.bool,
    darkBg: PropTypes.string,
    exclude: PropTypes.array,
};
