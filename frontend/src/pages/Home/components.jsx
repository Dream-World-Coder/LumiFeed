import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Plus, Minus, X, Menu } from "lucide-react";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/AuthContext";
import SearchBar from "../../components/SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header({
    exclude = [""],
    abs = false,
    darkBg = "dark:bg-[#222]",
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

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
                bg-[#d8d2c2] ${darkBg} dark:text-white`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-0 py-3">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        {/* Logo */}
                        <div
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center gap-2"
                        >
                            <div className="rounded-xl bg-white size-8 overflow-hidden box-content p-1">
                                <img
                                    src="/favicon.png"
                                    alt=""
                                    className="object-cover size-full"
                                />
                            </div>
                            <span className="font-dahlia text-2xl text-[#4a4947]">
                                LumiFeed
                            </span>
                        </div>
                        <SearchBar round={true} hideSubmitBtn={true} />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map(
                            (link, index) =>
                                !exclude.includes(link.href) && (
                                    <button
                                        key={index}
                                        onClick={() => navigate(link.href)}
                                        className={`text-neutral-600 hover:text-neutral-800 dark:text-[#f8f8f8] dark:hover:text-[#fff]
                                            box-content px-3 py-1 rounded-lg text-base font-poppins`}
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

export function SelectNews({ news, setNews }) {
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isSourceOpen, setIsSourceOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSource, setSelectedSource] = useState("The Indian Express");
    const [numberOfNews, setNumberOfNews] = useState(25);
    const [contentHeight, setContentHeight] = useState("auto");
    const contentRef = useRef(null);
    const dropdownRef = useRef(null);

    const categories = [
        "Trending",
        "India",
        "City Wise",
        "Science",
        "Technology",
        "Business",
        "Health",
        "Cricket",
        "Sports",
        "Politics",
        "Lifestyle",
        "Entertainment",
    ];

    const newsSources = [
        "The Indian Express",
        "BBC News",
        "CNN",
        "The New York Times",
        "The Guardian",
        "The Washington Post",
        "Al Jazeera",
        "The Times of India",
        "NDTV",
        "Hindustan Times",
    ];

    useEffect(() => {
        // Handle click outside dropdown
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsSourceOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (contentRef.current) {
            if (isCategoryOpen) {
                setContentHeight(`${contentRef.current.scrollHeight}px`);
            } else {
                setContentHeight("0px");
            }
        }
    }, [isCategoryOpen]);

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full py-4 mb-12">
            {/* News Category Selector */}
            <div className="w-full md:w-3/4 border border-[#D8D2C2] rounded-lg overflow-hidden bg-transparent">
                <div
                    className="flex justify-between items-center px-4 py-2 cursor-pointer"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                    <h2 className="text-4xl text-black font-[ApercuBold] tracking-tight">
                        Select News Category
                    </h2>
                    <button className="h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300">
                        {isCategoryOpen ? (
                            <Minus size={24} />
                        ) : (
                            <Plus size={24} />
                        )}
                    </button>
                </div>

                <div
                    ref={contentRef}
                    style={{
                        height: contentHeight,
                        opacity: isCategoryOpen ? 1 : 0,
                    }}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                >
                    <div className="p-5">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`${selectedCategory === category ? "bg-[#B17457] hover:bg-[#B17457] text-white" : "bg-[#D8D2C2] hover:bg-[#C8C2B2]"}
                                        py-3 px-4 rounded text-center transition-colors font-poppins text-sm`}
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <span className="whitespace-nowrap font-poppins">
                                Enter Number of News to Fetch:
                            </span>
                            <div className="flex items-center justify-between w-full">
                                <input
                                    type="number"
                                    value={numberOfNews}
                                    onChange={(e) =>
                                        setNumberOfNews(
                                            parseInt(e.target.value) || 0,
                                        )
                                    }
                                    className="w-full sm:w-32 px-4 py-2 border border-[#D8D2C2] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D8D2C2] transition-all"
                                />
                                <div className="flex items-center gap-2">
                                    <button className="px-4 py-1 bg-[#D25769] hover:bg-[#B24759] text-white rounded-full transition-colors text-sm font-poppins">
                                        Fetch
                                    </button>
                                    <button className="px-4 py-1 bg-[#D25769] hover:bg-[#B24759] text-white rounded-full transition-colors text-sm font-poppins">
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Source Selector */}
            <div
                className="w-full md:w-1/4 relative font-poppins"
                ref={dropdownRef}
            >
                <div
                    className="w-full p-4 bg-[#F8F2E2] border border-[#D8D2C2] rounded-lg flex justify-between items-center cursor-pointer shadow-sm"
                    onClick={() => setIsSourceOpen(!isSourceOpen)}
                >
                    <span className="font-medium">{selectedSource}</span>
                    <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${isSourceOpen ? "rotate-180" : ""}`}
                    />
                </div>

                {isSourceOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-[#000] border border-[#222] rounded-lg shadow-lg overflow-hidden transition-all duration-300 opacity-100 scale-100 origin-top">
                        <div className="p-2 text-gray-400 border-b border-[#171717]">
                            --select--
                        </div>
                        {newsSources.map((source) => (
                            <div
                                key={source}
                                className={`p-2 cursor-pointer hover:bg-[#171717] flex items-center transition-colors ${selectedSource === source ? "text-white" : "text-gray-300"}`}
                                onClick={() => {
                                    setSelectedSource(source);
                                    setIsSourceOpen(false);
                                }}
                            >
                                {selectedSource === source && (
                                    <span className="mr-2">✓</span>
                                )}
                                {source}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
SelectNews.propTypes = { news: PropTypes.array, setNews: PropTypes.func };

function BookSvg({ fillClr = "#000", width = "100px", height = "100px" }) {
    return (
        <svg
            fill={fillClr}
            width={width}
            height={height}
            viewBox="0 0 750 750"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M591.11,455.19c-2.1-15.24-6.01-30.17-7.83-45.44-3.77-27.94-1.9-56.22-1.74-84.3-.59-25.65-2.46-51.25-3.31-76.9-.24-12.74-1.45-42.84-20.78-36.25-8.37,5.23-18.4,28.93-21.77,39.04-.4,1.57-.57,3.09-.56,4.54-7.23,15.86-13.71,47.12-35.98,67.47-22.8,24.16-58.62,7.72-86.62,4.94-2.69-.12-4.92,1.12-6.63,2.99-3.03-.1-6.32,1.39-8.87,4.13-8.24,9.72-18.61,19.27-32.3,19.88-25.92,1.05-53.09-3.31-74.13-19.45-33.88-22.33-68.44-80.83-109.59-80.9-5.35-.44-11.24,.28-15.62,2.79-5.78-6.11-15.07-4.8-17.41,8.44,.06,32.93,6.72,65.7,8.62,98.6,4.9,67.67,16.06,134.69,23.11,202.13,2.02,14.36,14.83,13.36,18.76,4.28,5.84,4.58,14.6,7.12,21.24,9.53,20.44,7.45,41.65,12.93,63.34,15.02,28.53,3.31,57.32,2.5,85.96,2.35,9.05,1.74,15.82,9.3,24.8,11.57,4.75,1.56,9,.87,12.72-1.14,8.03,3.64,16.65-2.85,24.54-4.8,42.21-12.85,74.67-43.34,108.01-70.72,19.11-14.96,58.61-4.38,62.93-35.32,.44-14.71-3.55-29.75-10.89-42.49Zm-219.72,116.68c-22.3-2.67-44.97-1.07-67.37-2.49-34.61-1.58-66.72-14.84-99.4-24.53-2.81-.53-5.26,.38-7.22,2.02-3.66-22.92-9.94-45.42-12.43-68.55-4.79-64.52-6.16-129.36-13.2-193.72,9.64,1.31,23-.23,34.29,10.5,39.64,28.38,68.81,79.19,122.33,80.55,20.56,1.33,43.79,2.87,61.95-7.12-1.01,34.5,.65,69.18,1.52,103.66,.39,20.29,3.21,40.38,7.54,60.19,3.44,13.3,5.29,27.42,9.89,40.43-.59,.23-1.18,.46-1.76,.7-5.6,2.48-8.85,7.96-9.79,13.97-9.47-3.84-15.88-13.78-26.34-15.62Zm107.72-24.44c-15.39,10.27-33.34,14.31-50.96,19.28-.33-.54-.7-1.07-1.14-1.6-1.08-.9-2.09-1.52-3.06-1.91-3.25-10.29-4.12-21.46-6.32-31.98-8-57.66-3.36-115.96-4.85-173.91,2.92,1.26,6.11,2.11,9.17,2.63,12.28,3.79,25,5.5,37.84,5.71,41.97,5.93,69.12-34.79,83.93-68.48,3.67-9.03,5.68-18.56,7.84-28.02,.39-.83,.75-1.71,1.08-2.61,1.52-1.41,2.93-3.41,4.1-6.09,5.24,75.19,7.51,150.83,20.91,225.08-56.87,4.32-57.26,35.61-98.54,61.9Z"></path>
                <path d="M463.01,421.2c17.51,3.52,34.51-2.56,47.87-13.92,5.23-3.91,10.49-7.78,15.72-11.71,8.27-6.95,6.77-24.56-4.54-27.49-2.99-.58-5.56,.5-7.91,2.26-17.46,13.66-31.31,25.59-55,20.84-20.16-.13-18.32,31.44,3.86,30.01Z"></path>
                <path d="M530.32,424.06c-15.51,.38-21.57,26.89-58.61,24.41-10.76-1.43-20.66,2.05-20.46,14.46-.63,11.01,9.53,15.86,19.19,15.28,17.77,2.06,35.94-3.31,49.96-14.4,4.96-3.9,9.84-7.98,14.45-12.29,8.09-7.2,6.9-24.39-4.53-27.46Z"></path>
                <path d="M335.04,427.69c14.22-.79,14.23-27.34,0-28.18-21.44-.43-43.29,.32-64.16-5.35-14.44-4.03-26.31-13.44-38.66-21.53-7.71-6.32-17.93-9.22-22.09,2.35-5.16,13.45,8.13,22.1,17.72,28.55,29.83,26.01,70.04,24.34,107.19,24.16Z"></path>
                <path d="M350.92,465.31c-19.73,6.45-40.59,14.93-61.42,8.26-16-1.88-52.69-38.24-60.16-11.75-2.84,10.35,5.02,18.28,14.21,21.34,17.5,9.6,35,21.21,55.6,21.9,15.2,1.23,29.96-3.76,44.23-8.36,7.27-2.97,17.82-2.99,20.35-11.94,3.49-8.36-2.05-22.93-12.81-19.45Z"></path>
                <path d="M318.8,256.75c3.46,4.55,10.55,4.45,14.04,0,13.37-16.71-16.13-45.43-24.19-60.76-12.27-16.01-26.72,8.22-17.42,19.92,9.4,13.46,17.91,27.61,27.56,40.83Z"></path>
                <path d="M439.02,222.44c-1.5-10.16-4.56-20.52,.54-30.26,1.73-4.03,3.54-8.02,5.48-11.95,7.89-13.62-8.94-34.56-19.36-16.54-11.57,20.81-16.97,46.23-6.22,68.51,7,13.8,22.02,2.42,19.56-9.75Z"></path>
                <path d="M501.33,209.39c7.78,4.67,13.58-3.91,16.45-10.23,3.46-5.78,7.52-11.15,11.33-16.7,4.08-5.96,8.18-11.92,12.25-17.89,6.23-8.43,2.08-26.5-10.42-24.98-9.8,3.56-16,20.52-23.1,28.57-7.59,11.1-20.44,30.23-6.51,41.24Z"></path>
            </g>
        </svg>
    );
}
BookSvg.propTypes = {
    fillClr: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export function InfoContainer() {
    return (
        <div
            className="w-full bg-[#F1EDE0] flex flex-col justify-center items-center
            text-center rounded-lg px-4 py-8 text-lg font-poppins"
        >
            <BookSvg fillClr="#000000" width="350px" height="350px" />
            Select any news agency and a news category to fetch news.
            <br /> That’s it! Now, read peacefully without any distractions or
            ads.
            <br />
            Log in to unlock many features, such as high-quality summaries
            <br /> of each article and save articles in collections.
        </div>
    );
}
InfoContainer.propTypes = { currentUser: PropTypes.object };

export function NewsTable({ news }) {
    return <table></table>;
}

export function Footer({ currentUser }) {
    const [year] = useState(new Date().getFullYear());

    return (
        <footer className="bg-[#d8d2c2] py-6 px-4 w-full mt-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    {/* Logo */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-5xl font-dahlia text-stone-700">
                            LumiFeed
                        </h2>
                    </div>

                    {/* Links Container */}
                    <div className="flex flex-col sm:flex-row gap-8 md:gap-16">
                        {/* Social Links */}
                        <div className="mb-4 sm:mb-0">
                            <ul className="space-y-2">
                                <li className="hover:underline decoration-2 underline-offset-4">
                                    <a
                                        href="mailto:lumifeed101@gmail.com"
                                        className="text-stone-700"
                                    >
                                        Email
                                    </a>
                                </li>
                                <li className="hover:underline decoration-2 underline-offset-4">
                                    <a
                                        href="https://github.com/Dream-World-Coder/LumiFeed"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-stone-700"
                                    >
                                        Github
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Navigation Links */}
                        <div>
                            <ul className="space-y-2">
                                <li className="hover:underline decoration-2 underline-offset-4">
                                    <a href="/" className="text-stone-700">
                                        Home
                                    </a>
                                </li>
                                {currentUser && (
                                    <li className="hover:underline decoration-2 underline-offset-4">
                                        <a
                                            href={`/profile`}
                                            className="text-stone-700"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                )}
                                <li className="hover:underline decoration-2 underline-offset-4">
                                    <a href="/about" className="text-stone-700">
                                        About
                                    </a>
                                </li>
                                <li className="hover:underline decoration-2 underline-offset-4">
                                    <a
                                        href="/contact"
                                        className="text-stone-700"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-4 border-t border-[#c8c2b2] text-stone-700 text-sm flex justify-between items-center">
                    <div>Copyright © {year} Lumifeed</div>
                    <div className="flex gap-2">
                        <button className="bg-stone-700 text-white p-2 rounded-full hover:bg-stone-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        <button className="bg-stone-700 text-white p-2 rounded-full hover:bg-stone-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    currentUser: PropTypes.object,
};
