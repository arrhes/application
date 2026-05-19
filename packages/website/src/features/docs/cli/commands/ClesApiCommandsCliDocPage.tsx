import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function ClesApiCommandsCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Clés API"
                description="Lister, créer et supprimer des clés API pour une organisation."
            />

            <DocSection title="Vue d'ensemble">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">arrhes api-keys list</DocCode>,
                            "Liste les clés API de l'organisation",
                        ],
                        [
                            <DocCode key="0">arrhes api-keys create</DocCode>,
                            "Crée une nouvelle clé API",
                        ],
                        [
                            <DocCode key="0">{"arrhes api-keys delete <idApiKey>"}</DocCode>,
                            "Révoque une clé API",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="arrhes api-keys list">
                <DocCodeBlock>arrhes api-keys list</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes api-keys create">
                <DocParagraph>
                    Crée une nouvelle clé API. La valeur brute de la clé n'est affichée qu'une seule fois à la création
                    — conservez-la en lieu sûr.
                </DocParagraph>
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--name <nom>",
                            "Non",
                            "Nom mnémotechnique pour la clé",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes api-keys create --name "CI/CD pipeline"</DocCodeBlock>
                <DocTip variant="warning">
                    La valeur du champ <DocCode>rawKey</DocCode> dans la réponse est la clé secrète. Elle ne sera plus
                    jamais accessible après cette commande.
                </DocTip>
            </DocSection>

            <DocSection title="arrhes api-keys delete">
                <DocParagraph>
                    Révoque définitivement une clé API. Toutes les intégrations utilisant cette clé cesseront de
                    fonctionner immédiatement.
                </DocParagraph>
                <DocCodeBlock>arrhes api-keys delete key_abc</DocCodeBlock>
            </DocSection>
        </DocRoot>
    )
}
