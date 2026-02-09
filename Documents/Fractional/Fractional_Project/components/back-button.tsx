"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-8 inline-flex items-center text-sm font-medium text-accent hover:underline transition-colors"
    >
      <ArrowLeft className="mr-1 h-4 w-4 transition-transform" />
      Back
    </button>
  );
}
