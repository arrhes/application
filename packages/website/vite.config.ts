import mdx from "@mdx-js/rollup"
import react from "@vitejs/plugin-react"
import remarkGfm from "remark-gfm"
import { defineConfig } from "vite"
import { docsSearchIndexPlugin } from "./plugins/docsSearchIndexPlugin"
import { fontPreloadPlugin } from "./plugins/fontPreloadPlugin"
import { prerenderPlugin } from "./plugins/prerenderPlugin"
import { sitemapPlugin } from "./plugins/sitemapPlugin"

export default defineConfig(() => {
    return {
        plugins: [
            mdx({
                remarkPlugins: [
                    remarkGfm,
                ],
            }),
            react({
                include: [
                    "**/*.tsx",
                    "**/*.mdx",
                ],
            }),
            fontPreloadPlugin(),
            sitemapPlugin(),
            docsSearchIndexPlugin(),
            prerenderPlugin(),
        ],
        assetsInclude: [
            "**/*.md",
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
