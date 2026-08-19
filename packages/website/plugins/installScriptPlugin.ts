import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { Plugin } from "vite"

const INSTALL_SCRIPT_PATH = "/install.sh"

/**
 * Dev-only plugin: makes the served /install.sh aware of the origin it was
 * fetched from and the host repository path, by injecting
 * COMPTASSE_SOURCE_ORIGIN and COMPTASSE_REPO_DIR into the script body.
 *
 * - The script picks production (GHCR) vs local build-from-source by origin:
 *   comptasse.com -> production; anything else -> local dev.
 * - COMPTASSE_REPO_DIR lets the local-build path locate the checkout even when
 *   the installer is run from an unrelated working directory (e.g. `curl | sh`
 *   from $HOME). It is only injected when the dev stack can determine it.
 *
 * Production builds serve the untouched static file, so the default origin
 * remains https://comptasse.com and no repo path is injected.
 */
export function installScriptPlugin(): Plugin {
    return {
        name: "install-script-origin",
        apply: "serve",
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const pathname = (req.url ?? "").split("?")[0]
                if (req.method !== "GET" || pathname !== INSTALL_SCRIPT_PATH) {
                    next()
                    return
                }

                const host = req.headers.host ?? "localhost"
                let body: string
                try {
                    body = readFileSync(resolve(import.meta.dirname, "../public/install.sh"), "utf-8")
                } catch {
                    next()
                    return
                }

                const originLine = `COMPTASSE_SOURCE_ORIGIN="http://${host}"`
                const repoDir = (process.env.COMPTASSE_REPO_ROOT ?? "").trim()
                const repoLine = repoDir !== "" ? `COMPTASSE_REPO_DIR="${repoDir}"` : ""
                body = body.replace(
                    /^#!\/bin\/sh\n/,
                    `#!/bin/sh\n\n${[
                        originLine,
                        repoLine,
                    ]
                        .filter(Boolean)
                        .join("\n")}\n`,
                )
                res.statusCode = 200
                res.setHeader("Content-Type", "text/plain; charset=utf-8")
                res.end(body)
            })
        },
    }
}
