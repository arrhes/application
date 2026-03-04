import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"
import { FormatNull } from "../../../../../components/formats/formatNull.tsx"
import { FormatPrice } from "../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../components/formats/formatText.tsx"
import { Table } from "../../../../../components/layouts/table/table.tsx"
import { toRoman } from "../../../../../utilities/toRoman.ts"
import { getIncomeStatementChildren } from "../../yearSettings/incomeStatements/getIncomeStatementChildren.tsx"
import { IncomeStatementReportItem } from "./incomeStatementReportItem.tsx"

export function IncomeStatementsReportTable(props: {
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    computations: Array<v.InferOutput<typeof returnedSchemas.computation>>
    computationIncomeStatements: Array<v.InferOutput<typeof returnedSchemas.computationIncomeStatement>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {
    return (
        <div
            className={css({
                width: "100%",
                maxHeight: "[70vh]",
                overflowY: "auto",
            })}
        >
            <Table.Root>
                <Table.Header.Root>
                    <Table.Header.Row>
                        <Table.Header.Cell />
                        <Table.Header.Cell className={css({ width: "[1%]" })} align="right">
                            <span className={css({ color: "neutral/75", fontSize: "sm" })}>Net</span>
                        </Table.Header.Cell>
                    </Table.Header.Row>
                </Table.Header.Root>
                <Table.Body.Root>
                    {props.incomeStatements
                        .filter((incomeStatement) => incomeStatement.idIncomeStatementParent === null)
                        .sort((a, b) => Number(a.number) - Number(b.number))
                        .map((incomeStatement) => {
                            const incomeStatementChildren = getIncomeStatementChildren({
                                incomeStatement: incomeStatement,
                                incomeStatements: props.incomeStatements,
                            })

                            return (
                                <IncomeStatementReportItem
                                    key={incomeStatement.id}
                                    idOrganization={incomeStatement.idOrganization}
                                    idYear={incomeStatement.idYear}
                                    accounts={props.accounts}
                                    recordRows={props.recordRows}
                                    incomeStatement={incomeStatement}
                                    incomeStatementChildren={incomeStatementChildren}
                                    level={0}
                                />
                            )
                        })}
                </Table.Body.Root>
                <Table.Body.Root>
                    {props.computations.length === 0 ? (
                        <Table.Body.Root
                            className={css({
                                borderBottom: "1px solid token(colors.neutral/10)",
                                _last: { borderBottom: "0" },
                            })}
                        >
                            <Table.Body.Row>
                                <Table.Body.Cell>
                                    <FormatNull className="" />
                                </Table.Body.Cell>
                            </Table.Body.Row>
                        </Table.Body.Root>
                    ) : (
                        props.computations.map((computation, index) => {
                            let computationAmount = 0
                            const _computationStatements = props.computationIncomeStatements
                                .filter(
                                    (computationIncomeStatement) =>
                                        computationIncomeStatement.idComputation === computation.id,
                                )
                                .forEach((computationIncomeStatement) => {
                                    let incomeStatementAmount = 0
                                    props.accounts
                                        .filter((account) => {
                                            const foundIncomeStatement = props.incomeStatements.find(
                                                (incomeStatement) =>
                                                    incomeStatement.id === computationIncomeStatement.idIncomeStatement,
                                            )
                                            if (foundIncomeStatement === undefined) {
                                                return false
                                            }
                                            const incomeStatementChildren = getIncomeStatementChildren({
                                                incomeStatement: foundIncomeStatement,
                                                incomeStatements: props.incomeStatements,
                                            })

                                            const hasAccount =
                                                account.idIncomeStatement ===
                                                computationIncomeStatement.idIncomeStatement
                                            const hasChildrenAccount = incomeStatementChildren.some(
                                                (incomeStatement) => incomeStatement.id === account.idIncomeStatement,
                                            )
                                            return hasAccount || hasChildrenAccount
                                        })
                                        .forEach((account) => {
                                            props.recordRows
                                                .filter((recordRow) => recordRow.idAccount === account.id)
                                                .forEach((recordRow) => {
                                                    incomeStatementAmount +=
                                                        Number(recordRow.debit) - Number(recordRow.credit)
                                                })
                                        })

                                    if (computationIncomeStatement.operation === "plus") {
                                        computationAmount += Math.abs(incomeStatementAmount)
                                    }
                                    if (computationIncomeStatement.operation === "minus") {
                                        computationAmount += -Math.abs(incomeStatementAmount)
                                    }
                                })

                            // .sort((a, b) => {
                            //     if (!a.incomeStatement || !b.incomeStatement) return 0
                            //     return (a.incomeStatement.number - b.incomeStatement.number)
                            // })

                            const computationIncomeStatementsLabel = props.computationIncomeStatements
                                .filter(
                                    (computationIncomeStatement) =>
                                        computationIncomeStatement.idComputation === computation.id,
                                )
                                .map((computationIncomeStatement, computationIncomeStatementIndex) => {
                                    const incomeStatement = props.incomeStatements.find(
                                        (incomeStatement) =>
                                            incomeStatement.id === computationIncomeStatement.idIncomeStatement,
                                    )
                                    if (incomeStatement === undefined) {
                                        return ""
                                    }
                                    const romanNumber = toRoman(Number(incomeStatement.number))
                                    if (computationIncomeStatement.operation === "plus") {
                                        if (computationIncomeStatementIndex === 0) return `${romanNumber}`
                                        return `+${romanNumber}`
                                    }
                                    if (computationIncomeStatement.operation === "minus") return `-${romanNumber}`
                                    return ""
                                })
                                .join("")

                            return (
                                <Table.Body.Row
                                    key={computation.id}
                                    className={cx(
                                        css({}),
                                        index === 0
                                            ? css({
                                                  borderTop: "1px solid token(colors.neutral/25)",
                                                  borderBottomColor: "neutral/5",
                                              })
                                            : "",
                                    )}
                                >
                                    <Table.Body.Cell align="right">
                                        <div
                                            className={css({
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "end",
                                                gap: "0.5rem",
                                            })}
                                        >
                                            <FormatText className={css({ whiteSpace: "normal", textAlign: "right" })}>
                                                {computation.label}
                                            </FormatText>
                                            <FormatText
                                                className={css({
                                                    whiteSpace: "normal",
                                                    textAlign: "right",
                                                    color: "neutral/50",
                                                })}
                                            >
                                                {`(${computationIncomeStatementsLabel})`}
                                            </FormatText>
                                        </div>
                                    </Table.Body.Cell>
                                    <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                        <FormatPrice price={computationAmount} />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            )
                        })
                    )}
                </Table.Body.Root>
            </Table.Root>
        </div>
    )
}
