import { Inter } from 'next/font/google'
import Nav from '@/client/Pages/Nav'


export const metadata = {
  title: 'Anshu Portfolio',
  description: 'Created by Ankan and Suchana',
}

export default function RootLayout({ children }) {
  return (
    <>
      <Nav/>
      {children}
    </>
  )
}
