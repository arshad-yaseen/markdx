import { JetBrains_Mono, Inter } from "next/font/google"
import localFont from "next/font/local"

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})