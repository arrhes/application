import { css } from "@comptasse/ui/utilities/cn.js"
import { DocDefinition } from "../../../../components/document/DocDefinition.js"
import { DocExample } from "../../../../components/document/DocExample.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocLink } from "../../../../components/document/DocLink.js"
import { DocList } from "../../../../components/document/DocList.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocSourceRef } from "../../../../components/document/DocSourceRef.js"
import { DocSources } from "../../../../components/document/DocSources.js"
import { DocTable } from "../../../../components/document/DocTable.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function BalanceSheetAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Le bilan"
                description="Photographie du patrimoine de l'organisation à une date donnée"
            />
            <BalanceSheetDefinitionSection />
            <BalanceSheetConstructionSection />
            <BalanceSheetStructureSection />
            <FundamentalEquationSection />
            <HighAndLowOfBalanceSheetSection />
            <WorkingCapitalRequirementSection />
            <BalanceSheetTypesSection />
            <OffBalanceSheetItemsSection />
            <BalanceSheetExampleSection />
            <OpeningAndClosingBalanceSheetSection />
            <DocSources
                sources={[
                    {
                        label: "Bilan comptable - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Bilan_comptable",
                    },
                    {
                        label: "Plan Comptable Général - Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
                    },
                    {
                        label: "Besoin en fonds de roulement - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Besoin_en_fonds_de_roulement",
                    },
                    {
                        label: "Normes internationales d'information financière (IFRS) - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Normes_internationales_d%27information_financi%C3%A8re",
                    },
                ]}
            />
        </DocRoot>
    )
}

function BalanceSheetDefinitionSection() {
    return (
        <DocSection title="Définition">
            <DocDefinition term="Bilan">
                <DocParagraph>
                    Photographie du patrimoine de l'organisation à une date donnée. Il montre ce que l'organisation
                    possède (actif) et comment elle l'a financé (passif).
                </DocParagraph>
            </DocDefinition>

            <DocParagraph>
                Le bilan
                <DocSourceRef n={1} /> est toujours établi à une <strong>date précise</strong>, généralement la date de
                clôture de l'{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "exercice-comptable",
                    }}
                >
                    exercice comptable
                </DocLink>
                . Contrairement au{" "}
                <DocLink to="/documentation/comptabilité/documents/compte-de-résultat">compte de résultat</DocLink> qui
                couvre une période, le bilan est un instantané : il décrit la situation patrimoniale à un moment donné.
            </DocParagraph>
        </DocSection>
    )
}

function BalanceSheetConstructionSection() {
    return (
        <DocSection title="Comment est-il construit ?">
            <DocParagraph>
                Le bilan est construit à partir des{" "}
                <strong>
                    soldes des{" "}
                    <DocLink
                        to="/documentation/comptabilité/ressources/glossaire/$term"
                        params={{
                            term: "comptes-d-agents",
                        }}
                    >
                        comptes d'agents
                    </DocLink>
                </strong>{" "}
                (classes 1 à 5 du{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "plan-comptable-general-pcg",
                    }}
                >
                    plan comptable
                </DocLink>
                )
                <DocSourceRef n={2} /> :
            </DocParagraph>
            <DocList
                items={[
                    "Les soldes débiteurs forment l'actif (ce que les agents nous doivent : banque, clients...)",
                    "Les soldes créditeurs forment le passif (ce que nous devons aux agents : fournisseurs, État, propriétaires...)",
                ]}
            />
        </DocSection>
    )
}

function BalanceSheetStructureSection() {
    return (
        <DocSection title="Structure du bilan">
            <DocParagraph>
                Le bilan se présente sous forme d'un tableau à deux colonnes. À gauche, l'{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "actif",
                    }}
                >
                    actif
                </DocLink>{" "}
                (ce que l'organisation possède). À droite, le{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "passif",
                    }}
                >
                    passif
                </DocLink>{" "}
                (comment c'est financé).
            </DocParagraph>

            <DocTable
                headers={[
                    "ACTIF (ce que l'on a)",
                    "PASSIF (comment c'est financé)",
                ]}
                rows={[
                    [
                        "Actif immobilisé (biens durables)",
                        "Capitaux propres (apports, réserves, résultat)",
                    ],
                    [
                        "Actif circulant (stocks, créances)",
                        "Dettes (emprunts, fournisseurs)",
                    ],
                    [
                        "Trésorerie (banque, caisse)",
                        "",
                    ],
                ]}
            />

            <DocDefinition term="Actif immobilisé">
                <DocParagraph>
                    Biens destinés à rester durablement dans l'organisation : terrains, bâtiments, matériel, brevets.
                    Ils sont enregistrés dans les comptes de classe 2.
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Actif circulant">
                <DocParagraph>
                    Éléments qui se renouvellent au cours du cycle d'exploitation : stocks de marchandises (classe 3),
                    créances clients (classe 4), trésorerie (classe 5).
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Capitaux propres">
                <DocParagraph>
                    Ressources appartenant aux propriétaires : capital social, réserves, résultat de l'exercice. Ils
                    représentent ce que l'organisation doit à ses propriétaires.
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Dettes">
                <DocParagraph>
                    Sommes dues à des tiers : emprunts bancaires, dettes fournisseurs, dettes fiscales et sociales.
                </DocParagraph>
            </DocDefinition>
        </DocSection>
    )
}

