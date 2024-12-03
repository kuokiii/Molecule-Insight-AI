import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Molecule Insight AI',
  description: 'Empowering students with AI-driven molecular insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-900 via-green-800 to-gray-900 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

