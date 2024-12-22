import React from "react";
import {
    Feather,
    Linkedin,
    Mail,
    Globe,
    Book,
    Github,
    MessageSquare,
} from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useDarkMode } from "../../contexts/DarkModeContext";

const ContactSection = () => {
    const { isDark, setIsDark } = useDarkMode();

    return (
        <>
            <Header />

            <div
                className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-[#F2E8CF]"} font-[Cormorant] py-16 px-4 mt-[2rem]`}
            >
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Feather
                            className={`w-16 h-16 mx-auto ${isDark ? "text-gray-200" : "text-[#8B4513]"} mb-4`}
                        />
                        <h1
                            className={`text-4xl md:text-5xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"} tracking-wider mb-4`}
                        >
                            Connect With Us
                        </h1>
                        <div
                            className={`w-24 h-1 ${isDark ? "bg-gray-700" : "bg-[#8B4513]/20"} mx-auto`}
                        />
                    </div>

                    {/* Developer Info Card */}
                    <div
                        className={`${isDark ? "bg-gray-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-8 md:p-12 shadow-lg border ${isDark ? "border-gray-700" : "border-[#8B4513]/20"} mb-12`}
                    >
                        <div className="text-center mb-8">
                            <h2
                                className={`text-3xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"} mb-4`}
                            >
                                Subhajit Gorai
                            </h2>
                            <p
                                className={`text-lg ${isDark ? "text-gray-400" : "text-[#8B4513]/80"} italic`}
                            >
                                B.Tech in Information Technology
                            </p>
                            <p
                                className={`text-lg ${isDark ? "text-gray-400" : "text-[#8B4513]/80"} font-semibold`}
                            >
                                IIEST Shibpur
                            </p>
                        </div>

                        <div
                            className={`border-l-4 ${isDark ? "border-gray-700" : "border-[#8B4513]/20"} pl-6 my-8 py-2`}
                        >
                            <p
                                className={`text-xl italic ${isDark ? "text-gray-300" : "text-[#8B4513]/90"}`}
                            >
                                "I'm always eager to connect with fellow tech
                                enthusiasts and readers"
                            </p>
                        </div>
                    </div>

                    {/* Contact Links Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Social Links */}
                        <div className="space-y-6">
                            <h3
                                className={`text-2xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"} mb-6`}
                            >
                                Connect With Me
                            </h3>

                            {/* Social Link Items */}
                            {[
                                "LinkedIn",
                                "Portfolio Website",
                                "Email",
                                "Personal Blog",
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={`flex items-center p-4 ${isDark ? "bg-gray-800/40 hover:bg-gray-700/60" : "bg-white/40 hover:bg-white/60"} rounded-lg border ${isDark ? "border-gray-700" : "border-[#8B4513]/20"} transition-all`}
                                >
                                    {/* Icon component would go here */}
                                    <span
                                        className={`text-lg ${isDark ? "text-gray-200" : "text-[#8B4513]"}`}
                                    >
                                        {item}
                                    </span>
                                </a>
                            ))}
                        </div>

                        {/* Contribution Section */}
                        <div className="space-y-6">
                            <h3
                                className={`text-2xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"} mb-6`}
                            >
                                Contribute
                            </h3>

                            <div
                                className={`${isDark ? "bg-gray-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-6 border ${isDark ? "border-gray-700" : "border-[#8B4513]/20"}`}
                            >
                                <p
                                    className={`text-lg ${isDark ? "text-gray-400" : "text-[#8B4513]/80"} mb-6`}
                                >
                                    This project is open source! Your
                                    contributions are welcome and appreciated.
                                </p>

                                <a
                                    href="#"
                                    className={`flex items-center justify-center p-4 ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-[#8B4513] hover:bg-[#8B4513]/90"} text-white rounded-lg transition-all`}
                                >
                                    <Github className="w-6 h-6 mr-2" />
                                    <span>View on GitHub</span>
                                </a>
                            </div>

                            <div
                                className={`${isDark ? "bg-gray-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-6 border ${isDark ? "border-gray-700" : "border-[#8B4513]/20"}`}
                            >
                                <a href="/contact-form">
                                    <div className="flex items-center mb-4">
                                        <MessageSquare
                                            className={`w-6 h-6 ${isDark ? "text-gray-200" : "text-[#8B4513]"} mr-2`}
                                        />
                                        <h4
                                            className={`text-xl font-[Cinzel] ${isDark ? "text-gray-200" : "text-[#8B4513]"}`}
                                        >
                                            Feedback Welcome
                                        </h4>
                                    </div>
                                    <p
                                        className={`${isDark ? "text-gray-400" : "text-[#8B4513]/80"}`}
                                    >
                                        Your feedback and suggestions are always
                                        welcome. Don't be shy to reach out!
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Footer */}
                    <div className="text-center">
                        <div
                            className={`w-24 h-1 ${isDark ? "bg-gray-700" : "bg-[#8B4513]/20"} mx-auto mb-4`}
                        />
                        <p
                            className={`${isDark ? "text-gray-500" : "text-[#8B4513]/60"} text-sm italic`}
                        >
                            "Connecting minds across the digital renaissance"
                        </p>
                    </div>
                </div>

                <style jsx global>{`
                    @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");
                `}</style>
            </div>
            <Footer />
        </>
    );
};

export default ContactSection;
