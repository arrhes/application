import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { docsSearchIndexPlugin } from "./plugins/docsSearchIndexPlugin"
import { fontPreloadPlugin } from "./plugins/fontPreloadPlugin"
import { installScriptPlugin } from "./plugins/installScriptPlugin"
import { mdGeneratePlugin } from "./plugins/mdGeneratePlugin"
import { prerenderPlugin } from "./plugins/prerenderPlugin"
import { sitemapPlugin } from "./plugins/sitemapPlugin"

export default defineConfig(() => {
    return {
        plugins: [
            react({
                include: [
                    "**/*.tsx",
                ],
            }),
            fontPreloadPlugin(),
            sitemapPlugin(),
            docsSearchIndexPlugin(),
            mdGeneratePlugin(),
            installScriptPlugin(),
            prerenderPlugin(),
        ],
        root: "./src",
        publicDir: "../public",
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
            emptyOutDir: true,
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
