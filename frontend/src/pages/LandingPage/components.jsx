import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const VisitLandingPageBtn = ({ myClass, buttonText, href }) => {
    return (
        <div className={`text-center ${myClass}`}>
            <NavLink
                to={`/${href}`}
                className="group relative inline-flex items-center gap-3 bg-[#8B4513] text-[#F2E8CF] px-10 py-4 rounded-md
        font-sentient text-xl overflow-hidden"
            >
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    {buttonText}
                </span>
                <ArrowRight className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-[#8B4513] transform transition-transform duration-300 group-hover:scale-x-110" />
                <div className="absolute inset-0 bg-[#724939] transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
            </NavLink>
        </div>
    );
};

export { VisitLandingPageBtn };
