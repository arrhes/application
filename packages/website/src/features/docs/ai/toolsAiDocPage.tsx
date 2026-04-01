import { css } from "@arrhes/ui/utilities/cn.js"
import { useMemo, useState } from "react"
import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocList } from "../../../components/document/docList.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"
import { type AgentToolDefinition, agentToolsCatalog } from "../../dashboard/agent/agentToolsCatalog.ts"

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

export function ToolsAiDocPage() {
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

    const totalToolCount = agentToolsCatalog.length

    return (
        <DocRoot>
            <DocHeader
                title="Outils"
                description={`Liste complète des ${totalToolCount} outils disponibles pour l'assistant comptable.`}
            />

            <DocSection title="Qu'est-ce qu'un outil ?">
                <DocParagraph>
                    Les outils sont les actions concrètes que l'assistant IA peut effectuer sur vos données comptables.
                    Lorsque vous envoyez un message, l'assistant analyse votre demande, identifie les outils
                    nécessaires, puis les exécute automatiquement pour vous fournir une réponse.
                </DocParagraph>
                <DocParagraph>
                    Un seul message peut déclencher plusieurs outils en chaîne. Par exemple, pour répondre à « Quel est
                    le solde du compte 411 ? », l'assistant peut d'abord rechercher le compte, puis consulter ses
                    mouvements, et enfin calculer le solde.
                </DocParagraph>
                <DocList
                    variant="bullet"
                    items={[
                        "Chaque outil correspond à une opération précise (lecture, création, modification, suppression, calcul)",
                        "L'assistant peut enchaîner jusqu'à 10 appels d'outils par message",
                        "Les outils opèrent exclusivement dans le périmètre de votre organisation",
                    ]}
                />
            </DocSection>

            <DocTip variant="tip">
                Vous ne trouvez pas l'outil dont vous avez besoin, ou l'assistant ne parvient pas à réaliser une tâche ?
                N'hésitez pas à nous contacter pour suggérer de nouveaux outils. L'assistant est en amélioration
                continue et de nouvelles capacités sont ajoutées régulièrement.
            </DocTip>

            {/* Search bar */}
            <div className={css({ marginBottom: "1rem" })}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher un outil..."
                    className={css({
                        width: "100%",
                        maxWidth: "24rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "md",
                        border: "1px solid",
                        borderColor: "neutral/20",
                        fontSize: "sm",
                        color: "neutral",
                        outline: "none",
                        _focus: { borderColor: "primary" },
                        _placeholder: { color: "neutral/30" },
                    })}
                />
            </div>

            {/* Tool categories */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                })}
            >
                {groupedTools.map(([category, tools]) => (
                    <div key={category} className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                        <h3
                            className={css({
                                fontSize: "sm",
                                fontWeight: "semibold",
                                color: "neutral",
                                margin: 0,
                                paddingBottom: "0.25rem",
                                borderBottom: "1px solid",
                                borderBottomColor: "neutral/10",
                            })}
                        >
                            {category} ({tools.length})
                        </h3>

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
        </DocRoot>
    )
}
