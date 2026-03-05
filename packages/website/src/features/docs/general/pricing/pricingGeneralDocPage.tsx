import { css } from "@arrhes/ui/utilities/cn.js"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { Pricing } from "../../../home/pricing.js"
import { FaqItem } from "./faqItem.js"

export function PricingGeneralDocPage() {
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
                    Tarifs
                </h1>
                <p
                    className={css({
                        color: "neutral/60",
                        fontSize: "md",
                        lineHeight: "relaxed",
                    })}
                >
                    Un logiciel de comptabilité conçu pour être transparent et accessible à tous.
                </p>
            </div>

            {/* Pricing cards */}
            <Pricing />

            {/* FAQ */}
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
                <h2
                    className={css({
                        fontSize: "md",
                        fontWeight: "semibold",
                        color: "neutral",
                    })}
                >
                    Questions fréquentes
                </h2>
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    })}
                >
                    <FaqItem
                        question="Puis-je changer de forfait à tout moment ?"
                        answer="Oui, vous pouvez passer au plan avancé ou revenir au forfait basique à tout moment. Le changement prend effet à la fin de la période payée."
                    />
                    <FaqItem
                        question="Y a-t-il un engagement ?"
                        answer="Non, le plan avancé est sans engagement. Vous pouvez annuler à tout moment et continuer à utiliser le service jusqu'à la fin de la période payée."
                    />
                    <FaqItem
                        question="Pourquoi avoir choisi ce modèle ?"
                        answer="Nous souhaitons démocratiser l'accès à la comptabilité au plus grand nombre. Nous avons ajouté une offre avancée afin de pouvoir continuer à développer la plateforme et supporter les coûts de serveur."
                    />
                </div>
            </div>
        </DocRoot>
    )
}
