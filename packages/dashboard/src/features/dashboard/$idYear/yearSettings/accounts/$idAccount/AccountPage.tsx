import { readOneAccountRouteDefinition } from "@arrhes/application-metadata/routes"
import { FormatBoolean, FormatText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../components/layouts/DataWrapper.tsx"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"

export function AccountPage() {
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
                            <DataBlock.Header title="Informations" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Numéro">
                                    <FormatText>{account.number.toString()}</FormatText>
                                </DataBlock.Item>
                                <DataBlock.Item label="Libellé">
                                    <FormatText>{account.label}</FormatText>
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
