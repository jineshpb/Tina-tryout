import type { Metadata } from "next"

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
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="ms:px-0 prose-xl mx-auto my-20 w-full max-w-4xl px-4 dark:prose-invert">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
