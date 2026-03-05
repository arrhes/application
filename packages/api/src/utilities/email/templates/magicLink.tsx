function MagicLink(props: { magicLink: string }) {
    return (
        <html lang="fr">
            <body>
                <p>Bonjour,</p>
                <p>
                    Cliquer sur le lien suivant pour vous connecter
                    <br />
                    <a href={props.magicLink}>Se connecter</a>
                </p>
            </body>
        </html>
    )
}

export function magicLinkTemplate(props: Parameters<typeof MagicLink>[0]) {
    return (<MagicLink {...props} />).toString()
}
