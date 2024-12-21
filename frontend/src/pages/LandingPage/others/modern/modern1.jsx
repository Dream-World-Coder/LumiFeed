import React, { useState, useEffect } from "react";
import {
    Sun,
    Moon,
    Newspaper,
    Bookmark,
    FileText,
    ArrowRight,
    Rss,
} from "lucide-react";

const LumiFeedLanding = () => {
    const [isDark, setIsDark] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        setIsLoaded(true);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const parallaxStyle = (depth) => ({
        transform: `translateY(${scrollY * depth}px)`,
    });

    // const getMouseParallax = (depth = 0.1) => ({
    //     transform: `translate(${(mousePosition.x - window.innerWidth / 2) * depth}px, ${(mousePosition.y - window.innerHeight / 2) * depth}px)`,
    // });

    return (
        <div
            className={`min-h-screen overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"} transition-colors duration-500`}
        >
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Dynamic Grid */}
                <div
                    className={`absolute inset-0 opacity-10 ${isDark ? "opacity-20" : "opacity-5"}`}
                    style={{
                        backgroundImage: `linear-gradient(${isDark ? "#ccc" : "#444"} 1px, transparent 1px),
                                linear-gradient(90deg, ${isDark ? "#ccc" : "#444"} 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            {/* Main Content */}
            <div
                className={`relative transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-10"}`}
            >
                {/* Navigation */}
                <nav
                    className={`fixed w-full z-50 backdrop-blur-lg ${isDark ? "bg-gray-900/50" : "bg-white/50"}`}
                >
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 group">
                                <div
                                    className={`p-3 rounded-xl transform transition-all group-hover:rotate-12 ${
                                        isDark ? "bg-gray-800" : "bg-gray-100"
                                    }`}
                                >
                                    <Newspaper
                                        className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-blue-500"}`}
                                    />
                                </div>
                                <span
                                    className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}
                                >
                                    LumiFeed
                                </span>
                            </div>
                            <button
                                onClick={() => setIsDark(!isDark)}
                                className={`p-4 rounded-full transition-all hover:scale-110 ${
                                    isDark
                                        ? "bg-gray-800 text-yellow-400"
                                        : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                {isDark ? (
                                    <Sun className="w-6 h-6" />
                                ) : (
                                    <Moon className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative min-h-screen flex items-center">
                    <div className="container mx-auto px-6 pt-32">
                        <div
                            className="max-w-4xl mx-auto text-center"
                            style={parallaxStyle(0.3)}
                        >
                            <div
                                className={`inline-block mb-6 ${isDark ? "bg-gray-800" : "bg-gray-100"} rounded-full px-6 py-2`}
                            >
                                <span
                                    className={`text-sm font-semibold ${isDark ? "text-purple-400" : "text-blue-500"}`}
                                >
                                    The Future of News Reading
                                </span>
                            </div>
                            <h1
                                className={`text-7xl font-bold mb-8 leading-tight ${isDark ? "text-white" : "text-gray-800"}`}
                            >
                                Where{" "}
                                <span
                                    className={`relative inline-block ${isDark ? "text-purple-400" : "text-blue-500"}`}
                                >
                                    Intelligence
                                    <div className="absolute bottom-0 left-0 w-full h-2 bg-current opacity-20 rounded-full"></div>
                                </span>{" "}
                                Meets News
                            </h1>
                            <p
                                className={`text-2xl mb-12 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                            >
                                Experience news reading reimagined through the
                                lens of AI and beautiful design
                            </p>
                            <div className="flex justify-center space-x-6">
                                <button
                                    className={`
                  px-8 py-4 rounded-xl font-semibold text-white flex items-center
                  transform hover:scale-105 transition-all
                  ${isDark ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-500 hover:bg-blue-600"}
                `}
                                >
                                    Start Your Journey
                                    <ArrowRight className="ml-2 w-5 h-5 animate-pulse" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="relative py-32">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: FileText,
                                    title: "AI-Powered Insights",
                                    description:
                                        "Experience news through the lens of advanced AI summarization",
                                    gradient: isDark
                                        ? "from-purple-500/20 to-indigo-600/20"
                                        : "from-blue-400/20 to-cyan-500/20",
                                },
                                {
                                    icon: Rss,
                                    title: "Smart Curation",
                                    description:
                                        "Your personalized news ecosystem, intelligently organized",
                                    gradient: isDark
                                        ? "from-indigo-500/20 to-purple-600/20"
                                        : "from-cyan-400/20 to-blue-500/20",
                                },
                                {
                                    icon: Bookmark,
                                    title: "Dynamic Collections",
                                    description:
                                        "Create living collections that evolve with your interests",
                                    gradient: isDark
                                        ? "from-purple-600/20 to-indigo-500/20"
                                        : "from-blue-500/20 to-cyan-400/20",
                                },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className={`
                    relative group p-8 rounded-2xl transition-all duration-300
                    hover:transform hover:scale-105 hover:-rotate-1
                    ${isDark ? "bg-gray-800" : "bg-white"}
                    border border-transparent
                    ${isDark ? "hover:border-purple-500/30" : "hover:border-blue-500/30"}
                  `}
                                    style={{
                                        boxShadow: isDark
                                            ? "0 0 50px rgba(139, 92, 246, 0.1)"
                                            : "0 0 50px rgba(59, 130, 246, 0.1)",
                                    }}
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                                    />
                                    <div className="relative z-10">
                                        <feature.icon
                                            className={`w-10 h-10 mb-6 transform group-hover:rotate-12 transition-transform ${isDark ? "text-purple-400" : "text-blue-500"}`}
                                        />
                                        <h3
                                            className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}
                                        >
                                            {feature.title}
                                        </h3>
                                        <p
                                            className={`${isDark ? "text-gray-300" : "text-gray-600"}`}
                                        >
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div
                    className={`relative overflow-hidden ${isDark ? "bg-gray-800/50" : "bg-gray-50/50"} backdrop-blur-xl`}
                >
                    <div className="container mx-auto px-6 py-24">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2
                                className={`text-5xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-800"}`}
                            >
                                Ready to Elevate Your News Experience?
                            </h2>
                            <p
                                className={`text-xl mb-12 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                            >
                                Join the next generation of informed readers.
                                Your personalized news journey begins here.
                            </p>
                            <button
                                className={`
                px-12 py-6 rounded-xl font-bold text-lg
                transform hover:scale-105 transition-all
                ${isDark ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}
              `}
                            >
                                Transform Your Reading Experience
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LumiFeedLanding;
