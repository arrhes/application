import { Button, ButtonGhostContent, CircularLoader } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconCheck, IconSelector, IconX } from "@tabler/icons-react"
import { CommandEmpty, CommandLoading } from "cmdk"
import { Fragment, useState } from "react"
import { FormatNull } from "../formats/formatNull.js"
import { Command, CommandInput, CommandItem, CommandList } from "../layouts/command.js"
import { Popover } from "../overlays/popover/popover.js"

type InputComboboxMultiple<TValue extends string> = {
    placeholder: string
    emptyLabel?: string
    options: Array<{
        key: TValue
        label: string
    }>
    selectedOptions: Array<{
        key: TValue
        label: string
    }>
    onChange: (
        newValues: Array<{
            key: TValue
            label: string
        }>,
    ) => void
    className?: string
    autoFocus?: boolean
    loading?: boolean
    isDisabled?: boolean
}

export function InputComboboxMultiple<TValue extends string>(props: InputComboboxMultiple<TValue>) {
    const [open, setOpen] = useState(false)

    const handleUnselect = (index: number) =>
        props.onChange([...props.selectedOptions.slice(0, index), ...props.selectedOptions.slice(index + 1)])

    const options = props.options.filter((option) => !props.selectedOptions.some((x) => x.key === option.key))

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
                gap: "1",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    padding: "1rem",
                    width: "100%",
                    borderRadius: "md",
                    border: "1px solid",
                    borderColor: "neutral/20",
                    _disabled: { cursor: "not-allowed", opacity: "50" },
                    maxH: "256px",
                    overflowY: "auto",
                    minH: "40px",
                })}
            >
                {props.selectedOptions.length === 0 ? (
                    <div
                        className={css({
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        })}
                    >
                        <FormatNull text={props.emptyLabel ?? "Nothing selected"} />
                    </div>
                ) : (
                    props.selectedOptions.map((option, index) => (
                        <Fragment key={option.key}>
                            <div
                                className={css({
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    borderRadius: "md",
                                })}
                            >
                                <span className={css({ padding: "1rem", fontSize: "sm" })}>{option.label}</span>
                                <Button onClick={() => handleUnselect(index)}>
                                    <ButtonGhostContent leftIcon={<IconX />} />
                                </Button>
                            </div>
                        </Fragment>
                    ))
                )}
            </div>
            <Popover.Root open={open} onOpenChange={setOpen} modal>
                <Popover.Trigger asChild>
                    <Button
                        role="combobox"
                        data-open={open}
                        className={css({ width: "100%" })}
                        onClick={() => {
                            if (props.isDisabled) return
                            setOpen(!open)
                        }}
                        autoFocus={props.autoFocus}
                    >
                        <div
                            className={cx(
                                css({
                                    width: "100%",
                                    height: "32px",
                                    display: "grid",
                                    gridTemplateColumns: "auto min-content",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "1rem",
                                    border: "1px solid",
                                    borderColor: "neutral/20",
                                    borderRadius: "md",
                                    _hover: { borderColor: "neutral/30" },
                                    _focusWithin: { borderColor: "neutral/50", boxShadow: "inset" },
                                }),
                            )}
                        >
                            <span
                                className={css({
                                    width: "100%",
                                    height: "fit-content",
                                    textAlign: "left",
                                    color: "neutral/50",
                                    fontSize: "sm",
                                })}
                            >
                                {props.placeholder}
                            </span>
                            <IconSelector
                                className={css({ height: "4", width: "4", flexShrink: "0", opacity: "50" })}
                            />
                        </div>
                    </Button>
                </Popover.Trigger>
                {!open ? null : (
                    <Popover.Content align="start">
                        <Command
                            className={cx(css({ width: "100%" }), props.className)}
                            filter={(value, search) => {
                                const option = options?.find((x) => x.key === value)?.label.toLowerCase()
                                if (option?.includes(search.toLowerCase())) return 1
                                return 0
                            }}
                        >
                            <CommandInput />
                            {props.loading === true ? (
                                <CommandLoading>
                                    <CircularLoader />
                                </CommandLoading>
                            ) : null}
                            <CommandList
                                className={css({
                                    maxH: "256px",
                                    overflowY: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "stretch",
                                })}
                            >
                                <CommandEmpty>
                                    <div
                                        className={css({
                                            position: "relative",
                                            height: "40px",
                                            padding: "3",
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            cursor: "default",
                                            userSelect: "none",
                                            borderRadius: "md",
                                            outline: "none",
                                            _disabled: { pointerEvents: "none", opacity: "50" },
                                        })}
                                    >
                                        <span
                                            className={css({
                                                color: "neutral/10",
                                                textAlign: "left",
                                                fontStyle: "italic",
                                                fontSize: "sm",
                                            })}
                                        >
                                            No result
                                        </span>
                                    </div>
                                </CommandEmpty>
                                {options.map((option) => {
                                    const isSelected = !!props.selectedOptions.find((x) => x.key === option.key)
                                    return (
                                        <CommandItem
                                            key={option.key}
                                            value={option.key}
                                            onSelect={() => {
                                                if (props.isDisabled) return
                                                props.onChange(
                                                    isSelected
                                                        ? props.selectedOptions.filter((x) => x.key !== option.key)
                                                        : [...props.selectedOptions, option],
                                                )
                                                setOpen(false)
                                            }}
                                            className={cx(
                                                css({
                                                    padding: "3",
                                                    height: "40px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    overflowY: "auto",
                                                    gap: "3",
                                                }),
                                                isSelected
                                                    ? css({ backgroundColor: "neutral/10" })
                                                    : css({
                                                          backgroundColor: "none",
                                                          _hover: { backgroundColor: "neutral/5" },
                                                      }),
                                            )}
                                        >
                                            <span className={css({ fontSize: "sm", color: "neutral" })}>
                                                {option.label}
                                            </span>
                                            <IconCheck
                                                className={cx(
                                                    css({ height: "4", width: "4", stroke: "neutral" }),
                                                    isSelected ? css({ opacity: "100" }) : css({ opacity: "0" }),
                                                )}
                                            />
                                        </CommandItem>
                                    )
                                })}
                            </CommandList>
                        </Command>
                    </Popover.Content>
                )}
            </Popover.Root>
        </div>
    )
}
