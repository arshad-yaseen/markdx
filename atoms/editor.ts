import { atom } from "recoil"

export const editorCodeState = atom({
  key: "editorCodeState",
  default: `# Project title\n\nStart writing your markdown here`,
})
