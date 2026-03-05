import { readAllRecordLabelsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"
import { InputCombobox } from "../../../../../components/inputs/inputCombobox.tsx"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"

export function RecordLabelSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const recordLabelsResponse = useDataFromAPI({
        routeDefinition: readAllRecordLabelsRouteDefinition,
        body: {
            idYear: props.idYear,
        },
    })

    return (
        <InputCombobox
            value={props.value}
            onChange={props.onChange}
            isLoading={recordLabelsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner la catégorie"
            options={
                recordLabelsResponse.data === undefined
                    ? []
                    : recordLabelsResponse.data?.map((recordLabel) => ({
                          key: recordLabel.id,
                          label: `${recordLabel.label}`,
                      }))
            }
        />
    )
}
