import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function MembresCommandsCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Membres"
                description="Gérer les membres d'une organisation : invitation, consultation, modification des droits et suppression."
            />

            <DocSection title="Vue d'ensemble">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">arrhes members list</DocCode>,
                            "Liste les membres de l'organisation",
                        ],
                        [
                            <DocCode key="0">{"arrhes members get <idMember>"}</DocCode>,
                            "Détails d'un membre",
                        ],
                        [
                            <DocCode key="0">{"arrhes members invite --email <email>"}</DocCode>,
                            "Invite un utilisateur",
                        ],
                        [
                            <DocCode key="0">{"arrhes members update <idMember>"}</DocCode>,
                            "Modifie les droits d'un membre",
                        ],
                        [
                            <DocCode key="0">{"arrhes members remove <idMember>"}</DocCode>,
                            "Retire un membre de l'organisation",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="arrhes members list">
                <DocCodeBlock>arrhes members list</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes members get">
                <DocCodeBlock>arrhes members get usr_abc</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes members invite">
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--email <email>",
                            "Oui",
                            "Adresse email de l'utilisateur à inviter",
                        ],
                        [
                            "--admin",
                            "Non",
                            "Accorder les droits administrateur",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes members invite --email colleague@example.com</DocCodeBlock>
                <DocCodeBlock>arrhes members invite --email admin@example.com --admin</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes members update">
                <DocParagraph>
                    Modifie les droits d'un membre. Utilisez <DocCode>--admin</DocCode> pour accorder les droits
                    administrateur ou <DocCode>--no-admin</DocCode> pour les révoquer.
                </DocParagraph>
                <DocCodeBlock>arrhes members update usr_abc --admin</DocCodeBlock>
                <DocCodeBlock>arrhes members update usr_abc --no-admin</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes members remove">
                <DocParagraph>
                    Retire un membre de l'organisation. L'utilisateur perd immédiatement l'accès.
                </DocParagraph>
                <DocCodeBlock>arrhes members remove usr_abc</DocCodeBlock>
                <DocTip variant="warning">
                    Cette action est irréversible. L'utilisateur devra être réinvité pour retrouver l'accès.
                </DocTip>
            </DocSection>
        </DocRoot>
    )
}
