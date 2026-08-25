import {
    createOneTagRouteDefinition,
    deleteOneTagRouteDefinition,
    readAllTagsRouteDefinition,
    readOneTagRouteDefinition,
    updateOneTagRouteDefinition,
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

export function LibellesGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Libellés"
                description="Libellés d'écriture réutilisables pour catégoriser les écritures"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Les libellés (tags) permettent de catégoriser les écritures comptables avec des étiquettes
                    réutilisables définies au niveau de l'exercice.
                </DocParagraph>
                <DocList
                    items={[
                        "Un libellé peut être appliqué à plusieurs écritures.",
                        "Les libellés facilitent le filtrage et l'analyse.",
                        "Ils sont configurés dans les paramètres de l'exercice.",
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <DocList
                            items={[
                                "Ouvrez l'exercice concerné",
                                "Allez dans Paramètres → Libellés",
                                "Cliquez sur « Ajouter un libellé »",
                                "Renseignez l'intitulé",
                                "Enregistrez",
                            ]}
                        />
                    }
                    api={
                        <>
                            <DocParagraph>
                                Les libellés permettent de catégoriser les écritures comptables avec des étiquettes
                                réutilisables.
                            </DocParagraph>
                            <DocRouteRequest routeDefinition={createOneTagRouteDefinition} />
                            <DocRouteRequest routeDefinition={readAllTagsRouteDefinition} />
                            <DocRouteRequest routeDefinition={readOneTagRouteDefinition} />
                            <DocRouteRequest routeDefinition={updateOneTagRouteDefinition} />
                            <DocRouteRequest routeDefinition={deleteOneTagRouteDefinition} />
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
                                        <DocCode key="0">{"comptasse tags list --year <id>"}</DocCode>,
                                        "Liste les libellés",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse tags get <id> --year <id>"}</DocCode>,
                                        "Détails d'un libellé",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse tags create --year <id> --label <libellé>"}
                                        </DocCode>,
                                        "Crée un libellé",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse tags update <id> --year <id>"}</DocCode>,
                                        "Modifie un libellé",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse tags delete <id> --year <id>"}</DocCode>,
                                        "Supprime un libellé",
                                    ],
                                ]}
                            />
                            <DocExample title="Créer un libellé">
                                <DocCodeBlock>
                                    comptasse tags create --year year_xyz --label "Investissement"
                                </DocCodeBlock>
                            </DocExample>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
