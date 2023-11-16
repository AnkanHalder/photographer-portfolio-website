import './globals.css'
import './css_reset.css'
import { Inter } from 'next/font/google'
import { ProjectContextProvider } from '@/contexts/ProjectContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectContextProvider>
          {children}
        </ProjectContextProvider>
      </body>
    </html>
  )
}
