import { DocDefinition } from "../../../../components/document/DocDefinition.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocLink } from "../../../../components/document/DocLink.js"
import { DocList } from "../../../../components/document/DocList.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocSourceRef } from "../../../../components/document/DocSourceRef.js"
import { DocSources } from "../../../../components/document/DocSources.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function ReportsAccountingDocPage() {
    return (
        <>
            <DocHeader
                title="Les documents comptables"
                description="Les états de synthèse et leur signification"
            />

            <DocSection title="Les documents de synthèse">
                <DocParagraph>
                    À la fin de chaque{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "exercice-comptable",
                        }}
                    >
                        exercice comptable
                    </DocLink>
                    , les écritures sont agrégées pour produire des documents de synthèse. Ces documents offrent une
                    vision globale de la situation financière et des performances de l'
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "organisation",
                        }}
                    >
                        organisation
                    </DocLink>
                    .
                </DocParagraph>
                <DocParagraph>
                    Les deux documents principaux sont le{" "}
                    <strong>
                        <DocLink
                            to="/documentation/comptabilité/glossaire/$term"
                            params={{
                                term: "bilan",
                            }}
                        >
                            bilan
                        </DocLink>
                    </strong>{" "}
                    et le{" "}
                    <strong>
                        <DocLink
                            to="/documentation/comptabilité/glossaire/$term"
                            params={{
                                term: "compte-de-résultat",
                            }}
                        >
                            compte de résultat
                        </DocLink>
                    </strong>
                    . Ils sont complémentaires et se lisent ensemble.
                </DocParagraph>
            </DocSection>

            <DocSection title="Les comptes annuels">
                <DocParagraph>
                    En droit français, les <strong>comptes annuels</strong> désignent les trois documents obligatoires
                    que toute organisation doit produire à la clôture de chaque exercice
                    <DocSourceRef n={1} /> :
                </DocParagraph>

                <DocList
                    items={[
                        "Le bilan : photographie du patrimoine à la date de clôture",
                        "Le compte de résultat : synthèse de l'activité sur la période",
                        "L'annexe : explications et informations complémentaires",
                    ]}
                />

                <DocParagraph>
                    Ces trois documents forment un tout indissociable. Le bilan et le compte de résultat donnent les
                    chiffres ; l'
                    <DocLink to="/documentation/comptabilité/documents/annexe">annexe</DocLink> fournit les clés pour
                    les interpréter. Leur objectif commun est de donner une <strong>image fidèle</strong>
                    <DocSourceRef n={2} /> du patrimoine, de la situation financière et du résultat de l'organisation.
                </DocParagraph>

                <DocTip variant="info">
                    Le principe d'image fidèle est le fil conducteur de la comptabilité française. Il signifie que les
                    comptes doivent refléter la réalité économique de l'organisation, quitte à s'écarter dans de rares
                    cas d'une règle comptable si son application stricte donnerait une image trompeuse. Toute dérogation
                    doit être expliquée dans l'annexe.
                </DocTip>

                <DocParagraph>
                    Pour les sociétés, les comptes annuels doivent être présentés et approuvés par l'assemblée générale
                    des associés ou actionnaires dans les six mois suivant la clôture de l'exercice, puis déposés au
                    greffe du tribunal de commerce
                    <DocSourceRef n={1} />.
                </DocParagraph>
            </DocSection>

            <DocSection title="Les documents de travail">
                <DocParagraph>
                    En complément des comptes annuels, la comptabilité produit des documents utilisés tout au long de
                    l'année pour contrôler et piloter l'activité :
                </DocParagraph>

                <DocDefinition term="Journal">
                    Registre chronologique de toutes les écritures passées. C'est le document de base de la
                    comptabilité.
                </DocDefinition>
                <DocDefinition term="Grand livre">
                    Reprise des mêmes écritures que le journal, mais classées par compte. Il permet d'analyser chaque
                    compte individuellement.
                </DocDefinition>
                <DocDefinition term="Balance">
                    Liste de tous les comptes avec leurs totaux et soldes. C'est l'outil de contrôle qui vérifie que la
                    comptabilité est équilibrée.
                </DocDefinition>
            </DocSection>

            <DocSection title="Le calcul du bénéfice">
                <DocParagraph>
                    Le{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "benefice",
                        }}
                    >
                        bénéfice
                    </DocLink>{" "}
                    (ou la{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "perte",
                        }}
                    >
                        perte
                    </DocLink>
                    ) d'une entreprise peut être calculé de deux manières équivalentes, ce qui constitue un contrôle
                    fondamental de la comptabilité :
                </DocParagraph>

                <DocDefinition term="Par le patrimoine">
                    Bénéfice = Patrimoine à la fin - Patrimoine au début. Si l'entreprise possède plus à la fin qu'au
                    début, elle s'est enrichie.
                </DocDefinition>
                <DocDefinition term="Par les opérations">
                    Bénéfice = Produits - Charges. La somme de ce qu'on a gagné moins la somme de ce qu'on a dépensé.
                </DocDefinition>

                <DocParagraph>
                    Ces deux calculs doivent donner le même résultat. C'est la cohérence entre le{" "}
                    <DocLink to="/documentation/comptabilité/documents/bilan">bilan</DocLink> (patrimoine) et le{" "}
                    <DocLink to="/documentation/comptabilité/documents/compte-de-résultat">compte de résultat</DocLink>{" "}
                    (opérations) qui garantit l'exactitude de la comptabilité.
                </DocParagraph>

                <DocTip variant="tip">
                    Cette double vérification est au cœur de la comptabilité en{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "partie-double",
                        }}
                    >
                        partie double
                    </DocLink>
                    . Si les deux méthodes ne donnent pas le même résultat, c'est qu'il y a une erreur dans les
                    écritures.
                </DocTip>
            </DocSection>

            <DocSources
                sources={[
                    {
                        label: "Code de commerce, Article L123-12 - Légifrance",
                        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006219316",
                    },
                    {
                        label: "Plan Comptable Général - Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
                    },
                ]}
            />
        </>
    )
}
