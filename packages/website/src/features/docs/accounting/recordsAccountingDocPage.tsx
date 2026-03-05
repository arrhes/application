import { css } from "@arrhes/ui/utilities/cn.js"
import { DocDefinition } from "../../../components/document/docDefinition.js"
import { DocExample } from "../../../components/document/docExample.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"
import { DocTable } from "../../../components/document/docTable.js"
import { DocTip } from "../../../components/document/docTip.js"

export function RecordsAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader title="Les écritures comptables" description="Enregistrer les opérations dans les comptes" />

            <DocSection title="Qu'est-ce qu'une écriture comptable ?">
                <DocParagraph>
                    Une écriture comptable est l'enregistrement d'une opération économique dans les comptes. Chaque
                    écriture traduit un événement réel (achat, vente, paiement...) en langage comptable.
                </DocParagraph>
                <DocParagraph>
                    Comme vu dans l'<DocLink to="/documentation/comptabilité/introduction">introduction</DocLink>,
                    chaque écriture respecte le principe de la partie double : elle affecte au moins deux comptes et le
                    total des débits égale le total des crédits.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le journal : registre chronologique">
                <DocParagraph>
                    Le <strong>journal</strong> est le document fondamental de la comptabilité. Il enregistre toutes les
                    écritures dans l'ordre chronologique, créant ainsi une trace complète et inaltérable de l'activité
                    de l'entreprise.
                </DocParagraph>
                <DocParagraph>
                    Le journal a une valeur juridique : il constitue une preuve en cas de litige ou de contrôle fiscal.
                    C'est pourquoi les écritures ne doivent jamais être effacées, mais corrigées par des écritures de
                    contre-passation si nécessaire.
                </DocParagraph>
            </DocSection>

            <DocSection title="Structure d'une écriture">
                <DocParagraph>Une écriture comptable complète contient les éléments suivants :</DocParagraph>
                <DocList
                    items={[
                        "La date de l'opération",
                        "Le numéro de pièce justificative",
                        "Le libellé (description de l'opération)",
                        "Les comptes mouvementés avec leurs montants au débit ou au crédit",
                        "Le journal dans lequel elle est enregistrée",
                    ]}
                />

                <DocExample title="Écriture d'achat de fournitures">
                    <p className={css({ fontWeight: "medium", mb: "2" })}>
                        Achat de fournitures de bureau - 120 euros TTC payé par chèque
                    </p>
                    <DocTable
                        headers={["Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["606100", "Fournitures de bureau", "100,00", ""],
                            ["445660", "TVA déductible", "20,00", ""],
                            ["512000", "Banque", "", "120,00"],
                        ]}
                    />
                    <p className={css({ marginTop: "2", fontSize: "xs", color: "neutral/60" })}>
                        Total débit = Total crédit = 120,00 euros
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Les journaux auxiliaires">
                <DocParagraph>
                    Pour faciliter l'organisation, les écritures sont regroupées dans des journaux auxiliaires selon
                    leur nature. Cela permet de répartir le travail et de vérifier plus facilement les opérations.
                </DocParagraph>

                <DocDefinition
                    term="Journal des achats (HA)"
                    definition="Enregistre toutes les factures fournisseurs reçues. On y trouve les achats à crédit avant leur règlement."
                />
                <DocDefinition
                    term="Journal des ventes (VE)"
                    definition="Enregistre toutes les factures clients émises. On y trouve les ventes à crédit avant leur encaissement."
                />
                <DocDefinition
                    term="Journal de banque (BQ)"
                    definition="Enregistre tous les mouvements du compte bancaire : encaissements, décaissements, virements."
                />
                <DocDefinition
                    term="Journal de caisse (CA)"
                    definition="Enregistre tous les mouvements d'espèces : recettes et dépenses en liquide."
                />
                <DocDefinition
                    term="Journal des opérations diverses (OD)"
                    definition="Enregistre les opérations qui ne rentrent pas dans les autres journaux : salaires, amortissements, régularisations, écritures de clôture."
                />
            </DocSection>

            <DocSection title="Opérations à crédit vs au comptant">
                <DocParagraph>
                    Une distinction importante existe entre les opérations <strong>à crédit</strong> (paiement différé)
                    et les opérations <strong>au comptant</strong> (paiement immédiat).
                </DocParagraph>

                <DocExample title="Achat à crédit (deux écritures)">
                    <p className={css({ fontWeight: "medium", mb: "2" })}>
                        1. Réception de la facture fournisseur (journal HA)
                    </p>
                    <DocTable
                        headers={["Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["607000", "Achats de marchandises", "1 000,00", ""],
                            ["445660", "TVA déductible", "200,00", ""],
                            ["401000", "Fournisseurs", "", "1 200,00"],
                        ]}
                    />
                    <p className={css({ marginTop: "4", fontWeight: "medium", mb: "2" })}>
                        2. Règlement de la facture (journal BQ)
                    </p>
                    <DocTable
                        headers={["Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["401000", "Fournisseurs", "1 200,00", ""],
                            ["512000", "Banque", "", "1 200,00"],
                        ]}
                    />
                    <p className={css({ marginTop: "2", fontSize: "xs", color: "neutral/60" })}>
                        La première écriture crée la dette, la seconde l'éteint.
                    </p>
                </DocExample>

                <DocExample title="Achat au comptant (une seule écriture)">
                    <p className={css({ fontWeight: "medium", mb: "2" })}>
                        Achat payé immédiatement par carte bancaire
                    </p>
                    <DocTable
                        headers={["Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["607000", "Achats de marchandises", "1 000,00", ""],
                            ["445660", "TVA déductible", "200,00", ""],
                            ["512000", "Banque", "", "1 200,00"],
                        ]}
                    />
                    <p className={css({ marginTop: "2", fontSize: "xs", color: "neutral/60" })}>
                        Pas de passage par le compte fournisseur car le paiement est immédiat.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Types d'opérations courantes">
                <DocExample title="Vente à crédit puis encaissement">
                    <p className={css({ fontWeight: "medium", mb: "2" })}>
                        1. Émission de la facture client (journal VE)
                    </p>
                    <DocTable
                        headers={["Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["411000", "Clients", "600,00", ""],
                            ["706000", "Prestations de services", "", "500,00"],
                            ["445710", "TVA collectée", "", "100,00"],
                        ]}
                    />
                    <p className={css({ marginTop: "4", fontWeight: "medium", mb: "2" })}>
                        2. Encaissement du client (journal BQ)
                    </p>
                    <DocTable
                        headers={["Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["512000", "Banque", "600,00", ""],
                            ["411000", "Clients", "", "600,00"],
                        ]}
                    />
                </DocExample>

                <DocExample title="Réception d'une cotisation (association)">
                    <p className={css({ fontSize: "sm" })}>
                        Un adhérent paye sa cotisation annuelle de 50 euros en espèces.
                    </p>
                    <DocTable
                        headers={["Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["530000", "Caisse", "50,00", ""],
                            ["756000", "Cotisations", "", "50,00"],
                        ]}
                    />
                    <p className={css({ marginTop: "2", fontSize: "xs", color: "neutral/60" })}>
                        La caisse augmente (débit), les produits augmentent (crédit).
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="La TVA dans les écritures">
                <DocParagraph>
                    Si votre organisation est assujettie à la TVA, chaque opération doit distinguer le montant hors
                    taxes (HT) et la TVA. Le compte État joue un rôle central.
                </DocParagraph>

                <DocList
                    items={[
                        "Sur les achats : la TVA payée est déductible (compte 4456) - l'État vous doit cette somme",
                        "Sur les ventes : la TVA facturée est collectée (compte 4457) - vous devez cette somme à l'État",
                        "La différence (collectée - déductible) est versée à l'État (ou remboursée si négative)",
                    ]}
                />

                <DocExample title="Déclaration de TVA">
                    <p className={css({ mb: "2", fontSize: "sm" })}>À la fin du mois, vous avez :</p>
                    <ul className={css({ ml: "4", fontSize: "sm", color: "neutral/70" })}>
                        <li>TVA collectée (4457) : 500 euros (créditeur)</li>
                        <li>TVA déductible (4456) : 300 euros (débiteur)</li>
                    </ul>
                    <p className={css({ marginTop: "3", fontWeight: "medium", mb: "2" })}>
                        Écriture de liquidation de TVA :
                    </p>
                    <DocTable
                        headers={["Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["445710", "TVA collectée", "500,00", ""],
                            ["445660", "TVA déductible", "", "300,00"],
                            ["445510", "TVA à décaisser", "", "200,00"],
                        ]}
                    />
                    <p className={css({ marginTop: "2", fontSize: "xs", color: "neutral/60" })}>
                        Vous devez 200 euros à l'État (différence entre collectée et déductible).
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Contrôle des écritures">
                <DocParagraph>
                    La <strong>balance</strong> permet de vérifier que toutes les écritures sont équilibrées. Elle liste
                    tous les comptes avec :
                </DocParagraph>
                <DocList
                    items={[
                        "Le total des mouvements au débit",
                        "Le total des mouvements au crédit",
                        "Le solde (débiteur ou créditeur)",
                    ]}
                />
                <DocParagraph>
                    Si le total des débits n'égale pas le total des crédits, c'est qu'une erreur s'est glissée quelque
                    part. La balance doit toujours être équilibrée.
                </DocParagraph>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Dans Arrhes, la <DocLink to="/documentation/dashboard/écritures">saisie des écritures</DocLink> est
                    simplifiée. Le logiciel vérifie automatiquement l'équilibre débit/crédit et vous guide dans le choix
                    des comptes. Vous pouvez également créer des modèles d'écritures pour les opérations répétitives.
                </DocParagraph>
            </DocSection>

            <DocTip variant="warning">
                N'oubliez pas : chaque écriture doit toujours être équilibrée (total débits = total crédits). Arrhes
                vérifie automatiquement cet équilibre lors de la saisie.
            </DocTip>

            <DocNextPage to="/documentation/comptabilité/documents" label="Les documents comptables" />
        </DocRoot>
    )
}
