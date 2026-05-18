import { deleteOneEntryRouteDefinition, readAllEntriesRouteDefinition } from "@arrhes/application-metadata/routes"
import {
    Button,
    ButtonGhostContent,
    ButtonOutlineContent,
    ButtonPlainContent,
    Dialog,
    toast,
    useModalStore,
} from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronDown, IconTrash } from "@tabler/icons-react"
import type { Row } from "@tanstack/react-table"
import { useId } from "react"
import type * as v from "valibot"
import { Popover } from "../../../../components/overlays/popover/popover.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"

type EntryRow = v.InferOutput<typeof readAllEntriesRouteDefinition.schemas.return>[number]

export function EntriesTableSelectionActions(props: { selectedRows: Array<Row<EntryRow>>; idYear: string }) {
    const deleteModalId = useId()
    const { open: openModal, close: closeModal } = useModalStore()

    async function handleDelete() {
        const results = await Promise.all(
            props.selectedRows.map((row) =>
                getResponseBodyFromAPI({
                    routeDefinition: deleteOneEntryRouteDefinition,
                    body: {
                        idEntry: row.original.id,
                        idYear: props.idYear,
                    },
                }),
            ),
        )
        await invalidateData({
            routeDefinition: readAllEntriesRouteDefinition,
            body: {
                idYear: props.idYear,
            },
        })
        if (results.some((r) => r.ok === false)) {
            toast({
                title: "Certaines écritures n'ont pas pu être supprimées",
                variant: "error",
            })
        } else {
            toast({
                title: "Écritures supprimées",
                variant: "success",
            })
        }
    }

    return (
        <>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <Button>
                        <ButtonGhostContent
                            leftIcon={<IconChevronDown />}
                            text={undefined}
                        />
                    </Button>
                </Popover.Trigger>
                <Popover.Content
                    align="start"
                    className={css({
                        padding: "0.5rem",
                        gap: "0.25rem",
                    })}
                >
                    <Popover.Close asChild>
                        <Button
                            className={css({
                                width: "100%",
                            })}
                            onClick={() =>
                                openModal(
                                    deleteModalId,
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title>Supprimer les écritures sélectionnées</Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <Dialog.Description>
                                                {`Voulez-vous supprimer ${props.selectedRows.length} écriture${
                                                    props.selectedRows.length > 1 ? "s" : ""
                                                } ? Cette action est irréversible.`}
                                            </Dialog.Description>
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Button onClick={() => closeModal(deleteModalId)}>
                                                <ButtonOutlineContent text="Annuler" />
                                            </Button>
                                            <Button
                                                hasLoader
                                                onClick={async () => {
                                                    await handleDelete()
                                                    closeModal(deleteModalId)
                                                }}
                                            >
                                                <ButtonPlainContent
                                                    color="danger"
                                                    leftIcon={<IconTrash />}
                                                    text="Supprimer"
                                                />
                                            </Button>
                                        </Dialog.Footer>
                                    </Dialog.Content>,
                                )
                            }
                        >
                            <ButtonGhostContent
                                leftIcon={<IconTrash />}
                                text="Supprimer"
                                color="danger"
                                className={css({
                                    width: "100%",
                                    justifyContent: "start",
                                })}
                            />
                        </Button>
                    </Popover.Close>
                </Popover.Content>
            </Popover.Root>
        </>
    )
}
