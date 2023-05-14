import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Header from "@/components/header"

import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/react"

import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Markdown",
    "MDX",
    "Markdown editor",
    "MDX editor",
    "Markdown preview",
    "MDX preview",
    "AI Markdown",
    "AI MDX",
    "AI Markdown editor",
    "AI MDX editor",
    "MarkDX editor",
    "MarkDX",
  ],
  authors: [
    {
      name: siteConfig.creator.name,
      url: siteConfig.creator.website,
    },
  ],
  creator: siteConfig.creator.name,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`/og-twitter.png`],
    creator: "@arshadyaseeen",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
