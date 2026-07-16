import { useState } from "react"
import { resetPasswordRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonGhostContent, InputText, Logo, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft, IconBook2, IconKey } from "@tabler/icons-react"
import { FormControl } from "../../components/forms/FormControl.js"
import { FormError } from "../../components/forms/FormError.js"
import { FormField } from "../../components/forms/FormField.js"
import { FormItem } from "../../components/forms/FormItem.js"
import { FormLabel } from "../../components/forms/FormLabel.js"
import { FormRoot } from "../../components/forms/FormRoot.js"
import { LinkButton } from "../../components/LinkButton.js"
import { getResponseBodyFromAPI } from "../../utilities/getResponseBodyFromAPI.js"

export function ResetPasswordPage() {
    const [temporaryPassword, setTemporaryPassword] = useState<string | null>(null)

    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                backgroundColor: "background",
            })}
        >
            <section
                className={css({
                    width: "100%",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingX: "1rem",
                    paddingY: "4rem",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "sm",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                        padding: "2rem",
                        borderRadius: "lg",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            gap: "0.5rem",
                        })}
                    >
                        <a href={import.meta.env.VITE_WEBSITE_BASE_URL}>
                            <ButtonGhostContent
                                leftIcon={<Logo />}
                                text="Arrhes"
                            />
                        </a>
                        <a href={`${import.meta.env.VITE_WEBSITE_BASE_URL}/documentation`}>
                            <ButtonGhostContent
                                leftIcon={<IconBook2 />}
                                className={{
                                    width: "100%",
                                    justifyContent: "center",
                                }}
                            />
                        </a>
                    </div>

                    <LinkButton
                        to="/connexion"
                        className={{
                            width: "fit-content",
                        }}
                    >
                        <ButtonGhostContent
                            leftIcon={<IconArrowLeft />}
                            text="Retour à la connexion"
                        />
                    </LinkButton>

                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        })}
                    >
                        <h1
                            className={css({
                                fontSize: "lg",
                                fontWeight: "bold",
                                color: "neutral",
                            })}
                        >
                            Réinitialiser le mot de passe
                        </h1>
                        <p
                            className={css({
                                color: "neutral/60",
                                fontSize: "sm",
                            })}
                        >
                            Saisissez votre email pour générer un nouveau mot de passe temporaire.
                        </p>
                    </div>

                    {temporaryPassword === null ? (
                        <FormRoot
                            schema={resetPasswordRouteDefinition.schemas.body}
                            defaultValues={{}}
                            submitButtonProps={{
                                leftIcon: <IconKey />,
                                text: "Générer un nouveau mot de passe",
                                className: {
                                    width: "100%",
                                    justifyContent: "center",
                                },
                            }}
                            submitOnPressEnterKey={true}
                            onSubmit={async (data) => {
                                const response = await getResponseBodyFromAPI({
                                    routeDefinition: resetPasswordRouteDefinition,
                                    body: data,
                                })

                                if (response.ok === false) {
                                    toast({
                                        title: response.error?.cause ?? "Réinitialisation impossible",
                                        variant: "error",
                                    })
                                    return false
                                }

                                if (response.data?.password) {
                                    setTemporaryPassword(response.data.password)
                                }
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={undefined}
                        >
                            {(form) => (
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Email"
                                                isRequired={false}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputText
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </FormRoot>
                    ) : (
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                            })}
                        >
                            <div
                                className={css({
                                    padding: "1rem",
                                    borderRadius: "lg",
                                    backgroundColor: "success/10",
                                    border: "1px solid",
                                    borderColor: "success",
                                })}
                            >
                                <p
                                    className={css({
                                        fontSize: "sm",
                                        fontWeight: "bold",
                                        color: "success",
                                        marginBottom: "0.5rem",
                                    })}
                                >
                                    Nouveau mot de passe généré
                                </p>
                                <p
                                    className={css({
                                        fontSize: "lg",
                                        fontWeight: "bold",
                                        fontFamily: "mono",
                                        color: "neutral",
                                        textAlign: "center",
                                        padding: "0.75rem",
                                        backgroundColor: "white",
                                        borderRadius: "md",
                                    })}
                                >
                                    {temporaryPassword}
                                </p>
                            </div>
                            <LinkButton
                                to="/connexion"
                                className={{
                                    width: "100%",
                                }}
                            >
                                <ButtonGhostContent
                                    text="Se connecter avec ce mot de passe"
                                    className={{
                                        width: "100%",
                                        justifyContent: "center",
                                    }}
                                />
                            </LinkButton>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
