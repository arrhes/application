import { readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { InputSelect } from "@arrhes/ui"
import type * as v from "valibot"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.ts"

export function YearSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const yearsResponse = useDataFromAPI({
        routeDefinition: readAllYearsRouteDefinition,
        body: {},
        params: {
            idOrganization: props.idOrganization,
        },
    })

    return (
        <InputSelect
            value={props.value}
            onChange={props.onChange}
            isLoading={yearsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner un exercice"
            options={
                yearsResponse.data === undefined
                    ? []
                    : yearsResponse.data.map((year) => ({
                          key: year.id,
                          label: year.label,
                      }))
            }
        />
    )
}
