import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft } from "@tabler/icons-react"
import { useMemo, useState } from "react"
import { SearchBar } from "../../../components/layouts/searchBar.tsx"
import { LinkButton } from "../../../components/linkButton.tsx"
import { Page } from "../../../components/layouts/page/page.tsx"
import { type AgentToolDefinition, agentToolsCatalog } from "../../agent/agentToolsCatalog.ts"

const categoryOrder = [
    "Exercices fiscaux",
    "Écritures comptables",
    "Lignes d'écriture",
    "Étiquettes d'écriture",
    "Plan comptable",
    "Journaux",
    "Étiquettes",
    "Bilan",
    "Compte de résultat",
    "Calculs et rubriques",
    "Fichiers",
    "Dossiers",
    "Rapports",
    "Exercice (général)",
    "Documentation",
    "Traitement de données",
    "Autres",
] as const

function getToolCategory(toolName: string): string {
    if (toolName === "search_documentation") return "Documentation"
    if (toolName === "process_array") return "Traitement de données"

    if (toolName === "read_all_years") return "Exercices fiscaux"
    if (toolName.includes("one_year") || toolName.startsWith("close_year") || toolName.startsWith("open_year")) {
        return "Exercice (général)"
    }

    if (toolName.includes("entry_line")) return "Lignes d'écriture"
    if (toolName.includes("entry_tag")) return "Étiquettes d'écriture"
    if (toolName.includes("entry") || toolName.includes("entries")) return "Écritures comptables"
    if (toolName.includes("account")) return "Plan comptable"
    if (toolName.includes("journal")) return "Journaux"
    if (toolName.includes("tag")) return "Étiquettes"
    if (toolName.includes("balance_sheet")) return "Bilan"
    if (toolName.includes("income_statement")) return "Compte de résultat"
    if (toolName.includes("computation")) return "Calculs et rubriques"
    if (toolName.includes("file")) return "Fichiers"
    if (toolName.includes("folder")) return "Dossiers"
    if (toolName.includes("document") || toolName.includes("report")) return "Rapports"

    return "Autres"
}

export function AgentToolsPage() {
    const [search, setSearch] = useState("")

    const groupedTools = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase()

        const filteredTools = normalizedSearch.length
            ? agentToolsCatalog.filter((tool) => {
                  const category = getToolCategory(tool.name)
                  return (
                      tool.name.toLowerCase().includes(normalizedSearch) ||
                      tool.labelFr.toLowerCase().includes(normalizedSearch) ||
                      tool.descriptionFr.toLowerCase().includes(normalizedSearch) ||
                      category.toLowerCase().includes(normalizedSearch)
                  )
              })
            : agentToolsCatalog

        const grouped = new Map<string, AgentToolDefinition[]>()

        for (const tool of filteredTools) {
            const category = getToolCategory(tool.name)
            const bucket = grouped.get(category)
            if (bucket) {
                bucket.push(tool)
            } else {
                grouped.set(category, [tool])
            }
        }

        for (const [, tools] of grouped) {
            tools.sort((a, b) => a.labelFr.localeCompare(b.labelFr, "fr"))
        }

        return [...grouped.entries()].sort((a, b) => {
            const indexA = categoryOrder.indexOf(a[0] as (typeof categoryOrder)[number])
            const indexB = categoryOrder.indexOf(b[0] as (typeof categoryOrder)[number])
            const safeA = indexA === -1 ? categoryOrder.length : indexA
            const safeB = indexB === -1 ? categoryOrder.length : indexB
            return safeA - safeB
        })
    }, [search])

    return (
        <Page.Root>
            <Page.Content>
                <Page.Header>
                    <Page.Title>Outils de l'assistant</Page.Title>
                    <Page.Description>
                        Liste complète des outils disponibles pour l'agent, avec leur description en français.
                    </Page.Description>
                </Page.Header>

                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.75rem",
                        flexWrap: "wrap",
                        marginBottom: "0.75rem",
                    })}
                >
                    <LinkButton to="/dashboard/agent" params={{}}>
                        <ButtonOutlineContent leftIcon={<IconChevronLeft size={16} />} text="Retour à l'assistant" />
                    </LinkButton>

                    <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un outil" />
                </div>

                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    })}
                >
                    {groupedTools.map(([category, tools]) => (
                        <div
                            key={category}
                            className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}
                        >
                            <h2
                                className={css({ fontSize: "sm", fontWeight: "semibold", color: "neutral", margin: 0 })}
                            >
                                {category} ({tools.length})
                            </h2>

                            {tools.map((tool) => (
                                <div
                                    key={tool.name}
                                    className={css({
                                        border: "1px solid",
                                        borderColor: "neutral/10",
                                        borderRadius: "md",
                                        padding: "0.75rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.375rem",
                                    })}
                                >
                                    <div
                                        className={css({
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: "0.75rem",
                                        })}
                                    >
                                        <span
                                            className={css({
                                                fontSize: "sm",
                                                fontWeight: "semibold",
                                                color: "neutral",
                                            })}
                                        >
                                            {tool.labelFr}
                                        </span>
                                        <span
                                            className={css({
                                                fontFamily: "mono",
                                                fontSize: "xs",
                                                color: "neutral/60",
                                                backgroundColor: "neutral/5",
                                                border: "1px solid",
                                                borderColor: "neutral/10",
                                                borderRadius: "sm",
                                                paddingX: "0.375rem",
                                                paddingY: "0.125rem",
                                                whiteSpace: "nowrap",
                                            })}
                                        >
                                            {tool.name}
                                        </span>
                                    </div>

                                    <p
                                        className={css({
                                            fontSize: "xs",
                                            color: "neutral/70",
                                            lineHeight: "1.5",
                                            margin: 0,
                                        })}
                                    >
                                        {tool.descriptionFr}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}

                    {groupedTools.length === 0 && (
                        <p className={css({ fontSize: "sm", color: "neutral/60", margin: 0 })}>
                            Aucun outil ne correspond à votre recherche.
                        </p>
                    )}
                </div>
            </Page.Content>
        </Page.Root>
    )
}
