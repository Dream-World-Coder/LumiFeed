import { useState, useEffect, useRef } from "react";
import { BookMarked, Layout, Filter, Brain } from "lucide-react";
import { VisitLandingPageBtn } from "./components";
import AppLogo from "../../components/Logo";
import Footer from "../../components/Footer/Footer";

const LandingPage = () => {
    // const [activeFeature, setActiveFeature] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const decorRef = useRef(null);
    const letters = "LumiFeed".split("");

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

    // for feature cards
    const features = [
        {
            icon: <Layout className="w-8 h-8" />,
            title: "Enlightened Interface",
            description:
                "A canvas free from the chaos of modern media, allowing pure engagement with knowledge.",
        },
        {
            icon: <Filter className="w-8 h-8" />,
            title: "Curated Excellence",
            description:
                "Choose from the finest news sources, like a curator selecting masterpieces for a gallery.",
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Scholarly Summaries",
            description:
                "Experience the essence of articles through our masterfully crafted summaries.",
        },
        {
            icon: <BookMarked className="w-8 h-8" />,
            title: "Personal Library",
            description:
                "Build your own collection of knowledge, akin to the great libraries of the Renaissance.",
        },
    ];

    const sources = [
        "BBC News",
        "The Indian Express",
        "CNN",
        "The New York Times",
        "The Guardian",
        "The Washington Post",
        "Al Jazeera",
        "The Times of India",
        "NDTV",
        "Hindustan Times",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br bg-cream font-sentient overflow-hidden">
            {/* Animated Background Pattern */}
            <div
                className="fixed inset-0 opacity-10"
                style={{
                    backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #8B4513 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                    transition: "all 0.3s ease",
                }}
            />
            {/* Decorative Background */}
            <div
                ref={decorRef}
                className="fixed inset-0 pointer-events-none overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-64 h-64 decor-element">
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full opacity-10"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#8B4513"
                            strokeWidth="0.5"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke="#8B4513"
                            strokeWidth="0.5"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="30"
                            fill="none"
                            stroke="#8B4513"
                            strokeWidth="0.5"
                        />
                    </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-96 h-96 decor-element">
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full opacity-10"
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
                                stroke="#8B4513"
                                strokeWidth="0.5"
                            />
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
            </div>

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
                            <AppLogo
                                width={96}
                                height={96}
                                backgroundColor="#8B4513"
                                letterColor="#FFFFFF"
                                className="mx-auto text-[#8B4513] mb-6 transform hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-zodiak text-[#8B4513] tracking-tighter mb-6 relative">
                            {letters.map((item, index) => (
                                <span
                                    key={index}
                                    className="inline-block hover:transform hover:translate-y-[-2px] transition-all duration-300"
                                >
                                    {item}
                                </span>
                            ))}
                        </h1>
                        <p className="text-2xl md:text-3xl text-[#8B4513]/80 italic max-w-2xl mx-auto">
                            Welcome to the renaissance of reading
                        </p>
                        {/* CTA Section 1 */}
                        <VisitLandingPageBtn
                            myClass="mt-10 mb-10"
                            href="home"
                            buttonText="Begin Your Journey"
                        />
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-4 gap-8 mb-16">
                        {features.map((feature, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-cream-light rounded-lg transform transition-all duration-300 group-hover:rotate-6 opacity-20" />
                                <div
                                    className="relative bg-white/40 backdrop-blur-md rounded-lg p-8 border border-[#8B4513]/20 size-full
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
                                    <h3 className="font-zodiak text-2xl text-[#8B4513] mb-2">
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
                        <div className="absolute inset-0 bg-cream-light/5 rounded-lg transform -rotate-1" />
                        <div className="relative bg-cream-light backdrop-blur-md rounded-lg p-8 border border-[#8B4513]/20">
                            <h2 className="font-zodiak text-3xl text-[#8B4513] mb-8 text-center">
                                News Sources
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {sources.map((source, index) => (
                                    <div
                                        key={index}
                                        className="group relative px-6 py-3"
                                    >
                                        <div className="absolute inset-0 bg-[#8B4513] rounded-full transform group-hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                                        <span className="relative text-lg text-[#8B4513] group-hover:text-[#F2E8CF] transition-colors duration-300">
                                            {/* why sudden animation when mouseleave? */}
                                            {source}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Section 2 */}
                    <VisitLandingPageBtn
                        myClass="mb-32"
                        href="home"
                        buttonText="Set Forth"
                    />
                </div>
            </div>

            {/* footer */}
            <Footer />

            <style>{`
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
