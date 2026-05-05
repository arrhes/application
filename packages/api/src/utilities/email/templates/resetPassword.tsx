function ResetPassword(props: { newPassword: string }) {
    return (
        <html lang="fr">
            <body>
                <p>Bonjour,</p>
                <p>
                    Votre mot de passe a été réinitialisé.
                    <br />
                    Votre nouveau mot de passe temporaire est: <b>{props.newPassword}</b>
                </p>
                <p>
                    Pour des raisons de sécurité, merci de vous connecter puis de modifier ce mot de passe depuis votre
                    profil.
                </p>
            </body>
        </html>
    )
}

export function resetPasswordTemplate(props: Parameters<typeof ResetPassword>[0]) {
    return (<ResetPassword {...props} />).toString()
}
