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
                        question="Puis-je modifier mes services payants à tout moment ?"
                        answer="Oui. Vous pouvez ajuster votre licence, votre stockage et vos recharges OCR/tokens depuis le dashboard selon vos besoins."
                    />
                    <FaqItem
                        question="Y a-t-il un abonnement obligatoire ?"
                        answer="Non. Les services de base sont gratuits et la licence est optionnelle. Vous ne payez que les services que vous activez ou consommez."
                    />
                    <FaqItem
                        question="À quoi sert la licence ?"
                        answer="Elle permet de soutenir le développement d'Arrhes et de bénéficier d'un support prioritaire. Les autres fonctionnalités sont les mêmes quelle que soit le montant choisi de la licence."
                    />
                    <FaqItem
                        question="Pourquoi avoir choisi ce modèle ?"
                        answer="Ce modèle permet de garder un accès gratuit à Arrhes tout en couvrant les coûts réels des services à forte consommation comme le stockage, l'OCR et l'IA."
                    />
                </div>
            </div>
        </DocRoot>
    )
}
