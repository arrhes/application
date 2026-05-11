import { FormatDateTime, FormatFileSize, FormatNull, FormatText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataBlock } from "../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { fileLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/storage/$idFile/fileLayoutRoute.tsx"
import { FileData } from "./fileData.tsx"

export function FilePage() {
    const params = useParams({
        from: fileLayoutRoute.id,
    })

    return (
        <FileData
            idOrganization={params.idOrganization}
            idFile={params.idFile}
        >
            {(file) => (
                <Section.Item
                    className={css({
                        flexDirection: "column",
                    })}
                >
                    <DataBlock.Root>
                        <DataBlock.Header title="Informations" />
                        <DataBlock.Content>
                            <DataBlock.Item label="Référence">
                                <FormatText>{file.reference}</FormatText>
                            </DataBlock.Item>
                            <DataBlock.Item label="Nom">
                                <FormatText>{file.name}</FormatText>
                            </DataBlock.Item>
                            <DataBlock.Item label="Date">
                                {file.date !== null && file.date !== undefined ? (
                                    <FormatDateTime date={file.date} />
                                ) : (
                                    <FormatNull />
                                )}
                            </DataBlock.Item>
                            <DataBlock.Item label="Type">
                                <FormatText>{file.type?.split("/").at(1)}</FormatText>
                            </DataBlock.Item>
                            <DataBlock.Item label="Taille">
                                <FormatFileSize size={file.size} />
                            </DataBlock.Item>
                        </DataBlock.Content>
                    </DataBlock.Root>
                </Section.Item>
            )}
        </FileData>
    )
}
