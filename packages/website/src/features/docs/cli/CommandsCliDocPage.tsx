import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function CommandsCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Référence des commandes"
                description="Toutes les commandes disponibles dans le CLI Arrhes"
            />

            <DocSection title="Aide">
                <DocParagraph>
                    Chaque commande accepte <DocCode>--help</DocCode> pour afficher ses options.
                </DocParagraph>
                <DocCodeBlock>{"arrhes --help\narrhes entries create --help"}</DocCodeBlock>
                <DocTip variant="info">
                    Toutes les réponses sont en JSON. Utilisez{",  "}
                    <DocCode key="0">| jq</DocCode> pour les filtrer ou les formater.
                </DocTip>
            </DocSection>

            <DocSection title="Authentification">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">{"arrhes login --api-key <clé> --url <url> --org <id>"}</DocCode>,
                            "Enregistre les identifiants",
                        ],
                        [
                            <DocCode key="0">arrhes whoami</DocCode>,
                            "Affiche l'utilisateur connecté",
                        ],
                        [
                            <DocCode key="0">arrhes logout</DocCode>,
                            "Supprime les identifiants locaux",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="Exercices">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">arrhes years list</DocCode>,
                            "Liste les exercices de l'organisation",
                        ],
                        [
                            <DocCode key="0">{"arrhes years get <idYear>"}</DocCode>,
                            "Détails d'un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes years create --start <date> --end <date>"}</DocCode>,
                            "Crée un nouvel exercice",
                        ],
                    ]}
                />
                <DocExample title="Exemple - lister et filtrer avec jq">
                    <DocCodeBlock>{"arrhes years list | jq '.[].id'"}</DocCodeBlock>
                </DocExample>
            </DocSection>

            <DocSection title="Écritures">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">{"arrhes entries list --year <id>"}</DocCode>,
                            "Liste les écritures d'un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries get <idEntry> --year <id>"}</DocCode>,
                            "Détails d'une écriture",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes entries create --year <id> --journal <id> [--label <libellé>] [--date <date>]"}
                            </DocCode>,
                            "Crée une écriture",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries delete <idEntry> --year <id>"}</DocCode>,
                            "Supprime une écriture",
                        ],
                    ]}
                />
                <DocExample title="Exemple - créer une écriture">
                    <DocCodeBlock>
                        {
                            'arrhes entries create \\\n  --year <idYear> \\\n  --journal <idJournal> \\\n  --label "Facture fournisseur" \\\n  --date 2025-03-15'
                        }
                    </DocCodeBlock>
                </DocExample>
            </DocSection>

            <DocSection title="Fichiers">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">{"arrhes files list --year <id>"}</DocCode>,
                            "Liste les fichiers d'un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes files create --year <id> --name <nom> [--folder <id>]"}</DocCode>,
                            "Enregistre un fichier",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="Options globales">
                <DocList
                    items={[
                        "--help - affiche l'aide de la commande",
                        "--version - affiche la version du CLI",
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
