import { readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"
import { InputCombobox } from "../../../../../components/inputs/inputCombobox.tsx"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"

export function AccountSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const accountsResponse = useDataFromAPI({
        routeDefinition: readAllAccountsRouteDefinition,
        body: {
            idYear: props.idYear,
        },
    })

    return (
        <InputCombobox
            value={props.value}
            onChange={props.onChange}
            isLoading={accountsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner un compte"
            options={
                accountsResponse.data === undefined
                    ? []
                    : accountsResponse.data.map((account) => ({
                          key: account.id,
                          label: `${account.number} ${account.label}`,
                      }))
            }
        />
    )
}
