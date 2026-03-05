import { Button, ButtonGhostContent, ButtonOutlineContent, CircularLoader } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import { type InputHTMLAttributes, useState } from "react"
import type { FieldError } from "react-hook-form"
import { FormatNull } from "../formats/formatNull.js"
import { Popover } from "../overlays/popover/popover.js"

export function InputSelect<TValue extends string>(
    props: Omit<InputHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> & {
        error?: FieldError
        value?: TValue | null
        defaultValue?: TValue | null
        onChange?: (value?: TValue | null | undefined) => void
        options:
            | Array<{
                  key: TValue
                  label: string
              }>
            | undefined
        autoFocus?: boolean
        allowEmpty?: boolean
        isDisabled?: boolean
        isLoading?: boolean
    },
) {
    const [open, setOpen] = useState(false)

    function input(value: TValue | null | undefined) {
        return value
    }

    function output(value: TValue | undefined | null) {
        if (!value) return null
        return value
    }

    const currentOption = props.options?.find((x) => x.key === input(props.value ?? props.defaultValue))
    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <Button
                    autoFocus={props.autoFocus}
                    onClick={() => {
                        if (props.isDisabled === true) return
                        setOpen(!open)
                    }}
                    className={cx(
                        css({ width: "100%" }),
                        "group",
                        css(props.isDisabled ? { cursor: "not-allowed" } : {}),
                        props.className,
                    )}
                    data-open={open}
                >
                    <ButtonOutlineContent
                        text={
                            currentOption === undefined
                                ? (props.placeholder ?? "Veuiller choisir une option")
                                : currentOption.label
                        }
                        rightIcon={<IconChevronDown />}
                        className={cx(
                            css({
                                width: "100%",
                                justifyContent: "space-between",
                                _hover: { borderColor: "neutral/50" },
                                _focusWithin: { borderColor: "neutral/50", boxShadow: "inset" },
                            }),
                            props.error !== undefined ? css({ borderColor: "error" }) : "",
                            currentOption === undefined ? css({ "& span": { color: "neutral/50" } }) : "",
                        )}
                    />
                </Button>
            </Popover.Trigger>
            <Popover.Content align="start">
                <div
                    className={css({
                        height: "fit-content",
                        maxHeight: "256px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                    })}
                >
                    {props.isLoading === true ? (
                        <CircularLoader text="Chargement des options..." />
                    ) : props.options === undefined || props.options.length === 0 ? (
                        <FormatNull text="Pas d'options" />
                    ) : (
                        props.options.map((option) => {
                            const isSelected = currentOption?.key === option.key
                            return (
                                <Button
                                    key={option.key}
                                    onClick={() => {
                                        if (props.isDisabled === true) return
                                        if (props.onChange === undefined) return
                                        if (props.allowEmpty === true && option.key === props.value) {
                                            props.onChange(undefined)
                                            setOpen(false)
                                            return
                                        }
                                        props.onChange(output(option.key))
                                        setOpen(false)
                                    }}
                                    className={css({ width: "100%" })}
                                >
                                    <ButtonGhostContent
                                        text={option.label}
                                        rightIcon={isSelected ? <IconCheck /> : undefined}
                                        className={cx(
                                            css({ width: "100%", justifyContent: "space-between" }),
                                            isSelected ? css({ backgroundColor: "background" }) : "",
                                        )}
                                        isCurrent={isSelected}
                                    />
                                </Button>
                            )
                        })
                    )}
                </div>
            </Popover.Content>
        </Popover.Root>
    )
}
