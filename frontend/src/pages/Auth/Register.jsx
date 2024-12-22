import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Mail, Lock, Feather, User } from "lucide-react";
import BackButton from "./components";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef(null);
    const decorRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
    };

    return (
        <>
            <BackButton />
            <div className="min-h-screen bg-[#F2E8CF] flex items-center justify-center p-4 font-[Cormorant]">
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

                {/* Main Container */}
                <div className="relative max-w-md w-full">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Feather className="w-16 h-16 mx-auto text-[#8B4513] mb-4 form-element" />
                        <h1 className="text-4xl md:text-5xl font-[Cinzel] text-[#8B4513] tracking-wider mb-2 form-element">
                            LumiFeed
                        </h1>
                        <p className="text-[#8B4513]/80 italic text-lg form-element">
                            Welcome back to the renaissance of reading
                        </p>
                    </div>

                    {/* Login Form */}
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="bg-white/40 backdrop-blur-md rounded-lg p-8 shadow-xl border border-[#8B4513]/20"
                    >
                        {/* username Field */}
                        <div className="mb-6 form-element">
                            <label className="block text-[#8B4513] font-[Cinzel] mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/60" />
                                <input
                                    type="text"
                                    className="w-full bg-white/50 border border-[#8B4513]/20 rounded-md py-3 px-12
                         focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40
                         transition-all duration-300 outline-none"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="mb-6 form-element">
                            <label className="block text-[#8B4513] font-[Cinzel] mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/60" />
                                <input
                                    type="email"
                                    className="w-full bg-white/50 border border-[#8B4513]/20 rounded-md py-3 px-12
                         focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40
                         transition-all duration-300 outline-none"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="mb-6 form-element">
                            <label className="block text-[#8B4513] font-[Cinzel] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/60" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-white/50 border border-[#8B4513]/20 rounded-md py-3 px-12
                         focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40
                         transition-all duration-300 outline-none"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B4513]/60
                         hover:text-[#8B4513] transition-colors duration-300"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between mb-6 form-element">
                            <label className="flex items-center space-x-2 text-[#8B4513]/80">
                                <input
                                    type="checkbox"
                                    className="rounded border-[#8B4513]/20"
                                />
                                <span>Remember me</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#8B4513] text-[#F2E8CF] py-3 rounded-md font-[Cinzel]
                     hover:bg-[#8B4513]/90 transition-all duration-300 form-element
                     disabled:opacity-70 disabled:cursor-not-allowed
                     relative overflow-hidden group"
                        >
                            <span
                                className={`inline-block transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
                            >
                                Register
                            </span>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-[#F2E8CF] border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-center mt-6 text-[#8B4513]/80 form-element">
                            Already have an account?{" "}
                            <a
                                href="/auth/login"
                                className="text-[#8B4513] hover:underline font-semibold"
                            >
                                Log In
                            </a>
                        </p>
                    </form>

                    {/* Decorative Bottom Element */}
                    <div className="mt-8 text-center opacity-60 form-element">
                        <div className="w-24 h-1 bg-[#8B4513]/20 mx-auto mb-4" />
                        <p className="text-[#8B4513]/60 text-sm italic">
                            "Knowledge is the light of the mind"
                        </p>
                    </div>
                </div>

                <style jsx global>{`
                    @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");
                `}</style>
            </div>
        </>
    );
};

export default RegisterPage;
