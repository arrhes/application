import { css, cx } from "hono/css"
import type { DOMAttributes } from "hono/jsx"
import { formatPrice } from "./formatPrice.js"

export function PriceFormat(props: { price?: number | null | string; class?: DOMAttributes["class"] }) {
    const price = Number(props.price)
    return (
        <span
            class={cx(
                css`width: fit-content; max-width: 100%; white-space: nowrap;`,
                price === 0 ? css`color: #888888;` : undefined,
                props.class,
            )}
        >
            {price < 0 ? `(${formatPrice(Math.abs(price))})` : formatPrice(Math.abs(price))}
        </span>
    )
}
