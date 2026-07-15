import {
    createOneAccountRouteDefinition,
    deleteOneAccountRouteDefinition,
    readAllAccountsRouteDefinition,
    readOneAccountRouteDefinition,
    updateOneAccountRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function ComptesGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Comptes"
                description="Plan comptable de l'exercice et personnalisation des comptes"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Le plan comptable est la liste des comptes disponibles pour saisir vos écritures. Arrhes crée
                    automatiquement un plan standard adapté au type d'organisation, mais vous pouvez le personnaliser.
                </DocParagraph>
                <DocList
                    items={[
                        "Les comptes sont organisés par classes (1 à 7).",
                        "Un compte peut avoir des sous-comptes pour affiner le suivi.",
                        "La numérotation suit les conventions du plan comptable général.",
                    ]}
                />
                <DocTip variant="info">
                    Pour comprendre la numérotation des comptes, consultez la page sur les{" "}
                    <DocLink to="/documentation/comptabilité/comptes">comptes comptables</DocLink>.
                </DocTip>
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <DocExample title="Ajouter un compte">
                            <DocList
                                items={[
                                    "Accédez à l'exercice concerné",
                                    "Allez dans Paramètres → Comptes",
                                    "Cliquez sur « Ajouter un compte »",
                                    "Définissez le numéro et l'intitulé du compte",
                                    "Enregistrez",
                                ]}
                            />
                        </DocExample>
                    }
                    api={
                        <>
                            <DocParagraph>
                                Le plan comptable de l'exercice. Les comptes sont organisés en arborescence avec des
                                classes (1 à 7) à la racine.
                            </DocParagraph>
                            <DocRouteRequest routeDefinition={createOneAccountRouteDefinition} />
                            <DocRouteRequest routeDefinition={readAllAccountsRouteDefinition} />
                            <DocRouteRequest routeDefinition={readOneAccountRouteDefinition} />
                            <DocRouteRequest routeDefinition={updateOneAccountRouteDefinition} />
                            <DocRouteRequest routeDefinition={deleteOneAccountRouteDefinition} />
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
                                        <DocCode key="0">{"arrhes accounts list --year <id>"}</DocCode>,
                                        "Liste les comptes",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes accounts get <id> --year <id>"}</DocCode>,
                                        "Détails d'un compte",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {
                                                "arrhes accounts create --year <id> --number <n> --label <l> --type <t> --parent <id>"
                                            }
                                        </DocCode>,
                                        "Crée un compte",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes accounts update <id> --year <id>"}</DocCode>,
                                        "Modifie un compte",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes accounts delete <id> --year <id>"}</DocCode>,
                                        "Supprime un compte",
                                    ],
                                ]}
                            />
                            <DocExample title="Créer un compte fournisseur">
                                <DocCodeBlock>
                                    arrhes accounts create --year year_xyz --number 401 --label "Fournisseurs" --type
                                    liability --parent acc_root
                                </DocCodeBlock>
                            </DocExample>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
