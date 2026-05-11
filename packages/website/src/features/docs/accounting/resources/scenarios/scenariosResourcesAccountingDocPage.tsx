import { ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconLoader2, IconSearch } from "@tabler/icons-react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef, useState, useTransition } from "react"
import { DocHeader } from "../../../../../components/document/docHeader.js"
import { DocParagraph } from "../../../../../components/document/docParagraph.js"
import { DocRoot } from "../../../../../components/document/docRoot.js"
import { DocSection } from "../../../../../components/document/docSection.js"
import { LinkButton } from "../../../../../components/linkButton.js"
import { type ScenarioEntry, scenarioEntries, searchScenarios } from "./scenariosData.js"

const ROW_HEIGHT = 32
const ROW_GAP = 4 // 0.25rem

function ScenarioRow(props: { scenario: ScenarioEntry }) {
    const { scenario } = props

    return (
        <LinkButton
            to="/documentation/comptabilité/ressources/scénarios/$scenario"
            params={{ scenario: scenario.id }}
            className={css({
                width: "100%",
            })}
        >
            <ButtonGhostContent
                text={scenario.title}
                className={css({
                    width: "100%",
                    justifyContent: "start",
                })}
            />
        </LinkButton>
    )
}

export function ScenariosResourcesAccountingDocPage() {
    const [query, setQuery] = useState("")
    const [filteredScenarios, setFilteredScenarios] = useState<ScenarioEntry[]>(scenarioEntries)
    const [isPending, startTransition] = useTransition()
    const parentRef = useRef<HTMLDivElement>(null)
    const hasQuery = query.trim().length > 0

    const virtualizer = useVirtualizer({
        count: filteredScenarios.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => ROW_HEIGHT + ROW_GAP,
        overscan: 20,
    })

    function handleSearch(value: string) {
        setQuery(value)
        startTransition(() => {
            if (!value.trim()) {
                setFilteredScenarios(scenarioEntries)
            } else {
                setFilteredScenarios(searchScenarios(value))
            }
        })
    }

    return (
        <DocRoot>
            <DocHeader
                title="Scénarios comptables"
                description="Liste des cas d'usage liés aux comptes du Plan Comptable Général"
            />

            <DocSection title="Liste des scénarios">
                <DocParagraph>
                    Cette page regroupe les cas d'usage issus des exemples de comptes. Chaque scénario contient un
                    exemple d'écriture et les comptes concernés pour faciliter la navigation entre pratique et théorie.
                </DocParagraph>
            </DocSection>

            <div
                className={css({
                    position: "relative",
                })}
            >
                {isPending ? (
                    <IconLoader2
                        size={16}
                        className={css({
                            position: "absolute",
                            left: "0.75rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            stroke: "primary",
                            pointerEvents: "none",
                            animation: "spin 1s linear infinite",
                        })}
                    />
                ) : (
                    <IconSearch
                        size={16}
                        className={css({
                            position: "absolute",
                            left: "0.75rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            stroke: "neutral/40",
                            pointerEvents: "none",
                        })}
                    />
                )}
                <input
                    type="text"
                    placeholder="capital, 512, fournisseur, amortissement..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={css({
                        width: "100%",
                        padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                        fontSize: "sm",
                        borderRadius: "lg",
                        border: "1px solid",
                        borderColor: "neutral/15",
                        backgroundColor: "white",
                        color: "neutral",
                        outline: "none",
                        _focus: {
                            borderColor: "primary/50",
                            boxShadow: "0 0 0 3px token(colors.primary/10)",
                        },
                        _placeholder: {
                            color: "neutral/40",
                        },
                        transition: "all 0.15s",
                    })}
                />
            </div>

            <span
                className={css({
                    fontSize: "xs",
                    color: "neutral/40",
                    fontWeight: "medium",
                })}
            >
                {filteredScenarios.length} scénario{filteredScenarios.length !== 1 ? "s" : ""}
                {hasQuery ? " trouvé" : ""}
                {hasQuery && filteredScenarios.length !== 1 ? "s" : ""}
            </span>

            {filteredScenarios.length > 0 ? (
                <div
                    ref={parentRef}
                    className={css({
                        height: "70vh",
                        maxHeight: "800px",
                        overflow: "auto",
                        borderRadius: "lg",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        padding: "0.5rem",
                    })}
                >
                    <div
                        style={{
                            height: `${virtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        {virtualizer.getVirtualItems().map((virtualItem) => (
                            <div
                                key={virtualItem.key}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: `${virtualItem.size - ROW_GAP}px`,
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}
                            >
                                <ScenarioRow scenario={filteredScenarios[virtualItem.index]} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                !isPending && (
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/50",
                            padding: "2rem 0",
                            textAlign: "center",
                        })}
                    >
                        Aucun scénario ne correspond à votre recherche.
                    </p>
                )
            )}
        </DocRoot>
    )
}
