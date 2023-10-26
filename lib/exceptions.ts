export class MarkdownAlreadyExistError extends Error {
  constructor(message = "The markdown id already exist") {
    super(message)
  }
}
