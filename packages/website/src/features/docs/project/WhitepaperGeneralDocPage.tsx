import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"

export function WhitepaperGeneralDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Notre philosophie"
                description="Nous souhaitons une transparence totale avec notre communauté. C'est pourquoi nous avons rédigé ces quelques lignes."
            />
            <DocSection title="Notre vision">
                <DocParagraph>
                    Nous voulons que la comptabilité devienne accessible, compréhensible et même agréable. Nous
                    construisons Comptasse pour tout le monde : autant ceux qui veulent découvrir la comptabilité
                    simplement que les experts du domaine.
                </DocParagraph>
                <DocParagraph>
                    À terme, nous voulons que Comptasse devienne la référence open source de la comptabilité en France -
                    un outil moderne, transparent et communautaire, soutenu par un modèle économique sain. Un outil dont
                    la communauté est fière, parce qu'elle contribue à le rendre meilleur chaque jour.
                </DocParagraph>
                <DocParagraph>
                    L'intelligence artificielle est au cœur de cette vision. Pas comme un gadget marketing, mais comme
                    un véritable assistant qui peut vous accompagner, suivre des instructions, détecter les anomalies,
                    et vous aider à prendre des décisions. L'IA doit rendre la comptabilité plus accessible.
                </DocParagraph>
            </DocSection>
            <DocSection title="Pourquoi l'open source ?">
                <DocParagraph>
                    Comptasse est un logiciel open source parce que nous croyons que la comptabilité ne devrait pas être
                    une boîte noire. Quand il s'agit de vos finances, vous devriez pouvoir vérifier exactement ce que
                    fait votre outil, comment il calcule vos soldes, et où sont stockées vos données. Mieux comprendre
                    sa comptabilité, c'est mieux comprendre son activité.
                </DocParagraph>
                <DocParagraph>
                    Mais au-delà de la transparence, l'open source est un choix communautaire. Un logiciel de
                    comptabilité utilisé par des associations, des indépendants et des entreprises a tout intérêt à être
                    construit avec eux. Les retours, les contributions et les idées de la communauté rendent le produit
                    meilleur pour tout le monde. Chaque utilisateur peut signaler un bug, proposer une amélioration ou
                    adapter l'outil à ses besoins.
                </DocParagraph>
                <DocParagraph>
                    Nous pensons aussi qu'à l'ère de l'intelligence artificielle, l'open source a plus de sens que
                    jamais. Les modèles IA sont entraînés sur du code et savent le restituer. Nous pensons que la valeur
                    ajoutée ne réside plus dans ce code, mais plutôt dans l'architecture pensée par et pour les
                    utilisateurs.
                </DocParagraph>
            </DocSection>
            <DocSection
                title="Notre modèle économique"
                depth={1}
            >
                <DocParagraph>Notre approche est simple : reposer sur ce qui peuvent.</DocParagraph>
                <DocParagraph>
                    Tout est accessible gratuitement, il vous suffit d'amener votre propre infrastructure (hébergement,
                    postgresql, s3). Nous ne croyons pas aux limitations artificielles qui frustrent les utilisateurs
                    pour les pousser à payer.
                </DocParagraph>
                <DocParagraph>
                    Ce modèle nous semble juste. Les revenus générés par les dons financent l'ensemble du projet : le
                    développement des fonctionnalités, la maintenance, la documentation et le support communautaire.
                </DocParagraph>
            </DocSection>
        </DocRoot>
    )
}
