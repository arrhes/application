import { FormatDateTime, FormatText } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataBlock } from "../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { FileData } from "./FileData.tsx"

export function FileMetadataTab(props: { idOrganization?: string; idFile?: string } = {}) {
    const params = useParams({
        strict: false,
    })
    const idOrganization = props.idOrganization ?? params.idOrganization ?? ""
    const idFile = props.idFile ?? params.idFile ?? ""

    return (
        <FileData
            idOrganization={idOrganization}
            idFile={idFile}
        >
            {(file) => {
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
                                    <FormatDateTime date={file.createdAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Modifié le">
                                    <FormatDateTime date={file.lastUpdatedAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Id">
                                    <FormatText>{file.id}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </FileData>
    )
}
