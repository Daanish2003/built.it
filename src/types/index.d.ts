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

interface ideas{
    id: string,
    userId: string,
    title: string,
    description: string,
    createdAt: Date
}

interface IdeaType {
    ideas: ideas[]
}