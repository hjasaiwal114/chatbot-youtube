import Chat from "./components/Chat"
import { Inter } from 'next/font/google'
import './globals.css'
import {Providers} from './components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bookbuddy',
  description: 'your bookstore for fantasy & mystery novels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        <Chat />
        {children}
        </body>
        </Providers>
    </html>
  )
}
