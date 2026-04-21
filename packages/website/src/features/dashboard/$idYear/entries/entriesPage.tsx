import { Button, ButtonGhostContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDotsVertical, IconDownload, IconFileExport, IconFileImport, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { Dropdown } from "../../../../components/layouts/dropdownMenu/dropdown.js"
import { Page } from "../../../../components/layouts/page/page.js"
import { entriesRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/entries/entriesRoute.js"
import { YearDataWrapper } from "../yearDataWrapper.tsx"
import { CreateOneEntry } from "./createOneEntry.js"
import { EntriesTable } from "./entriesTable.js"
import { ExportEntryLines } from "./exportEntryLines.js"
import { ExportFecFile } from "./exportFecFile.js"
import { ImportFecFile } from "./importFecFile.js"

export function EntriesPage() {
    const params = useParams({ from: entriesRoute.id })
    const [exportOpen, setExportOpen] = useState(false)
    const [fecOpen, setFecOpen] = useState(false)
    const [importFecOpen, setImportFecOpen] = useState(false)

    return (
        <Page.Root>
            <Page.Content>
                <YearDataWrapper
                    idYear={params.idYear}
                    requiredKeys={["entries", "entryLines", "entryTags", "journals", "tags", "files", "accounts"]}
                >
                    {(data) => (
                        <div className={css({ width: "100%", minWidth: "0" })}>
                            <div
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "end",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                })}
                            >
                                <Dropdown.Root>
                                    <Dropdown.Trigger>
                                        <ButtonGhostContent
                                            leftIcon={<IconDotsVertical />}
                                            text={undefined}
                                        />
                                    </Dropdown.Trigger>
                                    <Dropdown.Content align="end">
                                        <Dropdown.Item onSelect={() => setExportOpen(true)}>
                                            <ButtonGhostContent
                                                leftIcon={<IconDownload />}
                                                text="Exporter en CSV"
                                                className={css({ width: "100%", justifyContent: "start" })}
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setFecOpen(true)}>
                                            <ButtonGhostContent
                                                leftIcon={<IconFileExport />}
                                                text="Exporter le FEC"
                                                className={css({ width: "100%", justifyContent: "start" })}
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setImportFecOpen(true)}>
                                            <ButtonGhostContent
                                                leftIcon={<IconFileImport />}
                                                text="Importer un FEC"
                                                className={css({ width: "100%", justifyContent: "start" })}
                                            />
                                        </Dropdown.Item>
                                    </Dropdown.Content>
                                </Dropdown.Root>
                                <CreateOneEntry idOrganization={params.idOrganization} idYear={params.idYear}>
                                    <Button>
                                        <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter une écriture" />
                                    </Button>
                                </CreateOneEntry>
                            </div>
                            <EntriesTable
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                                entries={data.entries}
                                entryLines={data.entryLines}
                                entryTags={data.entryTags}
                                journals={data.journals}
                                tags={data.tags}
                                files={data.files}
                                accounts={data.accounts}
                            />
                            <ExportEntryLines
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                                entries={data.entries}
                                entryLines={data.entryLines}
                                open={exportOpen}
                                onOpenChange={setExportOpen}
                            />
                            <ExportFecFile
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                                entries={data.entries}
                                entryLines={data.entryLines}
                                open={fecOpen}
                                onOpenChange={setFecOpen}
                            />
                            <ImportFecFile
                                idYear={params.idYear}
                                journals={data.journals}
                                accounts={data.accounts}
                                open={importFecOpen}
                                onOpenChange={setImportFecOpen}
                            />
                        </div>
                    )}
                </YearDataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
