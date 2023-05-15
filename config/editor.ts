import { AIConfigType } from "types"

export const editorConfig = {
  uploadMaxVideoSize: 30, //MB
}
export const AIConfig: AIConfigType = {
  prompts: [
    {
      system: {
        regular: `Your task is to revise the given markdown or text with the goal of improving its standard and professional tone, language, and style. To accomplish this, your revision should comply with best practices in grammar, syntax, punctuation, and usage, while also removing any errors, inconsistencies, or ambiguities in the original text or markdown. Furthermore, your revision must ensure that the markdown is suitable for its intended audience and purpose, and that it delivers its message clearly, effectively, and convincingly. Advanced markdown syntaxes should be used where appropriate.`,
      },
    },
    {
      system: {
        regular: `Produce a condensed version of the given text or markdown that effectively conveys the primary ideas and arguments presented while being approximately 25% of the original length. The revised version should prioritize the essential points of the text while omitting any superfluous details or information.`,
      },
    },
    {
      system: {
        regular: `Your objective is to provide a comprehensive explanation of a piece of markdown or text, focusing on enhancing its concision, clarity, and readability. Your aim is to create a more sophisticated, polished, and professional rendition of the text. To accomplish this, you should consider refining the language, structure, and style of the original text, in order to convey its message in a more detailed and effective manner. How can you refine the text to achieve a superior and more advanced outcome?`,
      },
    },
    {
      system: {
        detailed: `Please create a comprehensive technical document explaining how to use the provided code. The document should be easy to understand for advanced developers and be suitable for use in technical documentation. It should not contain any code or markdown syntax and should be limited to a maximum of 60 words.`,
        simple: `Please write a concise and simple technical document of how to use the provided code. The document should be easily understandable by an advanced developer and should not contain any code or markdown syntax. The length of the document should not exceed 25 words.`,
      },
    },
    {
      system: {
        regular: `Please write a clear and grammatically correct version of the following markdown.
            If needed, consider correcting issues related to subject-verb agreement, pronoun usage, verb tense consistency, punctuation, and overall clarity.
            Your goal is to create a version of the markdown that is easy to understand and free of any errors.

            Instructions:

              - Analyze and correct any grammatical errors in the following markdown.
              - Please provide the corrected version of the markdown.
              - The generated version should only the answer
              
              Guidelines for correcting the markdown:
              
              - Check for subject-verb agreement.
              - Check for pronoun usage.
              - Check for verb tense consistency.
              - Check for punctuation errors.
              - Ensure the sentence is clear and concise.`,
      },
    },
    {
      system: {
        regular: `
          Task: Translate the provided text accurately into the {language} while maintaining the original meaning and adhering to the grammatical rules and linguistic conventions of the {language}. The translation should be readable and comprehensible to a native speaker of the {language}, and free of errors, mistranslations, or omissions that could lead to confusion or misunderstanding. Additionally, the translation should be culturally appropriate and sensitive to any nuances or subtleties that may be unique to the {language} or culture.

          Instructions:
          
          Read the provided text carefully and ensure that you understand its meaning.
          Translate the text into the {language}, using appropriate grammar, vocabulary, and sentence structure.
          Review your translation to ensure that it accurately conveys the original meaning, is free of errors, and adheres to the linguistic conventions of the {language}.
          
          Consider any cultural nuances or subtleties that may be unique to the {language} or culture, and ensure that your translation is culturally appropriate and sensitive.`,
      },
    },
  ],
}

// export const shortcuts = {
//   table: {
//     shortcut: "/t/",
//     output: ""
//   },
//   image: {
//     shortcut: "/i/",
//     output: ""
//   },
//   video: {
//     shortcut: "/v/",
//     output: ""
//   },
//   link: {
//     shortcut: "/l/",
//     output: ""
//   },
//   image: {
//     shortcut: "/i/",
//     output: ""
//   },
// }
