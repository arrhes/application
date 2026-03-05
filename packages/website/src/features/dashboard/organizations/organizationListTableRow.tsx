import type { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"
import { Chip } from "../../../components/layouts/chip.tsx"
import { ListTable } from "../../../components/layouts/listTable/listTable.tsx"
import { LinkButton } from "../../../components/linkButton.tsx"

export function OrganizationListTableRow(props: {
    organizationUser: v.InferOutput<typeof getAllMyOrganizationsRouteDefinition.schemas.return>[number]
}) {
    const organization = props.organizationUser.organization

    const scopeLabel = organization.scope === "company" ? "Entreprise" : "Association"

    return (
        <ListTable.Row>
            <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "start",
                        gap: "1rem",
                    })}
                >
                    <LinkButton
                        to="/dashboard/organisations/$idOrganization"
                        params={{
                            idOrganization: organization.id,
                        }}
                    >
                        <LinkContent
                            className={css({
                                fontSize: "base",
                                fontWeight: "semibold",
                                color: "primary",
                                textDecoration: "none",
                                _hover: { textDecoration: "underline" },
                            })}
                        >
                            {organization.name}
                        </LinkContent>
                    </LinkButton>
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "start",
                            gap: "0.5rem",
                        })}
                    >
                        {props.organizationUser.isAdmin && <Chip text="Administrateur" color="success" />}
                        {props.organizationUser.status === "invited" && <Chip text="En attente" color="warning" />}
                    </div>
                </div>
                <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" })}>
                    <Chip text={scopeLabel} color="neutral" />
                    {organization.siren && (
                        <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                            SIREN: {organization.siren}
                        </span>
                    )}
                </div>
            </div>
        </ListTable.Row>
    )
}
