declare module "virtual:doc-md-content" {
    export const DOC_MD_CONTENT: Record<string, string>
    export function getDocMdContent(path: string): Promise<string | null>
}
