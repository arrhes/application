import { css } from "@comptasse/ui/utilities/cn.js"
import { useState } from "react"
import { DocHeader } from "../../../../../components/document/DocHeader.js"
import { DocLink } from "../../../../../components/document/DocLink.js"
import { DocParagraph } from "../../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../../components/document/DocSection.js"
import { DocTip } from "../../../../../components/document/DocTip.js"
import { SearchBar } from "../../../../../components/layouts/SearchBar.js"
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
                <DocLink to="/documentation/comptabilité/introduction/comptes">Les comptes</DocLink>,{" "}
                <DocLink to="/documentation/comptabilité/introduction/écritures">Les écritures</DocLink> et{" "}
                <DocLink to="/documentation/comptabilité/documents">Les documents</DocLink>.
            </DocTip>

            <SearchBar
                value={query}
                onChange={setQuery}
                ariaLabel="Rechercher un terme"
                placeholder="Rechercher un terme..."
            />

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
                        <div
                            className={css({
                                padding: "2rem 0",
                                textAlign: "center",
                            })}
                        >
                            <DocParagraph>Aucun terme ne correspond à votre recherche.</DocParagraph>
                        </div>
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
                        <DocSection
                            key={letter}
                            title={letter}
                        >
                            {terms.map((term) => (
                                <GlossaryListItem
                                    key={term.slug}
                                    term={term.term}
                                    englishTranslation={term.englishTranslation}
                                    slug={term.slug}
                                    definition={term.definition}
                                />
                            ))}
                        </DocSection>
                    ))}
                </div>
            )}
        </DocRoot>
    )
}
