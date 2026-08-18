import { css } from "@comptasse/ui/utilities/cn.js"
import { IconLoader2, IconSearch } from "@tabler/icons-react"

export function SearchBar(props: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    ariaLabel?: string
    isLoading?: boolean
    type?: "search" | "text"
    autoComplete?: string
    onFocus?: () => void
}) {
    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                border: "1px solid",
                borderRadius: "md",
                borderColor: "neutral/20",
                _focusWithin: {
                    borderColor: "neutral/50",
                    boxShadow: "inset",
                },
                padding: "0.5rem",
                boxSizing: "border-box",
            })}
        >
            {props.isLoading ? (
                <IconLoader2
                    className={css({
                        minWidth: "1rem",
                        width: "1rem",
                        minHeight: "1rem",
                        height: "1rem",
                        stroke: "primary",
                        flexShrink: 0,
                        animation: "spin 1s linear infinite",
                    })}
                />
            ) : (
                <IconSearch
                    className={css({
                        minWidth: "1rem",
                        width: "1rem",
                        minHeight: "1rem",
                        height: "1rem",
                        stroke: "neutral/50",
                        flexShrink: 0,
                    })}
                />
            )}
            <input
                type={props.type ?? "search"}
                aria-label={props.ariaLabel}
                autoComplete={props.autoComplete}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                onFocus={props.onFocus}
                className={css({
                    flex: 1,
                    fontSize: "0.875rem",
                    lineHeight: "1rem",
                    fontWeight: "400",
                    backgroundColor: "transparent",
                    _placeholder: {
                        color: "neutral/25",
                    },
                    outline: "none",
                    minWidth: 0,
                })}
            />
        </div>
    )
}
