import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "900", "300", "400", "500", "600", "700", "800"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

import "./globals.css"
import Header from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"

import clsx from "clsx"

const newUrl = process.env.VERCEL_URL
const personalDomain = process.env.PERSONAL_URL

const baseUrl = personalDomain ? personalDomain : newUrl
export const metadata: Metadata = {
  metadataBase: new URL(`https://${baseUrl}`),
  title: {
    default: "Jinesh Bhaskaran",
    template: `%s | Jinesh Bhaskaran`,
  },
  description: "Jinesh UX designer",
  category: "design",
}
// className={spaceGrotesk.className}
// `{GeistSans.className}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="ms:px-0 mx-auto w-full">
            <main className="mx-auto w-full">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
