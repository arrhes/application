function Support(props: { category: string; date: string; message: string }) {
    return (
        <html lang="fr">
            <body>
                <p>
                    <b>Category:</b>
                    <span>{props.category}</span>
                </p>
                <p>
                    <b>Date:</b>
                    <span>{props.date}</span>
                </p>
                <p>
                    <b>Message:</b>
                    <span>{props.message}</span>
                </p>
            </body>
        </html>
    )
}

export function supportTemplate(props: Parameters<typeof Support>[0]) {
    return (<Support {...props} />).toString()
}
