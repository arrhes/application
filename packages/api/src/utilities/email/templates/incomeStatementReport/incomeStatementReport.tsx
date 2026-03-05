import type { returnedSchemas } from "@arrhes/application-metadata"
import { css, Style } from "hono/css"
import type * as v from "valibot"
import { IncomeStatementsReportTable } from "./incomeStatementsReportTable.js"

function IncomeStatementReport(props: {
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    computations: Array<v.InferOutput<typeof returnedSchemas.computation>>
    computationIncomeStatements: Array<v.InferOutput<typeof returnedSchemas.computationIncomeStatement>>
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
                    <IncomeStatementsReportTable
                        accounts={props.accounts}
                        recordRows={props.recordRows}
                        incomeStatements={props.incomeStatements}
                        computations={props.computations}
                        computationIncomeStatements={props.computationIncomeStatements}
                    />
                </div>
            </body>
        </html>
    )
}

export function incomeStatementReportTemplate(props: Parameters<typeof IncomeStatementReport>[0]) {
    return (<IncomeStatementReport {...props} />).toString()
}
