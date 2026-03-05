import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(() => {
    return {
        plugins: [react({ include: "**/*.tsx" })],
        assetsInclude: ["**/*.md"],
        root: "./src",
        base: "/",
        envDir: "../",
        server: {
            host: true,
            port: 5173,
            watch: {
                usePolling: true,
            },
            hmr: true,
        },
        build: {
            outDir: "../build",
            rollupOptions: {
                output: {
                    entryFileNames: "[hash].js",
                    chunkFileNames: "[hash].js",
                    assetFileNames: "[hash].[ext]",
                    manualChunks(id: string) {
                        if (id.includes("react-dom")) {
                            return "react-dom"
                        }
                    },
                },
            },
        },
    }
})
