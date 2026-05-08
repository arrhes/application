import { sva } from "@arrhes/ui/css"
import { IconAlertTriangle, IconBulb, IconCircleCheck, IconInfoCircle } from "@tabler/icons-react"
import type { ComponentType, ReactNode } from "react"

const docTipRecipe = sva({
    slots: ["container", "header", "iconWrapper", "icon", "label", "content"],
    base: {
        container: {
            padding: "1.25rem",
            borderRadius: "lg",
            border: "1px solid",
            // borderLeft: "3px solid",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        header: {
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
        },
        iconWrapper: {
            width: "0.875rem",
            height: "0.875rem",
            flexShrink: 0,
        },
        icon: {
            width: "100%",
            height: "100%",
        },
        label: {
            fontSize: "xs",
            fontWeight: "medium",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
        },
        content: {
            fontSize: "sm",
            color: "neutral/70",
            lineHeight: "1.6",
            display: "inline-block",
        },
    },
    variants: {
        variant: {
            tip: {
                container: {
                    backgroundColor: "warning/5",
                    borderColor: "warning/20",
                },
                icon: { stroke: "warning" },
                label: { color: "warning" },
            },
            warning: {
                container: {
                    backgroundColor: "error/5",
                    borderColor: "error/20",
                },
                icon: { stroke: "error" },
                label: { color: "error" },
            },
            info: {
                container: {
                    backgroundColor: "information/5",
                    borderColor: "information/20",
                },
                icon: { stroke: "information" },
                label: { color: "information" },
            },
            success: {
                container: {
                    backgroundColor: "success/5",
                    borderColor: "success/20",
                },
                icon: { stroke: "success" },
                label: { color: "success" },
            },
            neutral: {
                container: {
                    backgroundColor: "white",
                    borderColor: "neutral/15",
                },
                icon: { stroke: "neutral/50" },
                label: { color: "neutral/50" },
            },
        },
    },
    defaultVariants: {
        variant: "tip",
    },
})

const variantIcons = {
    tip: IconBulb,
    warning: IconAlertTriangle,
    info: IconInfoCircle,
    success: IconCircleCheck,
    neutral: IconInfoCircle,
} as const

const variantLabels = {
    tip: "Conseil",
    warning: "Attention",
    info: "Information",
    success: "Félicitations",
    neutral: "Note",
} as const

export function DocTip(props: {
    variant?: "tip" | "warning" | "info" | "success" | "neutral"
    title?: string
    icon?: ComponentType<{ className?: string }>
    children: ReactNode
}) {
    const variant = props.variant ?? "tip"
    const classes = docTipRecipe({ variant })
    const Icon = props.icon ?? variantIcons[variant]
    const label = props.title ?? variantLabels[variant]

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.iconWrapper}>
                    <Icon className={classes.icon} />
                </div>
                <span className={classes.label}>{label}</span>
            </div>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}
