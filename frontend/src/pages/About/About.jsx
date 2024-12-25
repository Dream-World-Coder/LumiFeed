import React from "react";
import { BookOpen, Newspaper, Star } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useDarkMode } from "../../contexts/DarkModeContext";
// import AppLogo from "../../assets/Logo";

const AboutSection = () => {
    const { isDark } = useDarkMode();

    return (
        <>
            <Header />
            <div
                className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-[#F2E8CF]"} font-[Cormorant] py-16 px-4 mt-[2rem]`}
            >
                {/* Main Container */}
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        {/* <AppLogo
                            width={64}
                            height={64}
                            backgroundColor="#8B4513"
                            letterColor="#FFFFFF"
                            className={`${isDark ? "invert" : "invert-0"} mx-auto mb-4`}
                        /> */}
                        <h1
                            className={`text-4xl md:text-5xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"} tracking-wider mb-4`}
                        >
                            About LumiFeed
                        </h1>
                        <div
                            className={`w-24 h-1 ${isDark ? "bg-gray-700" : "bg-[#8B4513]/20"} mx-auto`}
                        />
                    </div>

                    {/* Introduction Card */}
                    <div
                        className={`${isDark ? "bg-gray-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-8 md:p-12 shadow-lg border ${isDark ? "border-gray-700" : "border-[#8B4513]/20"} mb-12`}
                    >
                        <h2
                            className={`text-3xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"} mb-6 text-center`}
                        >
                            Your Modern News Reader
                        </h2>
                        <p
                            className={`text-lg ${isDark ? "text-gray-400" : "text-[#8B4513]/80"} leading-relaxed mb-6`}
                        >
                            Welcome to LumiFeed, your modern and clutter-free
                            news reading platform. This isn't your traditional
                            news source; instead, it's best described as a "News
                            Reader."
                        </p>
                        <div
                            className={`border-l-4 ${isDark ? "border-gray-700" : "border-[#8B4513]/20"} pl-6 my-8 py-2`}
                        >
                            <p
                                className={`text-xl italic ${isDark ? "text-gray-300" : "text-[#8B4513]/90"}`}
                            >
                                "Where ancient wisdom meets modern convenience"
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div
                            className={`${isDark ? "bg-gray-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-6 shadow-lg border ${isDark ? "border-gray-700" : "border-[#8B4513]/20"}`}
                        >
                            <div className="flex items-center mb-4">
                                <Newspaper
                                    className={`w-8 h-8 ${isDark ? "text-gray-200" : "text-[#8B4513]"} mr-3`}
                                />
                                <h3
                                    className={`text-xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"}`}
                                >
                                    Curated Sources
                                </h3>
                            </div>
                            <p
                                className={`${isDark ? "text-gray-400" : "text-[#8B4513]/80"}`}
                            >
                                Choose from premium news sources like BBC, CNN,
                                Indian Express, and more. Select your preferred
                                genre and get instant access to clean, ad-free
                                content.
                            </p>
                        </div>

                        <div
                            className={`${isDark ? "bg-gray-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-6 shadow-lg border ${isDark ? "border-gray-700" : "border-[#8B4513]/20"}`}
                        >
                            <div className="flex items-center mb-4">
                                <Star
                                    className={`w-8 h-8 ${isDark ? "text-gray-200" : "text-[#8B4513]"} mr-3`}
                                />
                                <h3
                                    className={`text-xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"}`}
                                >
                                    Smart Summaries
                                </h3>
                            </div>
                            <p
                                className={`${isDark ? "text-gray-400" : "text-[#8B4513]/80"}`}
                            >
                                Get high-quality summaries for every article,
                                helping you quickly grasp key points without
                                reading through lengthy content.
                            </p>
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div
                        className={`${isDark ? "bg-gray-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-8 md:p-12 shadow-lg border ${isDark ? "border-gray-700" : "border-[#8B4513]/20"} mb-12`}
                    >
                        <h2
                            className={`text-3xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"} mb-6 text-center`}
                        >
                            How It Works
                        </h2>
                        <div className="space-y-6">
                            {[1, 2, 3].map((num, index) => (
                                <div key={index} className="flex items-start">
                                    <div
                                        className={`w-8 h-8 rounded-full ${isDark ? "bg-gray-700" : "bg-[#8B4513]"} text-white flex items-center justify-center flex-shrink-0 mt-1`}
                                    >
                                        {num}
                                    </div>
                                    <p
                                        className={`ml-4 text-lg ${isDark ? "text-gray-400" : "text-[#8B4513]/80"}`}
                                    >
                                        {index === 0 &&
                                            "Choose your favorite news agency from our curated list of trusted sources."}
                                        {index === 1 &&
                                            "Select your preferred genre - from politics to sports and everything in between."}
                                        {index === 2 &&
                                            "Get instant access to clean, ad-free articles with smart summaries."}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Closing Section */}
                    <div className="text-center">
                        <BookOpen
                            className={`w-12 h-12 mx-auto ${isDark ? "text-gray-200" : "text-[#8B4513]"} mb-4`}
                        />
                        <p
                            className={`text-lg ${isDark ? "text-gray-400" : "text-[#8B4513]/80"} italic mb-6`}
                        >
                            Thank you for visiting LumiFeed. Enjoy your
                            distraction-free news reading experience!
                        </p>
                        <div
                            className={`w-24 h-1 ${isDark ? "bg-gray-700" : "bg-[#8B4513]/20"} mx-auto`}
                        />
                    </div>
                </div>

                <style>{`
                    @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");
                `}</style>
            </div>
            <Footer />
        </>
    );
};

export default AboutSection;
