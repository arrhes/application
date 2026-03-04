import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { Dialog, DialogContent, type DialogProps } from "@radix-ui/react-dialog"
import { IconSearch } from "@tabler/icons-react"
import { Command as CommandPrimitive } from "cmdk"
import * as React from "react"

export const Command = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
    <CommandPrimitive
        ref={ref}
        className={cx(
            css({
                display: "flex",
                height: "100%",
                width: "100%",
                flexDirection: "column",
                overflowY: "auto",
                borderRadius: "inherit",
                backgroundColor: "white",
            }),
            className,
        )}
        {...props}
    />
))

interface CommandDialogProps extends DialogProps {}

export const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
    return (
        <Dialog {...props}>
            <DialogContent
                className={css({
                    overflowY: "auto",
                    padding: "0",
                    boxShadow: "lg",
                })}
            >
                <Command
                    className={css({
                        "& [cmdk-group-heading]": {
                            px: "2",
                            fontWeight: "medium",
                            color: "slate.500",
                        },
                        "& [cmdk-group]:not([hidden])~[cmdk-group]": {
                            pt: "0",
                        },
                        "& [cmdk-group]": {
                            px: "2",
                        },
                        "& [cmdk-input-wrapper] svg": {
                            height: "5",
                            width: "5",
                        },
                        "& [cmdk-input]": {
                            height: "12",
                        },
                        "& [cmdk-item]": {
                            px: "2",
                            py: "3",
                        },
                        "& [cmdk-item] svg": {
                            height: "5",
                            width: "5",
                        },
                    })}
                >
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    )
}

export const CommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
    <div
        className={css({
            height: "40px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem",
            borderBottom: "1px solid",
            borderColor: "neutral/10",
        })}
        cmdk-input-wrapper=""
    >
        <IconSearch
            className={css({
                height: "4",
                width: "4",
                flexShrink: "0",
                opacity: "0.5",
            })}
        />
        <CommandPrimitive.Input
            ref={ref}
            className={cx(
                css({
                    display: "flex",
                    width: "100%",
                    borderRadius: "md",
                    backgroundColor: "transparent",
                    fontSize: "base",
                    outline: "none",
                    _placeholder: { color: "neutral/50" },
                    _disabled: {
                        cursor: "not-allowed",
                        opacity: "0.5",
                    },
                }),
                className,
            )}
            {...props}
        />
    </div>
))

export const CommandList = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.List
        ref={ref}
        className={cx(
            css({
                maxH: "300px",
                overflowY: "auto",
                overflowX: "hidden",
            }),
            className,
        )}
        {...props}
    />
))

export const CommandEmpty = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Empty>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => {
    // const render = useCommandState((state) => state.filtered.count === 0)

    // if (!render) return null
    return (
        <CommandPrimitive.Empty
            ref={ref}
            className={css({
                py: "6",
                textAlign: "center",
                fontSize: "sm",
            })}
            {...props}
        />
    )
})

export const CommandGroup = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
        ref={ref}
        className={cx(
            css({
                overflowY: "auto",
                color: "slate.950",
                "& [cmdk-group-heading]": {
                    px: "2",
                    py: "1.5",
                    fontSize: "xs",
                    fontWeight: "medium",
                    color: "slate.500",
                },
            }),
            className,
        )}
        {...props}
    />
))

export const CommandSeparator = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
        ref={ref}
        className={cx(
            css({
                mx: "-1",
                height: "1px",
                backgroundColor: "slate.200",
            }),
            className,
        )}
        {...props}
    />
))

export const CommandItem = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Item
        ref={ref}
        className={cx(
            css({
                position: "relative",
                display: "flex",
                cursor: "default",
                userSelect: "none",
                alignItems: "center",
                borderRadius: "sm",
                px: "2",
                py: "1.5",
                fontSize: "sm",
                outline: "none",
                _selected: {
                    backgroundColor: "slate.100",
                    color: "slate.900",
                },
                _disabled: {
                    pointerEvents: "none",
                    opacity: "0.5",
                },
            }),
            className,
        )}
        {...props}
    />
))

export const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cx(
                css({
                    ml: "auto",
                    fontSize: "xs",
                    letterSpacing: "widest",
                    color: "slate.500",
                }),
                className,
            )}
            {...props}
        />
    )
}
