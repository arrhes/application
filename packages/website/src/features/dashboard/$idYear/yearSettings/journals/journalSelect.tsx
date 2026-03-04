import { readAllJournalsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"
import { InputCombobox } from "../../../../../components/inputs/inputCombobox.tsx"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"

export function JournalSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const journalsResponse = useDataFromAPI({
        routeDefinition: readAllJournalsRouteDefinition,
        body: {
            idYear: props.idYear,
        },
    })

    return (
        <InputCombobox
            value={props.value}
            onChange={props.onChange}
            isLoading={journalsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner un journal"
            options={
                journalsResponse.data === undefined
                    ? []
                    : journalsResponse.data?.map((journal) => ({
                          key: journal.id,
                          label: `${journal.code} ${journal.label}`,
                      }))
            }
        />
    )
}
