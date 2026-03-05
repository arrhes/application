import type { readAllOrganizationUsersRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconUserEdit, IconUserX } from "@tabler/icons-react"
import type * as v from "valibot"
import { Chip } from "../../../../components/layouts/chip.tsx"
import { ListTable } from "../../../../components/layouts/listTable/listTable.tsx"
import { DeleteOneOrganizationUser } from "./$idOrganizationUser/deleteOneOrganizationUser.tsx"
import { UpdateOneOrganizationUser } from "./$idOrganizationUser/updateOneOrganizationUser.tsx"

export function OrganizationUserListTableRow(props: {
    organizationUser: v.InferOutput<typeof readAllOrganizationUsersRouteDefinition.schemas.return>[number]
}) {
    return (
        <ListTable.Row>
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                        })}
                    >
                        <span
                            className={css({
                                fontSize: "base",
                                fontWeight: "semibold",
                                color: "neutral",
                            })}
                        >
                            {props.organizationUser.user.email}
                        </span>
                        {props.organizationUser.user.alias && (
                            <span className={css({ fontSize: "md", color: "neutral/50" })}>
                                {props.organizationUser.user.alias}
                            </span>
                        )}
                    </div>
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        })}
                    >
                        {props.organizationUser.isAdmin && <Chip text="Admin" color="information" />}
                        {props.organizationUser.status === "active" && <Chip text="Actif" color="success" />}
                        {props.organizationUser.status === "invited" && <Chip text="Invité" color="warning" />}
                        {props.organizationUser.status === "removed" && <Chip text="Retiré" color="error" />}
                    </div>
                </div>
                <div
                    className={css({
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <UpdateOneOrganizationUser organizationUser={props.organizationUser}>
                        <ButtonOutlineContent leftIcon={<IconUserEdit />} title="Changer les droits" />
                    </UpdateOneOrganizationUser>
                    <DeleteOneOrganizationUser organizationUser={props.organizationUser}>
                        <ButtonOutlineContent leftIcon={<IconUserX />} title="Retirer l'utilisateur" color="danger" />
                    </DeleteOneOrganizationUser>
                </div>
            </div>
        </ListTable.Row>
    )
}
