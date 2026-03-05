import { readOneOrganizationRouteDefinition, readOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useRouterState } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { LinkButton } from "../components/linkButton.js"
import { useDataFromAPI } from "../utilities/useHTTPData.js"

export function Breadcrumbs() {
    const routerState = useRouterState()
    const currentMatch = routerState.matches.at(-1)
    const params = currentMatch?.params as Record<string, string> | undefined

    const idOrganization = params?.idOrganization ?? null
    const idYear = params?.idYear ?? null

    const organizationQuery = useDataFromAPI({
        routeDefinition: readOneOrganizationRouteDefinition,
        body: {},
        enabled: idOrganization !== null,
    })

    const yearQuery = useDataFromAPI({
        routeDefinition: readOneYearRouteDefinition,
        body: {
            idYear: idYear ?? "",
        },
        enabled: idOrganization !== null && idYear !== null,
    })

    const organizationName = organizationQuery.data?.name ?? idOrganization
    const yearName = yearQuery.data?.label ?? idYear

    if (idOrganization === null) {
        return null
    }

    return (
        <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "1" })}>
            <LinkButton
                to="/dashboard/organisations/$idOrganization"
                params={{
                    idOrganization: idOrganization,
                }}
            >
                <ButtonGhostContent
                    text={organizationName ?? ""}
                    // isActive={idYear === null}
                />
            </LinkButton>
            {idYear !== null && (
                <Fragment>
                    <span className={css({ color: "neutral/25", padding: "0.25rem" })}>/</span>
                    {/* <IconSlash
                        size={16}
                        className={css({ stroke: "neutral/25" })}
                    /> */}
                    <LinkButton
                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures"
                        params={{
                            idOrganization: idOrganization,
                            idYear: idYear,
                        }}
                    >
                        <ButtonGhostContent
                            text={yearName ?? ""}
                            // isActive={true}
                        />
                    </LinkButton>
                </Fragment>
            )}
        </div>
    )
}
