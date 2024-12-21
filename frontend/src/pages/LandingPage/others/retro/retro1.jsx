import React, { useState } from "react";
import {
    Feather,
    Newspaper,
    BookMarked,
    FileText,
    ArrowRight,
    Search,
} from "lucide-react";

const RLanding = () => {
    const [activeFeature, setActiveFeature] = useState(0);

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
        <div className="min-h-screen bg-[#F2E8CF] font-[Cormorant] overflow-hidden">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <svg
                        className="absolute top-0 left-0 w-96 h-96 text-[#8B4513] opacity-5"
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
                            r="40"
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
                    <svg
                        className="absolute bottom-0 right-0 w-[800px] h-[800px] text-[#8B4513] opacity-5"
                        viewBox="0 0 100 100"
                    >
                        <pattern
                            id="grid"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 10 0 L 0 0 0 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                            />
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    {/* Logo and Headline */}
                    <div className="text-center mb-16">
                        <Feather className="w-20 h-20 mx-auto text-[#8B4513] mb-6" />
                        <h1 className="text-5xl md:text-7xl font-[Cinzel] text-[#8B4513] tracking-wider mb-6">
                            LumiFeed
                        </h1>
                        <p className="text-xl md:text-2xl text-[#8B4513]/80 italic max-w-2xl mx-auto">
                            Welcome to the renaissance of reading, where news
                            meets elegance and simplicity
                        </p>
                    </div>

                    {/* Main Features */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/40 backdrop-blur-md rounded-lg p-6 border border-[#8B4513]/20
                          hover:transform hover:-translate-y-1 transition-all duration-300"
                                onMouseEnter={() => setActiveFeature(index)}
                            >
                                <div className="text-[#8B4513] mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="font-[Cinzel] text-xl text-[#8B4513] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-[#8B4513]/80">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* News Sources Carousel */}
                    <div className="bg-white/40 backdrop-blur-md rounded-lg p-8 border border-[#8B4513]/20 mb-16">
                        <h2 className="font-[Cinzel] text-2xl text-[#8B4513] mb-6 text-center">
                            Trusted News Sources
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {sources.map((source, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 rounded-full border border-[#8B4513]/20 text-[#8B4513]
                          hover:bg-[#8B4513] hover:text-[#F2E8CF] transition-colors duration-300"
                                >
                                    {source}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <a
                            href="/login"
                            className="inline-flex items-center gap-2 bg-[#8B4513] text-[#F2E8CF] px-8 py-3 rounded-md
                        font-[Cinzel] text-lg hover:bg-[#8B4513]/90 transition-all duration-300"
                        >
                            Begin Your Journey{" "}
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");
            `}</style>
        </div>
    );
};

export default RLanding;
