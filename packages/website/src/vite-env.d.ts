/// <reference types="vite/client" />

declare module "virtual:docs-search-index" {
    export interface DocsSearchEntry {
        path: string
        title: string
        description: string
        section: string
        navGroup: string
        navLabel: string
        content: string
    }
    export const docsSearchIndex: DocsSearchEntry[]
}
