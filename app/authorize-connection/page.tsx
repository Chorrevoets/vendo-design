"use client"

import { useRouter, useSearchParams } from "next/navigation"

export default function AuthorizeConnectionPage() {
    const router = useRouter()
    const params = useSearchParams()
    const selected = params.get("s")

    const handleContinue = () => {
        const query = new URLSearchParams()
        query.set("add", "1")
        query.set("step", "3")
        if (selected) query.set("s", selected)
        router.push(`/data_management/sources?${query.toString()}`)
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow border overflow-hidden">
                <div className="border-b px-6 py-4 text-sm text-gray-600">
                    Sign in with Google
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded bg-[#ccff00] grid place-items-center text-black font-bold">V</div>
                            <div>
                                <div className="text-2xl font-semibold text-gray-900">You’re signing back in to</div>
                                <div className="text-2xl font-semibold text-gray-900">Vendo</div>
                            </div>
                        </div>
                        <div className="space-y-1 text-sm text-gray-700">
                            <p>
                                Review Vendo’s <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service</span> to understand how Vendo will process and protect your data.
                            </p>
                            <p>
                                To make changes at any time, go to your <span className="underline">Google Account</span>.
                            </p>
                        </div>
                        <div className="text-sm text-gray-600">Learn more about <span className="underline">Sign in with Google</span>.</div>
                    </div>
                    <div className="p-8 border-t md:border-t-0 md:border-l">
                        <div className="space-y-4">
                            <div className="text-sm text-gray-700">Account</div>
                            <div className="flex items-center gap-3 border rounded-md px-3 py-2">
                                <div className="h-6 w-6 rounded-full bg-gray-200" />
                                <div className="text-sm">{selected ?? "C.Horrevoets@gmail.com"}</div>
                            </div>
                            <div className="flex items-center justify-end gap-3 pt-4">
                                <button onClick={handleCancel} className="rounded-md border px-4 py-2 text-sm">Cancel</button>
                                <button onClick={handleContinue} className="rounded-md bg-black px-4 py-2 text-sm text-white">Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-4 text-xs text-gray-500 px-6 py-3 border-t">
                    <span>Help</span>
                    <span>Privacy</span>
                    <span>Terms</span>
                </div>
            </div>
        </div>
    )
} 