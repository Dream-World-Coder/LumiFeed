import { useState } from "react";
import { AlertTriangle } from "lucide-react";

// Delete Account Component
const DeleteAccount = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsDeleting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsDeleting(false);
    };

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
                    <AlertTriangle className="w-16 h-16 mx-auto text-[#8B4513] mb-4" />
                    <h1 className="text-4xl md:text-5xl font-[Cinzel] text-[#8B4513] tracking-wider mb-2">
                        Farewell?
                    </h1>
                    <p className="text-[#8B4513]/80 italic text-lg">
                        Consider well before departing
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white/40 backdrop-blur-md rounded-lg p-8 shadow-xl border border-[#8B4513]/20">
                    <div className="space-y-6">
                        <div className="space-y-4 text-center">
                            <p className="text-xl text-[#8B4513] font-semibold italic">
                                "In the garden of knowledge, every departure
                                leaves a flower unplucked"
                            </p>
                            <p className="text-[#8B4513]/80">
                                Your journey with us has been a chapter in the
                                grand tome of learning. Each article read, each
                                insight gained, has contributed to your personal
                                renaissance.
                            </p>
                            <p className="text-[#8B4513]/80">
                                Like the great libraries of old, your collection
                                of knowledge here stands as a testament to your
                                quest for understanding. Would you consider
                                preserving this sanctuary?
                            </p>
                        </div>

                        <form onSubmit={handleDelete} className="space-y-6">
                            <div className="pt-6 border-t border-[#8B4513]/20">
                                <label className="flex items-center space-x-2 text-[#8B4513]/80">
                                    <input
                                        type="checkbox"
                                        required
                                        className="rounded border-[#8B4513]/20"
                                    />
                                    <span>
                                        I understand this action cannot be
                                        undone
                                    </span>
                                </label>
                            </div>

                            <div className="flex gap-4">
                                <a
                                    href="/dashboard"
                                    className="flex-1 bg-[#8B4513]/10 text-[#8B4513] py-3 rounded-md font-[Cinzel]
                     hover:bg-[#8B4513]/20 transition-all duration-300 text-center"
                                >
                                    Return to Library
                                </a>
                                <button
                                    type="submit"
                                    disabled={isDeleting}
                                    className="flex-1 bg-[#8B4513] text-[#F2E8CF] py-3 rounded-md font-[Cinzel]
                     hover:bg-[#8B4513]/90 transition-all duration-300
                     disabled:opacity-70 disabled:cursor-not-allowed
                     relative overflow-hidden"
                                >
                                    <span
                                        className={`inline-block transition-all duration-300 ${isDeleting ? "opacity-0" : "opacity-100"}`}
                                    >
                                        Proceed with Departure
                                    </span>
                                    {isDeleting && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-[#F2E8CF] border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Decorative Bottom Element */}
                <div className="mt-8 text-center opacity-60">
                    <div className="w-24 h-1 bg-[#8B4513]/20 mx-auto mb-4" />
                    <p className="text-[#8B4513]/60 text-sm italic">
                        "Every ending is but a new beginning"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
