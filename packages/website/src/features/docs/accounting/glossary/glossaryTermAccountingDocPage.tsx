import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft, IconLanguage, IconLink } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DocDefinition } from "../../../../components/document/docDefinition.js"
import { DocHeader } from "../../../../components/document/docHeader.js"
import { DocParagraph } from "../../../../components/document/docParagraph.js"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { DocSection } from "../../../../components/document/docSection.js"
import { DocSources } from "../../../../components/document/docSources.js"
import { DocTip } from "../../../../components/document/docTip.js"
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
            <DocHeader title={entry.term} description="Glossaire comptable" />

            {/* Definition card */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "stretch",
                    gap: "0.5rem",
                })}
            >
                <DocDefinition >
                    {entry.definition}
                </DocDefinition>
                <DocTip variant="neutral" title="Traduction" icon={IconLanguage}>
                    {entry.englishTranslation}
                </DocTip>
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
                                    <ButtonOutlineContent
                                        leftIcon={<IconLink />}
                                        text={relatedEntry.term}
                                    />
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
                        {entry.relatedPages.map((page, i) => (
                            <LinkButton
                                key={page.path}
                                to={page.path}
                            >
                                <ButtonOutlineContent
                                    leftIcon={<IconLink />}
                                    text={page.label}
                                />
                            </LinkButton>
                        ))}
                    </DocParagraph>
                </DocSection>
            )}

            <DocSources
                sources={[
                    {
                        label: "Plan Comptable Général — Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
                    },
                    ...entry.sources,
                ]}
            />
        </DocRoot>
    )
}
