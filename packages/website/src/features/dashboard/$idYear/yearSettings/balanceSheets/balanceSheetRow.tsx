import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"
import type * as v from "valibot"
import { LinkButton } from "../../../../../components/linkButton.tsx"

export function BalanceSheetRow(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    level: number
    className?: ComponentProps<"div">["className"]
}) {
    const prefix = `${(
        new Array(props.level).fill("").map((_) => {
            return "&nbsp;&nbsp;"
        })
    ).join("")}`

    return (
        <LinkButton
            to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan/$idBalanceSheet"
            params={{
                idOrganization: props.idOrganization,
                idYear: props.idYear,
                idBalanceSheet: props.balanceSheet.id,
            }}
            className={css({ width: "100%" })}
        >
            <div
                className={css({
                    minWidth: "fit-content",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                    _hover: { backgroundColor: "neutral/5" },
                    borderBottom: "1px solid",
                    borderColor: "neutral/5",
                    _last: { borderBottom: "0" },
                })}
                // style={{
                //     paddingLeft: `${(1 + props.level) * 12}px`
                // }}
            >
                {prefix === "" ? null : (
                    <pre
                        className={css({
                            color: "neutral/25",
                            fontSize: "[22px]",
                            lineHeight: "none",
                            height: "100%",
                            verticalAlign: "middle",
                            textAlign: "left",
                        })}
                        dangerouslySetInnerHTML={{
                            __html: prefix,
                        }}
                    />
                )}
                <div
                    className={css({
                        padding: "1",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
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
            </div>
        </LinkButton>
    )
}
