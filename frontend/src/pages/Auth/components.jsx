import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="fixed top-8 left-8 flex items-center gap-1 px-1 py-1 bg-[#F2E8CF] font-[Cinzel] text-sm text-[#8B4513] border border-[#8B4513] rounded-md shadow-lg hover:bg-[#8B4513] hover:text-[#F2E8CF] transition-all duration-300"
        >
            <ChevronLeftIcon size={20} />
            Go Back
            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");
            `}</style>
        </button>
    );
};

export default BackButton;
