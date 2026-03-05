import {
    readAllAccountsRouteDefinition,
    readAllJournalsRouteDefinition,
    type readAllRecordRowsRouteDefinition,
    type readAllRecordsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconDownload } from "@tabler/icons-react"
import { type JSX, useMemo, useState } from "react"
import * as v from "valibot"
import { formatDate } from "../../../../components/formats/formatDate.js"
import { formatPrice } from "../../../../components/formats/formatPrice.js"
import { FormControl } from "../../../../components/forms/formControl.js"
import { FormError } from "../../../../components/forms/formError.js"
import { FormField } from "../../../../components/forms/formField.js"
import { FormGroup } from "../../../../components/forms/formGroup.js"
import { FormItem } from "../../../../components/forms/formItem.js"
import { FormLabel } from "../../../../components/forms/formLabel.js"
import { FormRoot } from "../../../../components/forms/formRoot.js"
import { InputDataCombobox } from "../../../../components/inputs/inputDataCombobox.js"
import { InputDate } from "../../../../components/inputs/inputDate.js"
import { Drawer } from "../../../../components/overlays/drawer/drawer.js"
import { toast } from "../../../../contexts/toasts/useToast.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"

export function ExportRecordRows(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    records: v.InferOutput<typeof readAllRecordsRouteDefinition.schemas.return>
    recordRows: v.InferOutput<typeof readAllRecordRowsRouteDefinition.schemas.return>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    const recordsMap = useMemo(() => {
        return new Map(props.records.map((r) => [r.id, r]))
    }, [props.records])

    function escapeCsvValue(value: string): string {
        if (value.includes(";") || value.includes('"') || value.includes("\n")) {
            return `"${value.replace(/"/g, '""')}"`
        }
        return value
    }

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Exporter les mouvements" />
                <Drawer.Body>
                    <FormRoot
                        schema={v.object({
                            idJournal: v.nullable(v.pipe(v.string())),
                            idAccount: v.nullable(v.pipe(v.string())),
                            dateFrom: v.nullable(v.pipe(v.string())),
                            dateTo: v.nullable(v.pipe(v.string())),
                        })}
                        defaultValues={{
                            idJournal: null,
                            idAccount: null,
                            dateFrom: null,
                            dateTo: null,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconDownload />,
                            text: "Exporter en CSV",
                        }}
                        onSubmit={async (data) => {
                            const filteredRows = props.recordRows.filter((row) => {
                                const record = recordsMap.get(row.idRecord)
                                if (!record) return false

                                if (data.idJournal && record.idJournal !== data.idJournal) return false
                                if (data.idAccount && row.idAccount !== data.idAccount) return false
                                if (data.dateFrom && record.date < data.dateFrom) return false
                                if (data.dateTo && record.date > data.dateTo) return false

                                return true
                            })

                            if (filteredRows.length === 0) {
                                toast({ title: "Aucun mouvement à exporter", variant: "warning" })
                                return false
                            }

                            const accountsResponse = await getResponseBodyFromAPI({
                                routeDefinition: readAllAccountsRouteDefinition,
                                body: { idYear: props.idYear },
                            })
                            const journalsResponse = await getResponseBodyFromAPI({
                                routeDefinition: readAllJournalsRouteDefinition,
                                body: { idYear: props.idYear },
                            })

                            if (!accountsResponse.ok || !journalsResponse.ok) {
                                toast({ title: "Impossible de charger les données", variant: "error" })
                                return false
                            }

                            const accountsMap = new Map(
                                accountsResponse.data.map((a) => [a.id, { number: a.number, label: a.label }]),
                            )
                            const journalsMap = new Map(
                                journalsResponse.data.map((j) => [j.id, { code: j.code, label: j.label }]),
                            )

                            const headers = [
                                "Date",
                                "Code journal",
                                "Libellé journal",
                                "Libellé écriture",
                                "N° compte",
                                "Libellé compte",
                                "Libellé mouvement",
                                "Débit",
                                "Crédit",
                            ]

                            const rows = filteredRows
                                .map((row) => {
                                    const record = recordsMap.get(row.idRecord)
                                    if (!record) return null

                                    const account = accountsMap.get(row.idAccount)
                                    const journal = record.idJournal ? journalsMap.get(record.idJournal) : null

                                    return [
                                        formatDate(record.date) ?? "",
                                        journal?.code ?? "",
                                        journal?.label ?? "",
                                        record.label,
                                        account?.number ?? "",
                                        account?.label ?? "",
                                        row.label ?? "",
                                        formatPrice({ price: row.debit }),
                                        formatPrice({ price: row.credit }),
                                    ].map(escapeCsvValue)
                                })
                                .filter((row) => row !== null)

                            const csvContent = [
                                headers.map(escapeCsvValue).join(";"),
                                ...rows.map((r) => r.join(";")),
                            ].join("\n")

                            const BOM = "\uFEFF"
                            const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
                            const url = URL.createObjectURL(blob)
                            const link = document.createElement("a")
                            link.href = url
                            link.download = `ecritures-${new Date().toISOString().slice(0, 10)}.csv`
                            link.click()
                            URL.revokeObjectURL(url)

                            toast({ title: `${filteredRows.length} mouvements exportés`, variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <FormGroup title="Filtres">
                                <FormField
                                    control={form.control}
                                    name="idJournal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Journal"
                                                isRequired={false}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllJournalsRouteDefinition}
                                                    body={{
                                                        idYear: props.idYear,
                                                    }}
                                                    placeholder="Tous les journaux"
                                                    getOption={(journal) => ({
                                                        key: journal.id,
                                                        label: `(${journal.code}) ${journal.label ?? ""}`,
                                                    })}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idAccount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Compte"
                                                isRequired={false}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllAccountsRouteDefinition}
                                                    body={{
                                                        idYear: props.idYear,
                                                    }}
                                                    placeholder="Tous les comptes"
                                                    getOption={(account) => ({
                                                        key: account.id,
                                                        label: `${account.number} - ${account.label}`,
                                                    })}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dateFrom"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Date de début"
                                                isRequired={false}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputDate value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dateTo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Date de fin"
                                                isRequired={false}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputDate value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                            </FormGroup>
                        )}
                    </FormRoot>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
