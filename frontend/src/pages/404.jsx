import { useNavigate } from "react-router-dom";
import { BookX, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4 font-sentient">
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
                    <BookX className="w-16 h-16 mx-auto text-[#8B4513] mb-4" />
                    <h1 className="text-4xl md:text-5xl font-zodiak text-[#8B4513] tracking-wider mb-2">
                        Page Not Found
                    </h1>
                    <p className="text-[#8B4513]/80 italic text-lg">
                        This manuscript appears to be missing
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white/40 backdrop-blur-md rounded-lg p-8 shadow-xl border border-[#8B4513]/20">
                    <div className="text-center space-y-6">
                        <div className="space-y-4">
                            <p className="text-4xl text-[#8B4513] font-zodiak">
                                404
                            </p>
                            <p className="text-xl text-[#8B4513]">
                                The page you seek eludes our archives
                            </p>
                            <p className="text-[#8B4513]/80 italic">
                                Like a lost scroll in an ancient library, this
                                page cannot be found in our collection
                            </p>
                        </div>

                        <button
                            onClick={() => navigate(-1)}
                            className="group inline-flex items-center gap-2 bg-[#8B4513] text-[#F2E8CF] px-6 py-3 rounded-md
                     font-zodiak hover:bg-[#8B4513]/90 transition-all duration-300"
                        >
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            Return to Previous Page
                        </button>
                    </div>
                </div>

                {/* Decorative Bottom Element */}
                <div className="mt-8 text-center opacity-60">
                    <div className="w-24 h-1 bg-[#8B4513]/20 mx-auto mb-4" />
                    <p className="text-[#8B4513]/60 text-sm italic">
                        &quot;Not all who wander are lost&quot;
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
