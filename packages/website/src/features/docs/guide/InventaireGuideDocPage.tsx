import {
    createOneInventoryItemRouteDefinition,
    createOneInventoryMovementRouteDefinition,
    deleteOneInventoryItemRouteDefinition,
    deleteOneInventoryMovementRouteDefinition,
    readAllInventoryItemsRouteDefinition,
    readAllInventoryMovementsRouteDefinition,
    readOneInventoryItemRouteDefinition,
    readOneInventoryMovementRouteDefinition,
    updateOneInventoryItemRouteDefinition,
    updateOneInventoryMovementRouteDefinition,
} from "@comptasse/application-metadata/routes"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function InventaireGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Inventaire"
                description="Suivre les stocks et les mouvements de marchandises"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    L'inventaire permet de suivre les stocks de marchandises, matières premières ou produits finis.
                    Chaque article est identifié par un SKU unique au sein d'un exercice et sa quantité est mise à jour
                    par les mouvements.
                </DocParagraph>
                <DocList
                    items={[
                        "Chaque article appartient à un exercice et à une organisation.",
                        "Le SKU est unique par organisation et par exercice.",
                        "La quantité actuelle est recalculée automatiquement après chaque mouvement.",
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Rendez-vous dans les paramètres de l'exercice, puis dans l'onglet « Inventaire ».
                            </DocParagraph>
                            <DocExample title="Créer un article">
                                <DocList
                                    items={[
                                        "Ouvrez l'onglet Inventaire",
                                        "Cliquez sur Ajouter un article",
                                        "Renseignez le SKU, le nom, l'unité et le prix unitaire",
                                        "Définissez un seuil minimal et un emplacement si besoin",
                                        "Validez",
                                    ]}
                                />
                            </DocExample>
                            <DocExample title="Enregistrer un mouvement">
                                <DocList
                                    items={[
                                        "Sélectionnez l'article concerné",
                                        "Choisissez le type (entrée ou sortie)",
                                        "Indiquez la quantité et la date",
                                        "Ajoutez un motif pour tracer l'origine",
                                    ]}
                                />
                            </DocExample>
                            <DocTip variant="warning">
                                La suppression ou la modification d'un mouvement met à jour la quantité actuelle de
                                l'article concerné.
                            </DocTip>
                        </>
                    }
                    api={
                        <>
                            <DocSection
                                title="Articles"
                                depth={1}
                            >
                                <DocParagraph>
                                    Les articles d'inventaire sont stockés avec une quantité actuelle dénormalisée. Les
                                    mouvements recalculent cette quantité dans une transaction.
                                </DocParagraph>
                                <DocRouteRequest routeDefinition={createOneInventoryItemRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllInventoryItemsRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneInventoryItemRouteDefinition} />
                                <DocRouteRequest routeDefinition={updateOneInventoryItemRouteDefinition} />
                                <DocRouteRequest routeDefinition={deleteOneInventoryItemRouteDefinition} />
                            </DocSection>
                            <DocSection
                                title="Mouvements"
                                depth={1}
                            >
                                <DocParagraph>
                                    Chaque mouvement indique une date, un type (entrée ou sortie) et une quantité. La
                                    mise à jour d'un mouvement recalcule la quantité actuelle de l'article.
                                </DocParagraph>
                                <DocRouteRequest routeDefinition={createOneInventoryMovementRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllInventoryMovementsRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneInventoryMovementRouteDefinition} />
                                <DocRouteRequest routeDefinition={updateOneInventoryMovementRouteDefinition} />
                                <DocRouteRequest routeDefinition={deleteOneInventoryMovementRouteDefinition} />
                            </DocSection>
                        </>
                    }
                    cli={
                        <DocParagraph>
                            L'inventaire n'est pas encore accessible via la CLI. Utilisez l'interface web ou l'API pour
                            gérer les articles et les mouvements.
                        </DocParagraph>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
