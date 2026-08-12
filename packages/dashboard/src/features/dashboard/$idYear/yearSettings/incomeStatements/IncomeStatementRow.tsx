import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentProps } from "react"
import type * as v from "valibot"
import { ACCOUNT_ITEM_HEIGHT, INDENT_PER_LEVEL } from "../accounts/accountItem.tsx"
import { UpdateOneIncomeStatement } from "./$idIncomeStatement/UpdateOneIncomeStatement.tsx"

export function IncomeStatementRow(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    level: number
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <UpdateOneIncomeStatement
            incomeStatement={props.incomeStatement}
            className={{
                width: "100%",
            }}
        >
            <div
                className={css({
                    minWidth: "fit-content",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                    _hover: {
                        backgroundColor: "neutral/5",
                    },
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/5",
                    _last: {
                        borderBottom: "0",
                    },
                    padding: "0.5rem",
                    borderRadius: "md",
                })}
                style={{
                    height: `${ACCOUNT_ITEM_HEIGHT}px`,
                    paddingLeft: `${(props.level + 1) * INDENT_PER_LEVEL}px`,
                }}
            >
                <span
                    className={css({
                        color: "neutral",
                        fontSize: "xs",
                        lineHeight: "1",
                    })}
                >
                    {props.incomeStatement.number}
                </span>
                <span
                    className={css({
                        color: "neutral",
                        fontSize: "xs",
                        textAlign: "left",
                        lineHeight: "1",
                        whiteSpace: "nowrap",
                    })}
                >
                    {props.incomeStatement.label}
                </span>
            </div>
        </UpdateOneIncomeStatement>
    )
}
