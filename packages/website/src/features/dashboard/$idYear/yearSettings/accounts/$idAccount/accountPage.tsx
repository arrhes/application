import { readOneAccountRouteDefinition } from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { FormatBoolean } from "../../../../../../components/formats/formatBoolean.tsx"
import { FormatText } from "../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { accountLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountLayoutRoute.tsx"

export function AccountPage() {
    const params = useParams({ from: accountLayoutRoute.id })

    return (
        <DataWrapper
            routeDefinition={readOneAccountRouteDefinition}
            body={{
                idYear: params.idYear,
                idAccount: params.idAccount,
            }}
        >
            {(account) => {
                return (
                    <Section.Item className={css({ flexDirection: "column" })}>
                        <DataBlock.Root>
                            <DataBlock.Header title="Informations" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Numéro">
                                    <FormatText>{account.number.toString()}</FormatText>
                                </DataBlock.Item>
                                <DataBlock.Item label="Libellé">
                                    <FormatText>{account.label}</FormatText>
                                </DataBlock.Item>
                                <DataBlock.Item label="Classe/sous-classe ?">
                                    <FormatBoolean boolean={account.isClass} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Sélectionnable ?">
                                    <FormatBoolean boolean={account.isSelectable} />
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
