import React from "react";
import { BookOpen, Newspaper, Star } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useDarkMode } from "../../contexts/DarkModeContext";

const AboutSection = () => {
    const { isDark } = useDarkMode();

    return (
        <>
            <Header />
            <div
                className={`min-h-screen ${isDark ? "bg-stone-900" : "bg-cream"} font-sentient py-16 px-4 mt-[2rem]`}
            >
                {/* Main Container */}
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h1
                            className={`text-4xl md:text-5xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"} tracking-wider mb-4`}
                        >
                            About LumiFeed
                        </h1>
                        <div
                            className={`w-24 h-1 ${isDark ? "bg-stone-700" : "bg-[#8B4513]/20"} mx-auto`}
                        />
                    </div>

                    {/* Introduction Card */}
                    <div
                        className={`${isDark ? "bg-stone-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-8 md:p-12 shadow-lg border ${isDark ? "border-stone-700" : "border-[#8B4513]/20"} mb-12`}
                    >
                        <h2
                            className={`text-3xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"} mb-6 text-center`}
                        >
                            News Reader that delivers different experience
                        </h2>
                        <p
                            className={`text-lg ${isDark ? "text-stone-400" : "text-[#8B4513]/80"} leading-relaxed mb-6`}
                        >
                            Welcome to LumiFeed, a clutter-free news reading
                            platform. This isn&apos;t your traditional news
                            source; instead, it&apos;s more of a &quot;RSS
                            Reader.&quot; But It has many other features besides
                            that, be sure to explore all of them.
                        </p>
                        <div
                            className={`border-l-4 ${isDark ? "border-stone-700" : "border-[#8B4513]/20"} pl-6 my-8 py-2`}
                        >
                            <p
                                className={`text-xl italic ${isDark ? "text-stone-300" : "text-[#8B4513]/90"}`}
                            >
                                &quot;Where ancient wisdom meets modern
                                convenience&quot;
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div
                            className={`${isDark ? "bg-stone-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-6 shadow-lg border ${isDark ? "border-stone-700" : "border-[#8B4513]/20"}`}
                        >
                            <div className="flex items-center mb-4">
                                <Newspaper
                                    className={`w-8 h-8 ${isDark ? "text-stone-200" : "text-[#8B4513]"} mr-3`}
                                />
                                <h3
                                    className={`text-xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                                >
                                    Curated Sources
                                </h3>
                            </div>
                            <p
                                className={`${isDark ? "text-stone-400" : "text-[#8B4513]/80"}`}
                            >
                                Choose from various news sources like BBC, CNN,
                                Indian Express, and more. Select your preferred
                                genre and get instant access to clean, ad-free
                                content.
                            </p>
                        </div>

                        <div
                            className={`${isDark ? "bg-stone-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-6 shadow-lg border ${isDark ? "border-stone-700" : "border-[#8B4513]/20"}`}
                        >
                            <div className="flex items-center mb-4">
                                <Star
                                    className={`w-8 h-8 ${isDark ? "text-stone-200" : "text-[#8B4513]"} mr-3`}
                                />
                                <h3
                                    className={`text-xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                                >
                                    Smart Summaries
                                </h3>
                            </div>
                            <p
                                className={`${isDark ? "text-stone-400" : "text-[#8B4513]/80"}`}
                            >
                                Get high-quality summaries for every article,
                                helping you quickly grasp key points without
                                reading through lengthy content.
                            </p>
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div
                        className={`${isDark ? "bg-stone-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-8 md:p-12 shadow-lg border ${isDark ? "border-stone-700" : "border-[#8B4513]/20"} mb-12`}
                    >
                        <h2
                            className={`text-3xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"} mb-6 text-center`}
                        >
                            How It Works
                        </h2>
                        <div className="space-y-6">
                            {[1, 2, 3].map((num, index) => (
                                <div key={index} className="flex items-start">
                                    <div
                                        className={`w-8 h-8 rounded-full ${isDark ? "bg-stone-700" : "bg-[#8B4513]"} text-white flex items-center justify-center flex-shrink-0 mt-1`}
                                    >
                                        {num}
                                    </div>
                                    <p
                                        className={`ml-4 text-lg ${isDark ? "text-stone-400" : "text-[#8B4513]/80"}`}
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
                            className={`w-12 h-12 mx-auto ${isDark ? "text-stone-200" : "text-[#8B4513]"} mb-4`}
                        />
                        <p
                            className={`text-lg ${isDark ? "text-stone-400" : "text-[#8B4513]/80"} italic mb-6`}
                        >
                            Thank you for visiting LumiFeed. Enjoy your
                            distraction-free news reading experience!
                        </p>
                        <div
                            className={`w-24 h-1 ${isDark ? "bg-stone-700" : "bg-[#8B4513]/20"} mx-auto`}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutSection;
