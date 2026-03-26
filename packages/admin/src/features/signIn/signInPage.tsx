import { adminSignInRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, ButtonPlainContent, InputPassword, InputText, Logo } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { IconLogin2 } from "@tabler/icons-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type * as v from "valibot"
import { LinkButton } from "../../components/linkButton.js"
import { adminRouter } from "../../routes/adminRouter.js"
import { getResponseBodyFromAPI } from "../../utilities/getResponseBodyFromAPI.js"

type SignInFormData = v.InferOutput<(typeof adminSignInRouteDefinition)["schemas"]["body"]>

export function SignInPage() {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<SignInFormData>({
        resolver: valibotResolver(adminSignInRouteDefinition.schemas.body),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: SignInFormData) {
        setErrorMessage(undefined)
        setIsSubmitting(true)

        const response = await getResponseBodyFromAPI({
            routeDefinition: adminSignInRouteDefinition,
            body: data,
        })

        setIsSubmitting(false)

        if (response.ok === false) {
            setErrorMessage("Identifiants incorrects")
            return
        }

        adminRouter.navigate({
            to: "/",
            reloadDocument: true,
        })
    }

    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "background",
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
                <LinkButton to="/">
                    <ButtonGhostContent leftIcon={<Logo />} text="Admin" />
                </LinkButton>

                <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                    <h1 className={css({ fontSize: "lg", fontWeight: "bold", color: "neutral" })}>Connexion</h1>
                    <p className={css({ color: "neutral/60", fontSize: "sm" })}>
                        Connectez-vous à votre compte administrateur
                    </p>
                </div>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}
                >
                    <div className={css({ display: "flex", flexDirection: "column", gap: "0.375rem" })}>
                        <label
                            htmlFor="email"
                            className={css({ fontSize: "sm", fontWeight: "medium", color: "neutral" })}
                        >
                            Email
                        </label>
                        <InputText
                            id="email"
                            autoComplete="email"
                            placeholder="admin@exemple.fr"
                            value={form.watch("email")}
                            onChange={(value) => form.setValue("email", value ?? "", { shouldValidate: true })}
                            error={form.formState.errors.email}
                        />
                        {form.formState.errors.email && (
                            <span className={css({ fontSize: "xs", color: "danger" })}>
                                {form.formState.errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className={css({ display: "flex", flexDirection: "column", gap: "0.375rem" })}>
                        <label
                            htmlFor="password"
                            className={css({ fontSize: "sm", fontWeight: "medium", color: "neutral" })}
                        >
                            Mot de passe
                        </label>
                        <InputPassword
                            id="password"
                            autoComplete="current-password"
                            placeholder="Mot de passe"
                            value={form.watch("password")}
                            onChange={(value) => form.setValue("password", value ?? "", { shouldValidate: true })}
                            error={form.formState.errors.password}
                        />
                        {form.formState.errors.password && (
                            <span className={css({ fontSize: "xs", color: "danger" })}>
                                {form.formState.errors.password.message}
                            </span>
                        )}
                    </div>

                    {errorMessage && (
                        <div
                            className={css({
                                padding: "0.75rem",
                                borderRadius: "md",
                                backgroundColor: "danger/5",
                                border: "1px solid",
                                borderColor: "danger/20",
                            })}
                        >
                            <span className={css({ fontSize: "sm", color: "danger" })}>{errorMessage}</span>
                        </div>
                    )}

                    <Button type="submit" isDisabled={isSubmitting} className={css({ width: "100%" })}>
                        <ButtonPlainContent
                            leftIcon={<IconLogin2 />}
                            text={isSubmitting ? "Connexion..." : "Se connecter"}
                            className={css({ width: "100%", justifyContent: "center" })}
                        />
                    </Button>
                </form>
            </div>
        </div>
    )
}
