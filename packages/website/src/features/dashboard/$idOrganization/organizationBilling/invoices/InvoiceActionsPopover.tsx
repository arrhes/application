import type { returnedSchemas } from "@arrhes/application-metadata"
import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDotsVertical, IconDownload, IconEye } from "@tabler/icons-react"
import type * as v from "valibot"
import { LinkButton } from "../../../../../components/linkButton.js"
import { Popover } from "../../../../../components/overlays/popover/popover.js"
import { DownloadInvoiceAsPDFButton } from "./DownloadInvoiceAsPDFButton.tsx"
import { DownloadInvoiceAsXMLButton } from "./DownloadInvoiceAsXMLButton.tsx"

export function InvoiceActionsPopover(props: {
    idOrganization: string
    invoice: v.InferOutput<typeof returnedSchemas.invoice>
}) {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button>
                    <ButtonGhostContent
                        leftIcon={<IconDotsVertical />}
                        text={undefined}
                    />
                </Button>
            </Popover.Trigger>
            <Popover.Content
                align="end"
                className={css({
                    padding: "0.5rem",
                    minWidth: "auto",
                    gap: "0.25rem",
                })}
            >
                <LinkButton
                    to="/dashboard/organisations/$idOrganization/facturation/facture/$idInvoice"
                    params={{
                        idOrganization: props.idOrganization,
                        idInvoice: props.invoice.id,
                    }}
                    className={css({
                        width: "100%",
                    })}
                >
                    <ButtonGhostContent
                        leftIcon={<IconEye />}
                        text="Voir la facture"
                        className={css({
                            width: "100%",
                            justifyContent: "start",
                        })}
                    />
                </LinkButton>
                <DownloadInvoiceAsPDFButton
                    invoice={props.invoice}
                    className={css({
                        width: "100%",
                    })}
                >
                    <ButtonGhostContent
                        leftIcon={<IconDownload />}
                        text={props.invoice.xmlStorageKey ? "Télécharger (PDF)" : "PDF indisponible"}
                    />
                </DownloadInvoiceAsPDFButton>
                <DownloadInvoiceAsXMLButton
                    invoice={props.invoice}
                    className={css({
                        width: "100%",
                    })}
                >
                    <ButtonGhostContent
                        leftIcon={<IconDownload />}
                        text={props.invoice.xmlStorageKey ? "Télécharger (XML)" : "XML indisponible"}
                    />
                </DownloadInvoiceAsXMLButton>
            </Popover.Content>
        </Popover.Root>
    )
}
