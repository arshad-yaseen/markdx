import OpenSource from "@/components/open-source"
import SiteFeatures from "@/components/site-features"
import SiteFooter from "@/components/site-footer"
import SiteHero from "@/components/site-hero"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="jumbo absolute -inset-[10px] opacity-[12%]"></div>
      <SiteHero />
      <SiteFeatures />
      <OpenSource />
      <SiteFooter />
    </main>
  )
}
