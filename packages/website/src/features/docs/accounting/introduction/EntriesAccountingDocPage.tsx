import { css } from "@comptasse/ui/utilities/cn.js"
import { DocDefinition } from "../../../../components/document/DocDefinition.tsx"
import { DocExample } from "../../../../components/document/DocExample.tsx"
import { DocHeader } from "../../../../components/document/DocHeader.tsx"
import { DocLink } from "../../../../components/document/DocLink.tsx"
import { DocList } from "../../../../components/document/DocList.tsx"
import { DocParagraph } from "../../../../components/document/DocParagraph.tsx"
import { DocSection } from "../../../../components/document/DocSection.tsx"
import { DocSourceRef } from "../../../../components/document/DocSourceRef.tsx"
import { DocSources } from "../../../../components/document/DocSources.tsx"
import { DocTable } from "../../../../components/document/DocTable.tsx"
import { DocTip } from "../../../../components/document/DocTip.tsx"
import { DocRoot } from "../../../../components/document/DocRoot.tsx"

export function EntriesAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Les écritures comptables"
                description="Enregistrer les opérations dans les comptes"
            />
            <WritingDefinitionSection />
            <WritingStructureSection />
            <CreditVsCashOperationsSection />
            <CommonOperationsSection />
            <VatInWritingsSection />
            <WritingControlSection />
            <EntriesArrhesLinkSection />
            <DocSources
                sources={[
                    {
                        label: "Plan Comptable Général - Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
                    },
                    {
                        label: "Taxe sur la valeur ajoutée en France - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Taxe_sur_la_valeur_ajout%C3%A9e_en_France",
                    },
                ]}
            />
        </DocRoot>
    )
}

function WritingDefinitionSection() {
    return (
        <DocSection title="Qu'est-ce qu'une écriture comptable ?">
            <DocParagraph>
                Une{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "ecriture-comptable",
                    }}
                >
                    écriture comptable
                </DocLink>{" "}
                est la traduction d'une opération économique dans le langage de la comptabilité. C'est l'acte
                concret d'enregistrement : à chaque fois que votre organisation effectue une opération (achat,
                vente, encaissement, paiement…), celle-ci doit être consignée sous forme d'écriture.
                <DocSourceRef n={1} />
            </DocParagraph>
            <DocParagraph>
                Comme vu dans la page sur la{" "}
                <DocLink to="/documentation/comptabilité/introduction/partie-double">partie double</DocLink>, chaque écriture
                respecte le principe de la{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "partie-double",
                    }}
                >
                    partie double
                </DocLink>{" "}
                : elle est composée d'au moins deux lignes, chacune associée à un{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "compte",
                    }}
                >
                    compte comptable
                </DocLink>
                . Une ligne enregistre un montant au débit, l'autre au crédit. Le total des débits égale toujours le
                total des crédits.
            </DocParagraph>
            <DocParagraph>
                Les écritures sont le lien entre les opérations réelles et les comptes. Sans écriture, un compte ne
                bouge pas. Les comptes ne sont que le reflet cumulé de toutes les écritures qui les ont affectés.
            </DocParagraph>

            <DocDefinition term="Pièce justificative">
                Chaque écriture doit être appuyée par un document qui prouve la réalité de l'opération (facture,
                relevé bancaire, ticket de caisse…). C'est le fondement du contrôle comptable.
            </DocDefinition>
            <DocDefinition term="Enregistrement chronologique">
                Les écritures doivent être passées dans l'ordre chronologique. On ne revient jamais en arrière : les
                erreurs sont corrigées par des écritures de sens contraire, jamais effacées.
            </DocDefinition>
        </DocSection>
    )
}

