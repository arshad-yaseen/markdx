import { Code, Languages, Share, Sparkles, Star, Timer } from "lucide-react";
import React from "react";

function Features() {
  return (
    <section
      id="features"
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Here are some of the features that make MarkDX the most powerful
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Code />
            <div className="space-y-2">
              <h3 className="font-bold">Generate or Document codes</h3>
              <p className="text-sm text-muted-foreground">
                You can generate codes and document from your document.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Share />
            <div className="space-y-2">
              <h3 className="font-bold">Export to any format</h3>
              <p className="text-sm text-muted-foreground">
                You can export your document Markdown, HTML, Lexer data, etc.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Languages />
            <div className="space-y-2">
              <h3 className="font-bold">Translate</h3>
              <p className="text-sm text-muted-foreground">
                You can translate your document to any language.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Star />
            <div className="space-y-2">
              <h3 className="font-bold">AI suggessions and corrections</h3>
              <p className="text-sm text-muted-foreground">
                You can get AI suggessions and corrections for your document.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Sparkles />
            <div className="space-y-2">
              <h3 className="font-bold">Ask AI playground</h3>
              <p className="text-sm text-muted-foreground">
                You can ask AI playground to get answers for your questions.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Timer />
            <div className="space-y-2">
              <h3 className="font-bold">Realtime collaboration</h3>
              <p className="text-sm text-muted-foreground">
                You can collaborate with your team in realtime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
