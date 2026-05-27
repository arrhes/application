import { ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { Icon, IconProps } from "@tabler/icons-react"
import { useMatches, useRouterState } from "@tanstack/react-router"
import type { ReactElement } from "react"
import type { ValidParams, ValidRoutes } from "../../../routes/applicationRouter.js"
import { LinkButton } from "../../LinkButton.js"

export function TabRoot(props: {
    tabs: Array<{
        label: string
        icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
        to: ValidRoutes
        params: ValidParams
    }>
}) {
    const routeMatches = useMatches()
    const currentPath = useRouterState({
        select: (state) => state.matches.at(-1)?.routeId,
    })

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.5rem",
                borderBottom: "1px solid",
                borderBottomColor: "neutral/5",
                paddingBottom: "0.5rem",
            })}
        >
            {props.tabs.map((tab) => {
                const normalizedTo = (tab.to ?? "").replace(/\/+$/, "")
                const matchRoute = [
                    ...routeMatches,
                ]
                    .reverse()
                    .find((match) => match.fullPath.replace(/\/+$/, "") === normalizedTo)
                const isActive = matchRoute === undefined ? false : currentPath === matchRoute.routeId

                return (
                    <LinkButton
                        key={tab.to}
                        to={tab.to}
                        params={tab.params}
                    >
                        <ButtonGhostContent
                            leftIcon={tab.icon}
                            text={tab.label}
                            color="default"
                            isCurrent={isActive}
                        />
                    </LinkButton>
                )
            })}
        </div>
    )
}
