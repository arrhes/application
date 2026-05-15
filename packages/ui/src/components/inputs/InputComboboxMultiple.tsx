import { IconChevronDown, IconX } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { css, cx } from "../../utilities/cn.js"
import { debounce } from "../../utilities/debounce.js"
import { Button } from "../buttons/Button.js"
import { ButtonGhostContent } from "../buttons/ButtonGhostContent.js"
import { ButtonOutlineContent } from "../buttons/ButtonOutlineContent.js"
import { FormatNull } from "../formats/FormatNull.js"
import { CircularLoader } from "../layouts/CircularLoader.js"
import { Virtualizer } from "../layouts/Virtualizer.js"
import { Popover } from "../overlays/popover/popover.js"
import { InputText } from "./InputText.js"

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
    const [rawQuery, setRawQuery] = useState<string | null | undefined>(undefined)
    const [currentOptions, setCurrentOptions] = useState<
        Array<{
            key: TValue
            label: string
        }>
    >([])

    const handleUnselect = (index: number) =>
        props.onChange([
            ...props.selectedOptions.slice(0, index),
            ...props.selectedOptions.slice(index + 1),
        ])

    const availableOptions = props.options.filter((option) => !props.selectedOptions.some((x) => x.key === option.key))

    useEffect(() => {
        debounce({
            function: () => {
                setCurrentOptions(
                    rawQuery === null || rawQuery === undefined || rawQuery === ""
                        ? availableOptions
                        : availableOptions.filter((x) => x.label.toLowerCase().includes(rawQuery.toLowerCase())),
                )
            },
        })
    }, [
        rawQuery,
        availableOptions,
    ])

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
                gap: "0.5rem",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    padding: "0.5rem",
                    width: "100%",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "neutral/20",
                    _disabled: {
                        cursor: "not-allowed",
                        opacity: "50",
                    },
                    maxHeight: "256px",
                    overflowY: "auto",
                })}
            >
                {props.selectedOptions.length === 0 ? (
                    <FormatNull text={props.emptyLabel ?? "Aucune sélection"} />
                ) : (
                    props.selectedOptions.map((option, index) => (
                        <div
                            key={option.key}
                            className={css({
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "0.5rem",
                                borderRadius: "md",
                            })}
                        >
                            <span
                                className={css({
                                    padding: "0.5rem",
                                    fontSize: "sm",
                                })}
                            >
                                {option.label}
                            </span>
                            <Button onClick={() => handleUnselect(index)}>
                                <ButtonGhostContent leftIcon={<IconX />} />
                            </Button>
                        </div>
                    ))
                )}
            </div>
            <Popover.Root
                open={open}
                onOpenChange={setOpen}
                modal
            >
                <Popover.Trigger asChild>
                    <Button
                        role="combobox"
                        data-open={open}
                        className={cx(
                            css({
                                width: "100%",
                            }),
                            props.isDisabled
                                ? css({
                                      cursor: "not-allowed",
                                  })
                                : "",
                        )}
                        onClick={() => {
                            if (props.isDisabled) return
                            setOpen(!open)
                        }}
                        autoFocus={props.autoFocus}
                        isDisabled={props.isDisabled}
                    >
                        <ButtonOutlineContent
                            text={props.placeholder}
                            rightIcon={<IconChevronDown />}
                            className={cx(
                                css({
                                    width: "100%",
                                    justifyContent: "space-between",
                                    _hover: {
                                        borderColor: "neutral/50",
                                    },
                                    _focusWithin: {
                                        borderColor: "neutral/50",
                                        boxShadow: "inset",
                                    },
                                }),
                                css({
                                    "& span": {
                                        color: "neutral/50",
                                    },
                                }),
                            )}
                        />
                    </Button>
                </Popover.Trigger>
                {!open ? null : (
                    <Popover.Content
                        align="start"
                        className={css({
                            padding: "0.5rem",
                        })}
                    >
                        <InputText
                            value={rawQuery}
                            onChange={(value) => setRawQuery(value)}
                        />
                        <div
                            className={css({
                                height: "fit-content",
                                maxHeight: "256px",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                gap: "0.125rem",
                            })}
                        >
                            {props.loading === true ? <CircularLoader /> : null}
                            {currentOptions.length > 0 ? null : (
                                <FormatNull
                                    text="Pas de résultat"
                                    className={css({
                                        padding: "0.5rem",
                                    })}
                                />
                            )}
                            <Virtualizer data={currentOptions}>
                                {(option) => (
                                    <Button
                                        key={option.key}
                                        className={css({
                                            width: "100%",
                                        })}
                                        onClick={() => {
                                            if (props.isDisabled) return
                                            props.onChange([
                                                ...props.selectedOptions,
                                                option,
                                            ])
                                            setOpen(false)
                                        }}
                                    >
                                        <ButtonGhostContent
                                            text={option.label}
                                            className={css({
                                                width: "100%",
                                                justifyContent: "space-between",
                                            })}
                                        />
                                    </Button>
                                )}
                            </Virtualizer>
                        </div>
                    </Popover.Content>
                )}
            </Popover.Root>
        </div>
    )
}
