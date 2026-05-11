import {
    readUserSessionRouteDefinition,
    resendEmailValidationRouteDefinition,
    validateUserEmailRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, ButtonPlainContent, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCheck, IconMail, IconMailForward } from "@tabler/icons-react"
import { useState } from "react"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../utilities/invalidateData.ts"

export function ValidateUserEmail(props: { emailToValidate: string }) {
    const [emailToken, setEmailToken] = useState("")
    const [isValidating, setIsValidating] = useState(false)
    const [isResending, setIsResending] = useState(false)

    async function handleValidate() {
        if (!emailToken.trim()) return
        setIsValidating(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: validateUserEmailRouteDefinition,
            body: {
                emailToken: emailToken.trim(),
            },
        })
        setIsValidating(false)
        if (response.ok === false) {
            toast({
                title: response.error?.cause ?? "Code incorrect",
                variant: "error",
            })
            return
        }
        toast({
            title: "Adresse email mise à jour avec succès",
            variant: "success",
        })
        await invalidateData({
            routeDefinition: readUserSessionRouteDefinition,
            body: {},
        })
    }

    async function handleResend() {
        setIsResending(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: resendEmailValidationRouteDefinition,
            body: {},
        })
        setIsResending(false)
        if (response.ok === false) {
            toast({
                title: response.error?.cause ?? "Impossible de renvoyer l'email",
                variant: "error",
            })
            return
        }
        toast({
            title: "Un nouveau code de vérification a été envoyé",
            variant: "success",
        })
    }

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                backgroundColor: "information/5",
                border: "1px solid",
                borderColor: "information/20",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                <IconMail
                    size={18}
                    className={css({
                        color: "information",
                        flexShrink: "0",
                    })}
                />
                <span
                    className={css({
                        fontSize: "sm",
                    })}
                >
                    Un code de vérification a été envoyé à <strong>{props.emailToValidate}</strong>
                </span>
            </div>
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                <InputText
                    value={emailToken}
                    onChange={(value) => setEmailToken(value ?? "")}
                    placeholder="Code à 6 chiffres"
                />
                <Button
                    onClick={handleResend}
                    isDisabled={isResending}
                >
                    <ButtonOutlineContent
                        leftIcon={<IconMailForward />}
                        text="Renvoyer"
                    />
                </Button>
                <Button
                    onClick={handleValidate}
                    isDisabled={isValidating || !emailToken.trim()}
                >
                    <ButtonPlainContent
                        leftIcon={<IconCheck />}
                        text="Valider"
                    />
                </Button>
            </div>
        </div>
    )
}