function FundamentalEquationSection() {
    return (
        <DocSection title="L'équation fondamentale">
            <DocParagraph>
                L'équation fondamentale du bilan est :{" "}
                <strong>
                    <DocLink
                        to="/documentation/comptabilité/ressources/glossaire/$term"
                        params={{
                            term: "actif",
                        }}
                    >
                        Actif
                    </DocLink>{" "}
                    ={" "}
                    <DocLink
                        to="/documentation/comptabilité/ressources/glossaire/$term"
                        params={{
                            term: "passif",
                        }}
                    >
                        Passif
                    </DocLink>{" "}
                    +{" "}
                    <DocLink
                        to="/documentation/comptabilité/ressources/glossaire/$term"
                        params={{
                            term: "resultat",
                        }}
                    >
                        Résultat
                    </DocLink>
                </strong>
                .
            </DocParagraph>

            <DocParagraph>
                Le résultat vient équilibrer le bilan : un{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "benefice",
                    }}
                >
                    bénéfice
                </DocLink>{" "}
                augmente le passif (les{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "capitaux-propres",
                    }}
                >
                    capitaux propres
                </DocLink>
                ), une{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "perte",
                    }}
                >
                    perte
                </DocLink>{" "}
                le diminue. Le total de l'actif est donc toujours strictement égal au total du passif.
            </DocParagraph>

            <DocTip variant="tip">
                Si l'actif et le passif ne sont pas égaux, c'est qu'il y a une erreur dans les écritures. La{" "}
                <DocLink to="/documentation/comptabilité/documents/balance">balance</DocLink> permet de détecter ce type
                de déséquilibre avant d'établir le bilan.
            </DocTip>
        </DocSection>
    )
}

function HighAndLowOfBalanceSheetSection() {
    return (
        <DocSection title="Haut de bilan et bas de bilan">
            <DocParagraph>
                En analyse financière, on distingue le <strong>haut de bilan</strong> et le{" "}
                <strong>bas de bilan</strong>, une distinction essentielle pour comprendre la structure financière de
                l'organisation :
            </DocParagraph>

            <DocDefinition term="Haut de bilan">
                <DocParagraph>
                    Éléments permanents : à l'actif, les immobilisations (biens durables) ; au passif, les capitaux
                    propres et les dettes à long terme (emprunts). Ces éléments constituent le socle stable du
                    financement.
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Bas de bilan">
                <DocParagraph>
                    Éléments circulants : à l'actif, les stocks, créances et trésorerie ; au passif, les dettes à court
                    terme (fournisseurs, dettes fiscales). Ces éléments se renouvellent au fil de l'activité.
                </DocParagraph>
            </DocDefinition>

            <DocParagraph>
                L'équilibre entre haut et bas de bilan est un indicateur clé de la santé financière. Idéalement, les
                emplois permanents (immobilisations) doivent être financés par des ressources permanentes (capitaux
                propres + dettes à long terme).
            </DocParagraph>
        </DocSection>
    )
}

function WorkingCapitalRequirementSection() {
    return (
        <DocSection title="Le Besoin en Fonds de Roulement (BFR)">
            <DocDefinition term="Besoin en Fonds de Roulement (BFR)">
                <DocParagraph>
                    Différence entre l'actif circulant (hors trésorerie) et les dettes à court terme. Il mesure le
                    besoin de financement lié au cycle d'exploitation de l'entreprise.
                </DocParagraph>
            </DocDefinition>

            <DocParagraph>
                Le BFR
                <DocSourceRef n={3} /> apparaît lorsque l'entreprise doit financer ses stocks et ses créances clients
                avant de recevoir les paiements correspondants. Un BFR positif signifie que l'entreprise a besoin de
                trésorerie pour fonctionner ; un BFR négatif (rare) signifie que le cycle d'exploitation génère de la
                trésorerie.
            </DocParagraph>

            <DocExample title="Calcul du BFR">
                <DocParagraph>
                    Stocks + Créances clients = Actif circulant d'exploitation
                    <br />5 000 + 8 000 = 13 000
                </DocParagraph>
                <DocParagraph>
                    Dettes fournisseurs + Dettes fiscales = Dettes d'exploitation
                    <br />4 000 + 2 000 = 6 000
                </DocParagraph>
                <DocParagraph>BFR = 13 000 - 6 000 = 7 000 euros</DocParagraph>
                <DocParagraph>
                    L'entreprise doit trouver 7 000 euros de financement pour couvrir son cycle d'exploitation.
                </DocParagraph>
            </DocExample>
        </DocSection>
    )
}

