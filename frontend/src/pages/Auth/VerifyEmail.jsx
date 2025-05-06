import { Mail, CheckCircle2 } from "lucide-react";

// Email Verification Component
const VerifyEmail = () => {
    return (
        <div className="min-h-screen bg-[#F2E8CF] flex items-center justify-center p-4 font-[Cormorant]">
            {/* Decorative Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64">
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
                <div className="absolute bottom-0 right-0 w-96 h-96">
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
                    <Mail className="w-16 h-16 mx-auto text-[#8B4513] mb-4" />
                    <h1 className="text-4xl md:text-5xl font-[Cinzel] text-[#8B4513] tracking-wider mb-2">
                        Verify Your Email
                    </h1>
                    <p className="text-[#8B4513]/80 italic text-lg">
                        A message awaits in your correspondence
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white/40 backdrop-blur-md rounded-lg p-8 shadow-xl border border-[#8B4513]/20">
                    <div className="text-center space-y-6">
                        <CheckCircle2 className="w-16 h-16 mx-auto text-[#8B4513]/60" />
                        <div className="space-y-4">
                            <p className="text-xl text-[#8B4513]">
                                We have dispatched a verification letter to your
                                email address
                            </p>
                            <p className="text-[#8B4513]/80 italic">
                                Please open the missive and click upon the
                                verification link contained within
                            </p>
                        </div>
                        <div className="pt-6 border-t border-[#8B4513]/20">
                            <p className="text-[#8B4513]/80">
                                Haven't received our message?{" "}
                                <button className="text-[#8B4513] hover:underline font-semibold">
                                    Request another
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Bottom Element */}
                <div className="mt-8 text-center opacity-60">
                    <div className="w-24 h-1 bg-[#8B4513]/20 mx-auto mb-4" />
                    <p className="text-[#8B4513]/60 text-sm italic">
                        "Patience is the companion of wisdom"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
