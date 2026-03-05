import { signInRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonGhostContent, ButtonOutlineContent, Logo, Separator } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBook2, IconLogin2, IconUserPlus } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import { FormControl } from "../../components/forms/formControl.js"
import { FormError } from "../../components/forms/formError.js"
import { FormField } from "../../components/forms/formField.js"
import { FormItem } from "../../components/forms/formItem.js"
import { FormLabel } from "../../components/forms/formLabel.js"
import { FormRoot } from "../../components/forms/formRoot.js"
import { InputPassword } from "../../components/inputs/inputPassword.js"
import { InputText } from "../../components/inputs/inputText.js"
import { LinkButton } from "../../components/linkButton.js"
import { toast } from "../../contexts/toasts/useToast.js"
import { applicationRouter } from "../../routes/applicationRouter.js"
import { getResponseBodyFromAPI } from "../../utilities/getResponseBodyFromAPI.js"

export function SignInPage() {
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
            {/* Main content */}
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
                            <Logo />
                        </LinkButton>
                        <LinkButton to="/documentation" title="Documentation">
                            <ButtonGhostContent
                                leftIcon={<IconBook2 />}
                                className={css({ width: "100%", justifyContent: "center" })}
                            />
                        </LinkButton>
                    </div>

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
                            Connexion
                        </h1>
                        <p
                            className={css({
                                color: "neutral/60",
                                fontSize: "sm",
                            })}
                        >
                            Connectez-vous à votre compte
                        </p>
                    </div>

                    <FormRoot
                        schema={signInRouteDefinition.schemas.body}
                        defaultValues={{}}
                        submitButtonProps={{
                            leftIcon: <IconLogin2 />,
                            text: "Se connecter",
                            className: css({ width: "100%", justifyContent: "center" }),
                        }}
                        submitOnPressEnterKey={true}
                        onSubmit={async (data) => {
                            const response = await getResponseBodyFromAPI({
                                routeDefinition: signInRouteDefinition,
                                body: data,
                            })
                            if (response.ok === false) {
                                toast({ title: "Connexion impossible", variant: "error" })
                                return false
                            }

                            toast({ title: "Connexion réussie", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={() => {
                            applicationRouter.navigate({
                                to: "/dashboard",
                                reloadDocument: true,
                            })
                        }}
                    >
                        {(form) => (
                            <Fragment>
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
                                                <InputText value={field.value} onChange={field.onChange} type="email" />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Mot de passe"
                                                isRequired={false}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputPassword value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                            </Fragment>
                        )}
                    </FormRoot>

                    <Separator />

                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "stretch",
                            gap: "0.5rem",
                        })}
                    >
                        <LinkButton to="/inscription" className={css({ width: "100%" })}>
                            <ButtonOutlineContent
                                leftIcon={<IconUserPlus />}
                                text="Créer un compte"
                                className={css({ width: "100%", justifyContent: "center" })}
                            />
                        </LinkButton>
                    </div>
                </div>
            </section>
        </div>
    )
}
