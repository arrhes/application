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
import { DocSources } from "../../../../components/document/docSources.js"
import { DocTable } from "../../../../components/document/docTable.js"
import { DocTip } from "../../../../components/document/docTip.js"

export function BalanceSheetAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader title="Le bilan" description="Photographie du patrimoine de l'organisation à une date donnée" />

            <DocSection title="Définition">
                <DocDefinition
                    term="Bilan"
                    definition="Photographie du patrimoine de l'organisation à une date donnée. Il montre ce que l'organisation possède (actif) et comment elle l'a financé (passif)."
                />

                <DocParagraph>
                    Le bilan est toujours établi à une <strong>date précise</strong>, généralement la date de clôture de
                    l'{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "exercice-comptable" }}>
                        exercice comptable
                    </DocLink>
                    . Contrairement au{" "}
                    <DocLink to="/documentation/comptabilité/documents/compte-de-résultat">compte de résultat</DocLink>{" "}
                    qui couvre une période, le bilan est un instantané : il décrit la situation patrimoniale à un moment
                    donné.
                </DocParagraph>
            </DocSection>

            <DocSection title="Comment est-il construit ?">
                <DocParagraph>
                    Le bilan est construit à partir des{" "}
                    <strong>
                        soldes des{" "}
                        <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "comptes-d-agents" }}>
                            comptes d'agents
                        </DocLink>
                    </strong>{" "}
                    (classes 1 à 5 du{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{ term: "plan-comptable-general-pcg" }}
                    >
                        plan comptable
                    </DocLink>
                    ) :
                </DocParagraph>
                <DocList
                    items={[
                        "Les soldes débiteurs forment l'actif (ce que les agents nous doivent : banque, clients...)",
                        "Les soldes créditeurs forment le passif (ce que nous devons aux agents : fournisseurs, État, propriétaires...)",
                    ]}
                />
            </DocSection>

            <DocSection title="Structure du bilan">
                <DocParagraph>
                    Le bilan se présente sous forme d'un tableau à deux colonnes. À gauche, l'{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "actif" }}>
                        actif
                    </DocLink>{" "}
                    (ce que l'organisation possède). À droite, le{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "passif" }}>
                        passif
                    </DocLink>{" "}
                    (comment c'est financé).
                </DocParagraph>

                <DocTable
                    headers={["ACTIF (ce que l'on a)", "PASSIF (comment c'est financé)"]}
                    rows={[
                        ["Actif immobilisé (biens durables)", "Capitaux propres (apports, réserves, résultat)"],
                        ["Actif circulant (stocks, créances)", "Dettes (emprunts, fournisseurs)"],
                        ["Trésorerie (banque, caisse)", ""],
                    ]}
                />

                <DocDefinition
                    term="Actif immobilisé"
                    definition="Biens destinés à rester durablement dans l'organisation : terrains, bâtiments, matériel, brevets. Ils sont enregistrés dans les comptes de classe 2."
                />
                <DocDefinition
                    term="Actif circulant"
                    definition="Éléments qui se renouvellent au cours du cycle d'exploitation : stocks de marchandises (classe 3), créances clients (classe 4), trésorerie (classe 5)."
                />
                <DocDefinition
                    term="Capitaux propres"
                    definition="Ressources appartenant aux propriétaires : capital social, réserves, résultat de l'exercice. Ils représentent ce que l'organisation doit à ses propriétaires."
                />
                <DocDefinition
                    term="Dettes"
                    definition="Sommes dues à des tiers : emprunts bancaires, dettes fournisseurs, dettes fiscales et sociales."
                />
            </DocSection>

            <DocSection title="L'équation fondamentale">
                <DocParagraph>
                    L'équation fondamentale du bilan est :{" "}
                    <strong>
                        <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "actif" }}>
                            Actif
                        </DocLink>{" "}
                        ={" "}
                        <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "passif" }}>
                            Passif
                        </DocLink>{" "}
                        +{" "}
                        <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "resultat" }}>
                            Résultat
                        </DocLink>
                    </strong>
                    .
                </DocParagraph>

                <DocParagraph>
                    Le résultat vient équilibrer le bilan : un{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "benefice" }}>
                        bénéfice
                    </DocLink>{" "}
                    augmente le passif (les{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "capitaux-propres" }}>
                        capitaux propres
                    </DocLink>
                    ), une{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "perte" }}>
                        perte
                    </DocLink>{" "}
                    le diminue. Le total de l'actif est donc toujours strictement égal au total du passif.
                </DocParagraph>

                <DocTip variant="tip">
                    Si l'actif et le passif ne sont pas égaux, c'est qu'il y a une erreur dans les écritures. La{" "}
                    <DocLink to="/documentation/comptabilité/documents/balance">balance</DocLink> permet de détecter ce
                    type de déséquilibre avant d'établir le bilan.
                </DocTip>
            </DocSection>

            <DocSection title="Haut de bilan et bas de bilan">
                <DocParagraph>
                    En analyse financière, on distingue le <strong>haut de bilan</strong> et le{" "}
                    <strong>bas de bilan</strong>, une distinction essentielle pour comprendre la structure financière
                    de l'organisation :
                </DocParagraph>

                <DocDefinition
                    term="Haut de bilan"
                    definition="Éléments permanents : à l'actif, les immobilisations (biens durables) ; au passif, les capitaux propres et les dettes à long terme (emprunts). Ces éléments constituent le socle stable du financement."
                />
                <DocDefinition
                    term="Bas de bilan"
                    definition="Éléments circulants : à l'actif, les stocks, créances et trésorerie ; au passif, les dettes à court terme (fournisseurs, dettes fiscales). Ces éléments se renouvellent au fil de l'activité."
                />

                <DocParagraph>
                    L'équilibre entre haut et bas de bilan est un indicateur clé de la santé financière. Idéalement, les
                    emplois permanents (immobilisations) doivent être financés par des ressources permanentes (capitaux
                    propres + dettes à long terme).
                </DocParagraph>
            </DocSection>

            <DocSection title="Le Besoin en Fonds de Roulement (BFR)">
                <DocDefinition
                    term="Besoin en Fonds de Roulement (BFR)"
                    definition="Différence entre l'actif circulant (hors trésorerie) et les dettes à court terme. Il mesure le besoin de financement lié au cycle d'exploitation de l'entreprise."
                />

                <DocParagraph>
                    Le BFR apparaît lorsque l'entreprise doit financer ses stocks et ses créances clients avant de
                    recevoir les paiements correspondants. Un BFR positif signifie que l'entreprise a besoin de
                    trésorerie pour fonctionner ; un BFR négatif (rare) signifie que le cycle d'exploitation génère de
                    la trésorerie.
                </DocParagraph>

                <DocExample title="Calcul du BFR">
                    <p className={css({ fontSize: "sm" })}>
                        Stocks : 5 000 + Créances clients : 8 000 = Actif circulant d'exploitation : 13 000
                    </p>
                    <p className={css({ fontSize: "sm" })}>
                        Dettes fournisseurs : 4 000 + Dettes fiscales : 2 000 = Dettes d'exploitation : 6 000
                    </p>
                    <p className={css({ marginTop: "2", fontWeight: "medium", fontSize: "sm" })}>
                        BFR = 13 000 - 6 000 = 7 000 euros
                    </p>
                    <p className={css({ marginTop: "1", fontSize: "xs", color: "neutral/60" })}>
                        L'entreprise doit trouver 7 000 euros de financement pour couvrir son cycle d'exploitation.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Les différents types de bilan">
                <DocParagraph>Il existe en pratique plusieurs présentations du bilan selon l'usage :</DocParagraph>

                <DocDefinition
                    term="Bilan comptable (officiel)"
                    definition="Le bilan au sens strict, établi selon les règles du PCG et déposé au greffe du tribunal de commerce. C'est le document obligatoire qui fait partie des comptes annuels."
                />
                <DocDefinition
                    term="Bilan fonctionnel"
                    definition="Présentation analytique qui reclasse les postes par fonction (exploitation, investissement, financement). Il sert à l'analyse financière interne et au calcul du BFR."
                />
                <DocDefinition
                    term="Bilan fiscal"
                    definition="Bilan établi pour les besoins de la déclaration fiscale (liasse fiscale). Il reprend les mêmes données que le bilan comptable avec des retraitements spécifiques."
                />
            </DocSection>

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
                    <DocLink to="/documentation/comptabilité/documents/annexe">annexe</DocLink> pour que les lecteurs
                    des comptes aient une image complète de la situation de l'organisation.
                </DocParagraph>

                <DocTip variant="info">
                    En normes IFRS (normes internationales), le bilan s'appelle « état de la situation financière » et
                    sa présentation est différente : les postes sont classés en éléments courants et non courants plutôt
                    qu'en actif immobilisé et circulant. Les crédits-baux sont également intégrés au bilan (norme IFRS
                    16).
                </DocTip>
            </DocSection>

            <DocSection title="Exemple">
                <DocExample title="Lecture simplifiée d'un bilan">
                    <p className={css({ fontSize: "sm" })}>
                        Une association présente le bilan suivant au 31 décembre :
                    </p>
                    <div
                        className={css({
                            display: "grid",
                            gridTemplateColumns: { base: "1fr", sm: "1fr 1fr" },
                            gap: "4",
                            marginTop: "3",
                        })}
                    >
                        <div>
                            <p className={css({ fontWeight: "medium", mb: "1" })}>ACTIF</p>
                            <ul className={css({ fontSize: "xs", color: "neutral/70" })}>
                                <li>Matériel informatique : 2 000</li>
                                <li>Créances adhérents : 500</li>
                                <li>Banque : 4 500</li>
                                <li className={css({ fontWeight: "semibold", marginTop: "1" })}>Total : 7 000</li>
                            </ul>
                        </div>
                        <div>
                            <p className={css({ fontWeight: "medium", mb: "1" })}>PASSIF</p>
                            <ul className={css({ fontSize: "xs", color: "neutral/70" })}>
                                <li>Fonds associatifs : 4 000</li>
                                <li>Résultat de l'exercice : 2 000</li>
                                <li>Dettes fournisseurs : 1 000</li>
                                <li className={css({ fontWeight: "semibold", marginTop: "1" })}>Total : 7 000</li>
                            </ul>
                        </div>
                    </div>
                    <p className={css({ marginTop: "3", fontSize: "xs", color: "neutral/60" })}>
                        L'association possède 7 000 euros de biens, financés par ses fonds propres (6 000 euros, dont le
                        résultat de l'année) et une dette fournisseur (1 000 euros). Actif = Passif.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Bilan d'ouverture et bilan de clôture">
                <DocParagraph>
                    Le bilan de clôture d'un exercice devient le <strong>bilan d'ouverture</strong> de l'exercice
                    suivant. Les soldes de tous les comptes de bilan (classes 1 à 5) sont reportés. Seuls les comptes de
                    charges et de produits (classes 6 et 7) sont remis à zéro, car ils alimentent le compte de résultat
                    d'une seule période.
                </DocParagraph>

                <DocParagraph>
                    Cette continuité est un principe fondamental : le patrimoine de l'organisation se transmet d'un
                    exercice à l'autre sans interruption.
                </DocParagraph>
            </DocSection>

            <DocNextPage to="/documentation/comptabilité/documents/compte-de-résultat" label="Le compte de résultat" />

            <DocSources
                sources={[
                    {
                        label: "Plan Comptable Général — Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-francaises/reglementation-comptable/recueil-des-normes-comptables-francaises",
                    },
                    {
                        label: "Bilan comptable — Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Bilan_comptable",
                    },
                    {
                        label: "Besoin en fonds de roulement — Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Besoin_en_fonds_de_roulement",
                    },
                    {
                        label: "Normes internationales d'information financière (IFRS) — Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Normes_internationales_d%27information_financi%C3%A8re",
                    },
                ]}
            />
        </DocRoot>
    )
}
