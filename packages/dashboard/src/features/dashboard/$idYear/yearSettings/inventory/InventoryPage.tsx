import { ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPackage } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { CreateOneInventoryItem } from "./CreateOneInventoryItem.tsx"
import { InventoryItemsListTable } from "./InventoryItemsListTable.tsx"

export function InventoryPage({
    idOrganization: idOrganizationProp,
    idYear: idYearProp,
}: {
    idOrganization?: string
    idYear?: string
} = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
        idYear?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""
    const idYear = idYearProp ?? params.idYear ?? ""

    return (
        <Page.Root>
            <Page.Content>
                <Section.Root>
                    <Section.Item>
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <div
                                className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    color: "neutral/60",
                                    fontSize: "sm",
                                })}
                            >
                                <IconPackage size={18} />
                                <span>Suivez votre stock et vos mouvements d'inventaire.</span>
                            </div>
                            <CreateOneInventoryItem
                                idOrganization={idOrganization}
                                idYear={idYear}
                            >
                                <ButtonPlainContent
                                    leftIcon={<IconPackage />}
                                    text="Ajouter un article"
                                />
                            </CreateOneInventoryItem>
                        </div>
                        <InventoryItemsListTable
                            idOrganization={idOrganization}
                            idYear={idYear}
                        />
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}
