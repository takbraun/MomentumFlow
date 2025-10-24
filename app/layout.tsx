import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'momentumflow - Signal vs Noise Productivity',
  description: 'Transform overwhelm into structured momentum. Focus on what truly matters.',
  keywords: ['productivity', 'focus', 'signal vs noise', 'task management', 'momentum'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-spotify-black">
          {children}
        </div>
      </body>
    </html>
  )
}
