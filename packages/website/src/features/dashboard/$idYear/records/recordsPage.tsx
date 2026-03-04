import { Button, ButtonGhostContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDownload, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../components/layouts/page/page.js"
import { recordsRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/recordsRoute.js"
import { YearDataWrapper } from "../yearDataWrapper.tsx"
import { CreateOneRecord } from "./createOneRecord.js"
import { ExportRecordRows } from "./exportRecordRows.js"
import { RecordsTable } from "./recordsTable.js"

export function RecordsPage() {
    const params = useParams({ from: recordsRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <YearDataWrapper
                    idYear={params.idYear}
                    requiredKeys={["records", "recordRows", "journals", "recordLabels", "files", "accounts"]}
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
                                <ExportRecordRows
                                    idOrganization={params.idOrganization}
                                    idYear={params.idYear}
                                    records={data.records}
                                    recordRows={data.recordRows}
                                >
                                    <Button>
                                        <ButtonGhostContent
                                            leftIcon={<IconDownload />}
                                            // text="Exporter"
                                        />
                                    </Button>
                                </ExportRecordRows>
                                <CreateOneRecord idOrganization={params.idOrganization} idYear={params.idYear}>
                                    <Button>
                                        <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter une écriture" />
                                    </Button>
                                </CreateOneRecord>
                            </div>
                            <RecordsTable
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                                records={data.records}
                                recordRows={data.recordRows}
                                journals={data.journals}
                                recordLabels={data.recordLabels}
                                files={data.files}
                                accounts={data.accounts}
                            />
                        </div>
                    )}
                </YearDataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
