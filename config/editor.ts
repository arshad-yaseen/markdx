export const editorConfig = {
  uploadMaxVideoSize: 30, //MB
}

export const defaultEditorContent = {
  section_id: 0,
  section: "Introduction",
  content: `# Project Title\n\nA brief description of what this project does.`,
}

export const PROMPT = {
  standardize_format: "Standardize the format of the following markdown.",
  summarize_content: "Provide a summary of the following markdown content.",
  concise_expression:
    "Make the expression in the following markdown more concise.",
  grammar_correction:
    "Correct any grammatical errors in the following markdown.",
  consistency_check:
    "Ensure consistency in tone and style in the following markdown.",
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
  document_code: "Document the following code",
  technical_explanation:
    "Explain the technical aspects in the following markdown.",
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
    output: "```language\ncode\n```",
  },
  alignCenter: {
    output: `<p align="center" >This will be centered</p>`,
  },
}
