import { readAllTagsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"
import { InputCombobox } from "../../../../../components/inputs/inputCombobox.tsx"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"

export function TagSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const tagsResponse = useDataFromAPI({
        routeDefinition: readAllTagsRouteDefinition,
        body: {
            idYear: props.idYear,
        },
    })

    return (
        <InputCombobox
            value={props.value}
            onChange={props.onChange}
            isLoading={tagsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner la catégorie"
            options={
                tagsResponse.data === undefined
                    ? []
                    : tagsResponse.data?.map((tag) => ({
                          key: tag.id,
                          label: `${tag.label}`,
                      }))
            }
        />
    )
}
