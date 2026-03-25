import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { FormatDateTime } from "../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { fileLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/files/$idFile/fileLayoutRoute.tsx"
import { FileData } from "./fileData.tsx"

export function FileMetadataTab() {
    const params = useParams({ from: fileLayoutRoute.id })

    return (
        <FileData idOrganization={params.idOrganization} idYear={params.idYear} idFile={params.idFile}>
            {(file) => {
                return (
                    <Section.Item className={css({ flexDirection: "column" })}>
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
