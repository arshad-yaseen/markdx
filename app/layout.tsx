import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import "@/styles/globals.css"
import "@/styles/components.css"
import { Analytics } from "@vercel/analytics/react"
import { Provider as TextBalancer } from "react-wrap-balancer"
import { Toaster } from "sonner"

import { fontHeading, fontMono, fontSans } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
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
    creator: "@arshadyaseeen",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

export default async function RootLayout({
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
          fontHeading.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <TextBalancer>{children}</TextBalancer>
          <Analytics />
        </ThemeProvider>
        <Toaster
          closeButton
          toastOptions={{
            className: "sonner-toast",
          }}
        />
      </body>
    </html>
  )
}
