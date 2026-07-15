import {
    createOneUserApiKeyRouteDefinition,
    deleteOneUserApiKeyRouteDefinition,
    readAllUserApiKeysRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, ButtonPlainContent, Dialog, InputText, toast, useModalStore } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconKey, IconPlus, IconTrash } from "@tabler/icons-react"
import { useId, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../components/forms/FormControl.tsx"
import { FormError } from "../../../components/forms/FormError.tsx"
import { FormField } from "../../../components/forms/FormField.tsx"
import { FormItem } from "../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../components/forms/FormRoot.tsx"
import { Block } from "../../../components/layouts/block/block.js"
import { DataWrapper } from "../../../components/layouts/DataWrapper.tsx"
import { EmptyState } from "../../../components/layouts/EmptyState.tsx"
import { useTabs } from "../../../contexts/tabs/useTabs.tsx"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../utilities/invalidateData.ts"

function RawKeyDisplay({ rawKey, onClose }: { rawKey: string; onClose: () => void }) {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            <div
                className={css({
                    backgroundColor: "warning/10",
                    border: "1px solid",
                    borderColor: "warning/30",
                    borderRadius: "md",
                    padding: "1rem",
                })}
            >
                <p
                    className={css({
                        fontSize: "sm",
                        fontWeight: "bold",
                        color: "warning",
                        marginBottom: "0.5rem",
                    })}
                >
                    Clé API créée avec succès
                </p>
                <p
                    className={css({
                        fontSize: "xs",
                        color: "fg.muted",
                    })}
                >
                    Copiez cette clé immédiatement. Elle ne sera plus jamais affichée.
                </p>
            </div>
            <div
                className={css({
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                })}
            >
                <code
                    className={css({
                        flex: 1,
                        padding: "0.75rem",
                        backgroundColor: "background",
                        borderRadius: "md",
                        fontFamily: "monospace",
                        fontSize: "sm",
                        wordBreak: "break-all",
                        border: "1px solid",
                        borderColor: "neutral/20",
                    })}
                >
                    {rawKey}
                </code>
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText(rawKey)
                        toast({
                            title: "Clé copiée",
                            variant: "success",
                        })
                    }}
                >
                    <ButtonOutlineContent text="Copier" />
                </Button>
            </div>
            <Button onClick={onClose}>
                <ButtonOutlineContent text="Fermer" />
            </Button>
        </div>
    )
}

function CreateUserApiKeyPanel({ onClose }: { onClose: () => void }) {
    const [rawKey, setRawKey] = useState<string | null>(null)

    return (
        <div
            className={css({
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            {rawKey !== null ? (
                <RawKeyDisplay
                    rawKey={rawKey}
                    onClose={onClose}
                />
            ) : (
                <FormRoot
                    schema={createOneUserApiKeyRouteDefinition.schemas.body}
                    defaultValues={{}}
                    submitButtonProps={{
                        leftIcon: <IconPlus />,
                        text: "Créer la clé API",
                    }}
                    onSubmit={async (data) => {
                        const response = await getResponseBodyFromAPI({
                            routeDefinition: createOneUserApiKeyRouteDefinition,
                            body: data,
                        })
                        if (!response.ok) {
                            toast({
                                title: "Impossible de créer la clé API",
                                variant: "error",
                            })
                            return false
                        }

                        setRawKey(response.data.rawKey)
                        toast({
                            title: "Clé API créée avec succès",
                            variant: "success",
                        })
                        return true
                    }}
                    onCancel={undefined}
                    onSuccess={async () => {
                        await invalidateData({
                            routeDefinition: readAllUserApiKeysRouteDefinition,
                            body: {},
                        })
                    }}
                >
                    {(form) => (
                        <Fragment>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            label="Nom de la clé"
                                            isRequired={false}
                                            description={undefined}
                                            tooltip={undefined}
                                        />
                                        <FormControl>
                                            <InputText
                                                value={field.value}
                                                onChange={field.onChange}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                        </Fragment>
                    )}
                </FormRoot>
            )}
        </div>
    )
}

function ApiKeyRow({ apiKey }: { apiKey: v.InferOutput<typeof returnedSchemas.apiKey> }) {
    const modalId = useId()
    const { open: openModal, close: closeModal } = useModalStore()

    async function handleDelete() {
        const response = await getResponseBodyFromAPI({
            routeDefinition: deleteOneUserApiKeyRouteDefinition,
            body: {
                idApiKey: apiKey.id,
            },
        })
        if (!response.ok) {
            toast({
                title: "Impossible de supprimer la clé",
                variant: "error",
            })
            return
        }
        await invalidateData({
            routeDefinition: readAllUserApiKeysRouteDefinition,
            body: {},
        })
        toast({
            title: "Clé API supprimée",
            variant: "success",
        })
    }

    return (
        <div
            className={css({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 1rem",
                borderBottom: "1px solid",
                borderBottomColor: "neutral/10",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                })}
            >
                <span
                    className={css({
                        fontWeight: "medium",
                        fontSize: "sm",
                    })}
                >
                    {apiKey.name}
                </span>
                <span
                    className={css({
                        fontSize: "xs",
                        color: "fg.muted",
                    })}
                >
                    Créée le {new Date(apiKey.createdAt).toLocaleDateString()}
                </span>
            </div>
            <Button
                onClick={() =>
                    openModal(
                        modalId,
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Supprimer la clé API</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Dialog.Description>
                                    Cette action est irréversible. Les applications utilisant cette clé ne pourront plus
                                    accéder à l'API.
                                </Dialog.Description>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Button onClick={() => closeModal(modalId)}>
                                    <ButtonOutlineContent text="Annuler" />
                                </Button>
                                <Button
                                    hasLoader
                                    onClick={async () => {
                                        await handleDelete()
                                        closeModal(modalId)
                                    }}
                                >
                                    <ButtonPlainContent
                                        color="danger"
                                        text="Supprimer la clé"
                                    />
                                </Button>
                            </Dialog.Footer>
                        </Dialog.Content>,
                    )
                }
            >
                <ButtonOutlineContent
                    leftIcon={<IconTrash />}
                    text="Supprimer"
                />
            </Button>
        </div>
    )
}

export function UserApiKeysPage() {
    const { openPanelTab, closeTab } = useTabs()
    const [refreshKey, setRefreshKey] = useState(0)

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                padding: "1px",
            })}
        >
            <Block.Root>
                <Block.Header title="Mes clés API" />
                <DataWrapper
                    routeDefinition={readAllUserApiKeysRouteDefinition}
                    body={{}}
                    key={refreshKey}
                >
                    {(apiKeys) => (
                        <div>
                            {apiKeys.length === 0 ? (
                                <EmptyState
                                    icon={<IconKey size={48} />}
                                    title="Aucune clé API"
                                    subtitle="Créez une clé API pour utiliser Arrhes depuis votre agent ou vos outils"
                                />
                            ) : (
                                apiKeys.map((apiKey) => (
                                    <ApiKeyRow
                                        key={apiKey.id}
                                        apiKey={apiKey}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </DataWrapper>
            </Block.Root>

            <Button
                className={{
                    width: "fit-content",
                }}
                onClick={() => {
                    const r = {
                        current: "",
                    }
                    r.current = openPanelTab(
                        "Créer une clé API",
                        <CreateUserApiKeyPanel
                            onClose={() => {
                                closeTab(r.current)
                                setRefreshKey((k) => k + 1)
                            }}
                        />,
                    )
                }}
            >
                <ButtonOutlineContent
                    leftIcon={<IconPlus />}
                    text="Créer une clé API"
                />
            </Button>
        </div>
    )
}
