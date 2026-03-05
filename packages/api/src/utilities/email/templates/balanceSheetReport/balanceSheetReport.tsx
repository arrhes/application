import type { returnedSchemas } from "@arrhes/application-metadata"
import { css, Style } from "hono/css"
import type * as v from "valibot"
import { BalanceSheetAssetsReportTable } from "./balanceSheetAssets/balanceSheetAssetsReportTable.js"
import { BalanceSheetLiabilitiesReportTable } from "./balanceSheetLiabilities/balanceSheetLiabilitiesReportTable.js"

function BalanceSheetReport(props: {
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
}) {
    return (
        <html lang="fr">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Style />
            </head>
            <body class={css`width: fit-content; height: fit-content; overflow: scroll; margin: 32px;`}>
                <div
                    class={css`width: fit-content; min-height:fit-content; overflow: scroll; display: flex; flex-direction: column; gap:16px;`}
                >
                    <BalanceSheetAssetsReportTable
                        accounts={props.accounts}
                        recordRows={props.recordRows}
                        balanceSheets={props.balanceSheets.filter((balanceSheet) => balanceSheet.side === "asset")}
                    />
                    <BalanceSheetLiabilitiesReportTable
                        accounts={props.accounts}
                        recordRows={props.recordRows}
                        balanceSheets={props.balanceSheets.filter((balanceSheet) => balanceSheet.side === "liability")}
                    />
                </div>
            </body>
        </html>
    )
}

export function balanceSheetReportTemplate(props: Parameters<typeof BalanceSheetReport>[0]) {
    return (<BalanceSheetReport {...props} />).toString()
}
