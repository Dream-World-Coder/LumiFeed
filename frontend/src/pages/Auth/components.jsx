import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="fixed top-8 left-8 flex items-center box-content rounded-lg
            gap-1 px-1 pt-1 bg-cream-dark/40 font-zodiak text-sm text-[#8B4513]
            border-b border-[#8B4513] hover:bg-[#8B4513]/20 transition-all duration-300"
        >
            <ChevronLeftIcon size={20} />
            Go Back
        </button>
    );
};

export default BackButton;
