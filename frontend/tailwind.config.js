/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                cream: {
                    DEFAULT: "#FFF5E9",
                    light: "#FFFAF2",
                    dark: "#E6D4C4",
                },
                yellowCream: "#FFFFE3",
            },
            fontFamily: {
                doulaise: ["Newsreader", "normal"],
                reader: ["Zodiak", "serif"],
                zodiak: ["Zodiak", "serif"],
                sentient: ["SentientLight", "serif"],
            },
        },
    },
    plugins: [],
};
