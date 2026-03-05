import { css } from "@arrhes/ui/utilities/cn.js"
import { DocLastUpdate } from "../../../components/document/docLastUpdate.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocTextSection } from "../../../components/document/docTextSection.js"

export function WhitepaperGeneralDocPage() {
    return (
        <DocRoot>
            {/* Page header */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}
            >
                <h1
                    className={css({
                        fontSize: "lg",
                        fontWeight: "bold",
                        color: "neutral",
                    })}
                >
                    Notre philosophie
                </h1>
                <p
                    className={css({
                        color: "neutral/60",
                        fontSize: "md",
                        lineHeight: "relaxed",
                    })}
                >
                    Nous souhaitons une transparence totale avec notre communauté. C'est pourquoi nous avons rédigé ces
                    quelques lignes.
                </p>
            </div>

            {/* Content */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                })}
            >
                <DocTextSection title="Notre vision">
                    <p>
                        Nous voulons que la comptabilité devienne accessible, compréhensible et même agréable. Trop
                        d'outils comptables sont pensés par des comptables pour des comptables. Nous construisons Arrhes
                        pour les gens qui veulent faire leur comptabilité sans être experts du domaine.
                    </p>
                    <p>
                        À terme, nous voulons qu'Arrhes devienne la référence open source de la comptabilité en France —
                        un outil moderne, transparent et communautaire, soutenu par un modèle économique sain. Un outil
                        dont la communauté est fière, parce qu'elle contribue à le rendre meilleur chaque jour.
                    </p>
                    <p>
                        L'intelligence artificielle est au coeur de cette vision. Pas comme un gadget marketing, mais
                        comme un véritable assistant qui peut vous accompagner, suivre des instructions, détecte les
                        anomalies, et vous aide à prendre des décisions. L'IA doit rendre la comptabilité plus simple,
                        pas plus complexe.
                    </p>
                </DocTextSection>

                <DocTextSection title="Pourquoi l'open source ?">
                    <p>
                        Arrhes est un logiciel open source parce que nous croyons que la comptabilité ne devrait pas
                        être une boîte noire. Quand il s'agit de vos finances, vous devriez pouvoir vérifier exactement
                        ce que fait votre outil, comment il calcule vos soldes, et où sont stockées vos données. Mieux
                        comprendre sa comptabilité, c'est mieux comprendre son activité.
                    </p>
                    <p>
                        Mais au-delà de la transparence, l'open source est un choix communautaire. Un logiciel de
                        comptabilité utilisé par des associations, des indépendants et des petites entreprises a tout
                        intérêt à être construit avec eux. Les retours, les contributions et les idées de la communauté
                        rendent le produit meilleur pour tout le monde. Chaque utilisateur peut signaler un bug,
                        proposer une amélioration ou adapter l'outil à ses besoins.
                    </p>
                    <p>
                        Nous pensons aussi qu'à l'ère de l'intelligence artificielle, l'open source a plus de sens que
                        jamais. Les modèles IA sont entraînés sur du code et savent le restituer. Nous pensons que la
                        valeur ajoutée ne réside plus vraiment dans le code, mais plutôt dans son architecture pensée
                        par et pour les utilisateurs.
                    </p>
                </DocTextSection>

                <DocTextSection title="Notre modèle économique">
                    <p>
                        Notre approche est simple : le coeur du logiciel est gratuit, et nous faisons payer uniquement
                        ce qui nous coûte cher à fournir.
                    </p>
                    <p>
                        Toute la comptabilité — saisie des écritures, plan comptable, bilan, compte de résultat, gestion
                        des pièces jointes — est accessible gratuitement. Nous ne croyons pas aux limitations
                        artificielles qui frustrent les utilisateurs pour les pousser à payer.
                    </p>
                    <p>
                        Ce qui est payant, ce sont les fonctionnalités qui ont un coût réel pour nous : le stockage,
                        l'assistant IA (qui consomme des ressources de calcul), l'hébergement cloud géré (serveurs,
                        sauvegardes, maintenance), et les intégrations avancées. En résumé, vous payez pour
                        l'infrastructure et l'intelligence artificielle, pas pour le logiciel lui-même.
                    </p>
                    <p>
                        Ce modèle nous semble juste. Les revenus générés par les offres payantes financent l'ensemble du
                        projet : le développement des fonctionnalités basiques, la maintenance, la documentation et le
                        support communautaire. Chaque abonnement soutient l'outil pour tout le monde.
                    </p>
                </DocTextSection>

                <DocLastUpdate date="12 Février 2026" />
            </div>
        </DocRoot>
    )
}
