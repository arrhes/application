import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconDatabase, IconEye, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { Tab } from "../../../../../components/layouts/tab/tab.tsx"
import { LinkButton } from "../../../../../components/linkButton.tsx"
import { fileLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/files/$idFile/fileLayoutRoute.tsx"
import { DeleteOneFile } from "./deleteOneFile.tsx"
import { FileData } from "./fileData.tsx"
import { UpdateOneFile } from "./updateOneFile.tsx"

export function FileLayout() {
    const params = useParams({ from: fileLayoutRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <FileData idOrganization={params.idOrganization} idYear={params.idYear} idFile={params.idFile}>
                    {(file) => {
                        return (
                            <Section.Root>
                                <Section.Item>
                                    <div
                                        className={css({
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        })}
                                    >
                                        <LinkButton
                                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/stockage"
                                            params={{
                                                idOrganization: file.idOrganization,
                                                idYear: file.idYear,
                                            }}
                                        >
                                            <ButtonOutlineContent leftIcon={<IconChevronLeft />} text="Retour" />
                                        </LinkButton>
                                    </div>
                                    <div
                                        className={css({
                                            ml: "auto",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        })}
                                    >
                                        <UpdateOneFile file={file}>
                                            <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                        </UpdateOneFile>
                                        <DeleteOneFile file={file}>
                                            <ButtonOutlineContent leftIcon={<IconTrash />} color="danger" />
                                        </DeleteOneFile>
                                    </div>
                                </Section.Item>
                                <Section.Item>
                                    <Tab.Root
                                        tabs={[
                                            {
                                                label: "Informations",
                                                icon: <IconInfoCircle />,
                                                to: "/dashboard/organisations/$idOrganization/exercices/$idYear/stockage/$idFile",
                                                params: {
                                                    idOrganization: params.idOrganization,
                                                    idYear: params.idYear,
                                                    idFile: params.idFile,
                                                },
                                            },
                                            {
                                                label: "Métadonnées",
                                                icon: <IconDatabase />,
                                                to: "/dashboard/organisations/$idOrganization/exercices/$idYear/stockage/$idFile/métadonnées",
                                                params: {
                                                    idOrganization: params.idOrganization,
                                                    idYear: params.idYear,
                                                    idFile: params.idFile,
                                                },
                                            },
                                            {
                                                label: "Visualisation",
                                                icon: <IconEye />,
                                                to: "/dashboard/organisations/$idOrganization/exercices/$idYear/stockage/$idFile/visualisation",
                                                params: {
                                                    idOrganization: params.idOrganization,
                                                    idYear: params.idYear,
                                                    idFile: params.idFile,
                                                },
                                            },
                                        ]}
                                    />
                                </Section.Item>
                                <Outlet />
                            </Section.Root>
                        )
                    }}
                </FileData>
            </Page.Content>
        </Page.Root>
    )
}
