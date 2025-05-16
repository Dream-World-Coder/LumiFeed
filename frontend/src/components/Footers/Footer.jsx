import { Github, Instagram } from "lucide-react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import AppLogo from "../Logo";

const Footer = () => {
    const { isDark } = useDarkMode();

    return (
        <>
            <footer
                className={`${
                    isDark
                        ? "bg-stone-900 border-stone-700"
                        : "bg-cream-light border-[#8B4513]/20"
                } border-t mt-0 transition-colors duration-300 isolate z-50`}
            >
                {/* mt-16 -> mt-0 */}
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Brand */}
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start mb-4">
                                <AppLogo
                                    width={28}
                                    height={28}
                                    backgroundColor="#8B4513"
                                    letterColor="#FFFFFF"
                                    className={`${isDark ? "invert" : "invert-0"}`}
                                />
                                <span
                                    className={`ml-2 text-xl font-zodiak ${
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
                                className={`font-zodiak ${
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
                                    } font-sentient`}
                                >
                                    Home
                                </a>
                                <a
                                    href="/about"
                                    className={`block ${
                                        isDark
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#8B4513]/80 hover:text-[#8B4513]"
                                    } font-sentient`}
                                >
                                    About
                                </a>
                                <a
                                    href="/contact"
                                    className={`block ${
                                        isDark
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#8B4513]/80 hover:text-[#8B4513]"
                                    } font-sentient`}
                                >
                                    Contact
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="text-center md:text-left">
                            <h3
                                className={`font-zodiak ${
                                    isDark ? "text-gray-200" : "text-[#8B4513]"
                                } mb-4`}
                            >
                                Connect
                            </h3>
                            <div className="space-y-2">
                                {/* <a
                                    href="mailto:lumifeed101@gmail.com"
                                    className={`flex items-center justify-center md:justify-start ${
                                        isDark
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#8B4513]/80 hover:text-[#8B4513]"
                                    } font-sentient`}
                                >
                                    <Mail className="h-5 w-5 mr-2" />
                                    Email
                                </a> */}
                                <a
                                    href="https://github.com/Dream-World-Coder/LumiFeed"
                                    target="_blank"
                                    title="visit github repository"
                                    className={`flex items-center justify-center md:justify-start ${
                                        isDark
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#8B4513]/80 hover:text-[#8B4513]"
                                    } font-sentient`}
                                >
                                    <Github className="h-5 w-5 mr-2" />
                                    Github
                                </a>
                                <a
                                    href="#"
                                    className={`flex items-center justify-center md:justify-start ${
                                        isDark
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#8B4513]/80 hover:text-[#8B4513]"
                                    } font-sentient`}
                                >
                                    <Instagram className="h-5 w-5 mr-2" />
                                    Socials
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
                            } font-sentient`}
                        >
                            Copyright © 2025 Subhajit Gorai. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
