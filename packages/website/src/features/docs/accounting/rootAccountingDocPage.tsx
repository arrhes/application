import { css } from "@arrhes/ui/utilities/cn.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"
import { DocTip } from "../../../components/document/docTip.js"

export function RootAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Cours de comptabilité"
                description="Apprenez les bases de la comptabilité française, étape par étape."
            />

            <DocSection title="À propos de ce cours">
                <DocParagraph>
                    Ce cours est conçu pour les débutants qui souhaitent comprendre les fondamentaux de la comptabilité
                    française. Il peut également servir de rappel aux professionnels. Chaque page contient des exemples
                    concrets et des définitions claires pour faciliter l'apprentissage.
                </DocParagraph>

                <DocParagraph>
                    Aucun prérequis n'est nécessaire : les notions sont introduites progressivement, des concepts les
                    plus simples jusqu'aux documents de synthèse.
                </DocParagraph>
            </DocSection>

            <DocSection title="Ce que vous allez apprendre">
                <DocList
                    items={[
                        "Les principes fondamentaux de la comptabilité (partie double, débit/crédit, exercice comptable)",
                        "L'organisation des comptes selon le Plan Comptable Général",
                        "Comment enregistrer des écritures comptables",
                        "Les documents comptables de synthèse (bilan, compte de résultat, balance, journal, grand livre, annexe)",
                    ]}
                />
            </DocSection>

            <DocSection title="Plan du cours">
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "3",
                    })}
                >
                    <CourseStep
                        number={1}
                        title="Introduction"
                        description="Les bases : qu'est-ce que la comptabilité, son histoire, pourquoi tenir une comptabilité."
                        to="/documentation/comptabilité/introduction"
                    />
                    <CourseStep
                        number={2}
                        title="La partie double"
                        description="Le principe fondamental : débit/crédit, écritures équilibrées, vocabulaire essentiel."
                        to="/documentation/comptabilité/partie-double"
                    />
                    <CourseStep
                        number={3}
                        title="Les écritures"
                        description="Enregistrer des opérations : journal, journaux auxiliaires, opérations courantes et TVA."
                        to="/documentation/comptabilité/écritures"
                    />
                    <CourseStep
                        number={4}
                        title="Les comptes"
                        description="L'organisation du Plan Comptable Général, les classes de comptes, le fonctionnement débit/crédit."
                        to="/documentation/comptabilité/comptes"
                    />
                    <CourseStep
                        number={5}
                        title="Les documents comptables"
                        description="Les documents de synthèse : bilan, compte de résultat, balance, journal, grand livre et annexe."
                        to="/documentation/comptabilité/documents"
                    />
                    <CourseStep
                        number={6}
                        title="Glossaire"
                        description="Dictionnaire des termes comptables essentiels, avec définitions et renvois."
                        to="/documentation/comptabilité/glossaire"
                    />
                </div>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Arrhes est un logiciel de comptabilité conçu pour les petites structures et les associations
                    françaises. Ce cours reprend les mêmes concepts que ceux utilisés dans le logiciel. En le suivant,
                    vous comprendrez comment <DocLink to="/documentation/dashboard/démarrage">utiliser Arrhes</DocLink>{" "}
                    efficacement.
                </DocParagraph>
            </DocSection>

            <DocTip variant="tip">
                Les pages se suivent dans un ordre logique. Utilisez le bouton en bas de chaque page pour passer à la
                suivante, ou naviguez librement via le menu latéral.
            </DocTip>

            <DocNextPage to="/documentation/comptabilité/introduction" label="Introduction à la comptabilité" />
        </DocRoot>
    )
}

type ValidRoutes = Parameters<typeof DocLink>[0]["to"]

function CourseStep(props: { number: number; title: string; description: string; to: ValidRoutes }) {
    return (
        <DocLink to={props.to}>
            <div
                className={css({
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "3",
                    padding: "3",
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
                })}
            >
                <span
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "1.75rem",
                        height: "1.75rem",
                        borderRadius: "full",
                        backgroundColor: "primary/10",
                        color: "primary",
                        fontSize: "sm",
                        fontWeight: "bold",
                        flexShrink: 0,
                    })}
                >
                    {props.number}
                </span>
                <div className={css({ display: "flex", flexDirection: "column", gap: "0.5" })}>
                    <span className={css({ fontSize: "sm", fontWeight: "semibold", color: "neutral" })}>
                        {props.title}
                    </span>
                    <span className={css({ fontSize: "sm", color: "neutral/60", lineHeight: "relaxed" })}>
                        {props.description}
                    </span>
                </div>
            </div>
        </DocLink>
    )
}
