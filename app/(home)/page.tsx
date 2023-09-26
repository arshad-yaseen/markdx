import OpenSource from "@/components/open-source"
import SiteFeatures from "@/components/site-features"
import SiteFooter from "@/components/site-footer"
import SiteHero from "@/components/site-hero"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <SiteHero />
      <SiteFeatures />
      <OpenSource />
      <SiteFooter />
    </main>
  )
}
