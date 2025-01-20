import React from "react";
import {
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
// import AppLogo from "../../assets/Logo";

const ContactSection = () => {
    const { isDark } = useDarkMode();

    const mySocials = [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/subhajitgorai",
        },
        {
            name: "Portfolio Website",
            url: "https://subhajit.pages.dev/",
        },
        {
            name: "Email",
            url: "mailto:lumifeed101@gmail.com",
        },
        {
            name: "Personal Blog",
            url: "https://myopencanvas.pages.dev/",
        },
    ];

    return (
        <>
            <Header />

            <div
                className={`min-h-screen ${isDark ? "bg-stone-900" : "bg-cream"} font-sentient py-16 px-4 mt-[2rem]`}
            >
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1
                            className={`text-4xl md:text-5xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"} tracking-wider mb-4`}
                        >
                            Connect &amp; Suggest
                        </h1>
                        <div
                            className={`w-24 h-1 ${isDark ? "bg-stone-700" : "bg-[#8B4513]/20"} mx-auto`}
                        />
                    </div>

                    {/* Developer Info Card */}
                    <div
                        className={`${isDark ? "bg-stone-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-8 md:p-12 shadow-lg border ${isDark ? "border-stone-700" : "border-[#8B4513]/20"} mb-12`}
                    >
                        <div className="text-center mb-8">
                            <h2
                                className={`text-3xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"} mb-4`}
                            >
                                Subhajit Gorai
                            </h2>
                            <p
                                className={`text-lg ${isDark ? "text-stone-400" : "text-[#8B4513]/80"} italic`}
                            >
                                Developer and Maintainer
                            </p>
                            <p
                                className={`text-lg ${isDark ? "text-stone-400" : "text-[#8B4513]/80"} font-semibold`}
                            >
                                {/* IIEST Shibpur */}
                            </p>
                        </div>

                        <div
                            className={`border-l-4 ${isDark ? "border-stone-700" : "border-[#8B4513]/20"} pl-6 my-8 py-2`}
                        >
                            <p
                                className={`text-xl italic ${isDark ? "text-stone-300" : "text-[#8B4513]/90"}`}
                            >
                                &quot;I&apos;m always eager to connect and
                                collaborate&quot;
                            </p>
                        </div>
                    </div>

                    {/* Contact Links Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Social Links */}
                        <div className="space-y-6">
                            <h3
                                className={`text-2xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"} mb-6`}
                            >
                                Connect With Me
                            </h3>

                            {/* Social Link Items */}
                            {mySocials.map((social, index) => (
                                <a
                                    key={index}
                                    href={`${social.url}`}
                                    target="_blank"
                                    className={`flex items-center p-4 ${isDark ? "bg-stone-800/40 hover:bg-stone-700/60" : "bg-white/40 hover:bg-white/60"} rounded-lg border ${isDark ? "border-stone-700" : "border-[#8B4513]/20"} transition-all`}
                                >
                                    {/* Icon component would go here */}
                                    <span
                                        className={`text-lg ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                                    >
                                        {social.name}
                                    </span>
                                </a>
                            ))}
                        </div>

                        {/* Contribution Section */}
                        <div className="space-y-6">
                            <h3
                                className={`text-2xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"} mb-6`}
                            >
                                Contribute
                            </h3>

                            <div
                                className={`${isDark ? "bg-stone-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-6 border ${isDark ? "border-stone-700" : "border-[#8B4513]/20"}`}
                            >
                                <p
                                    className={`text-lg ${isDark ? "text-stone-400" : "text-[#8B4513]/80"} mb-6`}
                                >
                                    This project is open source! Your
                                    contributions are welcome and appreciated.
                                </p>

                                <a
                                    href="https://github.com/Dream-World-Coder/LumiFeed"
                                    target="_blank"
                                    className={`flex items-center justify-center p-4 ${isDark ? "bg-stone-700 hover:bg-stone-600" : "bg-[#8B4513] hover:bg-[#8B4513]/90"} text-white rounded-lg transition-all`}
                                >
                                    <Github className="w-6 h-6 mr-2" />
                                    <span>View on GitHub</span>
                                </a>
                            </div>

                            <div
                                className={`${isDark ? "bg-stone-800/40" : "bg-white/40"} backdrop-blur-md rounded-lg p-6 border ${isDark ? "border-stone-700" : "border-[#8B4513]/20"}`}
                            >
                                <a href="/contact-form">
                                    <div className="flex items-center mb-4">
                                        <MessageSquare
                                            className={`w-6 h-6 ${isDark ? "text-stone-200" : "text-[#8B4513]"} mr-2`}
                                        />
                                        <h4
                                            className={`text-xl font-zodiak ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
                                        >
                                            Feedback Welcome
                                        </h4>
                                    </div>
                                    <p
                                        className={`${isDark ? "text-stone-400" : "text-[#8B4513]/80"}`}
                                    >
                                        Your feedback and suggestions are always
                                        welcome. Don&apos;t be shy to reach out!
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Footer */}
                    <div className="text-center">
                        <div
                            className={`w-24 h-1 ${isDark ? "bg-stone-700" : "bg-[#8B4513]/20"} mx-auto mb-4`}
                        />
                        <p
                            className={`${isDark ? "text-stone-500" : "text-[#8B4513]/60"} text-sm italic`}
                        >
                            &quot;Connecting minds across the digital
                            renaissance&quot;
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactSection;
