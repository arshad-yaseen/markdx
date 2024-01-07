export const editorConfig = {
  uploadMaxVideoSize: 30, //MB
}

export type DefaultEditorContent = {
  section_id: number
  section: string
  content: string
}

export const defaultEditorContent: DefaultEditorContent = {
  section_id: 0,
  section: "Introduction",
  content: `# Project Title\n\nA brief description of what this project does.`,
}

export const PROMPT = {
  standardize_format: "You are an expert Markdown writer. Standardize the provided text or Markdown for consistency and adherence to Markdown formatting rules.",
  summarize_content: "You are skilled at concise summarization. Generate a brief summary of the key points and main ideas from the provided Markdown content.",
  concise_expression:
    "You are adept at clear and concise communication. Refine and condense the expression in the following Markdown content for brevity and clarity.",
  grammar_correction:
    "You are an expert in grammar and style. Correct any grammatical errors in the following Markdown content, and then rewrite it for improved clarity and flow while maintaining the original meaning.",
  consistency_check:
    "Your task is to review and adjust the following Markdown content to ensure a consistent tone and style throughout. Focus on harmonizing the voice, style elements, and overall presentation for a cohesive and uniform reading experience.",
  hyperlink_implementation:
    "Implement or review hyperlinks in the following markdown.",
  optimize_headings:
    "Optimize headings and subheadings in the following markdown.",
  embed_media:
    "Embed relevant images, videos, or other media in the following markdown.",
  code_formatting:
    "Format and highlight code snippets in the following markdown.",
  bullet_point_optimization:
    "Optimize the use of bullet points or lists in the following markdown.",
  translate_text: "Translate the following text into {language}",
  convert_code: "Convert the following code into {to}",
  document_code: "You are skilled in code documentation. Thoroughly document the following code snippet, providing clear and concise explanations for its functionality, structure, and any significant lines or elements.",
  technical_explanation:
    "Your expertise lies in technical analysis. Examine the following Markdown content and provide detailed explanations of its technical aspects, including any complex terms, processes, or concepts mentioned.",
  accessibility_improvement:
    "Improve the accessibility of the following markdown.",
  fact_checking: "Fact-check the information in the following markdown.",
  rephrase_text: "Rephrase the following text.",
}

export const shortcuts = {
  table: {
    output: `| C1 | C2 | C3 |\n| -- | -- | -- |\n| R1C1 | R1C2 | R1C3 |\n| R2C1 | R2C2 | R2C3 |\n| R3C1 | R3C2 | R3C3 |`,
  },
  image: {
    output: "![Placeholder image](https://via.placeholder.com/450x250)",
  },
  video: {
    output: `<video controls preload="auto" src="https://shiny.link/NStj7" />`,
  },
  link: {
    output: "[Link text](https://www.example.com)",
  },
  linkWithImage: {
    output:
      "[![Image alt text](https://via.placeholder.com/450x250)](link-url)",
  },
  codeBlock: {
    output: "```javascript\nconsole.log('Hello world!')\n```",
  },
  alignCenter: {
    output: `<p align="center" >This will be centered</p>`,
  },
}
