export type Metric = {
    name: string
    type: "Event" | "Funnel" | "Custom"
    firstSeen: string
    lastSeen: string
    count: number
    sources: string[]
    status: "green" | "orange" | "red" | "inactive"
    description: string
} 