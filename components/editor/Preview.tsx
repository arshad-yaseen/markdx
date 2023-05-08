import ParseMarkdown from "./ParseMarkdown";
import "@/styles/mdx.css"

function Preview({ code }: { code: string }) {
  return (
    <div className="w-[35%] h-full  border-l flex flex-col p-12 overflow-scroll">
      <ParseMarkdown code={code} />
    </div>
  );
}

export default Preview;
