import { Badge, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconAppWindow,
    IconBuildings,
    IconCalculator,
    IconCheck,
    IconCloudUpload,
    IconCode,
    IconFileText,
    IconLifebuoy,
    IconSparkles,
    IconUserPlus,
    IconUsers,
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
                            Plan basique
                        </h2>
                        <Badge>Recommandé</Badge>
                    </div>
                    <span>Gratuit</span>
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/60",
                        })}
                    >
                        Toutes les fonctionnalités essentielles pour gérer votre comptabilité.
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
                    <FeatureItem icon={<IconCalculator />} text="Comptabilité analytique" isDev />
                </div>

                <LinkButton to="/inscription">
                    <ButtonOutlineContent
                        leftIcon={<IconUserPlus />}
                        text="Créer un compte"
                        className={css({ width: "100%" })}
                    />
                </LinkButton>
            </div>

            {/* Pro Plan */}
            <div
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
                            Plan avancé
                        </h2>
                        <Badge>Soutenir le projet</Badge>
                    </div>
                    <span>30,00€ / mois (HT)</span>
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/60",
                        })}
                    >
                        Fonctionnalités avancées pour les professionnels et ceux qui veulent aller plus loin.
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
                    <FeatureItem icon={<IconCheck />} text="L'ensemble du plan basique" />
                    <FeatureItem icon={<IconCloudUpload />} text="Stockage de documents (jusqu'à 1To)" highlighted />
                    <FeatureItem
                        icon={<IconSparkles />}
                        text="Assistant IA"
                        highlighted
                        description={[
                            "Poser des questions générales sur la comptabilité",
                            "Interroger la documentation",
                            "Automatiser les actions",
                            "Utiliser la détection automatique du contenu des documents",
                        ]}
                    />
                    <FeatureItem icon={<IconLifebuoy />} text="Support prioritaire" highlighted />
                </div>
                {/* <LinkButton to="/inscription">
                        <ButtonContent
                            variant="primary"
                            text="Essayer gratuitement"
                            className={css({ width: "100%" })}
                        />
                    </LinkButton> */}
            </div>
        </div>
    )
}
