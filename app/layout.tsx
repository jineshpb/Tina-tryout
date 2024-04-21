import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Space_Grotesk } from "next/font/google"

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
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Tina CMS Blog",
  description: "My Web dev blog",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="ms:px-0 relative mx-auto w-full">
            <div className="sticky top-0 z-10  inline-flex w-full max-w-7xl  ">
              <Header />
            </div>

            <main className="flex justify-center">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
