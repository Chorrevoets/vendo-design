"use client"

import { Header } from "./header"

// Example usage of the Header component with different variants
export function HeaderExamples() {
    return (
        <div className="space-y-4">
            {/* Default centered header */}
            <Header title="Default Header" />

            {/* Left-aligned header */}
            <Header title="Left Aligned Header" variant="left-aligned" />

            {/* Header with custom styling */}
            <Header
                title="Custom Header"
                className="bg-blue-50 border-b border-blue-200"
            />

            {/* Header without background */}
            <Header
                title="No Background Header"
                showBackground={false}
            />

            {/* Header with additional content */}
            <Header title="Header with Actions">
                <div className="ml-4 flex gap-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                        Action 1
                    </button>
                    <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                        Action 2
                    </button>
                </div>
            </Header>
        </div>
    )
}

export default HeaderExamples 