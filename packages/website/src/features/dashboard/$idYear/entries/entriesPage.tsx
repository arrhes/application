import { Button, ButtonGhostContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDotsVertical, IconDownload, IconFileExport, IconFileImport, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Fragment } from "react"
import { Page } from "../../../../components/layouts/page/page.js"
import { Popover } from "../../../../components/overlays/popover/popover.js"
import { useTabs } from "../../../../contexts/tabs/tabsContext.js"
import { YearDataWrapper } from "../yearDataWrapper.tsx"
import { CreateOneEntry } from "./createOneEntry.js"
import { EntriesTable } from "./entriesTable.js"
import { ExportEntryLines } from "./exportEntryLines.js"
import { ExportFecFile } from "./exportFecFile.js"
import { ImportFecFile } from "./importFecFile.js"

export function EntriesPage({
    idOrganization: idOrganizationProp,
    idYear: idYearProp,
}: {
    idOrganization?: string
    idYear?: string
}) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
        idYear?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""
    const idYear = idYearProp ?? params.idYear ?? ""
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Page.Root>
            <Page.Content>
                <YearDataWrapper
                    idYear={idYear}
                    requiredKeys={[
                        "entries",
                        "entryLines",
                        "entryTags",
                        "journals",
                        "tags",
                        "files",
                        "accounts",
                    ]}
                >
                    {(data) => (
                        <Fragment>
                            <div
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "end",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                })}
                            >
                                <Popover.Root>
                                    <Popover.Trigger asChild>
                                        <Button>
                                            <ButtonGhostContent
                                                leftIcon={<IconDotsVertical />}
                                                text={undefined}
                                            />
                                        </Button>
                                    </Popover.Trigger>
                                    <Popover.Content
                                        align="end"
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
                                                onClick={() => {
                                                    const r = {
                                                        current: "",
                                                    }
                                                    r.current = openPanelTab(
                                                        "Exporter les mouvements",
                                                        <ExportEntryLines
                                                            idOrganization={idOrganization}
                                                            idYear={idYear}
                                                            entries={data.entries}
                                                            entryLines={data.entryLines}
                                                            onClose={() => closeTab(r.current)}
                                                        />,
                                                    )
                                                }}
                                            >
                                                <ButtonGhostContent
                                                    leftIcon={<IconDownload />}
                                                    text="Exporter en CSV"
                                                    className={css({
                                                        width: "100%",
                                                        justifyContent: "start",
                                                    })}
                                                />
                                            </Button>
                                        </Popover.Close>
                                        <Popover.Close asChild>
                                            <Button
                                                className={css({
                                                    width: "100%",
                                                })}
                                                onClick={() => {
                                                    const r = {
                                                        current: "",
                                                    }
                                                    r.current = openPanelTab(
                                                        "Exporter au format FEC",
                                                        <ExportFecFile
                                                            idOrganization={idOrganization}
                                                            idYear={idYear}
                                                            entries={data.entries}
                                                            entryLines={data.entryLines}
                                                            onClose={() => closeTab(r.current)}
                                                        />,
                                                    )
                                                }}
                                            >
                                                <ButtonGhostContent
                                                    leftIcon={<IconFileExport />}
                                                    text="Exporter le FEC"
                                                    className={css({
                                                        width: "100%",
                                                        justifyContent: "start",
                                                    })}
                                                />
                                            </Button>
                                        </Popover.Close>
                                        <Popover.Close asChild>
                                            <Button
                                                className={css({
                                                    width: "100%",
                                                })}
                                                onClick={() => {
                                                    const r = {
                                                        current: "",
                                                    }
                                                    r.current = openPanelTab(
                                                        "Importer un FEC",
                                                        <ImportFecFile
                                                            idYear={idYear}
                                                            journals={data.journals}
                                                            accounts={data.accounts}
                                                            onClose={() => closeTab(r.current)}
                                                        />,
                                                    )
                                                }}
                                            >
                                                <ButtonGhostContent
                                                    leftIcon={<IconFileImport />}
                                                    text="Importer un FEC"
                                                    className={css({
                                                        width: "100%",
                                                        justifyContent: "start",
                                                    })}
                                                />
                                            </Button>
                                        </Popover.Close>
                                    </Popover.Content>
                                </Popover.Root>
                                <CreateOneEntry
                                    idOrganization={idOrganization}
                                    idYear={idYear}
                                >
                                    <Button>
                                        <ButtonPlainContent
                                            leftIcon={<IconPlus />}
                                            text="Ajouter une écriture"
                                        />
                                    </Button>
                                </CreateOneEntry>
                            </div>
                            <EntriesTable
                                idOrganization={idOrganization}
                                idYear={idYear}
                                entries={data.entries}
                                entryLinesByEntryId={data.entryLinesByEntryId}
                                entryTagsByEntryId={data.entryTagsByEntryId}
                                journalById={data.journalById}
                                tagById={data.tagById}
                                fileById={data.fileById}
                                accountById={data.accountById}
                            />
                        </Fragment>
                    )}
                </YearDataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
