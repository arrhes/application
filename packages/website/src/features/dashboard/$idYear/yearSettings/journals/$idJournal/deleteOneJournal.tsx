import { deleteOneJournalRouteDefinition, readAllJournalsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { ConfirmationModal } from "../../../../../../components/overlays/dialog/confirmationModal.tsx"
import { applicationRouter } from "../../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function DeleteOneJournal(props: {
    journal: v.InferOutput<typeof returnedSchemas.journal>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneJournalRouteDefinition,
            body: {
                idJournal: props.journal.id,
                idYear: props.journal.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression du journal", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllJournalsRouteDefinition,
            body: {
                idYear: props.journal.idYear,
            },
        })

        toast({ title: "Journal supprimé", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/journaux",
            params: {
                idOrganization: props.journal.idOrganization,
                idYear: props.journal.idYear,
            },
        })
    }

    return (
        <ConfirmationModal
            title="Voulez-vous supprimer ce journal ?"
            description={
                <>
                    Cette action supprimera le journal et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitButtonProps={{ color: "danger", text: "Supprimer le journal" }}
            onSubmit={onSubmit}
        >
            {props.children}
        </ConfirmationModal>
    )
}
