import { sva } from "@arrhes/ui/css"
import { cx } from "@arrhes/ui/utilities/cn.js"
import { IconAlertHexagon, IconAlertTriangle, IconCircleCheck, IconInfoSquare } from "@tabler/icons-react"
import type { ComponentProps, ReactElement } from "react"

const bannerRecipe = sva({
    slots: ["container", "header", "icon", "title", "text"],
    base: {
        container: {
            width: "100%",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
            gap: "0.5rem",
            borderRadius: "lg",
            border: "1px solid",
        },
        header: {
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
        },
        icon: {
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
        },
        title: {
            fontSize: "sm",
            fontWeight: "semibold",
            lineHeight: "1.5",
        },
        text: {
            fontSize: "sm",
            lineHeight: "1.5",
        },
    },
    variants: {
        variant: {
            neutral: {
                container: {
                    backgroundColor: "background",
                    borderColor: "neutral/15",
                },
                icon: { stroke: "neutral" },
                title: { color: "neutral" },
                text: { color: "neutral" },
            },
            information: {
                container: {
                    backgroundColor: "information/5",
                    borderColor: "information/15",
                },
                icon: { stroke: "information" },
                title: { color: "information" },
                text: { color: "information" },
            },
            error: {
                container: {
                    backgroundColor: "error/5",
                    borderColor: "error/15",
                },
                icon: { stroke: "error" },
                title: { color: "error" },
                text: { color: "error" },
            },
            warning: {
                container: {
                    backgroundColor: "warning/5",
                    borderColor: "warning/15",
                },
                icon: { stroke: "warning" },
                title: { color: "warning" },
                text: { color: "warning" },
            },
            success: {
                container: {
                    backgroundColor: "success/5",
                    borderColor: "success/15",
                },
                icon: { stroke: "success" },
                title: { color: "success" },
                text: { color: "success" },
            },
        },
    },
    defaultVariants: {
        variant: "neutral",
    },
})

const variantIcons = {
    neutral: null,
    information: IconInfoSquare,
    error: IconAlertTriangle,
    warning: IconAlertHexagon,
    success: IconCircleCheck,
} as const

const variantTitles = {
    neutral: null,
    information: "Information",
    error: "Erreur",
    warning: "Attention",
    success: "Succès",
} as const

type BannerVariant = "neutral" | "information" | "error" | "warning" | "success"

export function Banner(props: {
    title?: string | null
    variant?: BannerVariant
    className?: ComponentProps<"div">["className"]
    children?: ReactElement | string | null | Array<ReactElement | string | null>
}) {
    const variant = props.variant ?? "neutral"
    const classes = bannerRecipe({ variant })
    const Icon = variantIcons[variant]
    const title = props.title === undefined ? variantTitles[variant] : props.title

    return (
        <div className={cx(classes.container, props.className)}>
            {(Icon || title) && (
                <div className={classes.header}>
                    {Icon && <Icon className={classes.icon} size={16} />}
                    {title && <span className={classes.title}>{title}</span>}
                </div>
            )}
            <span className={classes.text}>{props.children}</span>
        </div>
    )
}
