import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDatabase, IconEye, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react"
import { Suspense } from "react"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SubPageContent } from "../../../../../components/layouts/subPageContent.tsx"
import { DeleteOneFile } from "./deleteOneFile.tsx"
import { FileData } from "./fileData.tsx"
import { FileMetadataTab } from "./fileMetadataTab.tsx"
import { FilePage } from "./filePage.tsx"
import { FileVisualisationTab } from "./fileVisualisationTab.tsx"
import { UpdateOneFile } from "./updateOneFile.tsx"

export function FileTabContent(props: { idOrganization: string; idFile: string }) {
    return (
        <Page.Root>
            <Page.Content>
                <FileData
                    idOrganization={props.idOrganization}
                    idFile={props.idFile}
                >
                    {(file) => (
                        <>
                            <div
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                })}
                            >
                                <UpdateOneFile file={file}>
                                    <div>
                                        <ButtonPlainContent
                                            leftIcon={<IconPencil />}
                                            text="Modifier"
                                        />
                                    </div>
                                </UpdateOneFile>
                                <DeleteOneFile file={file}>
                                    <div>
                                        <ButtonOutlineContent
                                            leftIcon={<IconTrash />}
                                            title="Supprimer"
                                            color="danger"
                                        />
                                    </div>
                                </DeleteOneFile>
                            </div>
                            <SubPageContent
                                defaultKey="informations"
                                sections={{
                                    main: {
                                        items: [
                                            {
                                                key: "informations",
                                                label: "Informations",
                                                icon: <IconInfoCircle />,
                                                content: (
                                                    <Suspense fallback={null}>
                                                        <FilePage
                                                            idOrganization={props.idOrganization}
                                                            idFile={props.idFile}
                                                        />
                                                    </Suspense>
                                                ),
                                            },
                                            {
                                                key: "métadonnées",
                                                label: "Métadonnées",
                                                icon: <IconDatabase />,
                                                content: (
                                                    <Suspense fallback={null}>
                                                        <FileMetadataTab
                                                            idOrganization={props.idOrganization}
                                                            idFile={props.idFile}
                                                        />
                                                    </Suspense>
                                                ),
                                            },
                                            {
                                                key: "visualisation",
                                                label: "Visualisation",
                                                icon: <IconEye />,
                                                content: (
                                                    <Suspense fallback={null}>
                                                        <FileVisualisationTab
                                                            idOrganization={props.idOrganization}
                                                            idFile={props.idFile}
                                                        />
                                                    </Suspense>
                                                ),
                                            },
                                        ],
                                    },
                                }}
                            />
                        </>
                    )}
                </FileData>
            </Page.Content>
        </Page.Root>
    )
}
