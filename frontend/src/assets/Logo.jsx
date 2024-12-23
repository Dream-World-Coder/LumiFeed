import React from "react";

const AppLogo = ({
    width = 40,
    height = 40,
    backgroundColor = "#000000",
    letterColor = "#FFFFFF",
    className = "",
    ...props
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            {/* Rounded square background */}
            <rect
                x="2"
                y="2"
                width="36"
                height="36"
                rx="6"
                fill={backgroundColor}
            />

            {/* Sheriff-style L */}
            <path d="M12 10V30H28V26H16V10H12Z" fill={letterColor} />

            {/* Optional subtle border for better contrast on light backgrounds */}
            <rect
                x="2"
                y="2"
                width="36"
                height="36"
                rx="6"
                stroke={backgroundColor}
                strokeWidth="2"
            />
        </svg>
    );
};

export default AppLogo;
