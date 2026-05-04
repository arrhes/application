import { Badge, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconAppWindow,
    IconBuildings,
    IconCalculator,
    IconCloudUpload,
    IconCode,
    IconFileText,
    IconLifebuoy,
    IconSparkles,
    IconUserPlus,
    IconUsers
} from "@tabler/icons-react"
import { LinkButton } from "../../components/linkButton.js"
import { FeatureItem } from "./featureItem.tsx"

export function Pricing() {
    return (
        <div
            className={css({
                width: "100%",
                display: "grid",
                gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
                gap: "1.5rem",
            })}
        >
            {/* Free Plan */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    padding: "1.5rem",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "neutral/15",
                    backgroundColor: "white",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "0.5rem",
                        })}
                    >
                        <h2
                            className={css({
                                fontSize: "lg",
                                fontWeight: "bold",
                                color: "neutral",
                            })}
                        >
                            Services inclus
                        </h2>
                        <Badge>Recommandé</Badge>
                    </div>
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/60",
                        })}
                    >
                        Toutes les fonctionnalités essentielles pour gérer votre comptabilité. Gratuitement.
                    </p>
                </div>

                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        flex: "1",
                    })}
                >
                    <FeatureItem icon={<IconAppWindow />} text="Accès illimité à l'application web" />
                    <FeatureItem icon={<IconBuildings />} text="Multiple organisations" />
                    <FeatureItem icon={<IconUsers />} text="Membres illimités" />
                    <FeatureItem icon={<IconCloudUpload />} text="Stockage de documents (jusqu'à 1Go)" />
                    <FeatureItem
                        icon={<IconFileText />}
                        text="Génération des documents de synthèse pour la liasse fiscale"
                    />
                    <FeatureItem icon={<IconFileText />} text="Export du Fichier des Écritures Comptable (FEC)" />
                    <FeatureItem icon={<IconCode />} text="Accès complet à l'API" />
                </div>

                <LinkButton to="/inscription">
                    <ButtonOutlineContent
                        leftIcon={<IconUserPlus />}
                        text="Créer un compte"
                        className={css({ width: "100%" })}
                    />
                </LinkButton>
            </div>

            {/* Paid services */}
            <div
                id="services-payants"
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    padding: "1.5rem",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "primary",
                    backgroundColor: "white",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "0.5rem",
                        })}
                    >
                        <h2
                            className={css({
                                fontSize: "lg",
                                fontWeight: "bold",
                                color: "neutral",
                            })}
                        >
                            Services payants
                        </h2>
                        <Badge>Optionnel</Badge>
                    </div>
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/60",
                        })}
                    >
                        Activez uniquement ce dont vous avez besoin. Sans engagement.
                    </p>
                </div>

                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        flex: "1",
                    })}
                >
                    <FeatureItem
                        icon={<IconLifebuoy />}
                        text="Licence"
                        highlighted
                        description={[
                            "Montant mensuel libre. Un support privilégié est inclus dans les licences payantes.",
                        ]}
                    />
                    <FeatureItem
                        icon={<IconCloudUpload />}
                        text="Stockage"
                        highlighted
                        description={["0,10€ (HT) / Go / mois (au-dela du Go inclus)"]}
                    />
                    <FeatureItem
                        icon={<IconSparkles />}
                        text="Tokens IA"
                        description={["1,00€ (HT) / million de tokens"]}
                        highlighted
                    />
                    <FeatureItem
                        icon={<IconFileText />}
                        text="OCR"
                        description={["0,01€ (HT) / page"]}
                        highlighted
                    />
                    <FeatureItem icon={<IconCalculator />} text="Comptabilité analytique" isDev />
                </div>
            </div>
        </div>
    )
}
