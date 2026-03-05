import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocList } from "../../../components/document/docList.tsx"
import { DocNextPage } from "../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTable } from "../../../components/document/docTable.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function AuthenticationApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Authentification"
                description="Méthodes d'authentification, en-têtes requis et clés API"
            />

            <DocSection title="Méthodes d'authentification">
                <DocParagraph>
                    L'API supporte deux méthodes d'authentification pour accéder aux routes protégées. Chaque requête
                    doit utiliser l'une des deux méthodes suivantes :
                </DocParagraph>
                <DocTable
                    headers={["Méthode", "En-tête", "Cas d'usage"]}
                    rows={[
                        ["Cookie de session", "Cookie: arrhes_id_user_session=...", "Utilisation via l'interface web"],
                        ["Clé API (Bearer)", "Authorization: Bearer <clé>", "Intégration programmatique"],
                    ]}
                />
            </DocSection>

            <DocSection title="Authentification par cookie de session">
                <DocParagraph>
                    Lors de la connexion via l'interface web, un cookie <code>arrhes_id_user_session</code> (httpOnly)
                    est automatiquement défini. Ce cookie identifie l'utilisateur pour toutes les requêtes suivantes.
                </DocParagraph>
                <DocParagraph>
                    Avec cette méthode, l'organisation cible doit être spécifiée séparément via l'en-tête{" "}
                    <code>X-Organization-Id</code> ou le cookie <code>arrhes_id_organization</code>.
                </DocParagraph>
                <DocTip variant="info">
                    L'en-tête <code>X-Organization-Id</code> a la priorité sur le cookie{" "}
                    <code>arrhes_id_organization</code>.
                </DocTip>
            </DocSection>

            <DocSection title="Authentification par clé API">
                <DocParagraph>
                    Les clés API permettent un accès programmatique à l'API. Elles sont liées à une organisation
                    spécifique et nécessitent un abonnement premium.
                </DocParagraph>
                <DocParagraph>
                    L'en-tête <code>Authorization</code> doit contenir le token au format Bearer :
                </DocParagraph>
                <DocTable headers={["En-tête", "Valeur"]} rows={[["Authorization", "Bearer <votre_clé_api>"]]} />
                <DocParagraph>
                    Avec une clé API, l'organisation est automatiquement déterminée par la clé elle-même. Il n'est pas
                    nécessaire de fournir l'en-tête <code>X-Organization-Id</code>.
                </DocParagraph>
                <DocTip variant="warning">
                    La clé brute (<code>rawKey</code>) n'est retournée qu'au moment de la création via la route{" "}
                    <code>POST /auth/create-one-api-key</code>. Conservez-la précieusement, elle ne pourra pas être
                    récupérée ultérieurement.
                </DocTip>
            </DocSection>

            <DocSection title="En-têtes requis">
                <DocParagraph>Résumé des en-têtes nécessaires selon la méthode d'authentification :</DocParagraph>
                <DocTable
                    headers={["En-tête", "Cookie de session", "Clé API"]}
                    rows={[
                        ["Content-Type: application/json", "Requis", "Requis"],
                        ["X-Organization-Id", "Requis *", "Non nécessaire"],
                        ["Authorization: Bearer <clé>", "Non utilisé", "Requis"],
                    ]}
                />
                <DocParagraph>
                    * L'en-tête <code>X-Organization-Id</code> peut être remplacé par le cookie{" "}
                    <code>arrhes_id_organization</code>.
                </DocParagraph>
            </DocSection>

            <DocSection title="Permissions">
                <DocParagraph>
                    Certaines routes nécessitent des permissions supplémentaires au-delà de l'authentification :
                </DocParagraph>
                <DocList
                    items={[
                        <>
                            <strong>Administrateur</strong> : les routes de gestion d'organisation (suppression,
                            paiements, abonnement) nécessitent que l'utilisateur soit administrateur de l'organisation.
                        </>,
                        <>
                            <strong>Plan avancé</strong> : les routes de gestion des clés API nécessitent un abonnement
                            avancé actif sur l'organisation.
                        </>,
                    ]}
                />
            </DocSection>

            <DocNextPage to="/documentation/api/organisations" label="Organisations" />
        </DocRoot>
    )
}