function BalanceSheetTypesSection() {
    return (
        <DocSection title="Les différents types de bilan">
            <DocParagraph>Il existe en pratique plusieurs présentations du bilan selon l'usage :</DocParagraph>

            <DocDefinition term="Bilan comptable (officiel)">
                <DocParagraph>
                    Le bilan au sens strict, établi selon les règles du PCG et déposé au greffe du tribunal de commerce.
                    C'est le document obligatoire qui fait partie des comptes annuels.
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Bilan fonctionnel">
                <DocParagraph>
                    Présentation analytique qui reclasse les postes par fonction (exploitation, investissement,
                    financement). Il sert à l'analyse financière interne et au calcul du BFR.
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Bilan fiscal">
                <DocParagraph>
                    Bilan établi pour les besoins de la déclaration fiscale (liasse fiscale). Il reprend les mêmes
                    données que le bilan comptable avec des retraitements spécifiques.
                </DocParagraph>
            </DocDefinition>
        </DocSection>
    )
}

function OffBalanceSheetItemsSection() {
    return (
        <DocSection title="Engagements hors bilan">
            <DocParagraph>
                Certaines obligations de l'organisation n'apparaissent pas directement dans le bilan mais peuvent
                représenter des risques ou des avantages significatifs. On les appelle les{" "}
                <strong>engagements hors bilan</strong> :
            </DocParagraph>

            <DocList
                items={[
                    "Cautions et garanties données à des tiers",
                    "Biens utilisés en crédit-bail (l'entreprise utilise le bien sans en être propriétaire)",
                    "Engagements de retraite envers les salariés",
                    "Effets escomptés non échus (créances cédées à la banque mais pas encore payées par le client)",
                ]}
            />

            <DocParagraph>
                Ces engagements doivent être mentionnés dans l'{" "}
                <DocLink to="/documentation/comptabilité/documents/annexe">annexe</DocLink> pour que les lecteurs des
                comptes aient une image complète de la situation de l'organisation.
            </DocParagraph>

            <DocTip variant="info">
                En normes IFRS (normes internationales)
                <DocSourceRef n={4} />, le bilan s'appelle « état de la situation financière » et sa présentation est
                différente : les postes sont classés en éléments courants et non courants plutôt qu'en actif immobilisé
                et circulant. Les crédits-baux sont également intégrés au bilan (norme IFRS 16).
            </DocTip>
        </DocSection>
    )
}

function BalanceSheetExampleSection() {
    return (
        <DocSection title="Exemple">
            <DocExample title="Lecture simplifiée d'un bilan">
                <p
                    className={css({
                        fontSize: "sm",
                    })}
                >
                    Une association présente le bilan suivant au 31 décembre :
                </p>
                <div
                    className={css({
                        marginTop: "3",
                    })}
                >
                    <DocTable
                        headers={[
                            "ACTIF (ce que l'on a)",
                            "Brut",
                            "Amort. & dépr.",
                            "Net",
                            "PASSIF (comment c'est financé)",
                            "Montant",
                        ]}
                        rows={[
                            [
                                "Immobilisations corporelles",
                                "5 000,00",
                                "3 000,00",
                                "2 000,00",
                                "Capitaux propres (capital et réserves)",
                                "10 000,00",
                            ],
                            [
                                "Immobilisations incorporelles",
                                "2 000,00",
                                "500,00",
                                "1 500,00",
                                "Résultat de l'exercice",
                                "4 000,00",
                            ],
                            [
                                "Stocks et créances",
                                "9 200,00",
                                "",
                                "9 200,00",
                                "Dettes financières (emprunts)",
                                "1 500,00",
                            ],
                            [
                                "Trésorerie (banque)",
                                "4 300,00",
                                "",
                                "4 300,00",
                                "Dettes fournisseurs",
                                "1 500,00",
                            ],
                            [
                                "TOTAUX",
                                "20 500,00",
                                "3 500,00",
                                "17 000,00",
                                "TOTAUX",
                                "17 000,00",
                            ],
                        ]}
                    />
                </div>
                <p
                    className={css({
                        marginTop: "3",
                        fontSize: "xs",
                        color: "neutral/60",
                    })}
                >
                    L'association possède 17 000,00 euros de biens (valeur nette après amortissements), financés par ses
                    fonds propres (14 000,00 euros) et ses dettes (3 000,00 euros). Actif = Passif. Le{" "}
                    <DocLink to="/documentation/comptabilité/documents/compte-de-résultat">compte de résultat</DocLink>{" "}
                    fait apparaître un résultat de 4 000,00 euros, identique à celui inscrit au bilan.
                </p>
            </DocExample>
        </DocSection>
    )
}

function OpeningAndClosingBalanceSheetSection() {
    return (
        <DocSection title="Bilan d'ouverture et bilan de clôture">
            <DocParagraph>
                Le bilan de clôture d'un exercice devient le <strong>bilan d'ouverture</strong> de l'exercice suivant.
                Les soldes de tous les comptes de bilan (classes 1 à 5) sont reportés. Seuls les comptes de charges et
                de produits (classes 6 et 7) sont remis à zéro, car ils alimentent le compte de résultat d'une seule
                période.
            </DocParagraph>

            <DocParagraph>
                Cette continuité est un principe fondamental : le patrimoine de l'organisation se transmet d'un exercice
                à l'autre sans interruption.
            </DocParagraph>
        </DocSection>
    )
}
