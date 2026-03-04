import {
    deleteOneIncomeStatementRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { DeleteConfirmation } from "../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function DeleteOneIncomeStatement(props: {
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneIncomeStatementRouteDefinition,
            body: {
                idIncomeStatement: props.incomeStatement.id,
                idYear: props.incomeStatement.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de la ligne de compte de résultat", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllIncomeStatementsRouteDefinition,
            body: {
                idYear: props.incomeStatement.idYear,
            },
        })

        toast({ title: "Ligne de compte de résultat supprimée", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
            params: {
                idOrganization: props.incomeStatement.idOrganization,
                idYear: props.incomeStatement.idYear,
            },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer cette ligne de compte de résultat ?"
            description={
                <>
                    Cette action supprimera la ligne de compte de résultat et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitText="Supprimer la ligne de compte de résultat"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}
