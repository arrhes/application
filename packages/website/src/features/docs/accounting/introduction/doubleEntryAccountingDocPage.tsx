import { css } from "@arrhes/ui/utilities/cn.js"
import { DocDefinition } from "../../../../components/document/docDefinition.tsx"
import { DocExample } from "../../../../components/document/docExample.tsx"
import { DocHeader } from "../../../../components/document/docHeader.tsx"
import { DocLink } from "../../../../components/document/docLink.tsx"
import { DocNextPage } from "../../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../../components/document/docRoot.tsx"
import { DocSection } from "../../../../components/document/docSection.tsx"
import { DocSources } from "../../../../components/document/docSources.tsx"
import { DocTable } from "../../../../components/document/docTable.tsx"
import { DocTip } from "../../../../components/document/docTip.tsx"

export function DoubleEntryAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader title="La partie double" description="Le principe fondamental de la comptabilité moderne" />

            <DocSection title="Le principe de la partie double">
                <DocParagraph>
                    La vie d'une organisation est faite d'opérations économiques : achats, ventes, encaissements,
                    paiements, etc. Une opération est un événement qui modifie la situation financière de
                    l'organisation. Cette opération peut autant traduire un flux réel d'argent (ex : paiement d'une
                    facture) qu'un flux virtuel à venir, comme la reconnaissance d'une créance ou d'une dette (ex :
                    émission d'une facture).
                </DocParagraph>
                <DocParagraph>
                    Le principe de la partie double est le fondement de toute comptabilité moderne, codifié par Luca
                    Pacioli en 1494. Il repose sur une idée simple : chaque opération de l'organisation est un flux qui
                    a une <strong>origine</strong> (d'où viennent les fonds) et une <strong>destination</strong> (où
                    vont les fonds). Origine et destination sont par définition d'un même montant : le flux est
                    équilibré. La comptabilité garantit ainsi que chaque mouvement d'argent (réel ou virtuel) est
                    correctement enregistré et équilibré.
                </DocParagraph>
                <DocParagraph>
                    Concrètement, chaque opération de l'organisation est notée dans ce qu'on appelle un{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "journal" }}>
                        journal
                    </DocLink>
                    , sous la forme d'une{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "ecriture-comptable" }}>
                        écriture
                    </DocLink>
                    . Une écriture comporte au moins deux lignes. Chaque ligne fait correspondre ce qu'on appelle un{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "compte" }}>
                        compte
                    </DocLink>
                    , à un montant, soit au{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "debit" }}>
                        débit
                    </DocLink>
                    , soit au{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "credit" }}>
                        crédit
                    </DocLink>
                    . Peu importe le nombre de lignes, la somme des montants débités doit toujours être égale à la somme
                    des montants crédités. C'est ce qui garantit l'équilibre permanent de la comptabilité.
                </DocParagraph>

                <DocExample>
                    <p>
                        Voici deux écritures extraites du journal, correspondant à deux opérations de l'organisation :
                    </p>
                    <p className={css({ marginTop: "2" })}>
                        Achat en espèces de fournitures de bureau pour la somme de 100,00€.
                    </p>
                    <DocTable
                        headers={["Date", "Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["15/01", "6064 - Fournitures administratives", "Achat fournitures bureau", "100,00€", "-"],
                            ["15/01", "530 - Caisse", "Achat fournitures bureau", "-", "100,00€"],
                        ]}
                    />
                    <p>
                        Vente d'une prestation de service pour 1500,00€ : le client paie 500,00€ par virement, le reste
                        est dû à 30 jours.
                    </p>
                    <DocTable
                        headers={["Date", "Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["22/01", "512 - Banque", "Vente prestation - part encaissée", "500,00€", "-"],
                            ["22/01", "411 - Clients", "Vente prestation - part à recevoir", "1000,00€", "-"],
                            ["22/01", "706 - Prestations de services", "Vente prestation", "-", "1500,00€"],
                        ]}
                    />
                    <p className={css({ marginTop: "3", fontWeight: "medium" })}>
                        Pour chaque écriture, on a bien le total des débits qui est égal au total des crédits.
                    </p>
                </DocExample>

                <DocTip variant="info">
                    Grâce à ce principe, toute erreur d'enregistrement crée un déséquilibre entre débits et crédits, ce
                    qui la rend immédiatement détectable. C'est aussi un outil de prévention de la fraude : la
                    falsification d'une écriture sans altérer l'équilibre global est extrêmement difficile. Enfin, la
                    partie double permet d'enregistrer des opérations futures (dettes, créances) et pas seulement des
                    mouvements d'argent effectifs.
                </DocTip>
            </DocSection>

            <DocSection title="Vocabulaire essentiel">
                <DocDefinition
                    term="Débit"
                    definition="Côté gauche d'un compte. Le mot vient du latin debere (devoir) : il indique que le caissier doit pouvoir rendre l'argent entré dans sa caisse. Pour les comptes d'actif et de charges, un débit représente une augmentation."
                />
                <DocDefinition
                    term="Crédit"
                    definition="Côté droit d'un compte. Le mot vient du latin credere (croire) : en échange d'une sortie d'argent, le caissier reçoit une pièce justificative qui lui permet d'être cru lors d'un contrôle. Pour les comptes de passif et de produits, un crédit représente une augmentation."
                />
                <DocDefinition
                    term="Solde"
                    definition="Différence entre le total des débits et le total des crédits d'un compte. Un compte est débiteur si les débits sont supérieurs aux crédits, créditeur dans le cas contraire."
                />
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Ces concepts sont directement appliqués dans Arrhes. Lorsque vous{" "}
                    <DocLink to="/documentation/dashboard/écritures">saisissez une écriture</DocLink>, le logiciel vous
                    demande de spécifier les comptes à débiter et à créditer, et vérifie automatiquement que l'équilibre
                    est respecté.
                </DocParagraph>
            </DocSection>

            <DocTip variant="info">
                Maintenant que vous connaissez le principe de la partie double, découvrez comment les opérations sont
                concrètement enregistrées sous forme d'écritures comptables dans la page suivante.
            </DocTip>

            <DocNextPage to="/documentation/comptabilité/écritures" label="Les écritures comptables" />

            <DocSources
                sources={[
                    {
                        label: "Plan Comptable Général — Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-francaises/reglementation-comptable/recueil-des-normes-comptables-francaises",
                    },
                    {
                        label: "Comptabilité en partie double — Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Comptabilit%C3%A9_en_partie_double",
                    },
                    {
                        label: "Luca Pacioli — Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Luca_Pacioli",
                    },
                ]}
            />
        </DocRoot>
    )
}
