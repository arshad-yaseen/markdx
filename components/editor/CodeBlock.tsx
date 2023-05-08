import { cn } from "@/lib/utils";
import hljs from "highlight.js";

function CodeBlock({
  language,
  value,
  preClass,
  codeClass,
}: {
  language: string;
  value: string;
  preClass?: string;
  codeClass?: string;
}) {
  value = value || "";
  hljs.getLanguage(language) ? (language = language) : (language = "plaintext");
  const highlightedCode = hljs.highlight(value, { language }).value;

  return (
    <pre className={cn("w-full flex", preClass)}>
      <code
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        className={cn(
          `hljs ${language} border py-3 px-4 rounded-lg min-w-full text-sm overflow-scroll max-h-[600px]`,
          codeClass
        )}
      ></code>
    </pre>
  );
}

export default CodeBlock;
