import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTip } from "../../../components/document/DocTip.js"
import { useSiteOrigin } from "../../../utilities/useSiteOrigin.js"

export function MigrationsGuideDocPage() {
    const origin = useSiteOrigin()
    return (
        <DocRoot>
            <DocHeader
                title="Migrations de base de données"
                description="Gérer les migrations de schéma de la base de données lors des mises à jour"
            />

            <DocSection title="Comment les migrations fonctionnent">
                <DocParagraph>
                    Les images API embarquent les fichiers de migration SQL générés au moment de la
                    construction :
                </DocParagraph>
                <DocList
                    items={[
                        <DocCode key="mig-1">0000_setup.sql</DocCode>,
                        <span key="mig-2">crée le schéma complet (utilisé pour une nouvelle installation)</span>,
                        <DocCode key="mig-3">0001_from_last_update.sql</DocCode>,
                        <span key="mig-4">
                            contient les changements depuis la dernière version publiée (vide s'il n'y a pas de
                            changement)
                        </span>,
                    ]}
                />
                <DocParagraph>
                    Au démarrage du conteneur API, la migration est appliquée automatiquement avant le lancement
                    du serveur :
                </DocParagraph>
                <DocList
                    items={[
                        "Base vide (nouvelle installation) : le schéma complet est créé",
                        "Base existante (mise à jour) : les changements incrémentaux sont appliqués",
                        "Aucun changement : rien à faire, le serveur démarre normalement",
                    ]}
                />
                <DocTip variant="info">
                    Les fichiers SQL de la version courante sont consultables sur{" "}
                    <DocLink href={`${origin}/migrations/`} target="_blank" rel="noopener noreferrer">
                        {`${origin}/migrations/`}
                    </DocLink>{" "}
                    pour les passer en revue avant une mise à jour.
                </DocTip>
            </DocSection>

            <DocSection title="Résoudre les erreurs de schéma">
                <DocParagraph>
                    L'API vérifie le schéma au démarrage. Si vous voyez l'erreur{" "}
                    <DocCode>Database schema is out of sync</DocCode>, la base de données n'est pas compatible
                    avec la version des images. Redémarrez le conteneur API pour ré-appliquer les migrations :
                </DocParagraph>
                <DocCodeBlock>{`# Redémarrez le conteneur API (les migrations s'exécutent au démarrage)
docker compose --project-name comptasse restart api

# Consultez les logs pour voir le résultat de la migration
docker compose --project-name comptasse logs api`}</DocCodeBlock>
            </DocSection>

            <DocSection title="En développement">
                <DocParagraph>
                    Pendant le développement, le schéma est géré avec les commandes du dépôt :
                </DocParagraph>
                <DocExample title="Pousser le schéma (développement)">
                    <DocCodeBlock>{`# Depuis la racine du dépôt, avec l'environnement de développement lancé
just db-push`}</DocCodeBlock>
                </DocExample>

                <DocExample title="Générer les fichiers de migration">
                    <DocCodeBlock>{`# Régénère 0000_setup.sql et 0001_from_last_update.sql depuis les modèles
pnpm --filter @comptasse/application-tools run generate`}</DocCodeBlock>
                </DocExample>

                <DocExample title="Mettre à jour le snapshot de référence">
                    <DocCodeBlock>{`# Après avoir validé un changement de schéma, verrouille la nouvelle référence
pnpm --filter @comptasse/application-tools run save-snapshot`}</DocCodeBlock>
                </DocExample>

                <DocExample title="Réinitialiser la base de données (développement)">
                    <DocCodeBlock>{`# Supprime toutes les tables, pousse le schéma, et charge les données de test
just db-reset`}</DocCodeBlock>
                </DocExample>
            </DocSection>

            <DocSection title="Bonnes pratiques">
                <DocList
                    items={[
                        "Sauvegardez toujours votre base de données avant une mise à jour majeure",
                        "Testez les mises à jour dans un environnement de développement d'abord",
                        "Consultez le journal des modifications (CHANGELOG) avant de mettre à jour",
                        "En cas d'échec de migration, les logs du conteneur API indiquent l'étape concernée",
                    ]}
                />
            </DocSection>

            <DocTip variant="info">
                Pour plus d'informations sur l'installation de Comptasse, consultez la page{" "}
                <DocLink to="/documentation/guide/installation">Installation</DocLink>.
            </DocTip>
        </DocRoot>
    )
}