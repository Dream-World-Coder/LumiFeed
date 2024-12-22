import React from "react";
import { Feather, Mail, Github } from "lucide-react";
import { useDarkMode } from "../../contexts/DarkModeContext";

const Footer = () => {
    const { isDark } = useDarkMode();

    return (
        <>
            <footer
                className={`${
                    isDark
                        ? "bg-gray-900 border-gray-700"
                        : "bg-[#F2E8CF] border-[#8B4513]/20"
                } border-t mt-0 transition-colors duration-300 isolate z-50`}
            >
                {/* mt-16 -> mt-0 */}
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Brand */}
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start mb-4">
                                <Feather
                                    className={`h-8 w-8 ${
                                        isDark
                                            ? "text-gray-200"
                                            : "text-[#8B4513]"
                                    }`}
                                />
                                <span
                                    className={`ml-2 text-xl font-[Cinzel] ${
                                        isDark
                                            ? "text-gray-200"
                                            : "text-[#8B4513]"
                                    }`}
                                >
                                    LumiFeed
                                </span>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="text-center md:text-left">
                            <h3
                                className={`font-[Cinzel] ${
                                    isDark ? "text-gray-200" : "text-[#8B4513]"
                                } mb-4`}
                            >
                                Navigation
                            </h3>
                            <div className="space-y-2">
                                <a
                                    href="/home"
                                    className={`block ${
                                        isDark
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#8B4513]/80 hover:text-[#8B4513]"
                                    } font-[Cormorant]`}
                                >
                                    Home
                                </a>
                                <a
                                    href="/about"
                                    className={`block ${
                                        isDark
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#8B4513]/80 hover:text-[#8B4513]"
                                    } font-[Cormorant]`}
                                >
                                    About
                                </a>
                                <a
                                    href="/contact"
                                    className={`block ${
                                        isDark
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#8B4513]/80 hover:text-[#8B4513]"
                                    } font-[Cormorant]`}
                                >
                                    Contact
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="text-center md:text-left">
                            <h3
                                className={`font-[Cinzel] ${
                                    isDark ? "text-gray-200" : "text-[#8B4513]"
                                } mb-4`}
                            >
                                Connect
                            </h3>
                            <div className="space-y-2">
                                <a
                                    href="#"
                                    className={`flex items-center justify-center md:justify-start ${
                                        isDark
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#8B4513]/80 hover:text-[#8B4513]"
                                    } font-[Cormorant]`}
                                >
                                    <Mail className="h-5 w-5 mr-2" />
                                    Email
                                </a>
                                <a
                                    href="#"
                                    className={`flex items-center justify-center md:justify-start ${
                                        isDark
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#8B4513]/80 hover:text-[#8B4513]"
                                    } font-[Cormorant]`}
                                >
                                    <Github className="h-5 w-5 mr-2" />
                                    Github
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div
                        className={`mt-8 pt-8 border-t ${
                            isDark ? "border-gray-700" : "border-[#8B4513]/20"
                        } text-center`}
                    >
                        <p
                            className={`${
                                isDark ? "text-gray-500" : "text-[#8B4513]/60"
                            } font-[Cormorant]`}
                        >
                            Copyright © 2024 Subhajit Gorai. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");
            `}</style>
        </>
    );
};

export default Footer;
