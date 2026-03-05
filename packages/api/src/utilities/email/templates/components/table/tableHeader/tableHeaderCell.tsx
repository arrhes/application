import { css, cx, Style } from "hono/css"
import type { DOMAttributes } from "hono/jsx"
import type { JSX } from "hono/jsx/jsx-runtime"

export function TableHeaderCell(props: {
    children?: JSX.Element | JSX.Element[]
    class?: DOMAttributes["class"]
    align?: DOMAttributes["align"]
    colSpan?: DOMAttributes["colSpan"]
}) {
    return (
        <>
            <Style />
            <th
                class={cx(
                    css`width: 100%; padding: 0.5rem; vertical-align: middle; border-bottom: 1px solid #111111;`,
                    props.class,
                )}
                colSpan={props.colSpan}
                align={props.align ?? "left"}
                children={props.children}
            />
        </>
    )
}
