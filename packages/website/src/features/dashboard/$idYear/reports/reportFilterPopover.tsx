import {
    Button,
    ButtonGhostContent,
    ButtonOutlineContent,
    ButtonPlainContent,
    InputCombobox,
    InputComboboxMultiple,
    Separator,
} from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconFilter, IconX } from "@tabler/icons-react"
import { Popover } from "../../../../components/overlays/popover/popover.js"

export function ReportFilterPopover(props: {
    selectedJournalId: string | null
    onJournalChange: (value: string | null) => void
    journalOptions: Array<{ key: string; label: string }>
    selectedTags: Array<{ key: string; label: string }>
    onTagsChange: (values: Array<{ key: string; label: string }>) => void
    tagOptions: Array<{ key: string; label: string }>
}) {
    const activeFilterCount = (props.selectedJournalId ? 1 : 0) + (props.selectedTags.length > 0 ? 1 : 0)

    function handleClearAll() {
        props.onJournalChange(null)
        props.onTagsChange([])
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button>
                    {activeFilterCount > 0 ? (
                        <ButtonPlainContent
                            leftIcon={<IconFilter />}
                            text={`Filtrer (${activeFilterCount})`}
                        />
                    ) : (
                        <ButtonOutlineContent leftIcon={<IconFilter />} text="Filtrer" />
                    )}
                </Button>
            </Popover.Trigger>
            <Popover.Content
                align="end"
                className={css({
                    width: "320px",
                    maxHeight: "500px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    padding: "0.5rem",
                })}
            >
                <Button
                    onClick={handleClearAll}
                    className={css({ width: "100%" })}
                    isDisabled={activeFilterCount === 0}
                >
                    <ButtonGhostContent
                        color="danger"
                        leftIcon={<IconX />}
                        text="Effacer les filtres"
                        className={css({ width: "100%", justifyContent: "start" })}
                        isDisabled={activeFilterCount === 0}
                    />
                </Button>
                <Separator />
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        })}
                    >
                        <span
                            className={css({
                                fontSize: "xs",
                                fontWeight: "medium",
                                textTransform: "uppercase",
                                color: "neutral/50",
                            })}
                        >
                            Journal
                        </span>
                        <InputCombobox
                            value={props.selectedJournalId}
                            onChange={(value) => props.onJournalChange(value ?? null)}
                            options={props.journalOptions}
                            allowEmpty
                            isLoading={false}
                            placeholder="Sélectionner un journal"
                        />
                    </div>
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        })}
                    >
                        <span
                            className={css({
                                fontSize: "xs",
                                fontWeight: "medium",
                                textTransform: "uppercase",
                                color: "neutral/50",
                            })}
                        >
                            Catégorie{props.selectedTags.length === 0 ? "" : "s"}
                        </span>
                        <InputComboboxMultiple
                            selectedOptions={props.selectedTags}
                            onChange={props.onTagsChange}
                            options={props.tagOptions}
                            placeholder="Sélectionner des catégories"
                        />
                    </div>
                </div>
            </Popover.Content>
        </Popover.Root>
    )
}
