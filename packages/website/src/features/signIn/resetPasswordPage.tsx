import { resetPasswordRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonGhostContent, InputText, Logo, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft, IconBook2, IconMail } from "@tabler/icons-react"
import { FormControl } from "../../components/forms/formControl.js"
import { FormError } from "../../components/forms/formError.js"
import { FormField } from "../../components/forms/formField.js"
import { FormItem } from "../../components/forms/formItem.js"
import { FormLabel } from "../../components/forms/formLabel.js"
import { FormRoot } from "../../components/forms/formRoot.js"
import { LinkButton } from "../../components/linkButton.js"
import { getResponseBodyFromAPI } from "../../utilities/getResponseBodyFromAPI.js"

export function ResetPasswordPage() {
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
                        <LinkButton to="/">
                            <ButtonGhostContent
                                leftIcon={<Logo />}
                                text="Dashboard"
                            />
                        </LinkButton>
                        <LinkButton
                            to="/documentation"
                            title="Documentation"
                        >
                            <ButtonGhostContent
                                leftIcon={<IconBook2 />}
                                className={css({
                                    width: "100%",
                                    justifyContent: "center",
                                })}
                            />
                        </LinkButton>
                    </div>

                    <LinkButton
                        to="/connexion"
                        className={css({
                            width: "fit-content",
                        })}
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
                            Saisissez votre email pour recevoir un nouveau mot de passe temporaire.
                        </p>
                    </div>

                    <FormRoot
                        schema={resetPasswordRouteDefinition.schemas.body}
                        defaultValues={{}}
                        submitButtonProps={{
                            leftIcon: <IconMail />,
                            text: "Recevoir un nouveau mot de passe",
                            className: css({
                                width: "100%",
                                justifyContent: "center",
                            }),
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

                            toast({
                                title: "Un nouveau mot de passe vous a été envoyé par email",
                                description: "Pensez à le modifier dès votre prochaine connexion.",
                                variant: "success",
                            })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={() => {
                            window.location.assign("/connexion")
                        }}
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

                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/60",
                        })}
                    >
                        Après connexion, modifiez ce mot de passe temporaire depuis votre profil pour sécuriser votre
                        compte.
                    </p>
                </div>
            </section>
        </div>
    )
}
