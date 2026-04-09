import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocLink } from "../../../components/document/docLink.tsx"
import { DocList } from "../../../components/document/docList.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"
import { LinkButton } from "../../../components/linkButton.tsx"

export function RootAiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Assistant IA"
                description="Un assistant comptable intelligent pour gérer et analyser vos données comptables."
            />

            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1.5rem",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    backgroundColor: "white",
                })}
            >
                <p
                    className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "relaxed",
                    })}
                >
                    L'assistant IA d'Arrhes est un agent comptable conversationnel capable de consulter, créer, modifier
                    et supprimer vos données comptables. Il comprend le langage naturel et utilise plus de 70 outils
                    spécialisés pour répondre à vos demandes.
                </p>
                <div
                    className={css({
                        display: "flex",
                        gap: "0.5rem",
                    })}
                >
                    <LinkButton to="/documentation/dashboard/assistant/outils">
                        <ButtonOutlineContent text="Voir les outils" rightIcon={<IconChevronRight />} />
                    </LinkButton>
                </div>
            </div>

            <DocTip variant="info">
                L'assistant IA est une fonctionnalité premium. Un abonnement au plan Avancé est requis pour y accéder.
            </DocTip>

            <DocSection title="Fonctionnalités">
                <DocParagraph>L'assistant comptable peut vous aider pour :</DocParagraph>
                <DocList
                    items={[
                        "Consulter vos écritures, comptes, journaux et exercices",
                        "Créer, modifier ou supprimer des écritures et mouvements",
                        "Générer des documents comptables (journal, grand livre, balance, bilan, compte de résultat)",
                        "Analyser vos données financières avec des opérations de tri, filtrage et agrégation",
                        "Rechercher dans la documentation comptable intégrée",
                        "Gérer vos fichiers et dossiers",
                    ]}
                />
            </DocSection>

            <DocSection title="Comment ça fonctionne">
                <DocParagraph>
                    L'assistant utilise une architecture en deux passes pour répondre à vos demandes :
                </DocParagraph>
                <DocList
                    items={[
                        "Analyse de l'intention : votre message est analysé pour identifier les catégories d'outils nécessaires",
                        "Exécution : l'assistant sélectionne et utilise les outils appropriés, pouvant enchaîner jusqu'à 10 appels consécutifs",
                    ]}
                />
                <DocParagraph>
                    L'assistant conserve l'historique de la conversation pour maintenir le contexte au fil des échanges.
                    Vous pouvez également présélectionner un exercice fiscal et fournir des instructions personnalisées
                    pour affiner les réponses.
                </DocParagraph>
            </DocSection>

            <DocSection title="Sécurité et confidentialité">
                <DocParagraph>
                    L'assistant opère exclusivement dans le périmètre de votre organisation. Il ne peut accéder qu'aux
                    données de l'organisation sélectionnée et les actions sont soumises aux mêmes contrôles de
                    permissions que l'interface web. Aucune donnée n'est partagée entre organisations.
                </DocParagraph>
            </DocSection>

            <DocTip variant="tip">
                Pour en savoir plus sur les modèles utilisés, consultez la page{" "}
                <DocLink to="/documentation/dashboard/assistant/modèles">Modèles</DocLink>. Pour la liste complète des
                outils disponibles, consultez la page{" "}
                <DocLink to="/documentation/dashboard/assistant/outils">Outils</DocLink>.
            </DocTip>
        </DocRoot>
    )
}
