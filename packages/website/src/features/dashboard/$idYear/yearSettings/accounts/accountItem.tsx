import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { memo } from "react"
import type * as v from "valibot"

const INDENT_PER_LEVEL = 16

const rowStyle = css({
    minWidth: "fit",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "0.5rem",
    _hover: { backgroundColor: "neutral/5" },
    borderBottomWidth: "1px",
    borderColor: "neutral/5",
    _last: { borderBottomWidth: "0" },
})

const labelContainerStyle = css({
    padding: "1",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "0.5rem",
})

const numberBaseStyle = css({ color: "neutral", fontSize: "xs", lineHeight: "none" })
const numberBoldStyle = css({ color: "neutral", fontSize: "xs", lineHeight: "none", fontWeight: "bold" })

const labelBaseStyle = css({
    color: "neutral",
    fontSize: "xs",
    textAlign: "left",
    lineHeight: "none",
    whiteSpace: "nowrap",
})
const labelBoldStyle = css({
    color: "neutral",
    fontSize: "xs",
    textAlign: "left",
    lineHeight: "none",
    whiteSpace: "nowrap",
    fontWeight: "bold",
})

const linkStyle = css({ width: "100%", cursor: "pointer" })

export const AccountItem = memo(function AccountItem(props: {
    account: v.InferOutput<typeof returnedSchemas.account>
    level: number
    href: string
}) {
    return (
        <a href={props.href} data-account-link className={linkStyle}>
            <div className={rowStyle} style={{ paddingLeft: `${props.level * INDENT_PER_LEVEL}px` }}>
                <div className={labelContainerStyle}>
                    <span className={props.account.isMandatory ? numberBoldStyle : numberBaseStyle}>
                        {props.account.number}
                    </span>
                    <span className={props.account.isMandatory ? labelBoldStyle : labelBaseStyle}>
                        {props.account.label}
                    </span>
                </div>
            </div>
        </a>
    )
})
