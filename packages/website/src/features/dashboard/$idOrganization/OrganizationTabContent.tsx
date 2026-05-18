import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconApi,
    IconCalendar,
    IconChevronRight,
    IconCreditCard,
    IconRobot,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react"
import type { ReactNode } from "react"
import { TabLink } from "../../../components/layouts/tabBar/TabLink.js"
import type { OpenTabArgs } from "../../../contexts/tabs/tabDefinitions.js"

type NavItem = {
    label: string
    description: string
    icon: ReactNode
    args: OpenTabArgs
}

function NavCard({ item }: { item: NavItem }) {
    return (
        <TabLink args={item.args}>
            <Button
                className={css({
                    width: "100%",
                    height: "100%",
                    textAlign: "left",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "1.25rem",
                        padding: "1.5rem",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        borderRadius: "xl",
                        transition: "background-color 0.15s ease, border-color 0.15s ease",
                        _hover: {
                            backgroundColor: "neutral/3",
                            borderColor: "primary/20",
                        },
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "3.5rem",
                            height: "3.5rem",
                            borderRadius: "lg",
                            backgroundColor: "primary/8",
                            color: "primary",
                            flexShrink: 0,
                        })}
                    >
                        {item.icon}
                    </div>
                    <div
                        className={css({
                            flex: 1,
                            minWidth: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.375rem",
                        })}
                    >
                        <span
                            className={css({
                                fontSize: "base",
                                fontWeight: "semibold",
                                color: "neutral",
                            })}
                        >
                            {item.label}
                        </span>
                        <span
                            className={css({
                                fontSize: "sm",
                                color: "neutral/50",
                                lineHeight: "1.5",
                            })}
                        >
                            {item.description}
                        </span>
                    </div>
                    <ButtonGhostContent
                        leftIcon={
                            <IconChevronRight
                                className={css({
                                    color: "neutral/30",
                                })}
                            />
                        }
                    />
                </div>
            </Button>
        </TabLink>
    )
}

export function OrganizationTabContent(props: { idOrganization: string }) {
    const items: NavItem[] = [
        {
            label: "Exercices",
            description: "Ann\u00e9es fiscales et \u00e9critures comptables",
            icon: <IconCalendar size={24} />,
            args: {
                component: "exercices",
                props: {
                    idOrganization: props.idOrganization,
                },
            },
        },
        {
            label: "Assistant",
            description: "Assistant IA comptable",
            icon: <IconRobot size={24} />,
            args: {
                component: "agent",
                props: {
                    idOrganization: props.idOrganization,
                },
            },
        },
        {
            label: "Membres",
            description: "Utilisateurs et droits d\u2019acc\u00e8s",
            icon: <IconUsers size={24} />,
            args: {
                component: "membres",
                props: {
                    idOrganization: props.idOrganization,
                },
            },
        },
        {
            label: "Facturation",
            description: "Abonnements, services et paiements",
            icon: <IconCreditCard size={24} />,
            args: {
                component: "organisation-facturation",
                props: {
                    idOrganization: props.idOrganization,
                },
            },
        },
        {
            label: "Param\u00e8tres",
            description: "Configuration g\u00e9n\u00e9rale et s\u00e9curit\u00e9",
            icon: <IconSettings size={24} />,
            args: {
                component: "organisation-param\u00e8tres",
                props: {
                    idOrganization: props.idOrganization,
                },
            },
        },
        {
            label: "API",
            description: "Cl\u00e9s d\u2019acc\u00e8s et documentation",
            icon: <IconApi size={24} />,
            args: {
                component: "organisation-api",
                props: {
                    idOrganization: props.idOrganization,
                },
            },
        },
    ]

    return (
        <div
            className={css({
                width: "100%",
                flex: 1,
                padding: "2rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1rem",
                alignContent: "start",
                overflowY: "auto",
            })}
        >
            {items.map((item) => (
                <div
                    key={item.label}
                    className={css({
                        aspectRatio: "1",
                    })}
                >
                    <NavCard item={item} />
                </div>
            ))}
        </div>
    )
}
