import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '최수민 포트폴리오',
  description: 'Next.js 13 App Router 기반 포트폴리오',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <main className="min-h-screen">
            <div className="container mx-auto px-4 pt-20">
              <div className="max-w-2xl mx-auto">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
