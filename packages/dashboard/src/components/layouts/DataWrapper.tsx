import type { routeDefinition } from "@arrhes/application-metadata/utilities"
import { CircularLoader, FormatError } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { type ComponentProps, type ReactElement, Suspense } from "react"
import type * as v from "valibot"
import { useDataFromAPI } from "../../utilities/useHTTPData.js"

export function DataWrapper<TRouteDefinition extends ReturnType<typeof routeDefinition>>(props: {
    routeDefinition: TRouteDefinition
    body: v.InferInput<TRouteDefinition["schemas"]["body"]>
    params?: Record<string, string>
    children: (data: v.InferOutput<TRouteDefinition["schemas"]["return"]>) => ReactElement | Array<ReactElement> | null
    className?: ComponentProps<"div">["className"]
    loaderProps?: ComponentProps<typeof CircularLoader>
    errorProps?: ComponentProps<typeof FormatError>
}) {
    const response = useDataFromAPI({
        routeDefinition: props.routeDefinition,
        body: props.body,
        params: props.params,
    })

    if (response.data === undefined) {
        if (response.isPending) {
            return (
                <CircularLoader
                    {...props.loaderProps}
                    text={props.loaderProps?.text ?? "Chargement des données..."}
                    className={cx(
                        css({
                            padding: "1rem",
                        }),
                        props.loaderProps?.className,
                    )}
                />
            )
        }
        return (
            <FormatError
                {...props.errorProps}
                text={props.errorProps?.text ?? "Erreur lors de la récupération des données."}
                className={css({
                    padding: "1rem",
                })}
            />
        )
    }

    return <Suspense fallback={<CircularLoader />}>{props.children(response.data)}</Suspense>
}
