import { css, cx, Style } from "hono/css"
import type { DOMAttributes } from "hono/jsx"
import type { JSX } from "hono/jsx/jsx-runtime"

export function TableBodyCell(props: {
    children?: JSX.Element | null | JSX.Element[]
    class?: DOMAttributes["class"]
    style?: DOMAttributes["style"]
    align?: DOMAttributes["align"]
    colSpan?: DOMAttributes["colSpan"]
}) {
    return (
        <>
            <Style />
            <td
                class={cx(
                    css`width: fit-content; padding: 0.5rem; vertical-align: middle; border-bottom: 1px solid #DDDDDD;`,
                    props.class,
                )}
                style={props.style}
                colSpan={props.colSpan}
                align={props.align ?? "left"}
                children={props.children}
            />
        </>
    )
}
