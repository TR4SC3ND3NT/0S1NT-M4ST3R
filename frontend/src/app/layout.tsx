import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'
import { cn } from "@/lib/utils"

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '0S1NT-M4ST3R',
  description: 'Open-source intelligence gathering toolkit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/osint-toolkit.png" sizes="any" />
        <link rel="icon" type="image/png" href="/osint-toolkit.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/osint-toolkit.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/osint-toolkit.png" sizes="16x16" />
        <link rel="shortcut icon" href="/osint-toolkit.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/osint-toolkit.png" />
        <meta name="apple-mobile-web-app-title" content="0S1NT-M4ST3R" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}