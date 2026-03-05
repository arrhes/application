import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBook, IconFileText, IconLock, IconUsers } from "@tabler/icons-react"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { FeatureCard } from "./featureCard.js"

export function FeaturesGeneralDocPage() {
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
                    Fonctionnalités
                </h1>
                <p
                    className={css({
                        color: "neutral/60",
                        fontSize: "md",
                        lineHeight: "relaxed",
                    })}
                >
                    Découvrez toutes les fonctionnalités d'Arrhes pour gérer votre comptabilité de manière simple et
                    efficace.
                </p>
            </div>

            {/* Features grid */}
            <div
                className={css({
                    display: "grid",
                    gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
                    gap: "1rem",
                })}
            >
                <FeatureCard
                    icon={<IconBook />}
                    title="Saisie des écritures"
                    description="Enregistrez vos écritures comptables avec une interface intuitive."
                    features={[
                        "Journal chronologique",
                        // "Import CSV/OFX",
                        // "Modèles d'écriture",
                        "Lettrage automatique",
                    ]}
                />
                <FeatureCard
                    icon={<IconFileText />}
                    title="Espace de stockage"
                    description="Organisez vos documents et accédez-y rapidement."
                    features={[
                        "Pièces justificatives (factures, relevés bancaires, etc.)",
                        "Visualisation des documents",
                        "Volume offert de 1Go par organisation",
                    ]}
                />
                <FeatureCard
                    icon={<IconFileText />}
                    title="Documents comptables"
                    description="Générez tous vos documents comptables de synthèse conformes aux normes françaises."
                    features={[
                        "Grand livre, Balance générale, Bilan comptablen Compte de résultat",
                        "Mise à jour automatique à chaque nouvelle écriture",
                        "Export PDF",
                    ]}
                />
                {/* <FeatureCard
                    icon={<IconChartBar />}
                    title="Analyses et rapports"
                    description="Visualisez vos données financières avec des tableaux de bord interactifs."
                    features={[
                        "Évolution du chiffre d'affaires",
                        "Répartition des charges",
                        "Comparaisons N/N-1",
                        "Export PDF/Excel"
                    ]}
                /> */}
                <FeatureCard
                    icon={<IconUsers />}
                    title="Multiple organisations"
                    description="Gérez plusieurs structures avec un seul compte et collaborez en équipe."
                    features={[
                        "Organisations illimitées",
                        "Gestion des membres",
                        // "Rôles et permissions",
                        "Exercices illimités",
                    ]}
                />
                {/* <FeatureCard
                    icon={<IconRobot />}
                    title="Intelligence artificielle"
                    description="Bénéficiez d'un assistant IA pour automatiser vos tâches comptables."
                    features={[
                        "Catégorisation automatique",
                        "Suggestions d'écritures",
                        "Détection d'anomalies",
                        "Questions en langage naturel"
                    ]}
                /> */}
                {/* <FeatureCard
                    icon={<IconCode />}
                    title="API REST"
                    description="Intégrez Arrhes à vos outils grâce à notre API complète."
                    features={[
                        "Authentification OAuth2",
                        "Webhooks",
                        "Documentation complète",
                        "SDK JavaScript"
                    ]}
                /> */}
                <FeatureCard
                    icon={<IconLock />}
                    title="Sécurité"
                    description="Vos données sont protégées avec les meilleures pratiques de sécurité."
                    features={["Chiffrement bout-en-bout", "Sauvegardes automatiques", "Hébergement en France"]}
                />
            </div>
        </DocRoot>
    )
}
