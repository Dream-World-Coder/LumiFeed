import { useState } from "react";
import PropTypes from "prop-types";

export default function Footer({ currentUser }) {
    const [year] = useState(new Date().getFullYear());

    return (
        <footer className="bg-[#d8d2c2] py-6 px-4 w-full mt-16 dark:bg-[#222]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    {/* Logo */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-5xl font-dahlia text-stone-700 dark:text-neutral-300">
                            LumiFeed
                        </h2>
                    </div>

                    {/* Links Container */}
                    <div className="flex flex-col sm:flex-row gap-8 md:gap-16">
                        {/* Social Links */}
                        <div className="mb-4 sm:mb-0">
                            <ul className="space-y-2">
                                <li className="hover:underline decoration-2 underline-offset-4">
                                    <a
                                        href="mailto:lumifeed101@gmail.com"
                                        className="text-stone-700 dark:text-neutral-300"
                                    >
                                        Email
                                    </a>
                                </li>
                                <li className="hover:underline decoration-2 underline-offset-4">
                                    <a
                                        href="https://github.com/Dream-World-Coder/LumiFeed"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-stone-700 dark:text-neutral-300"
                                    >
                                        Github
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Navigation Links */}
                        <div>
                            <ul className="space-y-2">
                                <li className="hover:underline decoration-2 underline-offset-4">
                                    <a
                                        href="/"
                                        className="text-stone-700 dark:text-neutral-300"
                                    >
                                        Home
                                    </a>
                                </li>
                                {currentUser && (
                                    <li className="hover:underline decoration-2 underline-offset-4">
                                        <a
                                            href={`/profile`}
                                            className="text-stone-700 dark:text-neutral-300"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                )}
                                <li className="hover:underline decoration-2 underline-offset-4">
                                    <a
                                        href="/about"
                                        className="text-stone-700 dark:text-neutral-300"
                                    >
                                        About
                                    </a>
                                </li>
                                <li className="hover:underline decoration-2 underline-offset-4">
                                    <a
                                        href="/contact"
                                        className="text-stone-700 dark:text-neutral-300"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-4 border-t border-[#c8c2b2] dark:border-[#333] text-stone-700 dark:text-neutral-300 text-sm flex justify-between items-center">
                    <div>Copyright © {year} Lumifeed</div>
                    <div className="flex gap-2">
                        <button className="bg-stone-700 text-white p-2 rounded-full hover:bg-stone-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        <button className="bg-stone-700 text-white p-2 rounded-full hover:bg-stone-800 dark:hover:bg-stone-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    currentUser: PropTypes.object,
};
