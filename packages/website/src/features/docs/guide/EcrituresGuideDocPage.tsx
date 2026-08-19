import {
    addOneEntryTagRouteDefinition,
    computeOneEntryRouteDefinition,
    createOneEntryFromTemplateRouteDefinition,
    createOneEntryLineRouteDefinition,
    createOneEntryRouteDefinition,
    deleteOneEntryLineRouteDefinition,
    deleteOneEntryRouteDefinition,
    duplicateOneEntryRouteDefinition,
    readAllEntriesRouteDefinition,
    readAllEntryLinesRouteDefinition,
    readAllEntryTagsRouteDefinition,
    readOneEntryLineRouteDefinition,
    readOneEntryRouteDefinition,
    removeOneEntryTagRouteDefinition,
    reverseOneEntryRouteDefinition,
    updateManyEntryLinesRouteDefinition,
    updateOneEntryLineRouteDefinition,
    updateOneEntryRouteDefinition,
} from "@comptasse/application-metadata/routes"
import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function EcrituresGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Écritures"
                description="Saisir et gérer les opérations comptables"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Les écritures comptables sont les opérations enregistrées dans les journaux. Chaque écriture
                    contient une ou plusieurs lignes (débit/crédit) qui doivent s'équilibrer.
                </DocParagraph>
                <DocList
                    items={[
                        "Une écriture appartient à un journal et à un exercice.",
                        "Chaque ligne porte sur un compte et un montant au débit ou au crédit.",
                        "Les écritures peuvent être dupliquées, extournées ou attachées à des pièces justificatives.",
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Accédez à votre exercice, puis à l'onglet « Écritures » pour consulter la liste et
                                ajouter une nouvelle écriture.
                            </DocParagraph>
                            <DocExample title="Créer une écriture">
                                <DocList
                                    items={[
                                        "Sélectionnez le journal (Achats, Ventes, Banque…)",
                                        "Renseignez la date et le libellé",
                                        "Ajoutez les lignes débit/crédit sur les comptes concernés",
                                        "Vérifiez l'équilibre avant d'enregistrer",
                                    ]}
                                />
                            </DocExample>
                            <DocParagraph>
                                Chaque ligne correspond à un compte. Vous devez spécifier soit un débit, soit un crédit,
                                jamais les deux.
                            </DocParagraph>
                            <DocTip variant="info">
                                Vous pouvez attacher des pièces justificatives (PDF, JPG, PNG, max 50 Mo) à chaque
                                écriture.
                            </DocTip>
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                Les écritures comptables sont les opérations enregistrées dans les journaux. Chaque
                                écriture contient une ou plusieurs lignes (débit/crédit).
                            </DocParagraph>
                            <DocSection
                                title="Écritures"
                                depth={1}
                            >
                                <DocRouteRequest routeDefinition={createOneEntryRouteDefinition} />
                                <DocRouteRequest
                                    routeDefinition={createOneEntryFromTemplateRouteDefinition}
                                    description="Créer une écriture avec des lignes pré-remplies en une seule requête."
                                />
                                <DocRouteRequest routeDefinition={readAllEntriesRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllEntryTagsRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneEntryRouteDefinition} />
                                <DocRouteRequest routeDefinition={updateOneEntryRouteDefinition} />
                                <DocRouteRequest routeDefinition={deleteOneEntryRouteDefinition} />
                                <DocRouteRequest routeDefinition={duplicateOneEntryRouteDefinition} />
                                <DocRouteRequest routeDefinition={computeOneEntryRouteDefinition} />
                                <DocRouteRequest
                                    routeDefinition={reverseOneEntryRouteDefinition}
                                    description="Créer une écriture de contre-passation."
                                />
                            </DocSection>
                            <DocSection
                                title="Lignes d'écriture"
                                depth={1}
                            >
                                <DocRouteRequest routeDefinition={createOneEntryLineRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllEntryLinesRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneEntryLineRouteDefinition} />
                                <DocRouteRequest routeDefinition={updateOneEntryLineRouteDefinition} />
                                <DocRouteRequest
                                    routeDefinition={updateManyEntryLinesRouteDefinition}
                                    description="Modifier en masse toutes les lignes d'une écriture."
                                />
                                <DocRouteRequest routeDefinition={deleteOneEntryLineRouteDefinition} />
                            </DocSection>
                            <DocSection
                                title="Tags d'écriture"
                                depth={1}
                            >
                                <DocRouteRequest routeDefinition={addOneEntryTagRouteDefinition} />
                                <DocRouteRequest routeDefinition={removeOneEntryTagRouteDefinition} />
                            </DocSection>
                        </>
                    }
                    cli={
                        <>
                            <DocTable
                                headers={[
                                    "Commande",
                                    "Description",
                                ]}
                                rows={[
                                    [
                                        <DocCode key="0">{"comptasse entries list --year <id>"}</DocCode>,
                                        "Liste les écritures",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse entries create --year <id> --journal <id>"}
                                        </DocCode>,
                                        "Crée une écriture",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse entries update <id> --year <id>"}</DocCode>,
                                        "Modifie une écriture",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse entries duplicate <id> --year <id>"}</DocCode>,
                                        "Duplique une écriture",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse entries reverse <id> --year <id>"}</DocCode>,
                                        "Extourne une écriture",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse entries delete <id> --year <id>"}</DocCode>,
                                        "Supprime une écriture",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse entries lines create <id> --year <id> --account <id>"}
                                        </DocCode>,
                                        "Ajoute une ligne",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse entries tags add <id> --year <id> --tag <id>"}
                                        </DocCode>,
                                        "Ajoute un libellé",
                                    ],
                                ]}
                            />
                            <DocExample title="Créer une écriture avec libellé">
                                <DocCodeBlock>
                                    comptasse entries create --year year_xyz --journal jrn_abc --label "Facture
                                    fournisseur" --date 2025-03-15
                                </DocCodeBlock>
                            </DocExample>
                            <DocTip variant="warning">
                                La suppression d'une écriture est irréversible. L'ensemble des lignes liées sera
                                également supprimé.
                            </DocTip>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
