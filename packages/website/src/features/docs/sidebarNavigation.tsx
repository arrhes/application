import { ButtonGhostContent, Chip, type ChipColors } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { Icon, IconProps } from "@tabler/icons-react"
import { cloneElement, type ReactElement } from "react"
import { LinkButton } from "../../components/linkButton.tsx"

export interface NavigationSection {
    title?: string
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    items: { path: string; hash?: string; label: string; chipText?: string; chipColor?: ChipColors }[]
}

export function SidebarNavigation(props: {
    navigation: Record<string, NavigationSection>
    pathname: string
    onClick?: () => void
}) {
    return (
        <nav
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                minHeight: "fit-content",
            })}
        >
            {Object.entries(props.navigation).map(([key, section]) => (
                <div
                    key={key}
                    className={css({})}
                >
                    {section.title && section.icon && (
                        <div
                            className={css({
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.5rem",
                            })}
                        >
                            {cloneElement(section.icon, {
                                size: 12,
                                className: css({
                                    stroke: "neutral/50",
                                }),
                            })}
                            <span
                                className={css({
                                    fontSize: "xs",
                                    color: "neutral/40",
                                    textTransform: "uppercase",
                                })}
                            >
                                {section.title}
                            </span>
                        </div>
                    )}
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                        })}
                    >
                        {section.items.map((item) => {
                            const hasExactSibling = section.items.some(
                                (sibling) =>
                                    sibling !== item &&
                                    !sibling.hash &&
                                    sibling.path !== item.path &&
                                    sibling.path === props.pathname,
                            )
                            const isCurrent = item.hash
                                ? false
                                : props.pathname === item.path ||
                                (!hasExactSibling &&
                                    item.path !== "/documentation" &&
                                    item.path !== "/documentation/comptabilité" &&
                                    item.path !== "/documentation/dashboard" &&
                                    item.path !== "/documentation/api" &&
                                    props.pathname.startsWith(`${item.path}/`))
                            return (
                                <LinkButton
                                    key={item.path + (item.hash ?? "")}
                                    to={item.path}
                                    hash={item.hash}
                                    className={css({ width: "100%" })}
                                    onClick={props.onClick}
                                >
                                    <ButtonGhostContent
                                        text={item.label}
                                        isCurrent={isCurrent}
                                        className={css({ width: "100%", justifyContent: "start" })}
                                    >
                                        {item.chipText ? (
                                            <Chip
                                                text={item.chipText}
                                                color={item.chipColor ?? "neutral"}
                                                className={css({ marginLeft: "auto" })}
                                            />
                                        ) : null}
                                    </ButtonGhostContent>
                                </LinkButton>
                            )
                        })}
                    </div>
                </div>
            ))}
        </nav>
    )
}
