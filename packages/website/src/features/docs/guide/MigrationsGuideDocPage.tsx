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

export function MigrationsGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Migrations de base de données"
                description="Gérer les migrations de schéma de la base de données lors des mises à jour"
            />

            <DocSection title="Quand les migrations sont nécessaires">
                <DocParagraph>
                    Lorsque vous mettez à jour Comptasse, le schéma de la base de données
                    peut évoluer. Le conteneur vérifie automatiquement la synchronisation
                    au démarrage.
                </DocParagraph>
                <DocList
                    items={[
                        "Premier démarrage : le schéma est poussé automatiquement",
                        "Mise à jour mineure : le schéma est poussé automatiquement si compatible",
                        "Mise à jour majeure : une erreur de synchronisation peut survenir",
                    ]}
                />
            </DocSection>

            <DocSection title="Résoudre les erreurs de schéma">
                <DocParagraph>
                    Si vous voyez l'erreur{" "}
                    <DocCode>Database schema is out of sync</DocCode> au démarrage, cela
                    signifie que le schéma de la base de données n'est pas compatible avec
                    la version de Comptasse que vous utilisez.
                </DocParagraph>

                <DocExample title="Option 1 : Pousser le schéma (recommandé)">
                    <DocParagraph>
                        Cette commande applique les modifications de schéma sans perdre de
                        données.
                    </DocParagraph>
                    <DocCodeBlock>{`docker exec comptasse pnpm --filter @comptasse/application-tools run push`}</DocCodeBlock>
                </DocExample>

                <DocExample title="Option 2 : Réinitialiser la base de données">
                    <DocTip variant="warning">
                        Cette commande supprime toutes les données de la base de
                        données. Utilisez-la uniquement en développement ou si vous
                        acceptez la perte de données.
                    </DocTip>
                    <DocCodeBlock>{`docker exec comptasse pnpm --filter @comptasse/application-tools run reset`}</DocCodeBlock>
                </DocExample>
            </DocSection>

            <DocSection title="Commandes de gestion du schéma">
                <DocExample title="Vérifier le schéma">
                    <DocCodeBlock>{`# Vérifier la synchronisation du schéma
docker exec comptasse pnpm --filter @comptasse/application-api exec tsx --conditions source ./src/server.ts
# (avec SCHEMA_CHECK_ONLY=1 pour un check rapide)`}</DocCodeBlock>
                </DocExample>

                <DocExample title="Pousser le schéma">
                    <DocCodeBlock>{`# Appliquer les modifications de schéma
docker exec comptasse pnpm --filter @comptasse/application-tools run push`}</DocCodeBlock>
                </DocExample>

                <DocExample title="Générer des migrations">
                    <DocCodeBlock>{`# Générer des fichiers de migration SQL
docker exec comptasse pnpm --filter @comptasse/application-tools run generate`}</DocCodeBlock>
                </DocExample>

                <DocExample title="Appliquer les migrations">
                    <DocCodeBlock>{`# Appliquer les migrations générées
docker exec comptasse pnpm --filter @comptasse/application-tools run migrate`}</DocCodeBlock>
                </DocExample>

                <DocExample title="Réinitialiser la base de données">
                    <DocCodeBlock>{`# Supprimer toutes les tables, pousser le schéma, et charger les données de test
docker exec comptasse pnpm --filter @comptasse/application-tools run reset`}</DocCodeBlock>
                </DocExample>
            </DocSection>

            <DocSection title="Résoudre les problèmes courants">
                <DocExample title="Table manquante dans la base de données">
                    <DocParagraph>
                        Si une table attendue par le code n'existe pas dans la base de
                        données, exécutez :
                    </DocParagraph>
                    <DocCodeBlock>{`docker exec comptasse pnpm --filter @comptasse/application-tools run push`}</DocCodeBlock>
                </DocExample>

                <DocExample title="Colonne manquante dans une table">
                    <DocParagraph>
                        Si une colonne attendue par le code n'existe pas, la commande push
                        l'ajoutera automatiquement.
                    </DocParagraph>
                    <DocCodeBlock>{`docker exec comptasse pnpm --filter @comptasse/application-tools run push`}</DocCodeBlock>
                </DocExample>

                <DocExample title="Table ou colonne obsolète">
                    <DocParagraph>
                        Si la base de données contient des tables ou colonnes qui n'existent
                        plus dans le code, vous pouvez les supprimer manuellement ou
                        réinitialiser la base de données.
                    </DocParagraph>
                    <DocCodeBlock>{`# Option A : supprimer manuellement les tables/colonnes obsolètes
# Option B : réinitialiser la base de données (ATTENTION : perte de données)
docker exec comptasse pnpm --filter @comptasse/application-tools run reset`}</DocCodeBlock>
                </DocExample>
            </DocSection>

            <DocSection title="Bonnes pratiques">
                <DocList
                    items={[
                        "Sauvegardez toujours votre base de données avant une mise à jour majeure",
                        "Testez les migrations dans un environnement de développement d'abord",
                        "Utilisez le mode push pour les mises à jour mineures",
                        "Utilisez les migrations pour les changements de schéma complexes",
                        "Consultez le journal des modifications (CHANGELOG) avant de mettre à jour",
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
