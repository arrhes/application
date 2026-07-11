import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { Plugin, ViteDevServer } from "vite"
import { DOC_PAGE_MANIFEST } from "./DOC_PAGE_MANIFEST"

export function mdServePlugin(): Plugin {
    return {
        name: "md-serve",
        configureServer(server: ViteDevServer) {
            server.middlewares.use((req, res, next) => {
                const rawUrl = req.url ?? ""
                if (!rawUrl.endsWith(".md")) return next()

                const decodedUrl = decodeURIComponent(rawUrl)
                const docPath = decodedUrl.replace(/\.md$/, "").replace(/\/$/, "")
                const entry = DOC_PAGE_MANIFEST.find((e: { path: string }) => e.path === docPath)
                if (!entry?.mdxSource) return next()

                const srcRoot = server.config.root
                const sourceFile = resolve(srcRoot, entry.mdxSource)
                try {
                    const content = readFileSync(sourceFile, "utf-8")
                    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
                    res.end(content)
                } catch {
                    next()
                }
            })
        },
    }
}
