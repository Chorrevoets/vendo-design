import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Fractional Product Leadership | Senior Product Executive',
  description: 'Fractional product leadership for founders and executive teams. Embedded senior product leadership to create clarity, momentum, and commercial rigour.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/Favicon_Coen.webp',
        type: 'image/webp',
      },
    ],
    apple: '/Favicon_Coen.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
