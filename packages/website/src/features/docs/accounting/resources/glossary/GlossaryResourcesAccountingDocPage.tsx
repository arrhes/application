import { css } from "@arrhes/ui/utilities/cn.js"
import { IconSearch } from "@tabler/icons-react"
import { useState } from "react"
import { DocHeader } from "../../../../../components/document/DocHeader.js"
import { DocLink } from "../../../../../components/document/DocLink.js"
import { DocParagraph } from "../../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../../components/document/DocRoot.js"
import { DocTip } from "../../../../../components/document/DocTip.js"
import { GlossaryListItem } from "./GlossaryListItem.js"
import { getGlossaryTermsByLetter, searchGlossaryTerms } from "./glossaryData.js"

export function GlossaryResourcesAccountingDocPage() {
    const [query, setQuery] = useState("")
    const isSearching = query.trim().length > 0
    const filteredTerms = searchGlossaryTerms(query)
    const termsByLetter = getGlossaryTermsByLetter()

    return (
        <DocRoot>
            <DocHeader
                title="Glossaire comptable"
                description="Tous les termes essentiels de la comptabilité en un coup d'oeil"
            />

            <DocParagraph>
                Ce glossaire regroupe les définitions des termes comptables utilisés dans le cours. Cliquez sur un terme
                pour voir sa définition complète et les concepts associés.
            </DocParagraph>

            <DocTip variant="tip">
                Ce glossaire est un aide-mémoire. Pour comprendre ces concepts en profondeur, consultez les pages du
                cours : <DocLink to="/documentation/comptabilité/introduction">Introduction</DocLink>,{" "}
                <DocLink to="/documentation/comptabilité/comptes">Les comptes</DocLink>,{" "}
                <DocLink to="/documentation/comptabilité/écritures">Les écritures</DocLink> et{" "}
                <DocLink to="/documentation/comptabilité/documents">Les documents</DocLink>.
            </DocTip>

            {/* Search bar */}
            <div
                className={css({
                    position: "relative",
                })}
            >
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
                <input
                    type="text"
                    placeholder="Rechercher un terme..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={css({
                        width: "100%",
                        padding: "0.625rem 0.75rem 0.625rem 2.25rem",
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

            {/* Search results */}
            {isSearching ? (
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "xs",
                            color: "neutral/40",
                            fontWeight: "medium",
                        })}
                    >
                        {filteredTerms.length} résultat{filteredTerms.length !== 1 ? "s" : ""}
                    </span>
                    {filteredTerms.map((term) => (
                        <GlossaryListItem
                            key={term.slug}
                            term={term.term}
                            englishTranslation={term.englishTranslation}
                            slug={term.slug}
                            definition={term.definition}
                        />
                    ))}
                    {filteredTerms.length === 0 && (
                        <p
                            className={css({
                                fontSize: "sm",
                                color: "neutral/50",
                                padding: "2rem 0",
                                textAlign: "center",
                            })}
                        >
                            Aucun terme ne correspond à votre recherche.
                        </p>
                    )}
                </div>
            ) : (
                /* Alphabetical listing */
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                    })}
                >
                    {Array.from(termsByLetter.entries()).map(([letter, terms]) => (
                        <div
                            key={letter}
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            })}
                        >
                            <h2
                                className={css({
                                    fontSize: "lg",
                                    fontWeight: "semibold",
                                    color: "neutral",
                                    paddingBottom: "0.25rem",
                                    borderBottom: "1px solid",
                                    borderBottomColor: "neutral/10",
                                })}
                            >
                                {letter}
                            </h2>
                            {terms.map((term) => (
                                <GlossaryListItem
                                    key={term.slug}
                                    term={term.term}
                                    englishTranslation={term.englishTranslation}
                                    slug={term.slug}
                                    definition={term.definition}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </DocRoot>
    )
}
