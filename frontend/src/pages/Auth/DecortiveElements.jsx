import React from "react";

const DecorativeElement = ({ decorRef }) => {
    return (
        <div
            ref={decorRef}
            className="fixed inset-0 pointer-events-none overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-64 h-64 decor-element">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
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
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
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
    );
};

export default DecorativeElement;
