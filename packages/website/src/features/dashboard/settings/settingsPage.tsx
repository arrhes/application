import { ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import { Page } from "../../../components/layouts/page/page.js"

const settingsSections = [
    {
        title: "Profil",
        description: "Gérez votre identité, vos informations publiques et vos préférences d'affichage.",
        items: [
            { label: "Informations personnelles", helper: "Nom, email, avatar" },
            { label: "Mot de passe", helper: "Sécurité du compte" },
            { label: "Préférences d'affichage", helper: "Langue, thème" },
        ],
    },
    {
        title: "Sécurité",
        description: "Contrôlez l'accès à votre compte et les paramètres de sécurité.",
        items: [
            { label: "Authentification", helper: "2FA, appareils" },
            { label: "Sessions", helper: "Connexions actives" },
        ],
    },
    {
        title: "Facturation",
        description: "Suivez vos abonnements, factures et moyens de paiement.",
        items: [
            { label: "Abonnement", helper: "Plan, statut" },
            { label: "Factures", helper: "Historique des paiements" },
            { label: "Moyens de paiement", helper: "Cartes, IBAN" },
        ],
    },
]

export function SettingsPage() {
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>Paramètres</Page.Title>
                <Page.Description>Tout ce qui concerne votre compte, la sécurité et la facturation.</Page.Description>
            </Page.Header>
            <Page.Content>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                    })}
                >
                    {settingsSections.map((section) => (
                        <div
                            key={section.title}
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: { base: "column", md: "row" },
                                gap: "1.5rem",
                                padding: "1.5rem",
                                border: "1px solid",
                                borderColor: "neutral/10",
                                borderRadius: "lg",
                                backgroundColor: "white",
                            })}
                        >
                            <div
                                className={css({
                                    flex: "1",
                                    minWidth: "0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                })}
                            >
                                <span className={css({ fontSize: "lg", fontWeight: "semibold" })}>{section.title}</span>
                                <span className={css({ fontSize: "sm", color: "neutral/60" })}>
                                    {section.description}
                                </span>
                            </div>
                            <div
                                className={css({
                                    flex: "2",
                                    minWidth: "0",
                                    display: "flex",
                                    flexDirection: "column",
                                    border: "1px solid",
                                    borderColor: "neutral/10",
                                    borderRadius: "md",
                                    overflow: "hidden",
                                })}
                            >
                                {section.items.map((item) => (
                                    <button
                                        key={item.label}
                                        type="button"
                                        className={css({
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: "1rem",
                                            paddingX: "1.25rem",
                                            paddingY: "1rem",
                                            textAlign: "left",
                                            backgroundColor: "white",
                                            borderBottom: "1px solid",
                                            borderBottomColor: "neutral/10",
                                            _last: { borderBottom: "none" },
                                            _hover: { backgroundColor: "neutral/2" },
                                        })}
                                    >
                                        <div
                                            className={css({
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.25rem",
                                            })}
                                        >
                                            <span className={css({ fontSize: "sm", fontWeight: "semibold" })}>
                                                {item.label}
                                            </span>
                                            <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                                {item.helper}
                                            </span>
                                        </div>
                                        <ButtonGhostContent leftIcon={<IconChevronRight />} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Page.Content>
        </Page.Root>
    )
}
