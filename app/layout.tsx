import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/Header";



export const metadata: Metadata = {
  title: "Tina CMS Blog",
  description: "My Web dev blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="prose-xl mx-auto my-20 w-full max-w-4xl px-4 dark:prose-invert ms:px-0">
          <Header />
          <main>
          {children}
          </main>
        </div>
        </body>
    </html>
  );
}
