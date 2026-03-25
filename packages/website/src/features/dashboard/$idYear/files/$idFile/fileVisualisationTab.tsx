import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { fileLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/files/$idFile/fileLayoutRoute.tsx"
import { FileData } from "./fileData.tsx"
import { FileFile } from "./fileFile.tsx"

export function FileVisualisationTab() {
    const params = useParams({ from: fileLayoutRoute.id })

    return (
        <FileData idOrganization={params.idOrganization} idYear={params.idYear} idFile={params.idFile}>
            {(file) => {
                return (
                    <Section.Item className={css({ flexDirection: "column" })}>
                        <FileFile file={file} />
                    </Section.Item>
                )
            }}
        </FileData>
    )
}
