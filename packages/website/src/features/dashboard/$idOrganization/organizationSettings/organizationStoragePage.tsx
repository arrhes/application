import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { Banner } from "../../../../components/layouts/banner.tsx"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { LinkButton } from "../../../../components/linkButton.tsx"
import { organizationStorageRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationStorageRoute.tsx"

function formatBytes(bytes: number): string {
    if (bytes >= 1_073_741_824) {
        return `${(bytes / 1_073_741_824).toFixed(2)} Go`
    }
    if (bytes >= 1_048_576) {
        return `${(bytes / 1_048_576).toFixed(2)} Mo`
    }
    if (bytes >= 1024) {
        return `${(bytes / 1024).toFixed(2)} Ko`
    }
    return `${bytes} o`
}

export function OrganizationStoragePage() {
    const params = useParams({ from: organizationStorageRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper routeDefinition={readOneOrganizationRouteDefinition} body={{}}>
                    {(organization) => {
                        const usagePercent =
                            organization.storageLimit > 0
                                ? Math.min((organization.storageCurrentUsage / organization.storageLimit) * 100, 100)
                                : 0
                        const isNearLimit = usagePercent >= 80
                        const isAtLimit = usagePercent >= 100

                        return (
                            <>
                                <SettingsSection.Root>
                                    <SettingsSection.Header title="Utilisation du stockage" />
                                    <SettingsSection.Row
                                        title="Espace utilisé"
                                        description={`${formatBytes(organization.storageCurrentUsage)} utilisés sur ${formatBytes(organization.storageLimit)}`}
                                    >
                                        <div
                                            className={css({
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.5rem",
                                                width: "200px",
                                            })}
                                        >
                                            <div
                                                className={css({
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    fontSize: "sm",
                                                    color: "neutral/60",
                                                })}
                                            >
                                                <span>{formatBytes(organization.storageCurrentUsage)}</span>
                                                <span>{formatBytes(organization.storageLimit)}</span>
                                            </div>
                                            <div
                                                className={css({
                                                    height: "8px",
                                                    width: "100%",
                                                    backgroundColor: "neutral/10",
                                                    borderRadius: "full",
                                                    overflow: "hidden",
                                                })}
                                            >
                                                <div
                                                    className={css(
                                                        {
                                                            height: "100%",
                                                            borderRadius: "full",
                                                            transition: "width 0.3s ease",
                                                        },
                                                        isAtLimit
                                                            ? { backgroundColor: "error" }
                                                            : isNearLimit
                                                              ? { backgroundColor: "warning" }
                                                              : { backgroundColor: "success" },
                                                    )}
                                                    style={{ width: `${usagePercent}%` }}
                                                />
                                            </div>
                                            <span
                                                className={css(
                                                    { fontSize: "xs" },
                                                    isAtLimit
                                                        ? { color: "error" }
                                                        : isNearLimit
                                                          ? { color: "warning" }
                                                          : { color: "neutral/40" },
                                                )}
                                            >
                                                {usagePercent.toFixed(1)}% utilisé
                                            </span>
                                        </div>
                                    </SettingsSection.Row>
                                </SettingsSection.Root>

                                <Banner variant="information">
                                    Pour augmenter votre limite de stockage, souscrivez à un{" "}
                                    <LinkButton
                                        to="/dashboard/organisations/$idOrganization/abonnement"
                                        params={{ idOrganization: params.idOrganization }}
                                    >
                                        <LinkContent
                                            className={css({
                                                color: "information",
                                            })}
                                        >
                                            abonnement
                                        </LinkContent>
                                    </LinkButton>
                                    .
                                </Banner>
                            </>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
