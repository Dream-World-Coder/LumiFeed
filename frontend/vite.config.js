import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        compression(),
        visualizer({
            open: false,
        }),
    ],
    server: {
        port: 5173,
    },
    // server: {
    //     proxy: {
    //         "/api": {
    //             target: "http://127.0.0.1:8000",
    //             changeOrigin: true,
    //         },
    //     },
    // },
    build: {
        outDir: "dist",
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom"],
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
