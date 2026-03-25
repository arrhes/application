import { readOneAccountRouteDefinition } from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { FormatDateTime } from "../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { accountLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountLayoutRoute.tsx"

export function AccountMetadataTab() {
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
                            <DataBlock.Header title="Métadonnées" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Ajouté le">
                                    <FormatDateTime date={account.createdAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Modifié le">
                                    <FormatDateTime date={account.lastUpdatedAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Id">
                                    <FormatText>{account.id}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
