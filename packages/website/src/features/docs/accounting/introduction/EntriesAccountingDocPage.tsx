import { DocDefinition } from "../../../../components/document/DocDefinition.tsx"
import { DocExample } from "../../../../components/document/DocExample.tsx"
import { DocHeader } from "../../../../components/document/DocHeader.tsx"
import { DocLink } from "../../../../components/document/DocLink.tsx"
import { DocList } from "../../../../components/document/DocList.tsx"
import { DocParagraph } from "../../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../../components/document/DocRoot.tsx"
import { DocSection } from "../../../../components/document/DocSection.tsx"
import { DocSourceRef } from "../../../../components/document/DocSourceRef.tsx"
import { DocSources } from "../../../../components/document/DocSources.tsx"
import { DocTable } from "../../../../components/document/DocTable.tsx"
import { DocTip } from "../../../../components/document/DocTip.tsx"

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
                est la traduction d'une opération économique dans le langage de la comptabilité. C'est l'acte concret
                d'enregistrement : à chaque fois que votre organisation effectue une opération (achat, vente,
                encaissement, paiement…), celle-ci doit être consignée sous forme d'écriture.
                <DocSourceRef n={1} />
            </DocParagraph>
            <DocParagraph>
                Comme vu dans la page sur la{" "}
                <DocLink to="/documentation/comptabilité/introduction/partie-double">partie double</DocLink>, chaque
                écriture respecte le principe de la{" "}
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
                <DocParagraph>
                    Chaque écriture doit être appuyée par un document qui prouve la réalité de l'opération (facture,
                    relevé bancaire, ticket de caisse…). C'est le fondement du contrôle comptable.
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Enregistrement chronologique">
                <DocParagraph>
                    Les écritures doivent être passées dans l'ordre chronologique. On ne revient jamais en arrière : les
                    erreurs sont corrigées par des écritures de sens contraire, jamais effacées.
                </DocParagraph>
                <DocParagraph>
                    En pratique, les écritures sont d'abord créées sous la forme d'un brouillon (ou brouillard)
                    comptable. Ce qui permet de revenir dessus avant de les valider définitivement.
                </DocParagraph>
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
                    "Le numéro de la pièce justificative",
                    "Le libellé (description de l'opération)",
                    "Le journal dans lequel elle est enregistrée",
                    "Les comptes mouvementés avec leurs montants au débit ou au crédit",
                ]}
            />

            <DocTip variant="warning">
                Seuls les comptes à 3 chiffres ou plus peuvent être utilisés dans les écritures comptables. Les comptes
                à 1 ou 2 chiffres (par exemple{" "}
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
                <DocParagraph>Achat de fournitures de bureau - 120 euros TTC payé par carte</DocParagraph>
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
                <DocParagraph>Total débit = Total crédit = 120,00 euros</DocParagraph>
            </DocExample>
        </DocSection>
    )
}

function CreditVsCashOperationsSection() {
    return (
        <DocSection title="Opérations à crédit vs au comptant">
            <DocParagraph>
                Une distinction importante existe entre les opérations <strong>à crédit</strong> (paiement différé) et
                les opérations <strong>au comptant</strong> (paiement immédiat).
            </DocParagraph>

            <DocExample title="Achat à crédit (deux écritures)">
                <DocParagraph>1. Réception de la facture fournisseur (journal HA)</DocParagraph>
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
                <DocParagraph>2. Règlement de la facture (journal BQ)</DocParagraph>
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
                <DocParagraph>La première écriture crée la dette, la seconde l'éteint.</DocParagraph>
            </DocExample>

            <DocExample title="Achat au comptant (une seule écriture)">
                <DocParagraph>Achat payé immédiatement par carte bancaire</DocParagraph>
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
                <DocParagraph>Pas de passage par le compte fournisseur car le paiement est immédiat.</DocParagraph>
            </DocExample>
        </DocSection>
    )
}

function CommonOperationsSection() {
    return (
        <DocSection title="Types d'opérations courantes">
            <DocParagraph>
                De nombreuses spécificités existent pour enregistrer les opérations. Bien qu'il soit impossible de faire
                une liste exhaustive, nous essayons de compiler un certain nombre de scénarios dans cette documentation.
            </DocParagraph>
            <DocLink
                to="/documentation/comptabilité/ressources/scénarios"
                buttonProps={{
                    text: "Voir la liste des scénarios",
                }}
            />
            <DocParagraph>
                N'hésitez pas à nous faire part de tout scénario qui n'existe pas encore, afin d'enrichir la
                documentation pour tous.
            </DocParagraph>
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
                <DocSourceRef n={2} />
            </DocParagraph>
            <DocParagraph>
                Il faut voir chaque organisation (entreprise, association, etc.) comme un agent qui collecte la TVA pour
                le compte de l'État.
            </DocParagraph>

            <DocList
                items={[
                    "Sur les achats : la TVA payée est déductible (compte 4456) - l'État vous doit cette somme",
                    "Sur les ventes : la TVA facturée est collectée (compte 4457) - vous devez cette somme à l'État",
                    "La différence (collectée - déductible) est versée à l'État (ou remboursée si négative)",
                ]}
            />

            <DocExample title="Déclaration de TVA">
                <DocParagraph>À la fin du mois, vous avez :</DocParagraph>
                <DocList
                    variant="bullet"
                    items={[
                        "TVA collectée (4457) : 500 euros (créditeur)",
                        "TVA déductible (4456) : 300 euros (débiteur)",
                    ]}
                />
                <DocParagraph>Écriture de liquidation de TVA :</DocParagraph>
                <DocTable
                    headers={[
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "4457",
                            "TVA collectée",
                            "500,00",
                            "",
                        ],
                        [
                            "4456",
                            "TVA déductible",
                            "",
                            "300,00",
                        ],
                        [
                            "4455",
                            "TVA à décaisser",
                            "",
                            "200,00",
                        ],
                    ]}
                />
                <DocParagraph>Vous devez 200 euros à l'État (différence entre collectée et déductible).</DocParagraph>
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
                Si le total global des débits n'égale pas le total des crédits, c'est qu'une erreur s'est glissée
                quelque part. La balance doit toujours être équilibrée.
            </DocParagraph>
        </DocSection>
    )
}
