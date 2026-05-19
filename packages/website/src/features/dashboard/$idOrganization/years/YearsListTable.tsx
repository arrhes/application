import { readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { schemas } from "@arrhes/application-metadata/schemas"
import { IconCalendarPlus } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { EmptyState } from "../../../../components/layouts/EmptyState.tsx"
import { ListTable } from "../../../../components/layouts/listTable/listTable.tsx"
import { YearListTableRow } from "./YearListTableRow.tsx"

export function YearsListTable(_props: { idOrganization: v.InferOutput<typeof schemas.organization>["id"] }) {
    return (
        <ListTable.Root>
            <DataWrapper
                routeDefinition={readAllYearsRouteDefinition}
                body={{}}
            >
                {(years) => {
                    if (years.length === 0) {
                        return (
                            <EmptyState
                                icon={<IconCalendarPlus size={48} />}
                                title="Aucun exercice"
                                subtitle="Créez un exercice pour commencer"
                            />
                        )
                    }
                    return years.map((year) => (
                        <YearListTableRow
                            key={year.id}
                            year={year}
                        />
                    ))
                }}
            </DataWrapper>
        </ListTable.Root>
    )
}
