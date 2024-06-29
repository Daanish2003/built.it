interface AuthCard {
    cardTitle: string,
    cardDescription: string,
    backButtonHref: string,
    backButtonLabel: string,
    children: React.ReactNode
}

interface ActionResult {
    error: string | null,
    success: boolean,
    message: string | null
}