export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({})) as {
            eventName?: string
            properties?: string[]
        }

        const eventName = body.eventName || "Event"
        const properties = Array.isArray(body.properties) ? body.properties.slice(0, 50) : []

        if (properties.length === 0) {
            return new Response(JSON.stringify({ error: "No properties provided" }), { status: 400, headers: { "content-type": "application/json" } })
        }

        const descriptions: Record<string, string> = {}
        for (const prop of properties) {
            const cleanName = prop.replace(/^\$/, '')
            descriptions[prop] = `The ${prop} property for ${eventName} captures ${cleanName.replace(/[_-]/g, " ")}. It helps analysis and improves downstream insights and recommendations.`
        }

        return new Response(JSON.stringify({ descriptions }), { status: 200, headers: { "content-type": "application/json" } })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to generate descriptions" }), { status: 500, headers: { "content-type": "application/json" } })
    }
}







