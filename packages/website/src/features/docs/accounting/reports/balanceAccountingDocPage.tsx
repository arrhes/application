import { css } from "@arrhes/ui/utilities/cn.js"
import { DocDefinition } from "../../../../components/document/docDefinition.js"
import { DocExample } from "../../../../components/document/docExample.js"
import { DocHeader } from "../../../../components/document/docHeader.js"
import { DocLink } from "../../../../components/document/docLink.js"
import { DocList } from "../../../../components/document/docList.js"
import { DocNextPage } from "../../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../../components/document/docParagraph.js"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { DocSection } from "../../../../components/document/docSection.js"
import { DocSourceRef } from "../../../../components/document/docSourceRef.js"
import { DocSources } from "../../../../components/document/docSources.js"
import { DocTable } from "../../../../components/document/docTable.js"
import { DocTip } from "../../../../components/document/docTip.js"

export function BalanceAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="La balance"
                description="Document de contrôle essentiel de la comptabilité"
            />

            <DocSection title="Définition">
                <DocDefinition term="Balance">
                    Tableau récapitulatif de tous les comptes utilisés pendant l'exercice, avec pour chacun le total des
                    débits, le total des crédits et le solde. C'est l'outil de contrôle fondamental de la comptabilité.
                </DocDefinition>

                <DocParagraph>
                    La balance
                    <DocSourceRef n={1} /> est un résumé du{" "}
                    <DocLink to="/documentation/comptabilité/documents/grand-livre">grand livre</DocLink> : elle reprend
                    chaque{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "compte",
                        }}
                    >
                        compte
                    </DocLink>{" "}
                    mais ne conserve que les totaux, sans le détail des mouvements. C'est le document idéal pour
                    vérifier rapidement que la comptabilité est cohérente.
                </DocParagraph>

                <DocTip variant="info">
                    La balance se construit automatiquement à partir du{" "}
                    <DocLink to="/documentation/comptabilité/documents/grand-livre">grand livre</DocLink> : pour chaque
                    compte, on additionne tous les débits, tous les crédits, et on en déduit le solde. Si le grand livre
                    est juste, la balance l'est aussi.
                </DocTip>
            </DocSection>

            <DocSection title="Les équilibres de la balance">
                <DocParagraph>
                    La balance permet de vérifier plusieurs équilibres qui découlent du principe de la{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "partie-double",
                        }}
                    >
                        partie double
                    </DocLink>
                    <DocSourceRef n={2} /> :
                </DocParagraph>
                <DocList
                    items={[
                        "Total des débits = Total des crédits (chaque écriture mouvemente autant au débit qu'au crédit)",
                        "Total des soldes débiteurs = Total des soldes créditeurs (conséquence directe de l'égalité précédente)",
                        "Les comptes d'actif ont généralement un solde débiteur",
                        "Les comptes de passif ont généralement un solde créditeur",
                    ]}
                />

                <DocTip variant="tip">
                    Si la balance n'est pas équilibrée, cela signifie qu'une ou plusieurs écritures ne respectent pas la
                    partie double. C'est la première vérification à effectuer avant d'établir le{" "}
                    <DocLink to="/documentation/comptabilité/documents/bilan">bilan</DocLink> et le{" "}
                    <DocLink to="/documentation/comptabilité/documents/compte-de-résultat">compte de résultat</DocLink>.
                </DocTip>
            </DocSection>

            <DocSection title="Les différents types de balances">
                <DocDefinition term="Balance générale">
                    Reprend tous les comptes utilisés pendant l'exercice. C'est le document de contrôle principal.
                </DocDefinition>
                <DocDefinition term="Balance auxiliaire">
                    Détaille un compte collectif (clients ou fournisseurs) en montrant le solde de chaque tiers
                    individuellement. Par exemple, la balance auxiliaire clients liste le solde dû par chaque client.
                </DocDefinition>
                <DocDefinition term="Balance âgée">
                    Ventile les soldes par ancienneté (moins de 30 jours, 30 à 60 jours, etc.). Elle est
                    particulièrement utile pour suivre les retards de paiement des clients ou des fournisseurs.
                </DocDefinition>
            </DocSection>

            <DocSection title="Exemple">
                <DocExample title="Extrait de balance générale">
                    <DocTable
                        headers={[
                            "Compte",
                            "Intitulé",
                            "Débit",
                            "Crédit",
                            "Solde",
                        ]}
                        rows={[
                            [
                                "101",
                                "Capital",
                                "",
                                "10 000",
                                "10 000 Cr",
                            ],
                            [
                                "164",
                                "Emprunts",
                                "",
                                "5 000",
                                "5 000 Cr",
                            ],
                            [
                                "215",
                                "Matériel industriel",
                                "3 000",
                                "",
                                "3 000 Db",
                            ],
                            [
                                "411",
                                "Clients",
                                "8 000",
                                "3 000",
                                "5 000 Db",
                            ],
                            [
                                "401",
                                "Fournisseurs",
                                "2 000",
                                "4 000",
                                "2 000 Cr",
                            ],
                            [
                                "512",
                                "Banque",
                                "16 000",
                                "8 000",
                                "8 000 Db",
                            ],
                            [
                                "606",
                                "Achats de fournitures",
                                "1 000",
                                "",
                                "1 000 Db",
                            ],
                            [
                                "613",
                                "Loyer",
                                "6 000",
                                "",
                                "6 000 Db",
                            ],
                            [
                                "641",
                                "Salaires",
                                "12 000",
                                "",
                                "12 000 Db",
                            ],
                            [
                                "706",
                                "Prestations de services",
                                "",
                                "18 000",
                                "18 000 Cr",
                            ],
                            [
                                "",
                                "",
                                "",
                                "",
                                "",
                            ],
                            [
                                "",
                                "TOTAUX",
                                "48 000",
                                "48 000",
                                "",
                            ],
                        ]}
                    />
                    <p
                        className={css({
                            marginTop: "2",
                            fontSize: "xs",
                            color: "neutral/60",
                        })}
                    >
                        Total des débits (48 000) = Total des crédits (48 000). Total des soldes débiteurs (35 000) =
                        Total des soldes créditeurs (35 000). La balance est équilibrée.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="De la balance aux documents de synthèse">
                <DocParagraph>
                    La balance est le pont entre les écritures quotidiennes et les documents de synthèse :
                </DocParagraph>

                <DocList
                    items={[
                        "Les soldes des comptes de classes 1 à 5 alimentent le bilan",
                        "Les soldes des comptes de classes 6 et 7 alimentent le compte de résultat",
                        "La différence entre les produits (classe 7) et les charges (classe 6) donne le résultat",
                    ]}
                />

                <DocParagraph>
                    Une balance juste est la condition nécessaire pour produire un{" "}
                    <DocLink to="/documentation/comptabilité/documents/bilan">bilan</DocLink> et un{" "}
                    <DocLink to="/documentation/comptabilité/documents/compte-de-résultat">compte de résultat</DocLink>{" "}
                    fiables. C'est pourquoi la vérification de la balance est une étape incontournable de la clôture
                    comptable.
                </DocParagraph>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Arrhes calcule automatiquement la balance à partir de vos{" "}
                    <DocLink to="/documentation/comptabilité/écritures">écritures</DocLink>. Vous pouvez la consulter à
                    tout moment pour vérifier l'état de votre comptabilité. Consultez le guide sur les{" "}
                    <DocLink to="/documentation/dashboard/documents">rapports</DocLink> pour en savoir plus.
                </DocParagraph>
            </DocSection>

            <DocNextPage
                to="/documentation/comptabilité/documents/journal"
                label="Le journal"
            />

            <DocSources
                sources={[
                    {
                        label: "Balance comptable - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Balance_comptable",
                    },
                    {
                        label: "Plan Comptable Général - Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
                    },
                ]}
            />
        </DocRoot>
    )
}
