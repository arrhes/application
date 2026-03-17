import { css } from "@arrhes/ui/utilities/cn.js"
import { IconSearch } from "@tabler/icons-react"
import { useState } from "react"
import { DocHeader } from "../../../../components/document/docHeader.js"
import { DocLink } from "../../../../components/document/docLink.js"
import { DocNextPage } from "../../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../../components/document/docParagraph.js"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { DocTip } from "../../../../components/document/docTip.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { getGlossaryTermsByLetter, searchGlossaryTerms } from "./glossaryData.js"

export function GlossaryIndexPage() {
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
                                    borderColor: "neutral/10",
                                })}
                            >
                                {letter}
                            </h2>
                            {terms.map((term) => (
                                <GlossaryListItem
                                    key={term.slug}
                                    term={term.term}
                                    slug={term.slug}
                                    definition={term.definition}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}

            <DocTip variant="tip">
                Ce glossaire est un aide-mémoire. Pour comprendre ces concepts en profondeur, consultez les pages du
                cours : <DocLink to="/documentation/comptabilité/introduction">Introduction</DocLink>,{" "}
                <DocLink to="/documentation/comptabilité/comptes">Les comptes</DocLink>,{" "}
                <DocLink to="/documentation/comptabilité/écritures">Les écritures</DocLink> et{" "}
                <DocLink to="/documentation/comptabilité/documents">Les documents</DocLink>.
            </DocTip>

            <DocNextPage to="/documentation/dashboard/démarrage" label="Guide : Démarrer avec Arrhes" />
        </DocRoot>
    )
}

function GlossaryListItem(props: { term: string; slug: string; definition: string }) {
    return (
        <LinkButton
            to="/documentation/comptabilité/glossaire/$term"
            params={{ term: props.slug }}
            className={css({ width: "100%" })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    backgroundColor: "white",
                    _hover: {
                        borderColor: "primary/30",
                        backgroundColor: "primary/5",
                    },
                    transition: "all 0.15s",
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: "100%",
                })}
            >
                <span
                    className={css({
                        fontSize: "sm",
                        fontWeight: "semibold",
                        color: "neutral",
                    })}
                >
                    {props.term}
                </span>
                <span
                    className={css({
                        fontSize: "sm",
                        color: "neutral/50",
                        lineHeight: "1.5",
                        lineClamp: 2,
                    })}
                >
                    {props.definition}
                </span>
            </div>
        </LinkButton>
    )
}
