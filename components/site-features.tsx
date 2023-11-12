import React from "react"
import { CodeIcon } from "@radix-ui/react-icons"
import {
  ArrowDownToLineIcon,
  LanguagesIcon,
  PenLine,
  SparklesIcon,
  Users2Icon,
} from "lucide-react"

const FEATURES = [
  {
    title: "Generate or Document codes",
    description: "You can generate codes and document from your document.",
    icon: <CodeIcon className="h-9 w-9" />,
  },
  {
    title: "Export to any format",
    description:
      "You can export your document Markdown, HTML, Lexer data, etc.",
    icon: <ArrowDownToLineIcon className="h-8 w-8" />,
  },
  {
    title: "Translate",
    description: "You can translate your document to any language.",
    icon: <LanguagesIcon className="h-8 w-8" />,
  },
  {
    title: "AI suggessions and corrections",
    description:
      "You can get AI suggessions and corrections for your document.",
    icon: <PenLine className="h-8 w-8" />,
  },
  {
    title: "Ask AI playground",
    description: "You can ask AI playground to get answers for your questions.",
    icon: <SparklesIcon className="h-8 w-8" />,
  },
  {
    title: "Realtime collaboration",
    description: "You can collaborate with your team in realtime.",
    icon: <Users2Icon className="h-8 w-8" />,
  },
]

function SiteFeatures() {
  return (
    <section
      id="features"
      className="container space-y-6 bg-muted/30 py-8 md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Here are some of the features that make MarkDX the most powerful
        </p>
      </div>
      <div className="py-2" />
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="relative overflow-hidden rounded-xl bg-background  p-2 shadow-border-medium"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              {feature.icon}
              <div className="space-y-2">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SiteFeatures
