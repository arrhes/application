import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(() => {
    return {
        plugins: [
            react({
                include: "**/*.tsx",
            }),
        ],
        root: "./src",
        publicDir: "../public",
        base: "/",
        envDir: "../",
        server: {
            host: true,
            port: 5174,
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
                        if (id.includes("@react-pdf")) {
                            return "pdf"
                        }
                        if (id.includes("features/dashboard/$idOrganization/organizationStorage")) {
                            return "storage"
                        }
                        if (id.includes("features/dashboard/$idYear/yearSettings")) {
                            return "year-settings"
                        }
                        if (id.includes("features/dashboard/$idYear/reports")) {
                            return "reports"
                        }
                        if (id.includes("features/dashboard/$idYear/entries")) {
                            return "entries"
                        }
                        if (id.includes("features/dashboard/$idYear/inventory")) {
                            return "inventory"
                        }
                    },
                },
            },
        },
    }
})
