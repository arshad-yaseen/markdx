import { NextResponse } from "next/server"

import "server-only"
import { ZodError, ZodSchema, z } from "zod"

export class ServerResponse {
  static success<JsonBody>(props?: { body?: JsonBody; headers?: HeadersInit }) {
    const { headers } = props ?? {}
    const body = props?.body ?? { ok: true }
    return NextResponse.json(body, { status: 200, headers })
  }

  static error(message: string, statusCode: number = 500) {
    return NextResponse.json({ error: { message } }, { status: statusCode })
  }

  static notFound(message: string = "Not found") {
    return NextResponse.json({ error: { message } }, { status: 404 })
  }

  static unauthorized(message: string = "You are not authorized") {
    return NextResponse.json({ error: { message } }, { status: 401 })
  }

  static internalServerError(message: string = "Internal server error") {
    return NextResponse.json({ error: { message } }, { status: 500 })
  }

  static badRequest(message: string = "Bad request") {
    return NextResponse.json({ error: { message } }, { status: 400 })
  }

  static conflict(message: string = "Conflict") {
    return NextResponse.json({ error: { message } }, { status: 409 })
  }

  static methodNotAllowed(message: string = "Method not allowed") {
    return NextResponse.json({ error: { message } }, { status: 405 })
  }

  static tooManyRequests(
    message: string = "Too many requests",
    headers?: HeadersInit
  ) {
    return NextResponse.json({ error: { message } }, { status: 429, headers })
  }

  static noContent() {
    return NextResponse.json(null, { status: 204 })
  }

  static missingRequiredParams(schema: ZodSchema, body: any) {
    const result = schema.safeParse(body)
    if (result.success) {
      throw new Error(
        "Schema validation unexpectedly succeeded when expected to fail."
      )
    }

    const missingParams = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }))

    return NextResponse.json(
      { error: { details: missingParams } },
      { status: 400 }
    )
  }

  static unprocessableEntity(error: ZodError) {
    const validationErrors = error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }))

    return NextResponse.json(
      { error: { details: validationErrors } },
      { status: 422 }
    )
  }
}
