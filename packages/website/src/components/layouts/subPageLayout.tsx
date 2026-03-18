import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { type Icon, IconMenu, type IconProps } from "@tabler/icons-react"
import { Outlet, useMatches, useRouterState } from "@tanstack/react-router"
import { cloneElement, type ReactElement, useState } from "react"
import type { ValidParams, ValidRoutes } from "../../routes/applicationRouter.js"
import { LinkButton } from "../linkButton.js"

export function SubPageLayout(props: {
    sections: Record<
        string,
        {
            title?: string
            icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
            items: Array<{
                label: string
                icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
                to: ValidRoutes
                params: ValidParams
            }>
        }
    >
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const routeMatches = useMatches()
    const currentPath = useRouterState({
        select: (state) => state.matches.at(-1)?.routeId,
    })

    const asideContent = (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                gap: "0.5rem",
            })}
        >
            {Object.entries(props.sections).map(([key, section]) => (
                <div key={key} className={css({ marginBottom: "0.5rem" })}>
                    {(section.title || section.icon) && (
                        <div
                            className={css({
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.5rem",
                            })}
                        >
                            {section.icon &&
                                cloneElement(section.icon, {
                                    size: 14,
                                    className: css({
                                        stroke: "neutral/40",
                                    }),
                                })}
                            {section.title && (
                                <span
                                    className={css({
                                        fontSize: "xs",
                                        lineHeight: "none",
                                        fontWeight: "300",
                                        color: "neutral/50",
                                        textTransform: "uppercase",
                                        letterSpacing: "wider",
                                    })}
                                >
                                    {section.title}
                                </span>
                            )}
                        </div>
                    )}
                    <div
                        className={css({
                            marginTop: "0.25rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                        })}
                    >
                        {section.items.map((item) => {
                            const normalizedTo = (item.to ?? "").replace(/\/+$/, "")
                            const matchRoute = [...routeMatches]
                                .reverse()
                                .find((match) => match.fullPath.replace(/\/+$/, "") === normalizedTo)
                            const isActive = matchRoute === undefined ? false : currentPath === matchRoute.routeId

                            return (
                                <LinkButton
                                    key={item.to}
                                    to={item.to}
                                    params={item.params}
                                    className={css({ width: "100%" })}
                                    onClick={() => {
                                        setIsMenuOpen(false)
                                    }}
                                >
                                    <ButtonGhostContent
                                        leftIcon={item.icon}
                                        text={item.label}
                                        isCurrent={isActive}
                                        className={css({
                                            width: "100%",
                                            justifyContent: "start",
                                        })}
                                    />
                                </LinkButton>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <div
            className={css({
                width: "100%",
                flexShrink: "0",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                overflowY: "auto",
            })}
        >
            <div
                className={css({
                    flex: "1",
                    flexShrink: "1",
                    width: "100%",
                    maxWidth: "xl",
                    height: "fit",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                })}
            >
                {props.sections === undefined ? null : (
                    <aside
                        className={css({
                            display: { base: "none", md: "flex" },
                            minWidth: "16rem",
                            flexShrink: 0,
                            borderRight: "1px solid",
                            borderRightColor: "neutral/10",
                            backgroundColor: "white",
                            position: "sticky",
                            top: "0",
                            maxHeight: "100vh",
                            overflowY: "auto",
                            padding: "1rem",
                        })}
                    >
                        {asideContent}
                    </aside>
                )}
                {/* Main content */}
                <div
                    className={css({
                        flex: "1",
                        minWidth: "0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                    })}
                >
                    <div
                        className={css({
                            display: { base: "flex", md: "none" },
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.5rem",
                            width: "100%",
                            padding: "1rem",
                            borderBottom: "1px solid",
                            borderBottomColor: "neutral/10",
                        })}
                    >
                        <Button
                            aria-label="Menu"
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen)
                            }}
                        >
                            <ButtonGhostContent leftIcon={<IconMenu />} />
                        </Button>
                        {isMenuOpen === false ? null : asideContent}
                    </div>
                    <div
                        className={css({
                            width: "100%",
                            padding: { base: "1rem", md: "2rem" },
                        })}
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
