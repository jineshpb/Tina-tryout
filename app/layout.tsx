import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "900", "300", "400", "500", "600", "700", "800"],
})

import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"

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
