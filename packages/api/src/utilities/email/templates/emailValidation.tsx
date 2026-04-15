function EmailValidation(props: { token: string }) {
    return (
        <html lang="fr">
            <body>
                <p>
                    Afin de valider votre email, veuillez utiliser le code suivant
                    <br />
                    <b>{props.token}</b>
                </p>
            </body>
        </html>
    )
}

export function emailValidationTemplate(props: Parameters<typeof EmailValidation>[0]) {
    return (<EmailValidation {...props} />).toString()
}
