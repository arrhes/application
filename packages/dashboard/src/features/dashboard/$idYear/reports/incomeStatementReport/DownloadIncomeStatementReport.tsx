import { generateIncomeStatementXmlRouteDefinition } from "@comptasse/application-metadata/routes"
import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { Button, ButtonGhostContent, ButtonOutlineContent, toast } from "@comptasse/ui"

import { IconDownload, IconFileTypePdf, IconFileTypeXml } from "@tabler/icons-react"
import type * as v from "valibot"
import { Popover } from "../../../../../components/overlays/popover/popover.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"

export function DownloadIncomeStatementReport(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    computations: Array<v.InferOutput<typeof returnedSchemas.computation>>
    computationIncomeStatements: Array<v.InferOutput<typeof returnedSchemas.computationIncomeStatement>>
    entryLines: Array<v.InferOutput<typeof returnedSchemas.entryLine>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {
    async function handlePdf() {
        const [{ pdf }, { IncomeStatementReportPdf }] = await Promise.all([
            import("@react-pdf/renderer"),
            import("./IncomeStatementReportPdf.tsx"),
        ])
        const blob = await pdf(
            <IncomeStatementReportPdf
                incomeStatements={props.incomeStatements}
                computations={props.computations}
                computationIncomeStatements={props.computationIncomeStatements}
                entryLines={props.entryLines}
                accounts={props.accounts}
            />,
        ).toBlob()
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = objectUrl
        link.download = `${props.idOrganization}-${props.idYear}-compte-de-résultat.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(objectUrl)
    }

    async function handleXml() {
        const generateResponse = await getResponseBodyFromAPI({
            routeDefinition: generateIncomeStatementXmlRouteDefinition,
            body: {
                idYear: props.idYear,
            },
        })
        if (generateResponse.ok === false) {
            toast({
                title: "Impossible de générer le fichier XBRL",
                variant: "error",
            })
            return
        }

        const response = await fetch(generateResponse.data.url)
        if (!response.ok) {
            toast({
                title: "Impossible de télécharger le fichier XBRL",
                variant: "error",
            })
            return
        }
        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = objectUrl
        link.download = `${props.idOrganization}-${props.idYear}-compte-de-résultat.xml`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(objectUrl)
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button>
                    <ButtonOutlineContent
                        leftIcon={<IconDownload />}
                        // text="Télécharger"
                    />
                </Button>
            </Popover.Trigger>
            <Popover.Content
                align="end"
                className={{
                    padding: "0.5rem",
                    gap: "0.25rem",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Popover.Close asChild>
                    <Button
                        onClick={handlePdf}
                        className={{
                            width: "100%",
                        }}
                    >
                        <ButtonGhostContent
                            leftIcon={<IconFileTypePdf />}
                            text="Télécharger en PDF"
                            className={{
                                width: "100%",
                                justifyContent: "start",
                            }}
                        />
                    </Button>
                </Popover.Close>
                <Popover.Close asChild>
                    <Button
                        onClick={handleXml}
                        className={{
                            width: "100%",
                        }}
                    >
                        <ButtonGhostContent
                            leftIcon={<IconFileTypeXml />}
                            text="Télécharger en XML"
                            className={{
                                width: "100%",
                                justifyContent: "start",
                            }}
                        />
                    </Button>
                </Popover.Close>
            </Popover.Content>
        </Popover.Root>
    )
}
