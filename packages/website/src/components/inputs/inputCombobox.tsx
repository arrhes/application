import { Button, ButtonGhostContent, ButtonOutlineContent, CircularLoader } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import { type ComponentProps, useEffect, useState } from "react"
import type { FieldError } from "react-hook-form"
import { debounce } from "../../utilities/debounce.js"
import { FormatNull } from "../formats/formatNull.js"
import { Virtualizer } from "../layouts/virtualizer.js"
import { Popover } from "../overlays/popover/popover.js"
import { InputText } from "./inputText.js"

export function InputCombobox<TValue extends string>(props: {
    error?: FieldError
    placeholder?: string
    value?: TValue | null
    defaultValue?: TValue | null
    onChange: (value?: TValue | null) => void
    options: Array<{
        key: TValue
        label: string
    }>
    isLoading?: boolean
    isDisabled?: boolean
    autoFocus?: boolean
    className?: ComponentProps<"div">["className"]
    allowEmpty?: boolean
}) {
    const [open, setOpen] = useState(false)
    const [rawQuery, setRawQuery] = useState<string | null | undefined>(undefined)
    const [currentOptions, setCurrentOptions] = useState(props.options)
    const currentOption = props.options?.find((x) => x.key === (props.value ?? props.defaultValue))

    useEffect(() => {
        debounce({
            function: () => {
                setCurrentOptions(
                    rawQuery === null || rawQuery === undefined || rawQuery === ""
                        ? props.options
                        : props.options.filter((x) => x.label.toLowerCase().includes(rawQuery.toLowerCase())),
                )
            },
        })
    }, [rawQuery, props.options])

    return (
        <Popover.Root open={open} onOpenChange={setOpen} modal>
            <Popover.Trigger asChild>
                <Button
                    role="combobox"
                    onClick={() => {
                        if (props.isDisabled) return
                        setOpen(!open)
                    }}
                    data-open={open}
                    className={cx(
                        css({ width: "100%" }),
                        props.isDisabled ? css({ cursor: "not-allowed" }) : "",
                        props.className,
                    )}
                    autoFocus={props.autoFocus}
                    isDisabled={props.isDisabled}
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
            {open === false ? null : (
                <Popover.Content align="start">
                    <InputText value={rawQuery} onChange={(value) => setRawQuery(value)} />
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
                        {props.isLoading === false ? null : <CircularLoader />}
                        {currentOptions.length > 0 ? null : (
                            <FormatNull text="Pas de résultat" className={css({ padding: "0.5rem" })} />
                        )}
                        <Virtualizer data={currentOptions}>
                            {(option) => {
                                const isSelected = currentOption?.key === option.key
                                return (
                                    <Button
                                        key={option.key}
                                        className={css({ width: "100%" })}
                                        onClick={() => {
                                            if (props.isDisabled) return
                                            if (props.allowEmpty === true && option.key === props.value) {
                                                props.onChange(undefined)
                                                setOpen(false)
                                                return
                                            }
                                            props.onChange(option.key)
                                            setOpen(false)
                                        }}
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
                            }}
                        </Virtualizer>
                    </div>
                </Popover.Content>
            )}
        </Popover.Root>
    )
}
