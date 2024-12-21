import React, { useState, useEffect } from "react";
import {
    Newspaper,
    BookMarked,
    FileText,
    ArrowRight,
    Sparkles,
    BookOpen,
    Layout,
    Filter,
    Star,
    Coffee,
    Clock,
    Brain,
    X,
    Check,
} from "lucide-react";

const LumiFeedLanding = () => {
    const [activeDemo, setActiveDemo] = useState(0);
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

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDemo((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <Layout className="w-8 h-8" />,
            title: "Clean Interface",
            description:
                "Say goodbye to cluttered feeds and intrusive ads. Experience news in its purest form.",
        },
        {
            icon: <Filter className="w-8 h-8" />,
            title: "Smart Filtering",
            description:
                "Choose your preferred news sources and topics. Get exactly what matters to you.",
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI-Powered Summaries",
            description:
                "Grasp key points quickly with our intelligent article summarization technology.",
        },
        {
            icon: <BookMarked className="w-8 h-8" />,
            title: "Personal Collections",
            description:
                "Create your own knowledge library by organizing articles into custom collections.",
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Time-Saving",
            description:
                "Stay informed without sacrificing hours scrolling through endless content.",
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Premium Sources",
            description:
                "Access quality journalism from world-renowned news agencies in one place.",
        },
    ];

    const demoScreens = [
        {
            title: "Choose Your Sources",
            description:
                "Select from premium news agencies like BBC, CNN, and Indian Express",
            image: "/api/placeholder/600/400",
        },
        {
            title: "Get Smart Summaries",
            description:
                "AI-powered summaries help you grasp key points instantly",
            image: "/api/placeholder/600/400",
        },
        {
            title: "Build Your Library",
            description: "Save and organize articles into personal collections",
            image: "/api/placeholder/600/400",
        },
    ];

    const comparisons = [
        {
            traditional: "Overwhelming news feeds",
            lumifeed: "Curated, focused content",
        },
        {
            traditional: "Distracting advertisements",
            lumifeed: "Clean, ad-free experience",
        },
        {
            traditional: "Time-consuming reading",
            lumifeed: "Quick, smart summaries",
        },
        {
            traditional: "Scattered bookmarks",
            lumifeed: "Organized collections",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans overflow-hidden">
            {/* Animated Background */}
            <div
                className="fixed inset-0 opacity-10"
                style={{
                    backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #3B82F6 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                    transition: "all 0.3s ease",
                }}
            />

            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
                            LumiFeed
                        </h1>
                        <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Welcome to the renaissance of news reading. Your
                            modern, clutter-free window to quality journalism.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                                <span className="relative z-10">
                                    Start Reading
                                </span>
                                <div className="absolute inset-0 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </button>
                            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Demo Section */}
            <div className="py-24 bg-white/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
                        Experience the Difference
                    </h2>
                    <div className="relative">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                {demoScreens.map((screen, index) => (
                                    <div
                                        key={index}
                                        className={`p-6 rounded-lg transition-all duration-300 cursor-pointer ${
                                            activeDemo === index
                                                ? "bg-blue-50 shadow-lg scale-105"
                                                : "hover:bg-gray-50"
                                        }`}
                                        onClick={() => setActiveDemo(index)}
                                    >
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {screen.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {screen.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                                <img
                                    src={demoScreens[activeDemo].image}
                                    alt="Demo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
                        Why Choose LumiFeed?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/80 backdrop-blur-sm rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-blue-600 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comparison Section */}
            <div className="py-24 bg-blue-600 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        The LumiFeed Difference
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {comparisons.map((item, index) => (
                            <div key={index} className="flex gap-8">
                                <div className="flex-1 p-6 bg-white/10 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <X className="w-5 h-5 text-red-300" />
                                        <span className="font-semibold">
                                            Traditional News
                                        </span>
                                    </div>
                                    <p>{item.traditional}</p>
                                </div>
                                <div className="flex-1 p-6 bg-white/10 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Check className="w-5 h-5 text-green-300" />
                                        <span className="font-semibold">
                                            LumiFeed
                                        </span>
                                    </div>
                                    <p>{item.lumifeed}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Ready for a Better News Experience?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join thousands of readers who've already discovered the
                        joy of clutter-free news reading.
                    </p>
                    <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                        <span className="relative z-10 flex items-center gap-2">
                            Begin Your Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LumiFeedLanding;
