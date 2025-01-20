import React, { useState } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// i will take name and email from database if the user is logged in
// maybe this route should be opened only when logged in

const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-cream flex items-center justify-center p-4 font-sentient mt-[4rem]">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-zodiak text-[#8B4513] tracking-wider mb-2">
                            Contact Us
                        </h1>
                    </div>

                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/40 backdrop-blur-md rounded-lg p-8 shadow-lg border border-[#8B4513]/20"
                    >
                        {/* Name Field */}
                        <div className="mb-6">
                            <label className="block text-[#8B4513] font-zodiak mb-2">
                                Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/60" />
                                <input
                                    type="text"
                                    className="w-full bg-white/50 border border-[#8B4513]/20 rounded-md py-3 px-12
                                focus:ring-1 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40
                                outline-none"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="mb-6">
                            <label className="block text-[#8B4513] font-zodiak mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/60" />
                                <input
                                    type="email"
                                    className="w-full bg-white/50 border border-[#8B4513]/20 rounded-md py-3 px-12
                                focus:ring-1 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40
                                outline-none"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className="mb-6">
                            <label className="block text-[#8B4513] font-zodiak mb-2">
                                Message
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-[#8B4513]/60" />
                                <textarea
                                    className="w-full bg-white/50 border border-[#8B4513]/20 rounded-md py-3 px-12
                                focus:ring-1 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40
                                outline-none min-h-32 resize-y"
                                    placeholder="Write your message..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#8B4513] text-[#F2E8CF] py-3 rounded-md font-zodiak
                        hover:bg-[#8B4513]/90 disabled:opacity-70 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-[#F2E8CF] border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Send size={20} />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>

                        {/* Privacy Note */}
                        <p className="text-center mt-6 text-[#8B4513]/60 text-sm italic">
                            Your message will be handled with the utmost
                            discretion
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactForm;
