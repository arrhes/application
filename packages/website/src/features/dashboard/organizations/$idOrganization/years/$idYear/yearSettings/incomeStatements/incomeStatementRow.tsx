import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"
import type * as v from "valibot"
import { LinkButton } from "../../../../../../../../components/linkButton.tsx"

export function IncomeStatementRow(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    level: number
    className?: ComponentProps<"div">["className"]
}) {
    const prefix = `${(
        new Array(props.level).fill("").map((_, _index) => {
            return "&nbsp;&nbsp;"
        })
    ).join("")}`

    return (
        <LinkButton
            to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/$idIncomeStatement"
            params={{
                idOrganization: props.idOrganization,
                idYear: props.idYear,
                idIncomeStatement: props.incomeStatement.id,
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
                {prefix === null ? null : (
                    <pre
                        className={css({
                            color: "neutral/25",
                            fontSize: "22px",
                            lineHeight: "1",
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
                    <span className={css({ color: "neutral", fontSize: "xs", lineHeight: "1" })}>
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
            </div>
        </LinkButton>
    )
}
