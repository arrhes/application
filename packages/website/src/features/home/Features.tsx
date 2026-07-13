import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconAppWindow,
    IconBook2,
    IconBuildings,
    IconCalculator,
    IconCloudUpload,
    IconFileText,
    IconReload,
    IconSparkles,
    IconUsers,
} from "@tabler/icons-react"
import { FeatureItem } from "./FeatureItem.tsx"

export function Features() {
    return (
        <section
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                paddingX: "1rem",
                paddingY: "4rem",
                borderTop: "1px solid",
                borderTopColor: "neutral/10",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    maxWidth: "xl",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "2rem",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    <h2
                        className={css({
                            fontSize: "xl",
                            fontWeight: "bold",
                            color: "neutral",
                        })}
                    >
                        Tout ce dont vous avez besoin
                    </h2>
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/60",
                        })}
                    >
                        Une application complète pour gérer votre comptabilité, de la saisie aux rapports.
                    </p>
                </div>

                <div
                    className={css({
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: {
                            base: "1fr",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(3, 1fr)",
                        },
                        gap: "1.5rem",
                    })}
                >
                    <FeatureItem
                        icon={<IconAppWindow />}
                        text="Application web complète"
                        description={[
                            "Accès illimité à toutes les fonctionnalités depuis votre navigateur.",
                        ]}
                    />
                    <FeatureItem
                        icon={<IconBuildings />}
                        text="Multi-organisations"
                        description={[
                            "Gérez plusieurs structures (entreprises, associations) depuis un seul compte.",
                        ]}
                    />
                    <FeatureItem
                        icon={<IconUsers />}
                        text="Collaboration"
                        description={[
                            "Invitez des membres et gérez les accès par organisation.",
                        ]}
                    />
                    <FeatureItem
                        icon={<IconSparkles />}
                        text="Assistant IA"
                        description={[
                            "Posez vos questions en langage naturel, l'assistant vous aide à saisir et retrouver vos écritures.",
                        ]}
                    />
                    <FeatureItem
                        icon={<IconFileText />}
                        text="Import de documents"
                        description={[
                            "Importez vos factures et relevés, l'OCR extrait automatiquement les données.",
                        ]}
                    />
                    <FeatureItem
                        icon={<IconCalculator />}
                        text="Comptabilité analytique"
                        description={[
                            "Suivez vos résultats par projet, activité ou toute autre dimension.",
                        ]}
                    />
                    <FeatureItem
                        icon={<IconBook2 />}
                        text="Plan comptable personnalisable"
                        description={[
                            "Adaptez le plan comptable à vos besoins spécifiques.",
                        ]}
                    />
                    <FeatureItem
                        icon={<IconReload />}
                        text="Rapports complets"
                        description={[
                            "Journaux, grand livre, balance, bilan et compte de résultat en un clic.",
                        ]}
                    />
                    <FeatureItem
                        icon={<IconCloudUpload />}
                        text="Export FEC"
                        description={[
                            "Exportez vos données au format FEC standard pour votre expert-comptable.",
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}
