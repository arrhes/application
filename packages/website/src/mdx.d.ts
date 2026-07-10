declare module "*.mdx" {
    const MDXComponent: (props: { components?: Record<string, any> }) => React.ReactElement
    export default MDXComponent
}

declare module "*.md" {
    const content: string
    export default content
}
