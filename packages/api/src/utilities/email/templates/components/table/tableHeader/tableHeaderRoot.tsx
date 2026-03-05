import { css, cx, Style } from "hono/css"
import type { DOMAttributes } from "hono/jsx"
import type { JSX } from "hono/jsx/jsx-runtime"

export function TableHeaderRoot(props: { children: JSX.Element | JSX.Element[]; class?: DOMAttributes["class"] }) {
    return (
        <>
            <Style />
            <thead class={cx(css`width: 100%;`, props.class)} children={props.children} />
        </>
    )
}
