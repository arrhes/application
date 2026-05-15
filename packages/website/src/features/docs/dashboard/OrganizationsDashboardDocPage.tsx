import { DocDefinition } from "../../../components/document/DocDefinition.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocNextPage } from "../../../components/document/DocNextPage.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"

export function OrganizationsDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Gérer les organisations"
                description="Configuration et administration de vos structures"
            />

            <DocSection title="Types d'organisations">
                <DocParagraph>
                    Arrhes supporte deux types d'organisations, chacun avec un plan comptable adapté :
                </DocParagraph>
                <DocDefinition term="Entreprise">
                    Plan comptable général (PCG) adapté aux sociétés commerciales. Inclut les comptes de TVA, de capital
                    social, etc.
                </DocDefinition>
                <DocDefinition term="Association">
                    Plan comptable des associations. Inclut les comptes spécifiques comme les cotisations (756), les
                    subventions (74), les fonds associatifs...
                </DocDefinition>
                <DocParagraph>
                    Le type d'organisation est défini à la création et ne peut pas être modifié ensuite. Si vous avez
                    fait une erreur, vous devrez créer une nouvelle organisation.
                </DocParagraph>
            </DocSection>

            <DocSection title="Paramètres de l'organisation">
                <DocParagraph>Chaque organisation possède des paramètres que vous pouvez modifier :</DocParagraph>
                <DocList
                    items={[
                        "Nom : le nom affiché dans l'interface",
                        "SIREN : le numéro d'identification (pour les entreprises)",
                        "Email de contact : pour les notifications et rapports",
                    ]}
                />
                <DocExample title="Modifier les paramètres">
                    <DocList
                        items={[
                            "Accédez à votre organisation",
                            "Cliquez sur l'onglet « Paramètres »",
                            "Modifiez les informations souhaitées",
                            "Enregistrez les modifications",
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Gestion des membres">
                <DocParagraph>
                    Vous pouvez inviter d'autres personnes à accéder à votre organisation. Chaque membre peut avoir des
                    droits différents.
                </DocParagraph>
                <DocDefinition term="Administrateur">
                    Accès complet : peut modifier les paramètres, inviter des membres, supprimer l'organisation.
                </DocDefinition>
                <DocDefinition term="Membre">
                    Accès limité : peut <DocLink to="/documentation/dashboard/écritures">saisir des écritures</DocLink>{" "}
                    et <DocLink to="/documentation/dashboard/documents">consulter les documents de synthèse</DocLink>,
                    mais ne peut pas modifier les paramètres.
                </DocDefinition>
                <DocExample title="Inviter un membre">
                    <DocList
                        items={[
                            "Allez dans votre organisation",
                            "Cliquez sur Membres",
                            "Cliquez sur « Inviter un membre »",
                            "Entrez l'adresse email de la personne",
                            "Choisissez son rôle (Administrateur ou Membre)",
                            "Envoyez l'invitation",
                        ]}
                    />
                    <DocParagraph>
                        La personne recevra un email avec un lien pour rejoindre l'organisation. Si la personne ne
                        possède pas de compte associé à cette adresse email, elle devra créer un compte.
                    </DocParagraph>
                </DocExample>
            </DocSection>

            <DocNextPage
                to="/documentation/dashboard/exercices"
                label="Gérer les exercices"
            />
        </DocRoot>
    )
}
