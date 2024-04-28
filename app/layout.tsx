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
import Bounded from "@/components/Bounded"

export const metadata: Metadata = {
  metadataBase: new URL("https://jineshb.me/"),
  title: {
    default: "Jinesh Bhsakaran",
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
      <body className={spaceGrotesk.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="ms:px-0 relative mx-auto w-full">
            {/* <div className="sticky top-0 z-10 inline-flex  w-full"> */}
            <Header />
            {/* </div> */}

            <main className="mx-auto w-full">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
