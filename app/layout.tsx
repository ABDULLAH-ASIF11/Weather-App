import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Neo-brutalist typography: Ultra-bold sans-serif for headings
const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-inter"
});

// Technical/monospace font for secondary details
const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono"
});

export const metadata: Metadata = {
  title: 'Live Weather Dashboard',
  description: 'A neo-brutalist weather dashboard built with React Hooks',
  icons: {
    icon: '/favicon.ico',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="font-sans antialiased text-black">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
