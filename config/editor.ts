import { AIConfigType } from "types"

export const editorConfig = {
  uploadMaxVideoSize: 30, //MB
}
export const AIConfig: AIConfigType = {
  prompts: [
    {
      for: 0,
      system: {
        regular: `Please revise the following markdown or text to make it more standard and professional in tone, language, and style. Your revision should adhere to best practices in grammar, syntax, punctuation, and usage, and should eliminate any errors, inconsistencies, or ambiguities in the original text. Your revision should also ensure that the text is appropriate for its intended audience and purpose, and that it conveys its message clearly, effectively, and persuasively.`,
      },
    },
    {
      for: 1,
      system: {
        regular: `Please provide a very very short summary of the following markdown that is approximately 1/4 of provided text length, capturing the main ideas and arguments presented in a clear and concise manner. Your summary should focus on the most important points from the text and should avoid unnecessary details or information.`,
      },
    },
    {
      for: 2,
      system: {
        regular: `You have been tasked with explaining a piece of markdown to make it more detailed, concise and easy to understand. Your goal is to improve the readability and clarity of the text, and make it appear more detailed, polished and professional overall. How can you refine this text to achieve a more advanced and professional result?`,
      },
    },
    {
      for: 3,
      system: {
        detailed: `Please create a comprehensive technical document explaining how to use the provided code. The document should be easy to understand for advanced developers and be suitable for use in technical documentation. It should not contain any code or markdown syntax and should be limited to a maximum of 60 words.`,
        simple: `Please write a concise and simple technical document of how to use the provided code. The document should be easily understandable by an advanced developer and should not contain any code or markdown syntax. The length of the document should not exceed 25 words.`,
      },
    },
    {
      for: 4,
      system: {
        generate: `Objective:
        Generate a syntactically correct code snippet in makdown. that adheres to the standard conventions of the programming language. The code should be able to run without any errors.
        
        Instructions:
        
        Based on the given prompt, generate a code snippet that solves the problem or performs the task described in the prompt.
        Ensure that the code is properly formatted according to the conventions of the programming language.
        Verify that the code runs without any errors by testing it in an appropriate environment.
        
        Additional Guidelines:
        
        The code should be clear and easy to read.
        Use descriptive variable and function names.
        Follow proper indentation and formatting rules.
        Use appropriate data types and functions according to the programming language.
        Ensure that the code snippet is concise and efficient.`,
        convert: `.\nInstruction: The converted code should in markdown syntaxes`,
      },
    },
    {
      for: 5,
      system: {
        regular: `Please write a clear and grammatically correct version of the following markdown.
            If needed, consider correcting issues related to subject-verb agreement, pronoun usage, verb tense consistency, punctuation, and overall clarity.
            Your goal is to create a version of the text that is easy to understand and free of any errors.

            Instructions:

              - Analyze and correct any grammatical errors in the following text.
              - Please provide the corrected version of the text.
              
              Guidelines for correcting the text:
              
              - Check for subject-verb agreement.
              - Check for pronoun usage.
              - Check for verb tense consistency.
              - Check for punctuation errors.
              - Ensure the sentence is clear and concise.`,
      },
    },
    {
      for: 6,
      system: {
        dynamic: (language: string) => {
          return `Task: Translate the provided text accurately into the ${language} while maintaining the original meaning and adhering to the grammatical rules and linguistic conventions of the ${language}. The translation should be readable and comprehensible to a native speaker of the ${language}, and free of errors, mistranslations, or omissions that could lead to confusion or misunderstanding. Additionally, the translation should be culturally appropriate and sensitive to any nuances or subtleties that may be unique to the ${language} or culture.

          Instructions:
          
          Read the provided text carefully and ensure that you understand its meaning.
          Translate the text into the ${language}, using appropriate grammar, vocabulary, and sentence structure.
          Review your translation to ensure that it accurately conveys the original meaning, is free of errors, and adheres to the linguistic conventions of the ${language}.
          Consider any cultural nuances or subtleties that may be unique to the ${language} or culture, and ensure that your translation is culturally appropriate and sensitive.`
        },
      },
    },
  ],
}
