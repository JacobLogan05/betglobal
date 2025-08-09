import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { SalesRepProvider } from './contexts/SalesRepContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bet Global OS',
  description: 'Premium betting platform management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SalesRepProvider>
            {children}
          </SalesRepProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}