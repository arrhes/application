import type { routeDefinition } from "@arrhes/application-metadata/utilities"
import type * as v from "valibot"
import { useDataFromAPI } from "../../utilities/useHTTPData.js"
import { InputCombobox } from "./inputCombobox.js"

export function InputDataCombobox<TRouteDefinition extends ReturnType<typeof routeDefinition>>(props: {
    routeDefinition: TRouteDefinition
    body: v.InferInput<TRouteDefinition["schemas"]["body"]>
    placeholder?: string
    getOption: (data: v.InferOutput<TRouteDefinition["schemas"]["return"]>[number]) => { key: string; label: string }
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const response = useDataFromAPI({
        routeDefinition: props.routeDefinition,
        body: props.body,
    })

    return (
        <InputCombobox
            key={response.status}
            value={props.value}
            onChange={props.onChange}
            isLoading={response.isPending}
            allowEmpty={true}
            placeholder={props.placeholder ?? "Sélectionner un élément"}
            options={
                response.data === undefined
                    ? []
                    : Array.isArray(response.data)
                      ? response.data?.map((item) => props.getOption(item))
                      : [props.getOption(response.data)]
            }
        />
    )
}
