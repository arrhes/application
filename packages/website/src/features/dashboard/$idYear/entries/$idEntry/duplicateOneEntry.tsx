import {
    duplicateOneEntryRouteDefinition,
    readAllEntriesRouteDefinition,
    readAllEntryTagsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonGhostContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCopyCheck } from "@tabler/icons-react"
import { type ComponentPropsWithRef, type ReactElement, useState } from "react"
import type * as v from "valibot"
import { Dialog } from "../../../../../components/overlays/dialog/dialog.tsx"
import { toast } from "../../../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function DuplicateOneEntry(props: {
    entry: v.InferOutput<typeof returnedSchemas.entry>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    const [open, setOpen] = useState(false)

    async function onSubmit() {
        const duplicateResponse = await getResponseBodyFromAPI({
            routeDefinition: duplicateOneEntryRouteDefinition,
            body: {
                idEntry: props.entry.id,
                idYear: props.entry.idYear,
            },
        })

        if (duplicateResponse.ok === false) {
            toast({ title: "Erreur lors de la duplication de l'écriture", variant: "error" })
            return
        }

        await Promise.all([
            invalidateData({
                routeDefinition: readAllEntriesRouteDefinition,
                body: {
                    idYear: props.entry.idYear,
                },
            }),
            invalidateData({
                routeDefinition: readAllEntryTagsRouteDefinition,
                body: {
                    idYear: props.entry.idYear,
                },
            }),
        ])

        toast({ title: "Écriture dupliquée", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry",
            params: {
                idOrganization: props.entry.idOrganization,
                idYear: props.entry.idYear,
                idEntry: duplicateResponse.data.id,
            },
        })

        setOpen(false)
    }

    async function onCancel() {
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={(value) => setOpen(value)}>
            <Dialog.Trigger
                onClick={(event) => {
                    setOpen(true)
                    event.preventDefault()
                }}
            >
                {props.children}
            </Dialog.Trigger>
            {open === false ? null : (
                <Dialog.Content>
                    <Dialog.Header />
                    <div
                        className={css({
                            padding: "4",
                            paddingTop: "0",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "1",
                        })}
                    >
                        <Dialog.Title>Voulez-vous dupliquer cette écriture ?</Dialog.Title>
                        <Dialog.Description>
                            Cette action dupliquera l'écriture et toutes les données associées.
                        </Dialog.Description>
                    </div>
                    <Dialog.Footer>
                        <Button onClick={() => onCancel()}>
                            <ButtonGhostContent text="Annuler" />
                        </Button>
                        <Button onClick={() => onSubmit()} hasLoader>
                            <ButtonPlainContent leftIcon={<IconCopyCheck />} text="Dupliquer l'écriture" />
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            )}
        </Dialog.Root>
    )
}
