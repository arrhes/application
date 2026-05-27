import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { FileData } from "./FileData.tsx"
import { FileFile } from "./FileFile.tsx"

export function FileVisualisationTab(props: { idOrganization?: string; idFile?: string } = {}) {
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
                        <FileFile file={file} />
                    </Section.Item>
                )
            }}
        </FileData>
    )
}
