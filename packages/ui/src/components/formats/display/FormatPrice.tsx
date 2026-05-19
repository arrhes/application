import type { ComponentProps } from "react"
import { css, cx } from "../../../utilities/cn.js"
import { FormatNull } from "../FormatNull.js"
import { formatPrice } from "../formatPrice.js"

export function FormatPrice(props: { price?: number | null | string; className?: ComponentProps<"div">["className"] }) {
    if (props.price === undefined || props.price === null) {
        return <FormatNull />
    }
    const price = Number(props.price)
    const processedPrice = Math.abs(price) < 0.009 ? 0 : price
    return (
        <span
            className={cx(
                css({
                    width: "fit",
                    maxWidth: "100%",
                    fontSize: "sm",
                    fontFamily: "mono",
                }),
                processedPrice === 0
                    ? css({
                          color: "neutral/25",
                      })
                    : undefined,
                props.className,
            )}
        >
            {processedPrice < 0
                ? `-${formatPrice({
                      price: Math.abs(processedPrice),
                  })}`
                : formatPrice({
                      price: Math.abs(processedPrice),
                  })}
        </span>
    )
}
