import type { Plugin } from "vite"

export function fontPreloadPlugin(): Plugin {
    return {
        name: "font-preload",
        transformIndexHtml: {
            order: "post",
            handler(_html, ctx) {
                const fontAssets = (ctx.bundle ? Object.keys(ctx.bundle) : []).filter((name) => name.endsWith(".woff2"))
                return fontAssets.map((font) => ({
                    tag: "link",
                    attrs: {
                        rel: "preload",
                        as: "font",
                        type: "font/woff2",
                        href: `/${font}`,
                        crossorigin: "anonymous",
                    },
                    injectTo: "head" as const,
                }))
            },
        },
    }
}
