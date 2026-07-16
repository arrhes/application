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

export function ReferenceCliGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Référence CLI"
                description="Tableau récapitulatif des commandes du CLI Arrhes"
            />

            <DocSection title="Aide et options globales">
                <DocParagraph>
                    Le CLI est un binaire autonome. Aucune installation de Node.js n'est requise. Chaque commande
                    accepte <DocCode>--help</DocCode> pour afficher ses options.
                </DocParagraph>
                <DocCodeBlock>{"arrhes --help\narrhes entries create --help"}</DocCodeBlock>
                <DocList
                    items={[
                        "--help : affiche l'aide de la commande",
                        "--version : affiche la version du CLI",
                    ]}
                />
                <DocTip variant="info">
                    Toutes les réponses sont en JSON. Utilisez <DocCode>| jq</DocCode> pour les filtrer ou les formater.
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
                            <DocCode key="0">arrhes login</DocCode>,
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

            <DocSection title="Organisation">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">arrhes org get</DocCode>,
                            "Détails de l'organisation",
                        ],
                        [
                            <DocCode key="0">arrhes org update</DocCode>,
                            "Modifie l'organisation",
                        ],
                        [
                            <DocCode key="0">arrhes org delete</DocCode>,
                            "Supprime l'organisation",
                        ],
                        [
                            <DocCode key="0">arrhes members list</DocCode>,
                            "Liste les membres",
                        ],
                        [
                            <DocCode key="0">{"arrhes members invite --email <email> [--admin]"}</DocCode>,
                            "Invite un membre",
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
                            "Liste les exercices",
                        ],
                        [
                            <DocCode key="0">{"arrhes years get <idYear>"}</DocCode>,
                            "Détails d'un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes years create --start <date> --end <date>"}</DocCode>,
                            "Crée un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes years update <idYear>"}</DocCode>,
                            "Modifie un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes years delete <idYear>"}</DocCode>,
                            "Supprime un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes years close <idYear>"}</DocCode>,
                            "Clôture un exercice",
                        ],
                    ]}
                />
                <DocExample title="Lister les identifiants d'exercices">
                    <DocCodeBlock>{"arrhes years list | jq '.[].id'"}</DocCodeBlock>
                </DocExample>
            </DocSection>

            <DocSection title="Comptes et journaux">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">arrhes accounts list --year &lt;id&gt;</DocCode>,
                            "Liste les comptes",
                        ],
                        [
                            <DocCode key="0">{"arrhes accounts create --year <id> --number <n> --label <l>"}</DocCode>,
                            "Crée un compte",
                        ],
                        [
                            <DocCode key="0">arrhes journals list --year &lt;id&gt;</DocCode>,
                            "Liste les journaux",
                        ],
                        [
                            <DocCode key="0">{"arrhes journals create --year <id> --code <code> --label <l>"}</DocCode>,
                            "Crée un journal",
                        ],
                        [
                            <DocCode key="0">arrhes tags list --year &lt;id&gt;</DocCode>,
                            "Liste les libellés",
                        ],
                    ]}
                />
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
                            "Liste les écritures",
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
                        [
                            <DocCode key="0">
                                {"arrhes entries lines create <idEntry> --year <id> --account <id>"}
                            </DocCode>,
                            "Ajoute une ligne",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries tags add <idEntry> --year <id> --tag <id>"}</DocCode>,
                            "Ajoute un tag",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="Fichiers et exports">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">{"arrhes files list --year <id>"}</DocCode>,
                            "Liste les fichiers",
                        ],
                        [
                            <DocCode key="0">{"arrhes files create --year <id> --name <nom> [--folder <id>]"}</DocCode>,
                            "Enregistre un fichier",
                        ],
                        [
                            <DocCode key="0">{"arrhes exports fec --year <id>"}</DocCode>,
                            "Génère le FEC",
                        ],
                        [
                            <DocCode key="0">{"arrhes exports xbrl-balance-sheet --year <id>"}</DocCode>,
                            "Génère le bilan XBRL",
                        ],
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
