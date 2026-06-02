import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"
import type * as v from "valibot"
import { ACCOUNT_ITEM_HEIGHT, INDENT_PER_LEVEL } from "../accounts/accountItem.tsx"
import { UpdateOneBalanceSheet } from "./$idBalanceSheet/UpdateOneBalanceSheet.tsx"

export function BalanceSheetRow(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    level: number
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <UpdateOneBalanceSheet
            balanceSheet={props.balanceSheet}
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
                    padding: "0.5rem",
                    borderRadius: "md",
                    _hover: {
                        backgroundColor: "neutral/5",
                    },
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/5",
                    _last: {
                        borderBottom: "0",
                    },
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
                        lineHeight: "none",
                    })}
                >
                    {props.balanceSheet.number}
                </span>
                <span
                    className={css({
                        color: "neutral",
                        fontSize: "xs",
                        textAlign: "left",
                        lineHeight: "none",
                        whiteSpace: "nowrap",
                    })}
                >
                    {props.balanceSheet.label}
                </span>
            </div>
        </UpdateOneBalanceSheet>
    )
}
