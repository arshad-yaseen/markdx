import { AIConfigType } from "types"

export const editorConfig = {
  uploadMaxVideoSize: 30, //MB
}

export const defaultEditorContent = {
  section_id: 0,
  section: "Introduction",
  content: `# Project Title\n\nA brief description of what this project does.`,
}
export const openai_model = "gpt-4"

export const AIConfig: AIConfigType = {
  prompts: [
    {
      system: {
        regular: `Your assignment is to refine the provided markdown or text, enhancing its professionalism, language, and overall tone. In order to achieve this, your revisions should adhere to best practices in grammar, syntax, punctuation, and usage, while also rectifying any inaccuracies, inconsistencies, or ambiguities present in the initial text or markdown. Additionally, it is imperative that your revised markdown is aptly tailored to its intended audience and purpose, ensuring that the message is conveyed with clarity, efficacy, and persuasion. Employ advanced markdown syntaxes as deemed necessary.`,
      },
    },
    {
      system: {
        regular: `Produce a condensed version of the given text or markdown that effectively conveys the primary ideas and arguments presented while being approximately 25% of the original length. The revised version should prioritize the essential points of the text while omitting any superfluous details or information.`,
      },
    },
    {
      system: {
        regular: `Your task is to furnish a detailed elucidation of the provided markdown or text, incorporating the code in the document, while prioritizing conciseness, clarity, and readability. Strive to produce a refined, polished, and professional version of the text. This entails enhancing the language, structure, and style of the original content to effectively communicate its message with greater precision. Reflect on how you can elevate the text to achieve a more sophisticated and advanced result.`,
      },
    },
    {
      system: {
        detailed: `
        Draft a detailed technical document elucidating the application of the given code. The document should cater to the understanding of advanced developers and be apt for integration into technical documentation. Please refrain from including any code or markdown syntax. Limit your document to a maximum of 60 words.`,
        simple: `Draft a clear and concise guide on utilizing the given code, ensuring it's accessible for advanced developers. Omit any code or markdown syntax, and keep the document under 25 words.`,
      },
    },
    {
      system: {
        regular: `Please write a clear, grammatically correct version of the following markdown. Address potential issues related to subject-verb agreement, pronoun usage, verb tense consistency, punctuation, and overall clarity. Your objective is to produce a version that is straightforward and free from errors.

        Instructions:
        
        - Review and rectify any grammatical mistakes in the given markdown.
        - Supply the amended version of the markdown.
        - Your response should be the corrected answer.
        - Guidelines for revising the markdown:
        
        - Verify subject-verb agreement.
        - Examine pronoun usage.
        - Ensure verb tense consistency.
        - Correct any punctuation errors.
        - Aim for clarity and brevity in sentences.`,
      },
    },
    {
      system: {
        regular: `Task: Your goal is to translate the provided text into {language}, ensuring that you preserve the original meaning while adhering to the grammatical rules and linguistic conventions of {language}. Your translation should be clear, easily understood by native speakers, and free from errors, mistranslations, or omissions that could lead to confusion. Additionally, your translation should be culturally relevant and sensitive to any unique nuances or subtleties of the {language} or its associated culture.

Instructions:

- Carefully read and comprehend the meaning of the provided text.
- Translate the text into {language}, ensuring the use of proper grammar, vocabulary, and sentence structure.
- Review your translation to verify accuracy in conveying the original meaning, adherence to linguistic conventions, and the absence of errors.
- Consider any cultural nuances or subtleties specific to {language} or its culture, ensuring your translation is culturally appropriate and sensitive.`,
      },
    },
  ],
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
