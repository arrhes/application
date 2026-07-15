import type { ValidParams } from "../../routes/applicationRouter.js"

const variantLabels = {
    tip: "Conseil",
    warning: "Attention",
    info: "Information",
    success: "Félicitations",
    neutral: "Note",
} as const

const variantAlertMap: Record<string, string> = {
    tip: "TIP",
    warning: "WARNING",
    info: "NOTE",
    success: "TIP",
    neutral: "NOTE",
}

export function resolveDocLinkUrl(to: string, params?: ValidParams): string {
    if (!params) return to
    let url = to
    for (const [key, value] of Object.entries(params)) {
        url = url.replaceAll(`$${key}`, String(value))
    }
    return url
}

export function mdCode(text: string): string {
    return `\`${text}\``
}

export function mdCodeBlock(code: string): string {
    return `\n\`\`\`\n${code.trim()}\n\`\`\`\n\n`
}

export function mdDefinition(term: string | undefined, content: string): string {
    const title = term ? `Définition — ${term}` : "Définition"
    return mdTip("neutral", title, content)
}

export function mdExample(title: string | undefined, content: string): string {
    return mdTip("neutral", title ?? "Exemple", content)
}

export function mdHeader(title: string, description?: string): string {
    const lines = [
        `# ${title}`,
        "",
    ]
    if (description) {
        lines.push(description, "")
    }
    return lines.join("\n")
}

export function mdLink(to: string, text: string, params?: ValidParams): string {
    return `[${text}](${resolveDocLinkUrl(to, params)})`
}

export function mdList(items: string[]): string {
    if (items.length === 0) return ""
    return `${items.map((item) => `- ${item}`).join("\n")}\n\n`
}

export function mdParagraph(text: string): string {
    return `${text.trim()}\n\n`
}

export function mdSection(title: string, childrenMarkdown: string): string {
    return `## ${title}\n\n${childrenMarkdown.trim()}\n\n`
}

export function mdSourceRef(n: number): string {
    return `[^${n}]`
}

export function mdTable(headers: string[], rows: string[][]): string {
    if (headers.length === 0 && rows.length === 0) return ""
    const sanitizedHeaders = headers.map((h) => h.replace(/\|/g, "\\|"))
    const sanitizedRows = rows.map((row) => row.map((cell) => (cell === "" ? "-" : cell.replace(/\|/g, "\\|"))))
    const lines: string[] = []
    lines.push(`| ${sanitizedHeaders.join(" | ")} |`)
    lines.push(`|${sanitizedHeaders.map(() => "---").join("|")}|`)
    for (const row of sanitizedRows) {
        lines.push(`| ${row.join(" | ")} |`)
    }
    return `\n${lines.join("\n")}\n\n`
}

export function mdTextSection(title: string, childrenMarkdown: string): string {
    return `## ${title}\n\n${childrenMarkdown.trim()}\n\n`
}

export function mdTip(variant: string, title: string | undefined, content: string): string {
    const alertType = variantAlertMap[variant] ?? "NOTE"
    const resolvedTitle = title ?? variantLabels[variant as keyof typeof variantLabels] ?? "Note"
    const body = content
        .trim()
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n")
    return `> [!${alertType}]\n> **${resolvedTitle}**${content.trim() ? `\n${body}` : ""}\n\n`
}
