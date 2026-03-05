import { readAllBalanceSheetsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"
import { InputCombobox } from "../../../../../components/inputs/inputCombobox.tsx"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"

export function BalanceSheetsSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
    side: "asset" | "liability" | null
}) {
    const balanceSheetsResponse = useDataFromAPI({
        routeDefinition: readAllBalanceSheetsRouteDefinition,
        body: {
            idYear: props.idYear,
        },
    })

    return (
        <InputCombobox
            value={props.value}
            onChange={props.onChange}
            isLoading={balanceSheetsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner une ligne de bilan"
            options={
                balanceSheetsResponse.data === undefined
                    ? []
                    : balanceSheetsResponse.data
                          .filter((balanceSheet) => props.side === undefined || balanceSheet.side === props.side)
                          .map((balanceSheet) => ({
                              key: balanceSheet.id,
                              label: `${balanceSheet.number} ${balanceSheet.label}`,
                          }))
            }
        />
    )
}
