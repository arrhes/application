import { useVirtualizer } from "@tanstack/react-virtual"
import { type ReactElement, useRef } from "react"
import type { Styles } from "../../../styled-system/css/css"
import { cn, css } from "../../utilities/cn.js"

const containerStyle = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflowY: "auto",
})

const rowStyle = css({
    width: "100%",
})

export function Virtualizer<TData>(props: {
    data: Array<TData>
    children: (data: TData, index: number) => ReactElement | Array<ReactElement> | null
    childSize?: number
    className?: Styles
}) {
    const parentRef = useRef<HTMLDivElement | null>(null)

    const rowVirtualizer = useVirtualizer({
        count: props.data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => props.childSize ?? 45,
        measureElement: props.childSize ? undefined : (element) => element.getBoundingClientRect().height,
        overscan: 5,
    })

    return (
        <div
            ref={parentRef}
            className={cn(containerStyle, props.className)}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: `${rowVirtualizer.getTotalSize()}px`,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${rowVirtualizer.getVirtualItems()[0]?.start ?? 0}px)`,
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                        <div
                            key={virtualItem.key}
                            data-index={virtualItem.index}
                            ref={props.childSize ? undefined : rowVirtualizer.measureElement}
                            className={rowStyle}
                        >
                            {props.children(props.data[virtualItem.index], virtualItem.index)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
