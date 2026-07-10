import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import type { Plugin } from "vite"
import { DOC_PAGE_MANIFEST } from "./DOC_PAGE_MANIFEST"

export function mdServePlugin(): Plugin {
    const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
    const srcRoot = resolve(pkgRoot, "src")

    return {
        name: "md-serve",
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const url = req.url ?? ""
                if (!url.endsWith(".md")) return next()

                const docPath = url.replace(/\.md$/, "").replace(/\/$/, "")
                const entry = DOC_PAGE_MANIFEST.find((e: { path: string }) => e.path === docPath)
                if (!entry?.mdxSource) return next()

                const sourceFile = resolve(srcRoot, entry.mdxSource)
                try {
                    const content = readFileSync(sourceFile, "utf-8")
                    res.setHeader("Content-Type", "text/plain; charset=utf-8")
                    res.end(content)
                } catch {
                    next()
                }
            })
        },
    }
}
