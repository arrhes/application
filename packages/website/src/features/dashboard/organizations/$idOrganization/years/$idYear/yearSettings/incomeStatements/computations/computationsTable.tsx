import { readAllComputationsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCalculator } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../../../../../components/layouts/emptyState.tsx"
import { LinkButton } from "../../../../../../../../../components/linkButton.tsx"

export function ComputationsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    return (
        <DataWrapper
            routeDefinition={readAllComputationsRouteDefinition}
            body={{
                idYear: props.idYear,
            }}
        >
            {(computations) => {
                if (computations.length === 0) {
                    return (
                        <EmptyState
                            icon={<IconCalculator size={48} />}
                            title="Aucune ligne de calcul"
                            subtitle="Ajoutez une ligne de calcul pour commencer"
                        />
                    )
                }
                return (
                    <div
                        className={css({
                            height: "fit-content",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            padding: "4",
                        })}
                    >
                        {computations.map((computation) => (
                            <LinkButton
                                key={computation.id}
                                to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs/$idComputation"
                                params={{
                                    idComputation: computation.id,
                                    idOrganization: props.idOrganization,
                                    idYear: props.idYear,
                                }}
                                className={css({ width: "100%" })}
                            >
                                <div
                                    className={css({
                                        padding: "1rem",
                                        minWidth: "fit-content",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        _hover: { backgroundColor: "neutral/5" },
                                        borderBottom: "1px solid",
                                        borderColor: "neutral/5",
                                        _last: { borderBottom: "0" },
                                    })}
                                >
                                    <span className={css({ color: "neutral", fontSize: "xs", lineHeight: "none" })}>
                                        {computation.number}
                                    </span>
                                    <span
                                        className={css({
                                            color: "neutral",
                                            fontSize: "xs",
                                            textAlign: "left",
                                            lineHeight: "none",
                                            whiteSpace: "nowrap",
                                        })}
                                    >
                                        {computation.label}
                                    </span>
                                </div>
                            </LinkButton>
                        ))}
                    </div>
                )
            }}
        </DataWrapper>
    )
}
