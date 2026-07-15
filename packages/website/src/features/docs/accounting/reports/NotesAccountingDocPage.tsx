import { css } from "@arrhes/ui/utilities/cn.js"
import { DocDefinition } from "../../../../components/document/DocDefinition.js"
import { DocExample } from "../../../../components/document/DocExample.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocLink } from "../../../../components/document/DocLink.js"
import { DocList } from "../../../../components/document/DocList.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocSourceRef } from "../../../../components/document/DocSourceRef.js"
import { DocSources } from "../../../../components/document/DocSources.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function NotesAccountingDocPage() {
    return (
        <>
            <DocHeader
                title="L'annexe comptable"
                description="Complément indispensable aux comptes annuels"
            />

            <DocSection title="Définition">
                <DocDefinition term="Annexe">
                    Document obligatoire qui complète le bilan et le compte de résultat. L'annexe fournit les
                    informations nécessaires à la compréhension des comptes : méthodes comptables utilisées, détail de
                    certains postes, engagements hors bilan.
                </DocDefinition>

                <DocParagraph>
                    Le <DocLink to="/documentation/comptabilité/documents/bilan">bilan</DocLink> et le{" "}
                    <DocLink to="/documentation/comptabilité/documents/compte-de-résultat">compte de résultat</DocLink>{" "}
                    donnent des chiffres, mais pas toujours les clés pour les interpréter
                    <DocSourceRef n={1} />. C'est le rôle de l'annexe : expliquer comment ces chiffres ont été
                    construits et quelles informations complémentaires sont nécessaires à leur lecture.
                </DocParagraph>

                <DocParagraph>
                    L'annexe est obligatoire en France depuis la réforme du Plan Comptable Général de 1982
                    <DocSourceRef n={2} /> (article 511 du PCG). D'inspiration anglo-saxonne (les{" "}
                    <em>notes to the financial statements</em>), elle répondait au besoin croissant de transparence
                    financière. Son objectif principal est de garantir l'
                    <strong>image fidèle</strong> de la situation de l'organisation : les comptes annuels doivent
                    refléter la réalité économique et pas seulement la stricte application des règles comptables.
                </DocParagraph>

                <DocTip variant="warning">
                    L'inscription d'une information dans l'annexe ne peut pas se substituer à son inscription au bilan
                    ou au compte de résultat. Si un élément doit figurer dans un document de synthèse, il doit y figurer
                    : l'annexe est un complément, pas un remplacement.
                </DocTip>
            </DocSection>

            <DocSection title="Contenu de l'annexe">
                <DocParagraph>
                    L'annexe doit inclure toute information significative qui n'apparaît pas directement dans le bilan
                    ou le compte de résultat. Son contenu varie selon la taille et la nature de l'
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "organisation",
                        }}
                    >
                        organisation
                    </DocLink>
                    , mais elle comprend généralement :
                </DocParagraph>

                <DocDefinition term="Règles et méthodes comptables">
                    Les conventions appliquées pour évaluer les éléments du bilan et du compte de résultat : méthodes
                    d'amortissement, règles de comptabilisation des stocks, traitement des opérations en devises
                    étrangères, etc.
                </DocDefinition>
                <DocDefinition term="Compléments d'information sur le bilan">
                    Détail des immobilisations et de leurs amortissements, état des provisions, échéancier des créances
                    et des dettes, variation des capitaux propres.
                </DocDefinition>
                <DocDefinition term="Compléments d'information sur le compte de résultat">
                    Détail des produits et charges exceptionnels, ventilation du chiffre d'affaires, information sur les
                    impôts.
                </DocDefinition>
                <DocDefinition term="Engagements hors bilan">
                    Obligations qui n'apparaissent pas au bilan mais qui représentent un risque ou un avantage potentiel
                    : cautions données, crédits-baux, engagements de retraite.
                </DocDefinition>

                <DocParagraph>Parmi les informations fréquemment requises, on trouve notamment :</DocParagraph>

                <DocList
                    items={[
                        "Le tableau des immobilisations et de leurs amortissements cumulés",
                        "Le traitement des frais de développement (activation ou charge)",
                        "Les immobilisations incorporelles et leur mode d'évaluation",
                        "Les biens en crédit-bail (nature, durée, redevances, valeur résiduelle)",
                        "Les effets escomptés non échus (EENE) : créances cédées à la banque avant leur échéance",
                        "Les provisions pour risques et charges (litiges, garanties, retraite)",
                        "Les engagements de retraite envers les salariés",
                    ]}
                />
            </DocSection>

            <DocSection title="Annexe simplifiée et annexe complète">
                <DocParagraph>
                    Toutes les organisations n'ont pas les mêmes obligations. Le droit français distingue plusieurs
                    niveaux :
                </DocParagraph>

                <DocList
                    items={[
                        "Les micro-entreprises sont dispensées d'annexe",
                        "Les petites entreprises peuvent établir une annexe simplifiée (moins de rubriques obligatoires)",
                        "Les entreprises de taille moyenne et les grandes entreprises doivent produire une annexe complète",
                        "Les associations peuvent adopter une présentation adaptée à leur activité",
                    ]}
                />

                <DocExample title="Seuils pour l'annexe simplifiée">
                    <p
                        className={css({
                            fontSize: "sm",
                        })}
                    >
                        En France, une entreprise peut bénéficier de l'annexe simplifiée si elle ne dépasse pas deux des
                        trois seuils suivants :
                    </p>
                    <ul
                        className={css({
                            marginTop: "2",
                            ml: "4",
                            fontSize: "sm",
                            color: "neutral/70",
                        })}
                    >
                        <li>Chiffre d'affaires : 12 millions d'euros</li>
                        <li>Total du bilan : 6 millions d'euros</li>
                        <li>Nombre de salariés : 50</li>
                    </ul>
                    <p
                        className={css({
                            marginTop: "2",
                            fontSize: "xs",
                            color: "neutral/60",
                        })}
                    >
                        Ces seuils sont régulièrement révisés par le législateur.
                    </p>
                </DocExample>

                <DocTip variant="tip">
                    Même lorsqu'elle n'est pas obligatoire, l'annexe reste utile pour documenter les choix comptables de
                    l'organisation et faciliter la compréhension des comptes par les tiers (banquier, commissaire aux
                    comptes, financeurs).
                </DocTip>
            </DocSection>

            <DocSection title="Rôle de l'annexe">
                <DocParagraph>
                    L'annexe joue un rôle central dans la transparence financière. Elle permet à toute personne qui lit
                    les comptes de comprendre :
                </DocParagraph>

                <DocList
                    items={[
                        "Comment les chiffres ont été calculés (quelles méthodes, quelles hypothèses)",
                        "Ce qui a changé par rapport à l'exercice précédent (changements de méthode, événements exceptionnels)",
                        "Quels risques ou engagements ne sont pas visibles dans le bilan",
                        "Comment interpréter les montants significatifs",
                    ]}
                />

                <DocParagraph>
                    Sans l'annexe, le bilan et le compte de résultat ne forment qu'une image partielle de la situation
                    de l'organisation. C'est pourquoi ces trois documents constituent ensemble les{" "}
                    <strong>comptes annuels</strong> et sont indissociables.
                </DocParagraph>
            </DocSection>

            <DocSection title="Annexe et normes internationales">
                <DocParagraph>
                    En normes IFRS, la norme IAS 1<DocSourceRef n={3} /> impose des exigences similaires mais plus
                    structurées. L'annexe doit notamment inclure :
                </DocParagraph>

                <DocList
                    items={[
                        "Une déclaration de conformité aux normes IFRS",
                        "Un résumé des méthodes comptables significatives",
                        "Les hypothèses clés et sources d'incertitude pour les estimations",
                        "Les informations requises par chaque norme spécifique (immobilisations, instruments financiers, etc.)",
                    ]}
                />

                <DocParagraph>
                    Les entreprises cotées en bourse dans l'Union européenne sont tenues d'appliquer les normes IFRS
                    pour leurs comptes consolidés. L'annexe y est généralement beaucoup plus volumineuse que dans les
                    comptes établis selon le PCG français.
                </DocParagraph>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Arrhes vous accompagne dans la préparation de vos comptes annuels. Consultez le guide sur les{" "}
                    <DocLink to="/documentation/dashboard/documents">rapports</DocLink> pour savoir comment exporter les
                    données nécessaires à la rédaction de votre annexe.
                </DocParagraph>
            </DocSection>

            <DocSources
                sources={[
                    {
                        label: "Annexe (comptabilité) - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Annexe_(comptabilit%C3%A9)",
                    },
                    {
                        label: "Plan Comptable Général - Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
                    },
                    {
                        label: "Normes internationales d'information financière (IFRS) - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Normes_internationales_d%27information_financi%C3%A8re",
                    },
                ]}
            />
        </>
    )
}