function WritingStructureSection() {
    return (
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

            <DocTip variant="warning">
                Seuls les comptes à 3 chiffres ou plus peuvent être utilisés dans les écritures comptables. Les
                comptes à 1 ou 2 chiffres (par exemple{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/comptes/$account"
                    params={{
                        account: "1",
                    }}
                >
                    1
                </DocLink>
                ,{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/comptes/$account"
                    params={{
                        account: "10",
                    }}
                >
                    10
                </DocLink>
                ,{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/comptes/$account"
                    params={{
                        account: "60",
                    }}
                >
                    60
                </DocLink>
                ) sont des comptes de regroupement servant uniquement à la classification dans le plan comptable.
                <DocSourceRef n={1} />
            </DocTip>

            <DocExample title="Écriture d'achat de fournitures">
                <p
                    className={css({
                        fontWeight: "medium",
                        mb: "2",
                    })}
                >
                    Achat de fournitures de bureau - 120 euros TTC payé par chèque
                </p>
                <DocTable
                    headers={[
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "6061",
                            "Fournitures de bureau",
                            "100,00",
                            "",
                        ],
                        [
                            "44566",
                            "TVA déductible",
                            "20,00",
                            "",
                        ],
                        [
                            "512",
                            "Banque",
                            "",
                            "120,00",
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
                    Total débit = Total crédit = 120,00 euros
                </p>
            </DocExample>
        </DocSection>
    )
}

function CreditVsCashOperationsSection() {
    return (
        <DocSection title="Opérations à crédit vs au comptant">
            <DocParagraph>
                Une distinction importante existe entre les opérations <strong>à crédit</strong> (paiement différé)
                et les opérations <strong>au comptant</strong> (paiement immédiat).
            </DocParagraph>

            <DocExample title="Achat à crédit (deux écritures)">
                <p
                    className={css({
                        fontWeight: "medium",
                        mb: "2",
                    })}
                >
                    1. Réception de la facture fournisseur (journal HA)
                </p>
                <DocTable
                    headers={[
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "607",
                            "Achats de marchandises",
                            "1 000,00",
                            "",
                        ],
                        [
                            "44566",
                            "TVA déductible",
                            "200,00",
                            "",
                        ],
                        [
                            "401",
                            "Fournisseurs",
                            "",
                            "1 200,00",
                        ],
                    ]}
                />
                <p
                    className={css({
                        marginTop: "4",
                        fontWeight: "medium",
                        mb: "2",
                    })}
                >
                    2. Règlement de la facture (journal BQ)
                </p>
                <DocTable
                    headers={[
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "401",
                            "Fournisseurs",
                            "1 200,00",
                            "",
                        ],
                        [
                            "512",
                            "Banque",
                            "",
                            "1 200,00",
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
                    La première écriture crée la dette, la seconde l'éteint.
                </p>
            </DocExample>

            <DocExample title="Achat au comptant (une seule écriture)">
                <p
                    className={css({
                        fontWeight: "medium",
                        mb: "2",
                    })}
                >
                    Achat payé immédiatement par carte bancaire
                </p>
                <DocTable
                    headers={[
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "607",
                            "Achats de marchandises",
                            "1 000,00",
                            "",
                        ],
                        [
                            "44566",
                            "TVA déductible",
                            "200,00",
                            "",
                        ],
                        [
                            "512",
                            "Banque",
                            "",
                            "1 200,00",
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
                    Pas de passage par le compte fournisseur car le paiement est immédiat.
                </p>
            </DocExample>
        </DocSection>
    )
}

function CommonOperationsSection() {
    return (
        <DocSection title="Types d'opérations courantes">
            <DocExample title="Vente à crédit puis encaissement">
                <p
                    className={css({
                        fontWeight: "medium",
                        mb: "2",
                    })}
                >
                    1. Émission de la facture client (journal VE)
                </p>
                <DocTable
                    headers={[
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "411",
                            "Clients",
                            "600,00",
                            "",
                        ],
                        [
                            "706",
                            "Prestations de services",
                            "",
                            "500,00",
                        ],
                        [
                            "445710",
                            "TVA collectée",
                            "",
                            "100,00",
                        ],
                    ]}
                />
                <p
                    className={css({
                        marginTop: "4",
                        fontWeight: "medium",
                        mb: "2",
                    })}
                >
                    2. Encaissement du client (journal BQ)
                </p>
                <DocTable
                    headers={[
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "512",
                            "Banque",
                            "600,00",
                            "",
                        ],
                        [
                            "411",
                            "Clients",
                            "",
                            "600,00",
                        ],
                    ]}
                />
            </DocExample>

            <DocExample title="Réception d'une cotisation (association)">
                <p
                    className={css({
                        fontSize: "sm",
                    })}
                >
                    Un adhérent paye sa cotisation annuelle de 50 euros en espèces.
                </p>
                <DocTable
                    headers={[
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "530",
                            "Caisse",
                            "50,00",
                            "",
                        ],
                        [
                            "756000",
                            "Cotisations",
                            "",
                            "50,00",
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
                    La caisse augmente (débit), les produits augmentent (crédit).
                </p>
            </DocExample>
        </DocSection>
    )
}

function VatInWritingsSection() {
    return (
        <DocSection title="La TVA dans les écritures">
            <DocParagraph>
                Si votre{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "organisation",
                    }}
                >
                    organisation
                </DocLink>{" "}
                est assujettie à la TVA, chaque opération doit distinguer le montant hors taxes (HT) et la TVA.
                <DocSourceRef n={2} /> Le compte État joue un rôle central.
            </DocParagraph>

            <DocList
                items={[
                    "Sur les achats : la TVA payée est déductible (compte 4456) - l'État vous doit cette somme",
                    "Sur les ventes : la TVA facturée est collectée (compte 4457) - vous devez cette somme à l'État",
                    "La différence (collectée - déductible) est versée à l'État (ou remboursée si négative)",
                ]}
            />

            <DocExample title="Déclaration de TVA">
                <p
                    className={css({
                        mb: "2",
                        fontSize: "sm",
                    })}
                >
                    À la fin du mois, vous avez :
                </p>
                <DocList
                    variant="bullet"
                    items={[
                        "TVA collectée (4457) : 500 euros (créditeur)",
                        "TVA déductible (4456) : 300 euros (débiteur)",
                    ]}
                />
                <p
                    className={css({
                        marginTop: "3",
                        fontWeight: "medium",
                        mb: "2",
                    })}
                >
                    Écriture de liquidation de TVA :
                </p>
                <DocTable
                    headers={[
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "445710",
                            "TVA collectée",
                            "500,00",
                            "",
                        ],
                        [
                            "44566",
                            "TVA déductible",
                            "",
                            "300,00",
                        ],
                        [
                            "445510",
                            "TVA à décaisser",
                            "",
                            "200,00",
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
                    Vous devez 200 euros à l'État (différence entre collectée et déductible).
                </p>
            </DocExample>
        </DocSection>
    )
}

function WritingControlSection() {
    return (
        <DocSection title="Contrôle des écritures">
            <DocParagraph>
                La{" "}
                <strong>
                    <DocLink
                        to="/documentation/comptabilité/ressources/glossaire/$term"
                        params={{
                            term: "balance",
                        }}
                    >
                        balance
                    </DocLink>
                </strong>{" "}
                permet de vérifier que toutes les écritures sont équilibrées. Elle liste tous les comptes avec :
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
    )
}

function EntriesArrhesLinkSection() {
    return (
        <DocSection title="Lien avec Arrhes">
            <DocParagraph>
                Dans Arrhes, la <DocLink to="/documentation/guide/écritures">saisie des écritures</DocLink> est
                simplifiée. Le logiciel vérifie automatiquement l'équilibre débit/crédit et vous guide dans le choix
                des comptes. Vous pouvez également créer des modèles d'écritures pour les opérations répétitives.
            </DocParagraph>
        </DocSection>
    )
}
