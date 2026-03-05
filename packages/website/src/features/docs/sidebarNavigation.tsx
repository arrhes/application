import { ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { Icon, IconProps } from "@tabler/icons-react"
import { cloneElement, type ReactElement } from "react"
import { LinkButton } from "../../components/linkButton.tsx"

export interface NavigationSection {
    title: string
    icon: ReactElement<IconProps & React.RefAttributes<Icon>>
    items: { path: string; label: string }[]
}

export function SidebarNavigation(props: { navigation: Record<string, NavigationSection>; pathname: string }) {
    return (
        <nav
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem",
                paddingLeft: 0,
            })}
        >
            {Object.entries(props.navigation).map(([key, section]) => (
                <div key={key} className={css({ marginBottom: "0.5rem" })}>
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem",
                            fontSize: "xs",
                            fontWeight: "semibold",
                            color: "neutral/40",
                            textTransform: "uppercase",
                            letterSpacing: "wider",
                        })}
                    >
                        {cloneElement(section.icon, {
                            size: 12,
                            className: css({
                                stroke: "neutral/50",
                            }),
                        })}
                        {section.title}
                    </div>
                    <div
                        className={css({
                            marginTop: "0.25rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                        })}
                    >
                        {section.items.map((item) => (
                            <LinkButton key={item.path} to={item.path} className={css({ width: "100%" })}>
                                <ButtonGhostContent
                                    text={item.label}
                                    isCurrent={props.pathname === item.path}
                                    className={css({ width: "100%", justifyContent: "start" })}
                                />
                            </LinkButton>
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    )
}
