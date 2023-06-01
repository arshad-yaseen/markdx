export class RequiresProPlanError extends Error {
  constructor(message = "This action requires a pro plan") {
    super(message)
  }
}


export class MarkdownAlreadyExistError extends Error {
  constructor(message = "The markdown id already exist") {
    super(message)
  }
}
