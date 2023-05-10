import { atom } from "recoil"

export const editorCodesState = atom({
  key: "editorCodesState",
  default: [
    {
      id: 0,
      section: "Introduction",
      content: `# Project Title\n\nA brief description of what this project does.`,
    },
  ],
})

export const editorActiveSectionState = atom({
  key: "editorActiveSectionState",
  default: 0,
})
