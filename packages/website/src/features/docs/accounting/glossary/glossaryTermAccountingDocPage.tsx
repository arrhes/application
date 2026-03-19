import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft, IconBookmark, IconLink } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DocHeader } from "../../../../components/document/docHeader.js"
import { DocLink } from "../../../../components/document/docLink.js"
import { DocParagraph } from "../../../../components/document/docParagraph.js"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { DocSection } from "../../../../components/document/docSection.js"
import { DocSources } from "../../../../components/document/docSources.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { getGlossaryTermBySlug, glossaryTerms } from "./glossaryData.js"

export function GlossaryTermAccountingDocPage() {
    const { term: slug } = useParams({ strict: false }) as { term: string }
    const entry = getGlossaryTermBySlug(slug)

    if (!entry) {
        return (
            <DocRoot>
                <DocHeader title="Terme introuvable" description="Ce terme n'existe pas dans le glossaire." />
                <LinkButton to="/documentation/comptabilité/glossaire">
                    <span
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "sm",
                            color: "primary",
                        })}
                    >
                        <IconArrowLeft size={16} />
                        Retour au glossaire
                    </span>
                </LinkButton>
            </DocRoot>
        )
    }

    return (
        <DocRoot>
            <div>
                <LinkButton to="/documentation/comptabilité/glossaire">
                    <span
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "sm",
                            color: "primary",
                            fontWeight: "medium",
                            textDecoration: "underline",
                            textDecorationColor: "primary/30",
                            textUnderlineOffset: "2px",
                            _hover: { textDecorationColor: "primary" },
                            transition: "all 0.15s",
                            mb: "4",
                        })}
                    >
                        <IconArrowLeft size={14} />
                        Glossaire
                    </span>
                </LinkButton>
                <DocHeader title={entry.term} description="Glossaire comptable" />
            </div>

            {/* Definition card */}
            <div
                className={css({
                    padding: "1.5rem",
                    borderRadius: "lg",
                    backgroundColor: "white",
                    border: "1px solid",
                    borderColor: "neutral/15",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <IconBookmark
                        size={12}
                        className={css({
                            stroke: "neutral/50",
                            flexShrink: 0,
                        })}
                    />
                    <span
                        className={css({
                            fontSize: "xs",
                            fontWeight: "medium",
                            color: "neutral/50",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        })}
                    >
                        Définition
                    </span>
                </div>
                <p
                    className={css({
                        fontSize: "sm",
                        color: "neutral",
                        lineHeight: "1.75",
                    })}
                >
                    {entry.definition}
                </p>
            </div>

            {/* Related terms */}
            {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                <DocSection title="Termes associés">
                    <div
                        className={css({
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                        })}
                    >
                        {entry.relatedTerms.map((related) => {
                            const relatedEntry = glossaryTerms.find((t) => t.term === related)
                            if (!relatedEntry) return null
                            return (
                                <LinkButton
                                    key={relatedEntry.slug}
                                    to="/documentation/comptabilité/glossaire/$term"
                                    params={{ term: relatedEntry.slug }}
                                >
                                    <span
                                        className={css({
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.375rem",
                                            fontSize: "sm",
                                            color: "primary",
                                            padding: "0.375rem 0.75rem",
                                            borderRadius: "md",
                                            border: "1px solid",
                                            borderColor: "primary/20",
                                            backgroundColor: "primary/5",
                                            _hover: { backgroundColor: "primary/10" },
                                            transition: "all 0.15s",
                                        })}
                                    >
                                        <IconLink size={12} />
                                        {relatedEntry.term}
                                    </span>
                                </LinkButton>
                            )
                        })}
                    </div>
                </DocSection>
            )}

            {/* Related pages */}
            {entry.relatedPages && entry.relatedPages.length > 0 && (
                <DocSection title="Pages associées">
                    <DocParagraph>
                        Pour approfondir ce concept, consultez :{" "}
                        {entry.relatedPages.map((page, i) => (
                            <span key={page.path}>
                                {i > 0 && ", "}
                                <DocLink to={page.path}>{page.label}</DocLink>
                            </span>
                        ))}
                        .
                    </DocParagraph>
                </DocSection>
            )}

            <DocSources
                sources={[
                    {
                        label: "Plan Comptable Général — Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-francaises/reglementation-comptable/recueil-des-normes-comptables-francaises",
                    },
                    {
                        label: "Comptabilité — Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Comptabilit%C3%A9",
                    },
                ]}
            />
        </DocRoot>
    )
}
