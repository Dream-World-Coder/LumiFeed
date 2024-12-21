import React, { useState, useEffect } from "react";
import {
    Feather,
    Newspaper,
    BookMarked,
    FileText,
    ArrowRight,
    Search,
    Sparkles,
    BookOpen,
} from "lucide-react";

const LandingPage = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const features = [
        {
            icon: <Newspaper className="w-8 h-8" />,
            title: "Curated News Sources",
            description:
                "Select from premium news agencies like BBC, CNN, and Indian Express. Access quality journalism without the clutter.",
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "Smart Summaries",
            description:
                "Get concise, high-quality summaries of every article. Understand key points quickly without reading lengthy content.",
        },
        {
            icon: <BookMarked className="w-8 h-8" />,
            title: "Personal Collections",
            description:
                "Save and organize your favorite articles into custom collections. Build your personal knowledge library.",
        },
    ];

    const sources = [
        "BBC News",
        "CNN",
        "Indian Express",
        "Reuters",
        "The Guardian",
        "Associated Press",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F2E8CF] via-[#F2E8CF] to-[#E8D5B5] font-[Cormorant] overflow-hidden">
            {/* Animated Background Pattern */}
            <div
                className="fixed inset-0 opacity-10"
                style={{
                    backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #8B4513 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                    transition: "all 0.3s ease",
                }}
            />

            {/* Hero Section */}
            <div className="relative min-h-screen">
                {/* Floating Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + i * 10}%`,
                                animation: `float ${3 + i}s ease-in-out infinite alternate`,
                            }}
                        >
                            <svg
                                className="w-24 h-24 text-[#8B4513] opacity-20"
                                viewBox="0 0 100 100"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                />
                            </svg>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="container mx-auto max-w-6xl px-4 pt-32 relative z-10">
                    {/* Animated Logo */}
                    <div className="text-center mb-16 relative">
                        <div className="relative inline-block">
                            <Feather className="w-24 h-24 mx-auto text-[#8B4513] mb-6 transform hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 animate-pulse opacity-[-50]">
                                <Sparkles className="w-24 h-24 mx-auto text-[#8B4513]" />
                            </div>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-[Cinzel] text-[#8B4513] tracking-wider mb-6 relative">
                            <span className="inline-block hover:transform hover:translate-y-[-2px] transition-all duration-300">
                                L
                            </span>
                            <span className="inline-block hover:transform hover:translate-y-[-2px] transition-all duration-300">
                                u
                            </span>
                            <span className="inline-block hover:transform hover:translate-y-[-2px] transition-all duration-300">
                                m
                            </span>
                            <span className="inline-block hover:transform hover:translate-y-[-2px] transition-all duration-300">
                                i
                            </span>
                            <span className="inline-block hover:transform hover:translate-y-[-2px] transition-all duration-300">
                                F
                            </span>
                            <span className="inline-block hover:transform hover:translate-y-[-2px] transition-all duration-300">
                                e
                            </span>
                            <span className="inline-block hover:transform hover:translate-y-[-2px] transition-all duration-300">
                                e
                            </span>
                            <span className="inline-block hover:transform hover:translate-y-[-2px] transition-all duration-300">
                                d
                            </span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-[#8B4513]/80 italic max-w-2xl mx-auto">
                            Welcome to the renaissance of reading
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {features.map((feature, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-[#8B4513] rounded-lg transform transition-all duration-300 group-hover:rotate-6 opacity-20" />
                                <div
                                    className="relative bg-white/40 backdrop-blur-md rounded-lg p-8 border border-[#8B4513]/20
                              transform transition-all duration-300 group-hover:-translate-y-2 group-hover:translate-x-1
                              hover:shadow-2xl overflow-hidden"
                                >
                                    <div
                                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B4513]/0 via-[#8B4513]/50 to-[#8B4513]/0
                                transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                                    />
                                    <div className="text-[#8B4513] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-[Cinzel] text-2xl text-[#8B4513] mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[#8B4513]/80 text-lg">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Interactive News Sources */}
                    <div className="relative mb-16">
                        <div className="absolute inset-0 bg-[#8B4513]/5 rounded-lg transform -rotate-1" />
                        <div className="relative bg-white/40 backdrop-blur-md rounded-lg p-8 border border-[#8B4513]/20">
                            <h2 className="font-[Cinzel] text-3xl text-[#8B4513] mb-8 text-center">
                                Trusted News Sources
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {sources.map((source, index) => (
                                    <div
                                        key={index}
                                        className="group relative px-6 py-3"
                                    >
                                        <div className="absolute inset-0 bg-[#8B4513] rounded-full transform group-hover:scale-110 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                                        <span className="relative text-lg text-[#8B4513] group-hover:text-[#F2E8CF] transition-colors duration-300">
                                            {source}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mb-32">
                        <a
                            href="/login"
                            className="group relative inline-flex items-center gap-3 bg-[#8B4513] text-[#F2E8CF] px-10 py-4 rounded-md
                        font-[Cinzel] text-xl overflow-hidden"
                        >
                            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                                Begin Your Journey
                            </span>
                            <ArrowRight className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
                            <div className="absolute inset-0 bg-[#8B4513] transform transition-transform duration-300 group-hover:scale-x-110" />
                            <div className="absolute inset-0 bg-[#724939] transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                        </a>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");

                @keyframes float {
                    0% {
                        transform: translate(-50%, -50%) translateY(0px);
                    }
                    100% {
                        transform: translate(-50%, -50%) translateY(-20px);
                    }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
