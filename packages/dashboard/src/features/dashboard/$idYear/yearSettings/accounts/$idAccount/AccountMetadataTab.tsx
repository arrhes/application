import { readOneAccountRouteDefinition } from "@comptasse/application-metadata/routes"
import { FormatDateTime, FormatText } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../components/layouts/DataWrapper.tsx"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"

export function AccountMetadataTab() {
    const params = useParams({
        strict: false,
    }) as {
        idYear: string
        idAccount: string
    }

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
                    <Section.Item
                        className={css({
                            flexDirection: "column",
                        })}
                    >
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
